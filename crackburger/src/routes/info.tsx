import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ADDRESS,
  EMAIL,
  MAP_EMBED,
  MAP_LINK,
  PHONE,
  PHONE_HREF,
  WEEK,
  formatHours,
  getOpenStatus,
} from "@/lib/hours";

export const Route = createFileRoute("/info")({
  head: () => ({
    meta: [
      { title: "Hours, Location & Contact — Crack Burger Toronto" },
      {
        name: "description",
        content:
          "Crack Burger is at 147 Baldwin St, Toronto. Open Mon and Wed–Sun 11am–9pm, closed Tuesdays. Call (416) 593-5994.",
      },
      { property: "og:title", content: "Hours, Location & Contact — Crack Burger Toronto" },
      {
        property: "og:description",
        content: "147 Baldwin St, Toronto. Open 11am–9pm, closed Tuesdays.",
      },
    ],
  }),
  component: InfoPage,
});

function InfoPage() {
  const status = getOpenStatus();
  const todayIndex = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Toronto" }),
  ).getDay();

  return (
    <div className="pb-10">
      <header className="border-b border-border/70 bg-char px-4 py-12 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-bun">Info</p>
        <h1 className="mt-3 text-5xl sm:text-6xl">Find us</h1>
        <span
          className={`mt-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold uppercase tracking-wide ${
            status.open
              ? "border-bun/60 bg-bun/15 text-bun"
              : "border-border bg-secondary text-muted-foreground"
          }`}
        >
          <span className={`h-2 w-2 rounded-full ${status.open ? "bg-bun" : "bg-muted-foreground"}`} />
          {status.label} · {status.detail}
        </span>
      </header>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:grid-cols-2">
        <div className="space-y-6">
          <section className="rounded-2xl border border-border bg-card p-5">
            <h2 className="flex items-center gap-2 text-2xl">
              <Clock className="h-5 w-5 text-bun" /> Hours
            </h2>
            <ul className="mt-4 divide-y divide-border text-sm">
              {WEEK.map((h, i) => (
                <li
                  key={h.day}
                  className={`flex justify-between py-2.5 ${i === todayIndex ? "text-bun" : "text-foreground/85"}`}
                >
                  <span className="font-semibold">{h.day}</span>
                  <span>{formatHours(h)}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-border bg-card p-5">
            <h2 className="flex items-center gap-2 text-2xl">
              <MapPin className="h-5 w-5 text-bun" /> Address
            </h2>
            <address className="mt-3 not-italic text-sm leading-relaxed text-foreground/85">
              {ADDRESS}
            </address>
            <Button asChild variant="secondary" size="lg" className="mt-4 h-12 w-full">
              <a href={MAP_LINK} target="_blank" rel="noreferrer">
                Get directions
              </a>
            </Button>
          </section>

          <section className="rounded-2xl border border-border bg-card p-5">
            <h2 className="text-2xl">Contact</h2>
            <div className="mt-4 grid gap-3">
              <Button asChild size="lg" className="h-14">
                <a href={PHONE_HREF} className="flex items-center gap-2">
                  <Phone className="h-5 w-5" /> {PHONE}
                </a>
              </Button>
              <Button asChild variant="secondary" size="lg" className="h-14">
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-2">
                  <Mail className="h-5 w-5" /> {EMAIL}
                </a>
              </Button>
            </div>
          </section>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <iframe
            title="Map of Crack Burger at 147 Baldwin St, Toronto"
            src={MAP_EMBED}
            loading="lazy"
            className="h-[420px] w-full lg:h-full"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
