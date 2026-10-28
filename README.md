# EmilysGarden

A personal digital garden built with Next.js, React and TypeScript.

## Getting started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000.

## Adding a note

1. Create a Markdown file inside `content/notes/`.
2. Add frontmatter with a title, description, type and date.
3. Write the note in Markdown.
4. Optionally add a `related` list containing other note slugs.
5. Save the file. The homepage and sitemap discover notes automatically.

Example frontmatter:

```yaml
---
title: My New Idea
description: A short summary of this note.
type: seedling
date: 2026-10-28
related:
  - learning-in-public
---
```

Available stages: `seedling`, `budding`, `evergreen`.

## Before publishing

```bash
npm run build
```

Commit and push changes to Git. If the project is connected to Vercel,
the push should trigger a deployment.

## Project structure

- `app/`: pages, routing and site metadata
- `components/`: reusable interface components
- `content/notes/`: Markdown content
- `lib/`: note-reading and content helpers
