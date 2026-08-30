import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BurgerHeroStack } from "@/components/site/BurgerHero";
import { Reviews } from "@/components/site/Reviews";
import { burgers, BACKSTORY_PARAGRAPHS } from "@/lib/menu-data";
import { money } from "@/lib/cart";
import { ADDRESS, MAP_LINK, getOpenStatus } from "@/lib/hours";
import heroFallback from "@/assets/hero-fallback.jpg";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  component: Index,
});

/** Lightweight scroll-linked parallax for the backstory band. Disabled for
 * users who prefer reduced motion — the background stays static instead. */
function useParallax<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const progress = (vh - rect.top) / (vh + rect.height);
      setOffset((Math.min(Math.max(progress, 0), 1) - 0.5) * 60);
    };
    const onScroll = () => {
      window.cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return { ref, offset };
}

function Hero() {
  return (
    <section className="grain relative overflow-hidden border-b border-border/70 bg-char-fade px-4 py-14 sm:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="text-center lg:text-left">
          <p className="text-xs uppercase tracking-[0.3em] text-bun">
            Est. 2024 · Baldwin St, Toronto
          </p>
          <h1 className="mt-4 text-5xl sm:text-6xl lg:text-7xl">
            Smashingly
            <br />
            Addictive
          </h1>
          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-muted-foreground lg:mx-0">
            Fresh beef pressed hard onto a hot flat-top, lacy crispy edges, house crack sauce, and a
            toasted brioche bun. Built to order, every single time.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Button asChild size="lg" className="h-14 px-8 text-base shadow-ember">
              <Link to="/menu">Order Now</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="h-14 px-8 text-base">
              <Link to="/catering">Book Catering</Link>
            </Button>
          </div>
        </div>
        <BurgerHeroStack />
      </div>
    </section>
  );
}

function Backstory() {
  const { ref, offset } = useParallax<HTMLDivElement>();

  return (
    <section ref={ref} className="relative overflow-hidden py-24 sm:py-32">
      <div
        className="absolute inset-0 -z-10 scale-110 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroFallback})`,
          transform: `translate3d(0, ${offset}px, 0)`,
        }}
      />
      <div className="absolute inset-0 -z-10 bg-char/80" />
      <div className="mx-auto max-w-2xl px-4 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-bun">Our story</p>
        <blockquote className="mt-4 text-2xl leading-snug text-cream sm:text-3xl">
          "{BACKSTORY_PARAGRAPHS[0]}"
        </blockquote>
        <Button asChild variant="secondary" size="lg" className="mt-8 h-12">
          <Link to="/info">Learn more about us</Link>
        </Button>
      </div>
    </section>
  );
}

function MenuTeaser() {
  const featured = burgers.slice(0, 3);

  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.3em] text-bun">Fan favourites</p>
          <h2 className="mt-2 text-3xl sm:text-4xl">Off the Flat-Top</h2>
        </div>
        <Button asChild variant="ghost" className="hidden shrink-0 text-bun sm:inline-flex">
          <Link to="/menu">See full menu →</Link>
        </Button>
      </div>
      <div className="grid gap-5 sm:grid-cols-3">
        {featured.map((burger) => (
          <Link
            key={burger.id}
            to="/menu"
            className="group overflow-hidden rounded-2xl border border-border bg-card shadow-lift transition-transform hover:-translate-y-1"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={burger.image}
                alt={burger.name}
                width={768}
                height={480}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {burger.tags?.[0] && (
                <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-foreground">
                  {burger.tags[0]}
                </span>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-xl">{burger.name}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{burger.blurb}</p>
              <p className="mt-2 text-sm text-bun">From {money(burger.prices.single)}</p>
            </div>
          </Link>
        ))}
      </div>
      <Button asChild variant="secondary" size="lg" className="mt-6 h-12 w-full sm:hidden">
        <Link to="/menu">See full menu</Link>
      </Button>
    </section>
  );
}

function LocationPreview() {
  const status = getOpenStatus();

  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="grid gap-0 sm:grid-cols-2">
          <div className="p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-bun">Find us</p>
            <h2 className="mt-2 text-3xl">On Baldwin St</h2>
            <div className="mt-5 space-y-3 text-sm text-muted-foreground">
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-bun" />
                {ADDRESS}
              </p>
              <p className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0 text-bun" />
                <span className={status.open ? "text-bun" : "text-muted-foreground"}>
                  {status.label}
                </span>
                <span>· {status.detail}</span>
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-12">
                <a href={MAP_LINK} target="_blank" rel="noreferrer">
                  Get directions
                </a>
              </Button>
              <Button asChild variant="secondary" size="lg" className="h-12">
                <Link to="/info">Hours & contact</Link>
              </Button>
            </div>
          </div>
          <div className="min-h-[240px] border-t border-border sm:border-l sm:border-t-0">
            <iframe
              title="Map of Crack Burger at 147 Baldwin St, Toronto"
              src="https://www.google.com/maps?q=147+Baldwin+St,+Toronto,+ON+M5T+1L9&output=embed"
              loading="lazy"
              className="h-full min-h-[240px] w-full"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <div>
      <Hero />
      <Backstory />
      <MenuTeaser />
      <Reviews />
      <LocationPreview />
    </div>
  );
}
