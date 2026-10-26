import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllNotes, getNoteBySlug } from "@/lib/notes";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllNotes().map((note) => ({
    slug: note.slug,
  }));
}

export default async function NotePage({ params }: Props) {
  const { slug } = await params;
  const note = await getNoteBySlug(slug);

  if (!note) {
    notFound();
  }

  return (
    <main className="site-shell">
      <header className="site-header">
        <Link className="wordmark" href="/">
          Emilys<span>Garden</span>
        </Link>
        <nav className="site-nav">
          <Link href="/#notes">All notes</Link>
        </nav>
      </header>

      <article className="note-page">
        <p className="eyebrow">{note.type}</p>
        <h1>{note.title}</h1>
        <p className="note-page-description">{note.description}</p>

        <div
          className="note-content"
          dangerouslySetInnerHTML={{
            __html: note.contentHtml,
          }}
        />

        <p className="note-back">
          <Link href="/#notes">← Back to the garden</Link>
        </p>
      </article>
    </main>
  );
}
