import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { CalendarDays, Check, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { money } from "@/lib/cart";
import { EMAIL, PHONE, PHONE_HREF } from "@/lib/hours";

export const Route = createFileRoute("/catering")({
  head: () => ({
    meta: [
      { title: "Catering & Event Packages — Crack Burger Toronto" },
      {
        name: "description",
        content:
          "Smash burger catering for Toronto offices, parties and events. Packages from 15 guests, pickup or delivery, custom orders welcome.",
      },
      { property: "og:title", content: "Catering & Event Packages — Crack Burger Toronto" },
      {
        property: "og:description",
        content: "Flat-top smash burgers for 15 to 200 guests. Pick a date and we handle the rest.",
      },
    ],
  }),
  component: CateringPage,
});

const PACKAGES = [
  {
    id: "backyard",
    name: "The Backyard",
    perGuest: 18,
    min: 15,
    includes: ["Single smash burgers", "Crack fries", "Two house dips", "Serving trays + napkins"],
  },
  {
    id: "block-party",
    name: "Block Party",
    perGuest: 26,
    min: 30,
    includes: [
      "Choice of any two burgers",
      "Crack fries + onion rings",
      "Four house dips",
      "Canned drinks",
      "Setup and warming trays",
    ],
    featured: true,
  },
  {
    id: "full-smash",
    name: "Full Smash",
    perGuest: 36,
    min: 50,
    includes: [
      "Build-your-own burger bar",
      "Loaded fries station",
      "All dips",
      "Shakes or desserts",
      "On-site staff",
    ],
  },
];

function CateringPage() {
  const [date, setDate] = useState<Date | undefined>();
  const [pkg, setPkg] = useState("block-party");
  const [guests, setGuests] = useState("30");
  const selected = PACKAGES.find((p) => p.id === pkg)!;
  const estimate = selected.perGuest * Math.max(Number(guests) || 0, selected.min);

  return (
    <div className="pb-10">
      <header className="border-b border-border/70 bg-char px-4 py-12 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-bun">Catering</p>
        <h1 className="mx-auto mt-3 max-w-2xl text-5xl sm:text-6xl">Feed the whole crew</h1>
        <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground">
          Flat-top smash burgers for offices, birthdays, film sets and backyards across Toronto.
          Minimum 15 guests, 48 hours notice.
        </p>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-3xl sm:text-4xl">Packages</h2>
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {PACKAGES.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                setPkg(p.id);
                setGuests(String(Math.max(Number(guests) || 0, p.min)));
              }}
              aria-pressed={pkg === p.id}
              className={`rounded-2xl border p-5 text-left transition-colors ${
                pkg === p.id
                  ? "border-bun bg-card shadow-ember"
                  : "border-border bg-card/60 hover:border-bun/50"
              }`}
            >
              {p.featured && (
                <span className="rounded-full bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-foreground">
                  Most booked
                </span>
              )}
              <h3 className="mt-3 text-2xl">{p.name}</h3>
              <p className="mt-1 font-display text-3xl text-bun">
                {money(p.perGuest)}
                <span className="ml-1 font-sans text-xs uppercase tracking-wide text-muted-foreground">
                  / guest
                </span>
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-xs uppercase tracking-wide text-muted-foreground">
                <Users className="h-3.5 w-3.5" /> {p.min} guest minimum
              </p>
              <ul className="mt-4 space-y-2 text-sm text-foreground/85">
                {p.includes.map((line) => (
                  <li key={line} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-bun" />
                    {line}
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[auto_minmax(0,1fr)]">
          <div className="rounded-2xl border border-border bg-card p-4">
            <h2 className="mb-3 flex items-center gap-2 text-2xl">
              <CalendarDays className="h-5 w-5 text-bun" /> Pick a date
            </h2>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(d) => d < new Date(Date.now() - 864e5) || d.getDay() === 2}
              className="rounded-lg border border-border"
            />
            <p className="mt-3 text-xs text-muted-foreground">
              Tuesdays are closed. Catering scheduling is separate from regular pickup orders.
            </p>
          </div>

          <form
            className="space-y-4 rounded-2xl border border-border bg-card p-5"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Catering request sent", {
                description: "Demo form — we'll wire this to the kitchen inbox in production.",
              });
            }}
          >
            <h2 className="text-2xl">Request a quote</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="cater-name">Name</Label>
                <Input id="cater-name" required className="h-12" placeholder="Jordan" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cater-email">Email</Label>
                <Input id="cater-email" type="email" required className="h-12" placeholder="you@company.ca" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cater-guests">Guests</Label>
                <Input
                  id="cater-guests"
                  type="number"
                  min={selected.min}
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cater-fulfilment">Pickup or delivery</Label>
                <select
                  id="cater-fulfilment"
                  className="h-12 w-full rounded-md border border-input bg-background px-3 text-sm"
                >
                  <option>Pickup at 147 Baldwin St</option>
                  <option>Delivery (downtown Toronto)</option>
                  <option>On-site flat-top service</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cater-notes">Custom order notes</Label>
              <Textarea
                id="cater-notes"
                rows={4}
                placeholder="Allergies, veggie counts, timing, loading dock details…"
              />
            </div>
            <div className="rounded-lg border border-bun/40 bg-background/60 p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Estimate · {selected.name} {date ? `· ${date.toLocaleDateString("en-CA")}` : ""}
              </p>
              <p className="font-display text-3xl text-bun">{money(estimate)}</p>
            </div>
            <Button type="submit" size="lg" className="h-14 w-full text-base">
              Send catering request
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Or call <a href={PHONE_HREF} className="text-bun">{PHONE}</a> ·{" "}
              <a href={`mailto:${EMAIL}`} className="text-bun">{EMAIL}</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
