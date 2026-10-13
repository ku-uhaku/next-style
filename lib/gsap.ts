"use client";

import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

let registered = false;

/** Call from inside an effect — never during server render. */
export function setupGsap() {
  if (registered) return;
  gsap.registerPlugin(
    ScrollTrigger,
    ScrollSmoother,
    SplitText,
    CustomEase,
    DrawSVGPlugin,
  );
  CustomEase.create("ora", "0.16,0.84,0.28,1");
  CustomEase.create("oraSoft", "0.4,0.1,0.2,1");
  registered = true;
}

/** In-page links hand off to the smoother when it is running. */
export function scrollToHref(event: { preventDefault: () => void }, href: string) {
  const target = document.querySelector(href);
  if (!target) return;

  event.preventDefault();

  const smoother = ScrollSmoother.get();
  if (smoother) {
    smoother.scrollTo(target, true, "top top");
  } else {
    target.scrollIntoView({ block: "start" });
  }
}

export const MOTION_OFF = "(prefers-reduced-motion: reduce)";
export const MOTION_ON = "(prefers-reduced-motion: no-preference)";
export const WIDE = "(min-width: 62rem)";

export { gsap, ScrollSmoother, ScrollTrigger, SplitText };
