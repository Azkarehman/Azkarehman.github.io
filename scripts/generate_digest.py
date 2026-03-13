"""
Fetches recent medical imaging + AI papers from PubMed and arXiv,
generates a markdown blog post, and optionally sends an email notification.
"""

import os
import re
import json
import smtplib
import urllib.request
import urllib.parse
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from pathlib import Path

CONTENT_DIR = Path(__file__).parent.parent / "content" / "posts"

PUBMED_QUERIES = [
    '"medical image segmentation" AND (deep learning OR transformer OR CNN)',
    '"medical imaging" AND (vision language model OR VLM OR foundation model)',
    '"medical image classification" AND (transformer OR CNN OR deep learning)',
    '"medical imaging" AND (regression OR prediction) AND deep learning',
]

ARXIV_QUERIES = [
    "medical image segmentation transformer",
    "medical imaging vision language model",
    "medical image classification CNN deep learning",
    "clinical AI foundation model",
]


def fetch_pubmed(query: str, max_results: int = 5) -> list[dict]:
    """Search PubMed and return recent paper metadata."""
    date_from = (datetime.now() - timedelta(days=8)).strftime("%Y/%m/%d")
    date_to = datetime.now().strftime("%Y/%m/%d")

    params = urllib.parse.urlencode({
        "db": "pubmed",
        "term": query,
        "retmax": max_results,
        "sort": "date",
        "mindate": date_from,
        "maxdate": date_to,
        "retmode": "json",
    })
    url = f"https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?{params}"

    try:
        with urllib.request.urlopen(url, timeout=15) as resp:
            data = json.loads(resp.read())
        ids = data.get("esearchresult", {}).get("idlist", [])
    except Exception:
        return []

    if not ids:
        return []

    # Fetch summaries
    params = urllib.parse.urlencode({
        "db": "pubmed",
        "id": ",".join(ids),
        "retmode": "json",
    })
    url = f"https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?{params}"

    papers = []
    try:
        with urllib.request.urlopen(url, timeout=15) as resp:
            data = json.loads(resp.read())
        results = data.get("result", {})
        for pid in ids:
            info = results.get(pid, {})
            title = info.get("title", "").strip()
            authors_list = info.get("authors", [])
            authors = ", ".join(a.get("name", "") for a in authors_list[:5])
            if len(authors_list) > 5:
                authors += " et al."
            source = info.get("source", "")
            pubdate = info.get("pubdate", "")
            papers.append({
                "title": title,
                "authors": authors,
                "venue": source,
                "date": pubdate,
                "url": f"https://pubmed.ncbi.nlm.nih.gov/{pid}/",
            })
    except Exception:
        pass

    return papers


def fetch_arxiv(query: str, max_results: int = 5) -> list[dict]:
    """Search arXiv for recent papers."""
    params = urllib.parse.urlencode({
        "search_query": f"all:{query}",
        "start": 0,
        "max_results": max_results,
        "sortBy": "submittedDate",
        "sortOrder": "descending",
    })
    url = f"http://export.arxiv.org/api/query?{params}"

    papers = []
    try:
        with urllib.request.urlopen(url, timeout=15) as resp:
            root = ET.fromstring(resp.read())
        ns = {"a": "http://www.w3.org/2005/Atom"}
        for entry in root.findall("a:entry", ns):
            title = entry.find("a:title", ns).text.strip().replace("\n", " ")
            authors = [a.find("a:name", ns).text for a in entry.findall("a:author", ns)]
            author_str = ", ".join(authors[:5])
            if len(authors) > 5:
                author_str += " et al."
            link = entry.find("a:id", ns).text.strip()
            published = entry.find("a:published", ns).text[:10]
            summary = entry.find("a:summary", ns).text.strip().replace("\n", " ")[:200]
            papers.append({
                "title": title,
                "authors": author_str,
                "venue": "arXiv",
                "date": published,
                "url": link,
                "summary": summary,
            })
    except Exception:
        pass

    return papers


def deduplicate(papers: list[dict]) -> list[dict]:
    """Remove duplicates by normalized title."""
    seen = set()
    unique = []
    for p in papers:
        key = re.sub(r"\W+", "", p["title"].lower())
        if key not in seen:
            seen.add(key)
            unique.append(p)
    return unique


def generate_markdown(papers: list[dict], today: str) -> tuple[str, str]:
    """Generate the markdown post content."""
    # Categorize papers
    categories = {
        "Segmentation": [],
        "Classification & Detection": [],
        "Foundation Models & VLMs": [],
        "Other": [],
    }

    for p in papers:
        title_lower = p["title"].lower()
        if "segment" in title_lower:
            categories["Segmentation"].append(p)
        elif any(k in title_lower for k in ["classif", "detect", "diagnos"]):
            categories["Classification & Detection"].append(p)
        elif any(k in title_lower for k in ["foundation", "vlm", "vision language", "pretrain", "fine-tun"]):
            categories["Foundation Models & VLMs"].append(p)
        else:
            categories["Other"].append(p)

    # Build markdown body
    lines = []
    for cat, cat_papers in categories.items():
        if not cat_papers:
            continue
        lines.append(f"## {cat}\n")
        for p in cat_papers:
            lines.append(f"### [{p['title']}]({p['url']})\n")
            lines.append(f"**{p['authors']}** — *{p['venue']}* ({p['date']})\n")
            if p.get("summary"):
                lines.append(f"{p['summary']}...\n")
            lines.append("")

    body = "\n".join(lines)

    # Build frontmatter
    paper_refs = json.dumps([
        {"title": p["title"], "authors": p["authors"], "url": p["url"]}
        for p in papers
    ], indent=2)

    summary = f"This week's digest features {len(papers)} papers on medical imaging AI — covering segmentation, classification, foundation models, and more."

    tags = ["Medical Imaging", "Deep Learning"]
    if categories["Segmentation"]:
        tags.append("Segmentation")
    if categories["Foundation Models & VLMs"]:
        tags.append("Foundation Models")

    frontmatter = f"""---
title: "Research Digest — {today}"
date: "{today}"
summary: "{summary}"
tags: {json.dumps(tags)}
papers: {paper_refs}
---"""

    return frontmatter + "\n\n" + body, summary


def send_email(subject: str, body_text: str):
    """Send notification email."""
    email_addr = os.environ.get("EMAIL_ADDRESS")
    email_pass = os.environ.get("EMAIL_PASSWORD")
    if not email_addr or not email_pass:
        print("Email credentials not set, skipping notification.")
        return

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = email_addr
    msg["To"] = email_addr

    html_body = f"""
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #c05746; font-size: 24px;">New Research Digest Posted</h1>
      <p style="color: #4a4a5a; line-height: 1.6;">{body_text}</p>
      <a href="https://azkarehman.github.io/blog"
         style="display: inline-block; margin-top: 16px; padding: 10px 24px;
                background: #c05746; color: white; text-decoration: none;
                border-radius: 8px; font-size: 14px;">
        Read on Blog
      </a>
    </div>
    """

    msg.attach(MIMEText(body_text, "plain"))
    msg.attach(MIMEText(html_body, "html"))

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(email_addr, email_pass)
            server.send_message(msg)
        print("Email sent successfully.")
    except Exception as e:
        print(f"Failed to send email: {e}")


def main():
    today = datetime.now().strftime("%Y-%m-%d")
    slug = today
    output_path = CONTENT_DIR / f"{slug}.md"

    # Check if already posted today
    if output_path.exists():
        print(f"Post for {today} already exists. Skipping.")
        return

    CONTENT_DIR.mkdir(parents=True, exist_ok=True)

    # Fetch papers
    print("Fetching from PubMed...")
    all_papers = []
    for q in PUBMED_QUERIES:
        all_papers.extend(fetch_pubmed(q, max_results=3))

    print("Fetching from arXiv...")
    for q in ARXIV_QUERIES:
        all_papers.extend(fetch_arxiv(q, max_results=3))

    all_papers = deduplicate(all_papers)
    print(f"Found {len(all_papers)} unique papers.")

    if not all_papers:
        print("No papers found this cycle. Skipping post.")
        return

    # Generate post
    markdown, summary = generate_markdown(all_papers, today)
    output_path.write_text(markdown, encoding="utf-8")
    print(f"Post written to {output_path}")

    # Send email
    send_email(f"Research Digest — {today}", summary)


if __name__ == "__main__":
    main()
