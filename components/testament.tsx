"use client";

import { useEffect, useRef } from "react";

import { testament } from "@/lib/content";
import { gsap, MOTION_ON, setupGsap } from "@/lib/gsap";

export function Testament() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    setupGsap();

    const mm = gsap.matchMedia();

    mm.add(
      MOTION_ON,
      () => {
        gsap.fromTo(
          ".testament__quote .mask > span",
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 1,
            stagger: 0.1,
            ease: "ora",
            scrollTrigger: { trigger: root.current, start: "top 72%" },
          },
        );

        gsap.fromTo(
          ".testament figcaption",
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            delay: 0.55,
            scrollTrigger: { trigger: root.current, start: "top 72%" },
          },
        );
      },
      root.current ?? undefined,
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      className="testament stage"
      id="testament"
      ref={root}
      aria-labelledby="testament-title"
    >
      <h2 className="u-hidden" id="testament-title">
        Why the hours matter
      </h2>
      <figure className="shell">
        <blockquote>
          <p className="testament__quote">
            {testament.quote.map((line) => (
              <span className="mask" key={line}>
                <span>{line}</span>
              </span>
            ))}
          </p>
        </blockquote>
        <figcaption>{testament.attribution}</figcaption>
      </figure>
    </section>
  );
}
