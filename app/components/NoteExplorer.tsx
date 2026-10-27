"use client";

import { useMemo, useState } from "react";
import NoteCard from "../components/NoteCard";
import type { GardenNote } from "@/lib/notes";

type NoteExplorerProps = {
  notes: GardenNote[];
};

const stages = ["All", "Seedling", "Budding", "Evergreen"] as const;

export default function NoteExplorer({ notes }: NoteExplorerProps) {
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState("All");

  const filteredNotes = useMemo(() => {
    const query = search.trim().toLowerCase();

    return notes.filter((note) => {
      const matchesSearch = [note.title, note.description, note.type].some(
        (value) => value.toLowerCase().includes(query),
      );

      const matchesStage =
        stage === "All" || note.type.toLowerCase() === stage.toLowerCase();

      return matchesSearch && matchesStage;
    });
  }, [notes, search, stage]);

  return (
    <div className="note-explorer">
      <div className="note-controls">
        <label className="search-label" htmlFor="note-search">
          Search the garden
        </label>

        <input
          id="note-search"
          className="note-search"
          type="search"
          placeholder="Try “questions” or “ideas”…"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <div
          className="stage-filters"
          aria-label="Filter notes by growth stage"
        >
          {stages.map((item) => (
            <button
              key={item}
              type="button"
              className={`stage-filter ${stage === item ? "active" : ""}`}
              aria-pressed={stage === item}
              onClick={() => setStage(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <p className="search-results" aria-live="polite">
        {filteredNotes.length === 1
          ? "1 note found"
          : `${filteredNotes.length} notes found`}
      </p>

      {filteredNotes.length > 0 ? (
        <div className="note-grid">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.slug}
              title={note.title}
              description={note.description}
              type={note.type}
              href={`/notes/${note.slug}`}
            />
          ))}
        </div>
      ) : (
        <div className="empty-search">
          <h3>No notes found just yet.</h3>
          <p>Try another search or choose a different growth stage.</p>
          <button
            type="button"
            className="reset-search"
            onClick={() => {
              setSearch("");
              setStage("All");
            }}
          >
            Clear search and filters
          </button>
        </div>
      )}
    </div>
  );
}
