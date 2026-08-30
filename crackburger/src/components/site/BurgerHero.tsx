import { useEffect, useState } from "react";
import bunTop from "@/assets/layer-bun-top.png";
import toppings from "@/assets/layer-toppings.png";
import cheese from "@/assets/layer-cheese.png";
import patty from "@/assets/layer-patty.png";
import bunBottom from "@/assets/layer-bun-bottom.png";
import heroFallback from "@/assets/hero-fallback.jpg";

type Capability = "unknown" | "rich" | "lite";

/**
 * Performance-capability detection (not a screen-size cutoff): reduced-motion
 * preference, CPU cores, device memory and save-data all downgrade the
 * animated build sequence to a static hero render.
 */
function detectCapability(): Capability {
  if (typeof window === "undefined") return "unknown";
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean; effectiveType?: string };
  };
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "lite";
  if (nav.connection?.saveData) return "lite";
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory < 3) return "lite";
  if (typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 3) return "lite";
  if (nav.connection?.effectiveType && /2g/.test(nav.connection.effectiveType)) return "lite";
  return "rich";
}

const LAYERS = [
  { src: bunBottom, alt: "", w: "78%", lift: 0, delay: 0.05, smash: false },
  { src: patty, alt: "", w: "84%", lift: 26, delay: 0.5, smash: true },
  { src: cheese, alt: "", w: "72%", lift: 52, delay: 1.0, smash: false },
  { src: toppings, alt: "", w: "88%", lift: 74, delay: 1.4, smash: false },
  { src: bunTop, alt: "", w: "84%", lift: 112, delay: 1.85, smash: false },
];

export function BurgerHeroStack() {
  const [capability, setCapability] = useState<Capability>("unknown");
  const [built, setBuilt] = useState(false);

  useEffect(() => {
    const mode = detectCapability();
    // Defer the animated stack until after first paint so it never blocks load.
    const start = () => setCapability(mode);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(start, { timeout: 900 });
      return () => window.cancelIdleCallback?.(id);
    }
    const t = window.setTimeout(start, 250);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (capability !== "rich") return;
    const t = window.setTimeout(() => setBuilt(true), 2600);
    return () => window.clearTimeout(t);
  }, [capability]);

  if (capability !== "rich") {
    return (
      <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-full border border-border/60">
        <img
          src={heroFallback}
          alt="Crack Burger double smash cheeseburger in a hot cast iron pan"
          width={1536}
          height={1024}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className="relative mx-auto w-full max-w-md select-none"
      style={{ perspective: "1100px" }}
      aria-hidden="true"
    >
      <div className="absolute left-1/2 top-[62%] h-40 w-4/5 -translate-x-1/2 rounded-[50%] bg-primary/25 blur-3xl" />
      <div
        className="relative aspect-square"
        style={{
          transformStyle: "preserve-3d",
          animation: built ? "stack-idle 9s ease-in-out infinite" : undefined,
          transform: "rotateX(58deg)",
        }}
      >
        {LAYERS.map((layer, i) => (
          <img
            key={i}
            src={layer.src}
            alt={layer.alt}
            width={1024}
            height={512}
            className="absolute left-1/2 drop-shadow-[0_18px_24px_rgba(0,0,0,0.55)]"
            style={{
              width: layer.w,
              bottom: `${20 + layer.lift * 0.42}%`,
              transform: "translate3d(-50%, 0, 0)",
              opacity: 0,
              zIndex: i + 1,
              animation: `${layer.smash ? "layer-smash" : "layer-drop"} ${
                layer.smash ? 0.75 : 0.6
              }s cubic-bezier(0.2, 0.9, 0.25, 1) ${layer.delay}s forwards`,
            }}
          />
        ))}
        <span
          className="absolute left-1/2 top-[58%] h-24 w-24 rounded-full border-2 border-bun/70"
          style={{ animation: "smash-ring 0.7s ease-out 0.95s forwards", opacity: 0 }}
        />
      </div>
    </div>
  );
}
