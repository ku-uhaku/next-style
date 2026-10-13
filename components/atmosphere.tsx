"use client";

import { useEffect, useRef } from "react";

import { MOODS, type Mood } from "@/lib/content";
import { gsap, MOTION_OFF, MOTION_ON, ScrollTrigger, setupGsap } from "@/lib/gsap";

/** The day, told as light: each section sets the lamp it is lit by. */
const SECTION_MOOD: { id: string; mood: Mood }[] = [
  { id: "#hero", mood: "predawn" },
  { id: "#manifesto", mood: "night" },
  { id: "#formula", mood: "midday" },
  { id: "#ritual", mood: "dusk" },
  { id: "#testament", mood: "night" },
  { id: "#join", mood: "night" },
];

export function Atmosphere() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setupGsap();

    const mm = gsap.matchMedia();

    mm.add(
      { motion: MOTION_ON, reduced: MOTION_OFF },
      (context) => {
        const motion = context.conditions?.motion ?? false;
        const duration = motion ? 1.4 : 0.01;

        const fields = gsap.utils.toArray<HTMLElement>(".atmosphere__field");
        const byMood = new Map<string, HTMLElement>(
          fields.map((field) => [field.dataset.mood ?? "", field]),
        );

        let lit: Mood = "predawn";

        const light = (mood: Mood) => {
          if (mood === lit) return;
          lit = mood;
          MOODS.forEach((name) => {
            const layer = byMood.get(name);
            if (!layer) return;
            gsap.to(layer, {
              opacity: name === mood ? 1 : 0,
              duration,
              ease: "oraSoft",
              overwrite: "auto",
            });
          });
        };

        SECTION_MOOD.forEach(({ id, mood }) => {
          const trigger = document.querySelector(id);
          if (!trigger) return;
          ScrollTrigger.create({
            trigger,
            start: "top 65%",
            end: "bottom 35%",
            refreshPriority: -1,
            onEnter: () => light(mood),
            onEnterBack: () => light(mood),
          });
        });

        // The hours section carries the whole day: five panels, five lamps.
        const hours = document.querySelector("#hours");
        if (hours) {
          ScrollTrigger.create({
            trigger: hours,
            start: "top 80%",
            end: "bottom 20%",
            refreshPriority: -1,
            onUpdate: (self) => {
              light(MOODS[Math.round(self.progress * (MOODS.length - 1))]);
            },
          });
        }

        if (!motion) return;

        gsap.to(".atmosphere__bloom", {
          keyframes: [
            { xPercent: -16, yPercent: 20, scale: 0.85, duration: 1 },
            { xPercent: 12, yPercent: -22, scale: 1.2, duration: 1 },
            { xPercent: -4, yPercent: 16, scale: 0.95, duration: 1 },
          ],
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.2,
            refreshPriority: -1,
          },
        });
      },
      root.current ?? undefined,
    );

    return () => mm.revert();
  }, []);

  return (
    <div className="atmosphere" ref={root} aria-hidden="true">
      {MOODS.map((mood) => (
        <div key={mood} className="atmosphere__field" data-mood={mood} />
      ))}
      <div className="atmosphere__bloom" />
      <div className="atmosphere__grain" />
    </div>
  );
}
