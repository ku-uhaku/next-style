"use client";

import { useEffect, useRef } from "react";

import { hero } from "@/lib/content";
import {
  gsap,
  MOTION_OFF,
  MOTION_ON,
  scrollToHref,
  setupGsap,
  SplitText,
} from "@/lib/gsap";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const sunWrap = useRef<HTMLDivElement>(null);
  const sunScroll = useRef<HTMLDivElement>(null);
  const sun = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const lead = useRef<HTMLParagraphElement>(null);
  const actions = useRef<HTMLDivElement>(null);
  const hour = useRef<HTMLParagraphElement>(null);
  const cue = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    setupGsap();

    const mm = gsap.matchMedia();

    mm.add({ motion: MOTION_ON, reduced: MOTION_OFF }, (context) => {
      if (!context.conditions?.motion) return;

      const split = SplitText.create(title.current, {
        type: "lines",
        mask: "lines",
        linesClass: "line",
        autoSplit: true,
        onSplit(self) {
          const tl = gsap.timeline({ defaults: { ease: "ora" } });

          tl.from(sun.current, {
            scale: 0.5,
            yPercent: 30,
            opacity: 0,
            duration: 1.7,
          }, 0)
            .from(self.lines, { yPercent: 118, duration: 1.1, stagger: 0.1 }, 0.3)
            .fromTo(
              hour.current,
              { clipPath: "inset(0 100% 0 0)" },
              { clipPath: "inset(0 0% 0 0)", duration: 1.1 },
              0.75,
            )
            .from(lead.current, { opacity: 0, y: 18, duration: 0.8 }, 0.95)
            .from(
              actions.current?.children ?? [],
              { opacity: 0, y: 14, duration: 0.6, stagger: 0.08 },
              1.05,
            )
            .from(cue.current, { opacity: 0, duration: 0.6 }, 1.35);

          return tl;
        },
      });

      // Handing off to the manifesto: the light grows, the words leave.
      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        })
        .to(sunScroll.current, { yPercent: -20, scale: 1.3, ease: "none" }, 0)
        .to(inner.current, { yPercent: -10, opacity: 0.15, ease: "none" }, 0)
        .to(hour.current, { yPercent: 60, ease: "none" }, 0);

      return () => split.revert();
    }, root.current ?? undefined);

    mm.add(
      "(min-width: 62rem) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      () => {
        const xTo = gsap.quickTo(sunWrap.current, "x", { duration: 0.9, ease: "power3" });
        const yTo = gsap.quickTo(sunWrap.current, "y", { duration: 0.9, ease: "power3" });

        const onMove = (event: PointerEvent) => {
          xTo((event.clientX / window.innerWidth - 0.5) * -52);
          yTo((event.clientY / window.innerHeight - 0.5) * -36);
        };

        window.addEventListener("pointermove", onMove);
        return () => window.removeEventListener("pointermove", onMove);
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section className="hero" id="hero" ref={root} aria-labelledby="hero-title">
      <div className="hero__sunWrap" ref={sunWrap} aria-hidden="true">
        <div className="hero__sunScroll" ref={sunScroll}>
          <div className="hero__sun" ref={sun} />
        </div>
      </div>

      <div className="shell hero__inner" ref={inner}>
        <h1 className="hero__title" id="hero-title" ref={title}>
          {hero.title.join(" ")}
        </h1>

        <div className="hero__foot">
          <div className="hero__copy">
            <p className="lead" ref={lead}>
              {hero.lead}
            </p>
            <div className="hero__actions" ref={actions}>
              <a
                className="btn"
                href="#hours"
                onClick={(event) => scrollToHref(event, "#hours")}
              >
                Find your hour
              </a>
              <a
                className="btn btn--quiet"
                href="#formula"
                onClick={(event) => scrollToHref(event, "#formula")}
              >
                Read the formula
              </a>
            </div>
          </div>

          <p className="hero__hour" ref={hour} aria-hidden="true">
            {hero.hour}
          </p>
        </div>
      </div>

      <p className="hero__cue" ref={cue} aria-hidden="true">
        {hero.cue}
        <i />
      </p>
    </section>
  );
}
