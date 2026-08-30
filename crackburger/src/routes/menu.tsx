import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart, money } from "@/lib/cart";
import {
  burgers,
  combos,
  categoryImages,
  desserts,
  dips,
  drinks,
  menuSections,
  shakes,
  sides,
  swag,
  swagImages,
  type SimpleItem,
  type Tier,
} from "@/lib/menu-data";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu & Online Order — Crack Burger Toronto" },
      {
        name: "description",
        content:
          "Order Crack Burger smash burgers, combos, loaded fries, dips, shakes and desserts for pickup on Baldwin St in Toronto.",
      },
      { property: "og:title", content: "Menu & Online Order — Crack Burger Toronto" },
      {
        property: "og:description",
        content: "Smash burgers, combos and shakes. Single or double, built to order.",
      },
    ],
  }),
  component: MenuPage,
});

function useActiveSection() {
  const [active, setActive] = useState(menuSections[0]!.id);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-140px 0px -60% 0px", threshold: 0 },
    );
    menuSections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active;
}

function BurgerCard({ burger }: { burger: (typeof burgers)[number] }) {
  const [tier, setTier] = useState<Tier>("single");
  const [expanded, setExpanded] = useState(false);
  const { add } = useCart();
  const price = burger.prices[tier];

  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-lift">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={burger.image}
          alt={burger.name}
          width={768}
          height={768}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        {burger.tags?.[0] && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-foreground">
            {burger.tags[0]}
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
          <h3 className="min-w-0 truncate text-2xl">{burger.name}</h3>
          <span className="shrink-0 font-display text-2xl text-bun">{money(price)}</span>
        </div>

        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="mt-2 flex items-center gap-1 text-sm font-semibold uppercase tracking-wide text-muted-foreground"
        >
          Details
          <ChevronDown
            className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}
          />
        </button>
        {expanded && (
          <p className="mt-2 text-sm leading-relaxed text-foreground/80">{burger.blurb}</p>
        )}

        <div className="mt-4 flex gap-2" role="group" aria-label={`${burger.name} size`}>
          {(["single", "double"] as Tier[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTier(t)}
              aria-pressed={tier === t}
              className={`h-12 flex-1 rounded-lg border text-sm font-bold uppercase tracking-wide transition-colors ${
                tier === t
                  ? "border-bun bg-bun text-bun-foreground"
                  : "border-border bg-secondary text-muted-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <Button
          size="lg"
          className="mt-3 h-14 w-full text-base"
          onClick={() =>
            add({
              id: `${burger.id}-${tier}`,
              name: burger.name,
              price,
              note: tier === "double" ? "Double patty" : "Single patty",
            })
          }
        >
          Add · {money(price)}
        </Button>
      </div>
    </article>
  );
}

function SecondaryList({
  items,
  image,
  label,
}: {
  items: SimpleItem[];
  image: string;
  label: string;
}) {
  const { add } = useCart();
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border bg-card/70 p-3"
        >
          <img
            src={image}
            alt={`${label}: ${item.name}`}
            width={768}
            height={768}
            loading="lazy"
            className="h-14 w-14 shrink-0 rounded-lg object-cover"
          />
          <div className="min-w-0">
            <p className="truncate font-semibold">{item.name}</p>
            {item.blurb ? (
              <p className="truncate text-xs text-muted-foreground">{item.blurb}</p>
            ) : null}
            <p className="text-sm text-bun">{money(item.price)}</p>
          </div>
          <Button
            size="icon"
            variant="secondary"
            className="h-12 w-12 shrink-0"
            aria-label={`Add ${item.name}`}
            onClick={() => add({ id: item.id, name: item.name, price: item.price })}
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      ))}
    </div>
  );
}

function SectionHeading({ id, title, sub }: { id: string; title: string; sub?: string }) {
  return (
    <div className="mb-4 scroll-mt-36" id={id}>
      <h2 className="text-3xl sm:text-4xl">{title}</h2>
      {sub ? <p className="mt-1 text-sm text-muted-foreground">{sub}</p> : null}
    </div>
  );
}

function MenuPage() {
  const active = useActiveSection();
  const { add } = useCart();

  return (
    <div className="pb-10">
      <div className="border-b border-border/70 bg-char px-4 py-10 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-bun">Pickup · 147 Baldwin St</p>
        <h1 className="mt-3 text-5xl sm:text-6xl">Build your order</h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
          Five real decisions, not fifty listings. Toggle single or double inside the card.
        </p>
      </div>

      {/* Sticky category nav */}
      <nav
        aria-label="Menu categories"
        className="sticky top-[68px] z-30 border-b border-border/70 bg-background/95 backdrop-blur-md"
      >
        <div className="scrollbar-none mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3">
          {menuSections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`flex h-11 shrink-0 items-center rounded-full border px-4 text-sm font-bold uppercase tracking-wide transition-colors ${
                active === s.id
                  ? "border-bun bg-bun text-bun-foreground"
                  : "border-border bg-secondary text-muted-foreground"
              }`}
            >
              {s.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="mx-auto max-w-6xl space-y-14 px-4 py-10">
        <section>
          <SectionHeading
            id="smash-burgers"
            title="Smash Burgers"
            sub="Fresh beef pressed onto a hot flat-top. Single or double."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {burgers.map((b) => (
              <BurgerCard key={b.id} burger={b} />
            ))}
          </div>
        </section>

        <section>
          <SectionHeading
            id="combos"
            title="Combos"
            sub="Burger + side + drink, bundled. No duplicate listings."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {combos.map((combo) => (
              <article
                key={combo.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-bun/40 bg-card shadow-ember"
              >
                <div className="relative aspect-[16/10]">
                  <img
                    src={combo.image}
                    alt={combo.name}
                    width={768}
                    height={768}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute right-3 top-3 rounded-full bg-bun px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-bun-foreground">
                    Save {money(combo.saves)}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                    <h3 className="min-w-0 text-2xl">{combo.name}</h3>
                    <span className="shrink-0 font-display text-2xl text-bun">
                      {money(combo.price)}
                    </span>
                  </div>
                  <ul className="mt-3 flex-1 space-y-1 text-sm text-muted-foreground">
                    {combo.includes.map((line) => (
                      <li key={line}>· {line}</li>
                    ))}
                  </ul>
                  <Button
                    size="lg"
                    className="mt-4 h-14 w-full text-base"
                    onClick={() =>
                      add({ id: combo.id, name: combo.name, price: combo.price, note: "Combo" })
                    }
                  >
                    Add combo · {money(combo.price)}
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section>
          <SectionHeading id="sides" title="Sides" />
          <SecondaryList items={sides} image={categoryImages.sides} label="Side" />
        </section>

        <section>
          <SectionHeading id="dips" title="Dips" sub="$1 each." />
          <SecondaryList items={dips} image={categoryImages.dips} label="Dip" />
        </section>

        <section>
          <SectionHeading id="desserts" title="Desserts" />
          <SecondaryList items={desserts} image={categoryImages.desserts} label="Dessert" />
        </section>

        <section>
          <SectionHeading id="shakes" title="Shakes" />
          <SecondaryList items={shakes} image={categoryImages.shakes} label="Shake" />
        </section>

        <section>
          <SectionHeading id="drinks" title="Drinks" />
          <SecondaryList items={drinks} image={categoryImages.drinks} label="Drink" />
        </section>

        <section>
          <SectionHeading id="swag" title="Swag" sub="Full shop lives on the Swag page." />
          <div className="grid gap-3 sm:grid-cols-2">
            {swag.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border bg-card/70 p-3"
              >
                <img
                  src={swagImages[item.id]}
                  alt={item.name}
                  width={768}
                  height={768}
                  loading="lazy"
                  className="h-14 w-14 shrink-0 rounded-lg object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate font-semibold">{item.name}</p>
                  <p className="text-sm text-bun">{money(item.price)}</p>
                </div>
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-12 w-12 shrink-0"
                  aria-label={`Add ${item.name}`}
                  onClick={() => add({ id: item.id, name: item.name, price: item.price })}
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
