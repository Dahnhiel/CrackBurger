export type DayHours = { day: string; open: number | null; close: number | null };

/** Mon 11–9, Tue closed, Wed–Sun 11–9 (index 0 = Sunday) */
export const WEEK: DayHours[] = [
  { day: "Sunday", open: 11, close: 21 },
  { day: "Monday", open: 11, close: 21 },
  { day: "Tuesday", open: null, close: null },
  { day: "Wednesday", open: 11, close: 21 },
  { day: "Thursday", open: 11, close: 21 },
  { day: "Friday", open: 11, close: 21 },
  { day: "Saturday", open: 11, close: 21 },
];

export const ADDRESS = "147 Baldwin St, Toronto, ON M5T 1L9";
export const PHONE = "(416) 593-5994";
export const PHONE_HREF = "tel:+14165935994";
export const EMAIL = "info@crackburger.ca";
export const MAP_EMBED =
  "https://www.google.com/maps?q=147+Baldwin+St,+Toronto,+ON+M5T+1L9&output=embed";
export const MAP_LINK =
  "https://www.google.com/maps/search/?api=1&query=147+Baldwin+St+Toronto+ON+M5T+1L9";

export function formatHours(h: DayHours) {
  if (h.open === null || h.close === null) return "Closed";
  const fmt = (n: number) => (n % 12 === 0 ? 12 : n % 12) + (n < 12 ? "am" : "pm");
  return `${fmt(h.open)} – ${fmt(h.close)}`;
}

/** Open/closed status for Toronto local time. */
export function getOpenStatus(now = new Date()) {
  const toronto = new Date(
    now.toLocaleString("en-US", { timeZone: "America/Toronto" }),
  );
  const today = WEEK[toronto.getDay()]!;
  if (today.open === null || today.close === null) {
    return { open: false, label: "Closed today", detail: `${today.day} — closed` };
  }
  const hour = toronto.getHours() + toronto.getMinutes() / 60;
  const open = hour >= today.open && hour < today.close;
  return {
    open,
    label: open ? "Open now" : "Closed now",
    detail: open ? `Until ${formatHours(today).split(" – ")[1]}` : `Today ${formatHours(today)}`,
  };
}
