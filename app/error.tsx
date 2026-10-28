"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("EmilysGarden error:", error);
  }, [error]);

  return (
    <main className="site-shell error-page">
      <p className="eyebrow">A small garden pause</p>
      <h1>Something went wrong.</h1>
      <p>
        This page encountered an unexpected problem. You can try loading it
        again or return to the garden.
      </p>

      <div className="error-actions">
        <button className="error-link" type="button" onClick={() => reset()}>
          Try again
        </button>

        <a className="error-secondary" href="/">
          Return to EmilysGarden
        </a>
      </div>
    </main>
  );
}
