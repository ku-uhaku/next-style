"use client";

import { useEffect, useRef, useState } from "react";

import { closing } from "@/lib/content";
import { gsap, MOTION_ON, setupGsap } from "@/lib/gsap";

type Tone = "idle" | "error" | "done";

export function Closing() {
  const root = useRef<HTMLElement>(null);
  const setting = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const [email, setEmail] = useState("");
  const [tone, setTone] = useState<Tone>("idle");

  useEffect(() => {
    setupGsap();

    const mm = gsap.matchMedia();

    mm.add(
      MOTION_ON,
      () => {
        gsap.fromTo(
          setting.current,
          { yPercent: -8, scale: 1.08 },
          {
            yPercent: 64,
            scale: 0.78,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "bottom bottom",
              scrub: 1,
            },
          },
        );

        gsap.fromTo(
          title.current,
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 1.2,
            ease: "ora",
            scrollTrigger: { trigger: root.current, start: "top 65%" },
          },
        );
      },
      root.current ?? undefined,
    );

    return () => mm.revert();
  }, []);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setTone(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()) ? "done" : "error");
  };

  const message =
    tone === "done" ? closing.success : tone === "error" ? closing.error : "";

  return (
    <section className="closing" id="join" ref={root} aria-labelledby="join-title">
      <div className="closing__sky" aria-hidden="true">
        <div className="closing__setting" ref={setting} />
      </div>
      <div className="closing__horizon" aria-hidden="true" />

      <div className="shell closing__inner">
        <h2 className="closing__title" id="join-title" ref={title}>
          {closing.title}
        </h2>
        <p className="lead">{closing.lead}</p>

        <form className="form" onSubmit={onSubmit} noValidate>
          <label className="u-hidden" htmlFor="join-email">
            Email address
          </label>
          <div className="form__row">
            <input
              className="form__input"
              id="join-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@email.com"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (tone !== "idle") setTone("idle");
              }}
              aria-describedby="join-status"
              aria-invalid={tone === "error"}
            />
            <button className="btn" type="submit">
              Join the list
            </button>
          </div>
          <p className="form__status" id="join-status" data-tone={tone} role="status">
            {message}
          </p>
        </form>
      </div>
    </section>
  );
}
