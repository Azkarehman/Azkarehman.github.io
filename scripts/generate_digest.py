"""
Fetches medical imaging + AI papers from top-tier venues (MICCAI, ECCV, CVPR,
NeurIPS, ICCV) via Semantic Scholar, with arXiv/PubMed as fallback.
Randomly selects 4, generates a blog post, and emails a notification.
"""

import os
import re
import json
import random
import smtplib
import time
import urllib.request
import urllib.parse
import xml.etree.ElementTree as ET
from datetime import datetime
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from pathlib import Path

CONTENT_DIR = Path(__file__).parent.parent / "content" / "posts"

# Top-tier venues to search
VENUES = [
    "MICCAI",
    "ECCV",
    "CVPR",
    "NeurIPS",
    "ICCV",
]

# Search queries for Semantic Scholar
SS_QUERIES = [
    "medical image segmentation deep learning",
    "medical imaging transformer foundation model",
    "medical image classification detection CNN",
    "medical imaging vision language model VLM",
]

# Fallback arXiv queries
ARXIV_QUERIES = [
    "medical image segmentation transformer",
    "medical imaging vision language model",
    "medical image classification CNN deep learning",
]


def fetch_semantic_scholar(query: str, venues: list[str], year_range: str, limit: int = 20) -> list[dict]:
    """Search Semantic Scholar API for papers from specific venues."""
    papers = []
    for venue in venues:
        params = urllib.parse.urlencode({
            "query": query,
            "venue": venue,
            "year": year_range,
            "limit": limit,
            "fields": "title,authors,venue,year,abstract,externalIds,url,publicationDate",
        })
        url = f"https://api.semanticscholar.org/graph/v1/paper/search?{params}"

        try:
            req = urllib.request.Request(url, headers={"User-Agent": "ResearchDigestBot/1.0"})
            with urllib.request.urlopen(req, timeout=15) as resp:
                data = json.loads(resp.read())

            for item in data.get("data", []):
                title = (item.get("title") or "").strip()
                if not title:
                    continue

                authors_list = item.get("authors", [])
                author_names = [a.get("name", "") for a in authors_list[:5]]
                author_str = ", ".join(author_names)
                if len(authors_list) > 5:
                    author_str += " et al."

                abstract = (item.get("abstract") or "").strip()
                ext_ids = item.get("externalIds", {}) or {}
                doi = ext_ids.get("DOI", "")
                arxiv_id = ext_ids.get("ArXiv", "")

                if doi:
                    paper_url = f"https://doi.org/{doi}"
                elif arxiv_id:
                    paper_url = f"https://arxiv.org/abs/{arxiv_id}"
                else:
                    paper_url = item.get("url", "")

                venue_name = item.get("venue", venue) or venue
                year = item.get("year", "")

                papers.append({
                    "title": title,
                    "authors": author_str,
                    "venue": venue_name,
                    "year": str(year),
                    "date": item.get("publicationDate", str(year)),
                    "url": paper_url,
                    "summary": abstract[:300] if abstract else "",
                    "source": "conference",
                })
        except Exception as e:
            print(f"  Semantic Scholar error for {venue}/{query}: {e}")

        # Rate limit: be generous to avoid 429s
        time.sleep(3)

    return papers


def fetch_arxiv(query: str, max_results: int = 5) -> list[dict]:
    """Search arXiv for recent papers (fallback)."""
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
            summary = entry.find("a:summary", ns).text.strip().replace("\n", " ")[:300]
            papers.append({
                "title": title,
                "authors": author_str,
                "venue": "arXiv",
                "year": published[:4],
                "date": published,
                "url": link,
                "summary": summary,
                "source": "arxiv",
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


def select_papers(papers: list[dict], count: int = 4) -> list[dict]:
    """Select papers, prioritizing conference papers over arXiv."""
    conference_papers = [p for p in papers if p.get("source") == "conference"]
    arxiv_papers = [p for p in papers if p.get("source") == "arxiv"]

    random.shuffle(conference_papers)
    random.shuffle(arxiv_papers)

    selected = []
    # Take from conferences first
    selected.extend(conference_papers[:count])
    # Fill remainder from arXiv if needed
    remaining = count - len(selected)
    if remaining > 0:
        selected.extend(arxiv_papers[:remaining])

    return selected[:count]


def generate_markdown(papers: list[dict], today: str) -> tuple[str, str]:
    """Generate the markdown post content."""
    venues_featured = list(set(p["venue"] for p in papers))
    venue_str = ", ".join(venues_featured[:4])

    lines = []
    lines.append(f"This edition features **{len(papers)} papers** from {venue_str}.\n")

    for i, p in enumerate(papers, 1):
        lines.append(f"## {i}. {p['title']}\n")
        lines.append(f"**{p['authors']}**\n")
        lines.append(f"*{p['venue']}* ({p['year']})\n")
        if p.get("summary"):
            # Clean up summary
            summary = p["summary"].rstrip(".")
            lines.append(f"\n> {summary}...\n")
        if p.get("url"):
            lines.append(f"\n[Read paper &rarr;]({p['url']})\n")
        lines.append("")

    body = "\n".join(lines)

    paper_refs = json.dumps([
        {"title": p["title"], "authors": p["authors"], "url": p["url"]}
        for p in papers
    ], indent=2)

    summary = f"Featuring {len(papers)} papers from {venue_str} on medical imaging and AI."

    tags = ["Medical Imaging", "Deep Learning"]
    for p in papers:
        v = p["venue"].upper()
        if any(conf in v for conf in ["MICCAI", "ECCV", "CVPR", "NEURIPS", "ICCV"]):
            tag = next(conf for conf in ["MICCAI", "ECCV", "CVPR", "NeurIPS", "ICCV"] if conf.upper() in v)
            if tag not in tags:
                tags.append(tag)

    frontmatter = f"""---
title: "Research Digest — {today}"
date: "{today}"
summary: "{summary}"
tags: {json.dumps(tags)}
papers: {paper_refs}
---"""

    return frontmatter + "\n\n" + body, summary


def generate_email_html(papers: list[dict], today: str) -> str:
    """Generate a nicely formatted HTML email with paper details."""
    paper_rows = ""
    for i, p in enumerate(papers, 1):
        summary_html = ""
        if p.get("summary"):
            summary_html = f'<p style="color:#6b7280;font-size:13px;margin:6px 0 0;line-height:1.5;">{p["summary"][:200]}...</p>'

        paper_rows += f"""
        <div style="padding:16px 0;border-bottom:1px solid #e5e0db;">
          <p style="color:#8a8a9a;font-size:12px;margin:0 0 4px;">{p['venue']} ({p['year']})</p>
          <a href="{p.get('url','#')}" style="color:#c05746;font-size:15px;font-weight:600;text-decoration:none;">
            {i}. {p['title']}
          </a>
          <p style="color:#4a4a5a;font-size:13px;margin:4px 0 0;">{p['authors']}</p>
          {summary_html}
        </div>"""

    return f"""
    <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:24px;background:#faf8f5;">
      <h1 style="color:#1a1a2e;font-size:22px;margin:0 0 4px;">Research Digest</h1>
      <p style="color:#8a8a9a;font-size:13px;margin:0 0 20px;">{today}</p>
      {paper_rows}
      <div style="margin-top:24px;">
        <a href="https://azkarehman.github.io/blog"
           style="display:inline-block;padding:10px 24px;background:#c05746;color:white;
                  text-decoration:none;border-radius:8px;font-size:14px;">
          Read on Blog
        </a>
      </div>
      <p style="color:#8a8a9a;font-size:11px;margin-top:20px;">Automatically curated from top ML/CV venues.</p>
    </div>
    """


def send_email(subject: str, plain_text: str, html_body: str):
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

    msg.attach(MIMEText(plain_text, "plain"))
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

    current_year = datetime.now().year
    year_range = f"{current_year - 3}-{current_year}"

    # 1. Fetch from top-tier conferences (priority)
    print(f"Searching top venues ({', '.join(VENUES)}) for {year_range}...")
    all_papers = []
    for query in SS_QUERIES:
        print(f"  Query: {query}")
        results = fetch_semantic_scholar(query, VENUES, year_range, limit=20)
        all_papers.extend(results)

    all_papers = deduplicate(all_papers)
    conference_count = len(all_papers)
    print(f"Found {conference_count} unique conference papers.")

    # 2. Fallback to arXiv if not enough
    if len(all_papers) < 4:
        print("Not enough conference papers, fetching from arXiv...")
        for q in ARXIV_QUERIES:
            all_papers.extend(fetch_arxiv(q, max_results=5))
        all_papers = deduplicate(all_papers)
        print(f"Total after arXiv fallback: {len(all_papers)} papers.")

    if not all_papers:
        print("No papers found. Skipping post.")
        return

    # 3. Select 4 papers (conference-first)
    selected = select_papers(all_papers, count=10)
    print(f"Selected {len(selected)} papers for digest.")
    for p in selected:
        print(f"  - [{p['venue']}] {p['title'][:80]}")

    # 4. Generate post
    markdown, summary = generate_markdown(selected, today)
    output_path.write_text(markdown, encoding="utf-8")
    print(f"Post written to {output_path}")

    # 5. Send email with full paper details
    plain_text = f"Research Digest — {today}\n\n"
    for i, p in enumerate(selected, 1):
        plain_text += f"{i}. {p['title']}\n   {p['authors']}\n   {p['venue']} ({p['year']})\n   {p.get('url','')}\n\n"
    plain_text += f"\nRead on blog: https://azkarehman.github.io/blog\n"

    html_body = generate_email_html(selected, today)
    send_email(f"Research Digest — {today}", plain_text, html_body)


if __name__ == "__main__":
    main()
