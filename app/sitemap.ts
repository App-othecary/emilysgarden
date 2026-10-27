import type { MetadataRoute } from "next";
import { getAllNotes } from "@/lib/notes";

const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const notes = getAllNotes();

  const notePages = notes.map((note) => ({
    url: `${siteUrl}/notes/${note.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...notePages,
  ];
}
