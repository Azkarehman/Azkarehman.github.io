import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  papers: { title: string; authors: string; url: string }[];
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllPosts(): PostMeta[] {
  const slugs = getAllPostSlugs();
  return slugs
    .map((slug) => getPostMeta(slug))
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostMeta(slug: string): PostMeta {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data } = matter(fileContents);
  return {
    slug,
    title: data.title || "",
    date: data.date || "",
    summary: data.summary || "",
    tags: data.tags || [],
    papers: data.papers || [],
  };
}

export async function getPostContent(slug: string) {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const processed = await remark().use(html).process(content);
  return {
    meta: {
      slug,
      title: data.title || "",
      date: data.date || "",
      summary: data.summary || "",
      tags: data.tags || [],
      papers: data.papers || [],
    } as PostMeta,
    contentHtml: processed.toString(),
  };
}
