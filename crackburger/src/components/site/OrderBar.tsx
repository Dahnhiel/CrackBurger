import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart, money } from "@/lib/cart";

/** Sticky bottom order bar — persists on scroll, primary mobile action. */
export function OrderBar() {
  const { count, subtotal, setOpen } = useCart();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-char/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-2">
        {count > 0 ? (
          <Button
            size="lg"
            className="h-14 flex-1 justify-between text-base"
            onClick={() => setOpen(true)}
          >
            <span className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              View order ({count})
            </span>
            <span>{money(subtotal)}</span>
          </Button>
        ) : (
          <Button asChild size="lg" className="h-14 flex-1 text-base">
            <Link to="/menu">Order Now</Link>
          </Button>
        )}
        <Button asChild size="lg" variant="secondary" className="h-14 hidden sm:inline-flex">
          <Link to="/catering">Catering</Link>
        </Button>
      </div>
    </div>
  );
}
