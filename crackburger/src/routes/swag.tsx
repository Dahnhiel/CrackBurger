import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useCart, money } from "@/lib/cart";
import { swag, swagImages } from "@/lib/menu-data";

export const Route = createFileRoute("/swag")({
  head: () => ({
    meta: [
      { title: "Swag Shop — Crack Burger Shirts & Hats" },
      {
        name: "description",
        content:
          "Crack Burger merch: the black badge-print shirt ($30) and embroidered snapback hat ($25). Pick up on Baldwin St in Toronto.",
      },
      { property: "og:title", content: "Swag Shop — Crack Burger Shirts & Hats" },
      {
        property: "og:description",
        content: "Wear the badge. Shirts $30, hats $25, pickup in Kensington.",
      },
    ],
  }),
  component: SwagPage,
});

function SwagPage() {
  const { add } = useCart();

  return (
    <div className="pb-10">
      <header className="border-b border-border/70 bg-char px-4 py-12 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-bun">Swag</p>
        <h1 className="mt-3 text-5xl sm:text-6xl">Wear the badge</h1>
        <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
          Small drop, no filler. Pick up in store with your next order.
        </p>
      </header>

      <div className="mx-auto grid max-w-4xl gap-6 px-4 py-12 sm:grid-cols-2">
        {swag.map((item) => (
          <article key={item.id} className="overflow-hidden rounded-2xl border border-border bg-card shadow-lift">
            <img
              src={swagImages[item.id]}
              alt={item.name}
              width={768}
              height={768}
              loading="lazy"
              className="aspect-square w-full object-cover"
            />
            <div className="p-5">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                <h2 className="min-w-0 text-2xl">{item.name}</h2>
                <span className="shrink-0 font-display text-2xl text-bun">{money(item.price)}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{item.blurb}</p>
              <Button
                size="lg"
                className="mt-4 h-14 w-full text-base"
                onClick={() => add({ id: item.id, name: item.name, price: item.price })}
              >
                Add to order
              </Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
