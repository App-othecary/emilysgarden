import NoteCard from "../app/components/NoteCard";
import { getAllNotes } from "@/lib/notes";

const notes = [
  {
    title: "Learning in Public",
    description: "Why sharing unfinished work can help us learn and grow.",
    type: "Learning",
    href: "#garden-note",
  },
  {
    title: "A Collection of Questions",
    description: "Questions worth keeping, even before I know their answers.",
    type: "Reflection",
    href: "#garden-note",
  },
  {
    title: "Connections Everywhere",
    description:
      "How ideas from different subjects can illuminate one another.",
    type: "Ideas",
    href: "#garden-note",
  },
];

export default function Home() {
  const notes = getAllNotes();
  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="wordmark" href="/">
          Emilys<span>Garden</span>
        </a>

        <nav className="site-nav" aria-label="Main navigation">
          <a href="#notes">Explore</a>
          <a href="#garden-note">About</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <p className="eyebrow">A living collection of ideas</p>

          <h1>
            Thoughts grow
            <br />
            when we <em>connect.</em>
          </h1>

          <p className="hero-description">
            Welcome to my digital garden: a quiet corner of the internet for
            things I&apos;m learning, questions I&apos;m asking, and connections
            I&apos;m discovering along the way.
          </p>
        </section>

        {/* hide this in chapter 4 */}
        <section id="notes" aria-labelledby="notes-heading">
          <div className="section-heading">
            <h2 id="notes-heading">Growing ideas</h2>
            <span className="section-note">A few seeds to begin with</span>
          </div>

          <div className="note-grid">
            {notes.map((note) => (
              <NoteCard
                key={note.slug}
                title={note.title}
                description={note.description}
                type={note.type}
                href={`/notes/${note.slug}`}
              />
            ))}
          </div>
          <section className="growth-guide">
            <p className="eyebrow">How this garden grows</p>
            <h2>Ideas are always evolving.</h2>

            <div className="growth-guide-grid">
              <div>
                <span className="growth-label seedling">Seedling</span>
                <p>Fresh thoughts and questions still taking shape.</p>
              </div>

              <div>
                <span className="growth-label budding">Budding</span>
                <p>Ideas being explored, expanded and connected.</p>
              </div>

              <div>
                <span className="growth-label evergreen">Evergreen</span>
                <p>Developed notes worth returning to and refining.</p>
              </div>
            </div>
          </section>
        </section>

        <aside className="garden-note" id="garden-note">
          <span className="garden-note-mark" aria-hidden="true">
            ❧
          </span>
          <p>
            This garden is always growing. Some ideas will flourish, others will
            change, and a few will remain beautiful questions.
          </p>
        </aside>
      </main>

      <footer className="site-footer">
        <p>EmilysGarden · Growing one thought at a time.</p>
      </footer>
    </div>
  );
}
