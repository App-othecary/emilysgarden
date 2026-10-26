export function getNoteTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    seedling: "Seedling",
    budding: "Budding",
    evergreen: "Evergreen",
  };

  return labels[type.toLowerCase()] ?? "Seedling";
}
