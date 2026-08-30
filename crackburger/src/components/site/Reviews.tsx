import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const REVIEWS = [
  {
    name: "Ally Marino",
    rating: 5,
    text: "Best burger in Toronto, hands down. The smash patties have those crispy lacy edges and the sauce is unreal. I've already been back three times.",
  },
  {
    name: "Kyle",
    rating: 5,
    text: "Small spot on Baldwin with big flavour. Fast, friendly and the fries are seasoned perfectly. Exactly what a burger joint should be.",
  },
  {
    name: "Rouben Tchakhmakhtchian",
    rating: 5,
    text: "Smashingly addictive is right. Got the double with bacon and finished it standing on the sidewalk because I couldn't wait.",
  },
];

export function Reviews() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.3em] text-bun">Google reviews</p>
          <h2 className="mt-2 text-3xl sm:text-4xl">Word on Baldwin St</h2>
        </div>
      </div>
      <Carousel opts={{ align: "start" }}>
        <CarouselContent>
          {REVIEWS.map((review) => (
            <CarouselItem key={review.name} className="basis-[85%] sm:basis-1/2 lg:basis-1/3">
              <figure className="flex h-full flex-col justify-between gap-4 rounded-xl border border-border bg-card p-5 shadow-lift">
                <div className="flex gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-bun text-bun" />
                  ))}
                </div>
                <blockquote className="text-sm leading-relaxed text-foreground/90">
                  “{review.text}”
                </blockquote>
                <figcaption className="font-display text-lg text-bun">{review.name}</figcaption>
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-5 flex gap-2">
          <CarouselPrevious className="static translate-y-0 h-11 w-11" />
          <CarouselNext className="static translate-y-0 h-11 w-11" />
        </div>
      </Carousel>
    </section>
  );
}
