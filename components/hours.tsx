"use client";

import { useEffect, useRef } from "react";

import { hours } from "@/lib/content";
import { gsap, MOTION_ON, setupGsap, WIDE } from "@/lib/gsap";

const HORIZONTAL = `${WIDE} and ${MOTION_ON}`;
const STACKED = `(max-width: 61.999rem) and ${MOTION_ON}`;

export function Hours() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setupGsap();

    const mm = gsap.matchMedia();

    // A day passing sideways: vertical scroll drives the track, and each
    // panel is lit as it crosses the middle of the screen.
    mm.add(
      HORIZONTAL,
      () => {
        if (!track.current || !rail.current) return;

        const panels = gsap.utils.toArray<HTMLElement>(".hours__panel", track.current);
        const bars = gsap.utils.toArray<HTMLElement>("i", rail.current);
        const distance = () => (track.current?.scrollWidth ?? 0) - window.innerWidth;

        let lit = -1;

        const drive = gsap.to(track.current, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: 2,
            onUpdate: (self) => {
              const index = Math.round(self.progress * (panels.length - 1));
              if (index === lit) return;
              lit = index;
              bars.forEach((bar, i) => {
                bar.dataset.lit = String(i === index);
              });
            },
          },
        });

        panels.forEach((panel) => {
          gsap
            .timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                containerAnimation: drive,
                trigger: panel,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            })
            .fromTo(
              panel.querySelector(".hours__glow"),
              { scale: 0.55, opacity: 0.2 },
              { scale: 1, opacity: 1, duration: 1 },
              0,
            )
            .to(panel.querySelector(".hours__glow"), { scale: 0.6, opacity: 0.2, duration: 1 }, 1)
            .fromTo(
              panel.querySelector(".hours__object"),
              { scale: 0.88, yPercent: 10 },
              { scale: 1, yPercent: 0, duration: 1 },
              0,
            )
            .to(
              panel.querySelector(".hours__object"),
              { scale: 0.9, yPercent: -8, duration: 1 },
              1,
            )
            .fromTo(
              panel.querySelector(".hours__text"),
              { opacity: 0.22 },
              { opacity: 1, duration: 1 },
              0,
            )
            .to(panel.querySelector(".hours__text"), { opacity: 0.28, duration: 1 }, 1)
            .fromTo(
              panel.querySelector(".hours__hour"),
              { clipPath: "inset(0 0 100% 0)" },
              { clipPath: "inset(0 0 0% 0)", duration: 0.55 },
              0.2,
            );
        });
      },
      root.current ?? undefined,
    );

    // Narrow screens read the day as a column, lit panel by panel.
    mm.add(
      STACKED,
      () => {
        if (!track.current) return;

        gsap.utils
          .toArray<HTMLElement>(".hours__panel", track.current)
          .forEach((panel) => {
            gsap
              .timeline({
                defaults: { ease: "none" },
                scrollTrigger: {
                  trigger: panel,
                  start: "top 85%",
                  end: "bottom 40%",
                  scrub: true,
                },
              })
              .fromTo(
                panel.querySelector(".hours__glow"),
                { scale: 0.6, opacity: 0.3 },
                { scale: 1, opacity: 1, duration: 1 },
                0,
              )
              .fromTo(
                panel.querySelector(".hours__object"),
                { scale: 0.92 },
                { scale: 1, duration: 1 },
                0,
              )
              .fromTo(
                panel.querySelector(".hours__hour"),
                { clipPath: "inset(0 0 100% 0)" },
                { clipPath: "inset(0 0 0% 0)", duration: 0.35 },
                0,
              );
          });
      },
      root.current ?? undefined,
    );

    return () => mm.revert();
  }, []);

  return (
    <section className="hours" id="hours" ref={root} aria-labelledby="hours-title">
      <div className="hours__head">
        <h2 className="hours__title" id="hours-title">
          Five hours, five formulas
        </h2>
        <p className="note">Keep scrolling to move through the day</p>
      </div>

      <div className="hours__viewport">
        <div className="hours__track" ref={track}>
          {hours.map((hour) => (
            <article
              className="hours__panel"
              key={hour.time}
              style={{ "--tint": hour.tint } as React.CSSProperties}
            >
              <div className="hours__glow" aria-hidden="true" />

              <div className="hours__text">
                <p className="hours__hour">{hour.time}</p>
                <h3 className="hours__name">{hour.name}</h3>
                <p className="note">{hour.kind}</p>
                <p className="body">{hour.blurb}</p>
                <p className="hours__spec">
                  <span>
                    Size<b>{hour.size}</b>
                  </span>
                  <span>
                    Price<b>{hour.price}</b>
                  </span>
                </p>
              </div>

              <div className="hours__object" aria-hidden="true">
                <div className="vessel">
                  <span className="vessel__cast" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="hours__rail" ref={rail} aria-hidden="true">
        {hours.map((hour, index) => (
          <i key={hour.time} data-lit={index === 0} />
        ))}
      </div>
    </section>
  );
}
