import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart, money } from "@/lib/cart";
import { giftCardAmounts } from "@/lib/menu-data";

export const Route = createFileRoute("/gift-cards")({
  head: () => ({
    meta: [
      { title: "Gift Cards — Crack Burger Toronto" },
      {
        name: "description",
        content:
          "Buy a Crack Burger gift card in $25, $50, $75 or $100 denominations. Delivered by email, redeemable in store on Baldwin St.",
      },
      { property: "og:title", content: "Gift Cards — Crack Burger Toronto" },
      {
        property: "og:description",
        content: "Give someone the smash. $25 to $100, emailed instantly.",
      },
    ],
  }),
  component: GiftCardsPage,
});

function GiftCardsPage() {
  const [amount, setAmount] = useState<number>(50);
  const { add } = useCart();

  return (
    <div className="pb-10">
      <header className="border-b border-border/70 bg-char px-4 py-12 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-bun">Gift Cards</p>
        <h1 className="mt-3 text-5xl sm:text-6xl">Give the smash</h1>
      </header>

      <div className="mx-auto max-w-xl px-4 py-12">
        <div className="grain relative overflow-hidden rounded-2xl border border-bun/40 bg-ember p-6 text-bun-foreground shadow-ember">
          <Gift className="h-7 w-7" />
          <p className="mt-6 font-display text-4xl uppercase">Crack Burger</p>
          <p className="text-xs font-bold uppercase tracking-[0.3em]">Smashingly addictive</p>
          <p className="mt-6 font-display text-5xl">{money(amount)}</p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {giftCardAmounts.map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={amount === value}
              onClick={() => setAmount(value)}
              className={`h-14 rounded-lg border font-display text-2xl transition-colors ${
                amount === value
                  ? "border-bun bg-bun text-bun-foreground"
                  : "border-border bg-secondary text-muted-foreground"
              }`}
            >
              ${value}
            </button>
          ))}
        </div>

        <form
          className="mt-8 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            add({ id: `gift-${amount}`, name: `Gift Card`, price: amount, note: "Emailed to recipient" });
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="gift-to">Recipient email</Label>
            <Input id="gift-to" type="email" required className="h-12" placeholder="friend@email.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gift-note">Message (optional)</Label>
            <Textarea id="gift-note" rows={3} placeholder="Go get the double." />
          </div>
          <Button type="submit" size="lg" className="h-14 w-full text-base">
            Add {money(amount)} gift card
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Redeemable in store. Never expires.
          </p>
        </form>
      </div>
    </div>
  );
}
