import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllNotes, getNoteBySlug, type GardenNote } from "@/lib/notes";
import { getNoteTypeLabel } from "@/lib/note-types";

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

  const allNotes = getAllNotes();

  const relatedNotes = note.related
    .map((slug) => allNotes.find((item) => item.slug === slug))
    .filter((item): item is GardenNote => Boolean(item));

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
        <p className="eyebrow">{getNoteTypeLabel(note.type)}</p>
        <h1>{note.title}</h1>
        <p className="note-page-description">{note.description}</p>

        <div
          className="note-content"
          dangerouslySetInnerHTML={{
            __html: note.contentHtml,
          }}
        />
        {relatedNotes.length > 0 && (
          <section className="related-notes">
            <h2>Growing from this idea</h2>
            <p>Explore these connected notes.</p>

            <ul>
              {relatedNotes.map((relatedNote) => (
                <li key={relatedNote.slug}>
                  <Link href={`/notes/${relatedNote.slug}`}>
                    {relatedNote.title}
                  </Link>
                  <p>{relatedNote.description}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        <p className="note-back">
          <Link href="/#notes">← Back to the garden</Link>
        </p>
      </article>
    </main>
  );
}
