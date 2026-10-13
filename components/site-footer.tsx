"use client";

import { footerLinks } from "@/lib/content";
import { scrollToHref } from "@/lib/gsap";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="shell footer__grid">
        <p className="footer__mark">ORA</p>

        {footerLinks.map((column) => (
          <nav className="footer__col" key={column.heading} aria-label={column.heading}>
            <p className="note">{column.heading}</p>
            {column.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(event) => scrollToHref(event, link.href)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        ))}
      </div>

      <p className="shell footer__fine">
        ORA Atelier. Five formulas, poured in small batches and dated by the hour
        they were made for.
      </p>
    </footer>
  );
}
