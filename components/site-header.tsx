"use client";

import { useEffect, useRef, useState } from "react";

import { nav } from "@/lib/content";
import { gsap, MOTION_ON, ScrollSmoother, ScrollTrigger, setupGsap } from "@/lib/gsap";

const pad = (value: number) => String(value).padStart(2, "0");

/** Scroll position, read back as the hour of the day: 04:00 to 22:00. */
function hourAt(progress: number) {
  const minutes = 4 * 60 + progress * 18 * 60;
  const hour = Math.min(22, Math.floor(minutes / 60));
  const minute = Math.floor((minutes % 60) / 5) * 5;
  return `${pad(hour)}:${pad(minute)}`;
}

export function SiteHeader() {
  const root = useRef<HTMLElement>(null);
  const clock = useRef<HTMLSpanElement>(null);
  const dial = useRef<HTMLSpanElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setupGsap();

    const ctx = gsap.context(() => {
      let shown = "";

      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        refreshPriority: -1,
        onUpdate: (self) => {
          const next = hourAt(self.progress);
          if (clock.current && next !== shown) {
            shown = next;
            clock.current.textContent = next;
          }
          if (dial.current) {
            gsap.set(dial.current, { scaleX: self.progress });
          }
        },
      });

      gsap.matchMedia().add(MOTION_ON, () => {
        gsap.from(root.current, {
          opacity: 0,
          y: -14,
          duration: 0.9,
          delay: 0.6,
          ease: "ora",
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!open) return;

    const ctx = gsap.context(() => {
      gsap.from(".menu__link", {
        opacity: 0,
        y: 24,
        duration: 0.5,
        stagger: 0.06,
        ease: "ora",
      });
    }, menu);

    menu.current?.querySelector<HTMLAnchorElement>(".menu__link")?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      ctx.revert();
    };
  }, [open]);

  const goTo = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();
    setOpen(false);

    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo(target, true, "top top");
    } else {
      target.scrollIntoView({ block: "start" });
    }
  };

  return (
    <>
      <header className="header" ref={root}>
        <a className="header__mark" href="#hero" onClick={(e) => goTo(e, "#hero")}>
          ORA
        </a>

        <nav className="header__nav" aria-label="Sections">
          {nav.map((item) => (
            <a
              key={item.href}
              className="header__link"
              href={item.href}
              onClick={(e) => goTo(e, item.href)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <p className="header__clock">
          <span className="header__dial" aria-hidden="true">
            <span ref={dial} />
          </span>
          <span className="u-hidden">Light of day</span>
          <span ref={clock}>04:00</span>
        </p>

        <button
          className="header__menu"
          type="button"
          ref={menuButton}
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen(true)}
        >
          Menu
        </button>
      </header>

      <div
        className="menu"
        id="site-menu"
        ref={menu}
        hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-label="Sections"
      >
        <button
          className="menu__close"
          type="button"
          onClick={() => {
            setOpen(false);
            menuButton.current?.focus();
          }}
        >
          Close
        </button>
        {nav.map((item) => (
          <a
            key={item.href}
            className="menu__link"
            href={item.href}
            onClick={(e) => goTo(e, item.href)}
          >
            {item.label}
          </a>
        ))}
      </div>
    </>
  );
}
