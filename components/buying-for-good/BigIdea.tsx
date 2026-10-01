"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function BigIdea() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const ring = root.current?.querySelector(".big-idea-ring");
    const line = root.current?.querySelector(".big-idea-line");
    if (!ring || !line) return;

    const tl = gsap.timeline({
      scrollTrigger: { trigger: root.current, start: "top 78%", end: "bottom 72%", scrub: 1 },
    });
    tl.fromTo(ring, { scale: 0.72, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: "power2.out" })
      .fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "power2.inOut" }, 0.25)
      .fromTo(".big-idea-copy", { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, ease: "power2.out" }, 0.35);
    return () => tl.kill();
  }, { scope: root });

  return (
    <section ref={root} aria-labelledby="big-idea-title" className="big-idea relative overflow-hidden bg-sand px-6 py-28 text-ocean-950 sm:px-10 sm:py-36 lg:px-16">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="relative mx-auto aspect-square w-full max-w-[24rem]">
          <div className="big-idea-ring absolute inset-[7%] rounded-full border border-ocean-700/20">
            <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ocean-700" />
            <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 rounded-full bg-ocean-700/45" />
            <span className="absolute left-0 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ocean-700/45" />
            <span className="absolute right-0 top-1/2 h-2 w-2 translate-x-1/2 -translate-y-1/2 rounded-full bg-ocean-700/45" />
          </div>
          <div className="absolute inset-[24%] rounded-full bg-ocean-900 shadow-[0_0_100px_rgba(13,115,117,0.18)]">
            <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
              <circle cx="100" cy="100" r="72" fill="none" stroke="rgba(245,241,232,.2)" />
              <circle cx="100" cy="100" r="42" fill="none" stroke="rgba(245,241,232,.24)" />
              <circle cx="100" cy="100" r="5" fill="#f5f1e8" />
            </svg>
          </div>
        </div>
        <div className="big-idea-copy">
          <p className="eyebrow">The Big Idea</p>
          <h2 id="big-idea-title" className="mt-5 max-w-3xl font-display text-[clamp(3rem,7vw,6.7rem)] leading-[0.9] tracking-[-0.055em]">Make everyday purchases part of something bigger.</h2>
          <span className="big-idea-line mt-9 block h-px w-full origin-left bg-ocean-950/15" aria-hidden="true" />
          <p className="mt-7 max-w-2xl text-base leading-7 text-ocean-950/68 sm:text-lg sm:leading-8">Buying for Good connects businesses, charities and supporters so an everyday purchase can contribute to shared charitable impact.</p>
        </div>
      </div>
    </section>
  );
}
