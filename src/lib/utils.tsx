export function formatDate(date: string | Date | null | undefined) {
  if (!date) return "-"; // fallback kalau kosong

  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) return "-"; // fallback kalau invalid

  const formatter = new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return formatter.format(parsedDate);
}
