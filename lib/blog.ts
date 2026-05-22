import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readingTime: string;
};

export type Post = PostMeta & { content: string };

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

async function safeReaddir(): Promise<string[]> {
  try {
    return await fs.readdir(BLOG_DIR);
  } catch {
    return [];
  }
}

export async function listPosts(): Promise<PostMeta[]> {
  const files = await safeReaddir();
  const posts = await Promise.all(
    files
      .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
      .map(async (file) => {
        const raw = await fs.readFile(path.join(BLOG_DIR, file), "utf8");
        const { data, content } = matter(raw);
        return {
          slug: file.replace(/\.(md|mdx)$/, ""),
          title: data.title ?? "Untitled",
          date: data.date ?? new Date().toISOString(),
          excerpt: data.excerpt ?? "",
          tags: data.tags ?? [],
          readingTime: readingTime(content).text,
        } satisfies PostMeta;
      })
  );
  return posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export async function getPost(slug: string): Promise<Post | null> {
  const tryExts = [".md", ".mdx"];
  for (const ext of tryExts) {
    try {
      const raw = await fs.readFile(path.join(BLOG_DIR, slug + ext), "utf8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title ?? "Untitled",
        date: data.date ?? new Date().toISOString(),
        excerpt: data.excerpt ?? "",
        tags: data.tags ?? [],
        readingTime: readingTime(content).text,
        content,
      };
    } catch {
      // try next
    }
  }
  return null;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
