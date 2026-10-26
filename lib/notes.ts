import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const notesDirectory = path.join(process.cwd(), "content", "notes");

export type GardenNote = {
  slug: string;
  title: string;
  description: string;
  type: string;
  date: string;
  related: string[];
};

export function getAllNotes(): GardenNote[] {
  const filenames = fs.readdirSync(notesDirectory);

  const notes = filenames
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const fullPath = path.join(notesDirectory, filename);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: String(data.title ?? slug),
        description: String(data.description ?? ""),
        type: String(data.type ?? "seedling"),
        date: String(data.date ?? ""),
        related: Array.isArray(data.related) ? data.related.map(String) : [],
      };
    });

  return notes.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getNoteBySlug(slug: string) {
  const fullPath = path.join(notesDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);

  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    type: String(data.type ?? "seedling"),
    date: String(data.date ?? ""),
    contentHtml: processedContent.toString(),
    related: Array.isArray(data.related) ? data.related.map(String) : [],
  };
}
