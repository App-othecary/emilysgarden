import Link from "next/link";

export default function NotFound() {
  return (
    <main className="site-shell error-page">
      <p className="eyebrow">A little detour</p>
      <h1>This path hasn't grown yet.</h1>
      <p>
        That page doesn't exist, or the note may have moved. Let's return to the
        garden and find another idea to explore.
      </p>
      <Link className="error-link" href="/">
        Return to EmilysGarden
      </Link>
    </main>
  );
}
