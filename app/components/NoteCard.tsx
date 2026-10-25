type NoteCardProps = {
  title: string;
  description: string;
  type: string;
  href: string;
};

export default function NoteCard({
  title,
  description,
  type,
  href,
}: NoteCardProps) {
  return (
    <article className="note-card">
      <span className="note-type">{type}</span>

      <h3>{title}</h3>

      <p>{description}</p>

      <a className="text-link" href={href}>
        Explore this idea →
      </a>
    </article>
  );
}
