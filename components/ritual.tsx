"use client";

import { useEffect, useRef, useState } from "react";

import { ritual } from "@/lib/content";
import { gsap, MOTION_OFF, setupGsap } from "@/lib/gsap";

const SPREAD = 70;
const START = -140;

/** Where each hour sits on the sun's arc, measured from twelve o'clock. */
const angleOf = (index: number) => START + index * SPREAD;

function markPosition(index: number) {
  const radians = (angleOf(index) * Math.PI) / 180;
  return {
    left: `${50 + Math.sin(radians) * 38}%`,
    top: `${50 - Math.cos(radians) * 38}%`,
  };
}

export function Ritual() {
  const root = useRef<HTMLElement>(null);
  const light = useRef<HTMLDivElement>(null);
  const panels = useRef<HTMLDivElement>(null);
  const marks = useRef<(HTMLButtonElement | null)[]>([]);
  const settled = useRef(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    setupGsap();

    const angle = angleOf(active);
    const reduced = window.matchMedia(MOTION_OFF).matches;

    // First paint, or no appetite for motion: just put the light in place.
    if (!settled.current || reduced) {
      settled.current = true;
      gsap.set(light.current, { rotation: angle });
      return;
    }

    const lines = panels.current?.querySelectorAll<HTMLElement>(
      '[data-active="true"] .mask > span',
    );

    const spin = gsap.to(light.current, {
      rotation: angle,
      duration: 0.9,
      ease: "ora",
      overwrite: "auto",
    });

    const dip = gsap.fromTo(
      light.current,
      { opacity: 0.45 },
      { opacity: 1, duration: 0.7, ease: "ora", overwrite: false },
    );

    const reveal = lines?.length
      ? gsap.fromTo(
          lines,
          { yPercent: 110 },
          { yPercent: 0, duration: 0.65, stagger: 0.07, ease: "ora" },
        )
      : null;

    // kill(), not revert() — the new light position has to stay put.
    return () => {
      spin.kill();
      dip.kill();
      reveal?.kill();
    };
  }, [active]);

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    const last = ritual.steps.length - 1;
    let next = index;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = index === last ? 0 : index + 1;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = index === 0 ? last : index - 1;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = last;
    } else {
      return;
    }

    event.preventDefault();
    setActive(next);
    marks.current[next]?.focus();
  };

  return (
    <section className="ritual stage" id="ritual" ref={root} aria-labelledby="ritual-title">
      <div className="shell">
        <h2 id="ritual-title">{ritual.title}</h2>
        <p className="lead">{ritual.lead}</p>

        <div className="ritual__grid">
          <div
            className="dial"
            style={{ "--tint": ritual.steps[active].tint } as React.CSSProperties}
          >
            <div className="dial__light" ref={light} aria-hidden="true" />
            <div className="dial__face" aria-hidden="true" />

            <div className="dial__marks" role="radiogroup" aria-label="Hour of the day">
              {ritual.steps.map((step, index) => (
                <button
                  key={step.time}
                  className="dial__mark"
                  type="button"
                  role="radio"
                  aria-checked={index === active}
                  tabIndex={index === active ? 0 : -1}
                  style={markPosition(index)}
                  ref={(node) => {
                    marks.current[index] = node;
                  }}
                  onClick={() => setActive(index)}
                  onKeyDown={(event) => onKeyDown(event, index)}
                >
                  {step.time}
                </button>
              ))}
            </div>

            <p className="dial__hub">
              <b>{ritual.steps[active].time}</b>
            </p>
          </div>

          <div className="ritual__panels" ref={panels}>
            {ritual.steps.map((step, index) => (
              <div
                className="ritual__panel"
                key={step.time}
                data-active={index === active}
              >
                <h3 className="ritual__step mask">
                  <span>{step.title}</span>
                </h3>
                <ol className="ritual__how">
                  {step.steps.map((line, number) => (
                    <li key={line}>
                      <span className="ritual__n">{number + 1}</span>
                      <p className="mask">
                        <span>{line}</span>
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
