"use client";

import { useEffect } from "react";

import { gsap, MOTION_ON, ScrollSmoother, ScrollTrigger, setupGsap } from "@/lib/gsap";

/**
 * Mounted before the page content so the smoother exists before any
 * ScrollTrigger is created. Native scrolling is the reduced-motion fallback.
 */
export function SmoothScroll() {
  useEffect(() => {
    setupGsap();

    const mm = gsap.matchMedia();

    mm.add(MOTION_ON, () => {
      ScrollSmoother.get()?.kill();

      // No `effects: true` — this effect runs before the page segment
      // hydrates, and rewriting data-speed nodes here breaks hydration.
      // Parallax belongs to the section that owns the element.
      const smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.1,
        smoothTouch: 0,
      });

      ScrollTrigger.refresh();

      return () => smoother.kill();
    });

    return () => mm.revert();
  }, []);

  return null;
}
