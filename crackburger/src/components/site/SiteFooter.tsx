import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo-badge.png";
import { ADDRESS, EMAIL, PHONE, PHONE_HREF } from "@/lib/hours";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-char pb-28 pt-12">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:grid-cols-3">
        <div>
          <img
            src={logo}
            alt="Crack Burger badge logo"
            width={816}
            height={816}
            loading="lazy"
            className="h-16 w-16"
          />
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Smashingly addictive since 2024. Fresh beef, hot flat-top, house sauce.
          </p>
        </div>
        <nav className="text-sm">
          <h3 className="mb-3 text-base text-bun">Order</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/menu" className="hover:text-foreground">Menu</Link></li>
            <li><Link to="/catering" className="hover:text-foreground">Catering</Link></li>
            <li><Link to="/swag" className="hover:text-foreground">Swag</Link></li>
            <li><Link to="/gift-cards" className="hover:text-foreground">Gift Cards</Link></li>
            <li><Link to="/info" className="hover:text-foreground">Hours & Location</Link></li>
          </ul>
        </nav>
        <div className="text-sm text-muted-foreground">
          <h3 className="mb-3 text-base text-bun">Find us</h3>
          <address className="not-italic leading-relaxed">
            {ADDRESS}
            <br />
            <a href={PHONE_HREF} className="hover:text-foreground">{PHONE}</a>
            <br />
            <a href={`mailto:${EMAIL}`} className="hover:text-foreground">{EMAIL}</a>
          </address>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl px-4 text-xs text-muted-foreground">
        © {new Date().getFullYear()} Crack Burger Toronto. Demo site.
      </p>
    </footer>
  );
}
