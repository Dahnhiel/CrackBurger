import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import logo from "@/assets/logo-badge.png";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { getOpenStatus } from "@/lib/hours";

const NAV = [
  { to: "/menu", label: "Menu" },
  { to: "/catering", label: "Catering" },
  { to: "/swag", label: "Swag" },
  { to: "/gift-cards", label: "Gift Cards" },
  { to: "/info", label: "Info" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { count, setOpen: setCartOpen } = useCart();
  const status = getOpenStatus();

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-char/90 backdrop-blur-md">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3">
        <Link to="/" className="flex min-w-0 items-center gap-3" aria-label="Crack Burger home">
          <img
            src={logo}
            alt="Crack Burger — Est. 2024 — Smashingly Addictive"
            width={816}
            height={816}
            className="h-11 w-11 shrink-0"
          />
          <span className="min-w-0">
            <span className="block truncate font-display text-lg leading-none">Crack Burger</span>
            <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-muted-foreground">
              <span
                className={`h-1.5 w-1.5 shrink-0 rounded-full ${status.open ? "bg-bun" : "bg-muted-foreground"}`}
              />
              {status.label}
            </span>
          </span>
        </Link>

        <div className="flex shrink-0 items-center gap-2">
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-md px-3 py-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                activeProps={{ className: "text-bun" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Button
            variant="secondary"
            size="icon"
            className="relative h-11 w-11"
            aria-label="Open order bag"
            onClick={() => setCartOpen(true)}
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[11px] font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="h-11 w-11 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border/70 bg-char px-4 pb-4 lg:hidden">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="flex min-h-14 items-center border-b border-border/50 font-display text-xl text-foreground"
              activeProps={{ className: "text-bun" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
