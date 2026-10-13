"use client";

import { useEffect, useRef } from "react";

import { manifesto } from "@/lib/content";
import { gsap, MOTION_OFF, MOTION_ON, setupGsap, SplitText } from "@/lib/gsap";

export function Manifesto() {
  const root = useRef<HTMLElement>(null);
  const statement = useRef<HTMLHeadingElement>(null);
  const light = useRef<HTMLDivElement>(null);
  const coda = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    setupGsap();

    const mm = gsap.matchMedia();

    mm.add({ motion: MOTION_ON, reduced: MOTION_OFF }, (context) => {
      const split = SplitText.create(statement.current, {
        type: "words",
        wordsClass: "word",
      });

      if (!context.conditions?.motion) {
        gsap.set(split.words, { opacity: 1 });
        return () => split.revert();
      }

      // The light rises from under the page and lights the sentence as it goes.
      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=170%",
            pin: true,
            scrub: 1,
            // Pins refresh highest-priority first, so page order runs 3, 2, 1.
            // Any other order measures a document missing earlier pin spacing.
            refreshPriority: 3,
          },
        })
        .fromTo(
          light.current,
          { yPercent: 38, scale: 0.6 },
          { yPercent: -16, scale: 1.2, duration: 10 },
          0,
        )
        .to(
          split.words,
          { opacity: 1, duration: 0.8, stagger: { each: 0.22 } },
          0.4,
        )
        .fromTo(
          coda.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1.6 },
          8,
        );

      return () => split.revert();
    }, root.current ?? undefined);

    return () => mm.revert();
  }, []);

  return (
    <section
      className="manifesto"
      id="manifesto"
      ref={root}
      aria-labelledby="manifesto-statement"
    >
      <div className="manifesto__light" ref={light} aria-hidden="true" />
      <div className="manifesto__inner">
        <h2
          className="manifesto__statement"
          id="manifesto-statement"
          ref={statement}
        >
          {manifesto.statement}
        </h2>
        <p className="manifesto__coda" ref={coda}>
          {manifesto.coda}
        </p>
      </div>
    </section>
  );
}
