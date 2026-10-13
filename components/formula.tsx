"use client";

import { useEffect, useRef, useState } from "react";

import { formula } from "@/lib/content";
import { gsap, MOTION_OFF, MOTION_ON, setupGsap } from "@/lib/gsap";

export function Formula() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const core = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    setupGsap();

    const mm = gsap.matchMedia();

    mm.add({ motion: MOTION_ON, reduced: MOTION_OFF }, (context) => {
      const rings = gsap.utils.toArray<SVGCircleElement>(".formula__ring", root.current);
      const items = gsap.utils.toArray<HTMLElement>(".formula__layer", list.current);

      if (!context.conditions?.motion) {
        gsap.set(core.current, { "--lens": 1 });
        gsap.set(rings, { drawSVG: "0% 100%" });
        gsap.set(items, { opacity: 1 });
        return;
      }

      // A lens opens over the cross-section while the rings draw themselves.
      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=160%",
            pin: true,
            scrub: 1,
            refreshPriority: 1,
          },
        })
        .fromTo(stage.current, { scale: 0.92 }, { scale: 1, duration: 6 }, 0)
        .fromTo(core.current, { "--lens": 0 }, { "--lens": 1, duration: 6 }, 0)
        .fromTo(
          rings,
          { drawSVG: "50% 50%" },
          { drawSVG: "0% 100%", duration: 2, stagger: 0.45 },
          0,
        )
        .fromTo(items, { opacity: 0.12 }, { opacity: 1, duration: 1, stagger: 0.6 }, 0.8);
    }, root.current ?? undefined);

    return () => mm.revert();
  }, []);

  return (
    <section className="formula" id="formula" ref={root} aria-labelledby="formula-title">
      <div className="shell formula__grid">
        <div className="formula__stage" ref={stage}>
          <div className="formula__core" ref={core}>
            <span className="formula__coreLabel" aria-hidden="true">
              inside
            </span>
          </div>
          <svg className="formula__rings" viewBox="0 0 100 100" aria-hidden="true">
            {formula.layers.map((layer, index) => (
              <circle
                key={layer.name}
                className="formula__ring"
                cx="50"
                cy="50"
                r={46 - index * 8.5}
                data-active={active === index}
              />
            ))}
          </svg>
        </div>

        <div className="formula__text">
          <h2 id="formula-title">{formula.title}</h2>
          <p className="lead">{formula.lead}</p>

          <ul className="formula__layers" ref={list}>
            {formula.layers.map((layer, index) => (
              <li
                className="formula__layer"
                key={layer.name}
                onMouseEnter={() => setActive(index)}
                onMouseLeave={() => setActive(null)}
              >
                <span className="formula__pct">{layer.pct}</span>
                <div>
                  <h3>{layer.name}</h3>
                  <p>{layer.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
