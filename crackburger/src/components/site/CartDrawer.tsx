import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useCart, money } from "@/lib/cart";

export function CartDrawer() {
  const { isOpen, setOpen, lines, subtotal, setQty, remove, clear, count } = useCart();
  const tax = subtotal * 0.13;

  return (
    <Drawer open={isOpen} onOpenChange={setOpen}>
      <DrawerContent className="border-border bg-card text-card-foreground">
        <div className="mx-auto w-full max-w-lg">
          <DrawerHeader className="text-left">
            <DrawerTitle className="text-2xl">Your order</DrawerTitle>
            <DrawerDescription className="text-muted-foreground">
              {count === 0 ? "Nothing in the bag yet." : `${count} item${count > 1 ? "s" : ""} · pickup at 147 Baldwin St`}
            </DrawerDescription>
          </DrawerHeader>

          <div className="max-h-[45vh] space-y-2 overflow-y-auto px-4">
            {lines.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-10 text-center text-muted-foreground">
                <ShoppingBag className="h-8 w-8" />
                <p className="text-sm">Add a smash burger to get started.</p>
              </div>
            ) : (
              lines.map((line) => (
                <div
                  key={line.id}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-border bg-background/60 p-3"
                >
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{line.name}</p>
                    {line.note ? (
                      <p className="truncate text-xs text-muted-foreground">{line.note}</p>
                    ) : null}
                    <p className="text-sm text-bun">{money(line.price * line.qty)}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-10 w-10"
                      aria-label={`Decrease ${line.name}`}
                      onClick={() => setQty(line.id, line.qty - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-6 text-center font-display text-lg">{line.qty}</span>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-10 w-10"
                      aria-label={`Increase ${line.name}`}
                      onClick={() => setQty(line.id, line.qty + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-10 w-10 text-muted-foreground"
                      aria-label={`Remove ${line.name}`}
                      onClick={() => remove(line.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          <DrawerFooter className="gap-3">
            {lines.length > 0 && (
              <div className="space-y-1 rounded-lg border border-border bg-background/60 p-3 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{money(subtotal)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax (13%)</span>
                  <span>{money(tax)}</span>
                </div>
                <div className="flex justify-between pt-1 font-display text-xl">
                  <span>Total</span>
                  <span className="text-bun">{money(subtotal + tax)}</span>
                </div>
              </div>
            )}
            <Button
              size="lg"
              className="h-14 w-full text-base"
              disabled={lines.length === 0}
              onClick={() =>
                toast.success("Demo checkout", {
                  description: "Payments get wired up in the production build.",
                })
              }
            >
              Checkout · {money(subtotal + tax)}
            </Button>
            {lines.length > 0 && (
              <Button variant="ghost" className="text-muted-foreground" onClick={clear}>
                Clear order
              </Button>
            )}
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
