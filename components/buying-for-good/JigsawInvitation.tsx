"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function JigsawInvitation() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const piece = root.current?.querySelector(".jigsaw-piece");
    const ripple = root.current?.querySelector(".jigsaw-ripple");
    const line = root.current?.querySelector(".jigsaw-line");
    if (!piece || !ripple || !line) return;

    const tl = gsap.timeline({
      scrollTrigger: { trigger: root.current, start: "top 82%", end: "top 36%", scrub: 1.1 },
    });

    tl.fromTo(piece, { x: -42, y: 18, rotate: -4, opacity: 0 }, { x: 0, y: 0, rotate: 0, opacity: 1, duration: 1, ease: "power2.out" }, 0)
      .fromTo(ripple, { scale: 0.76, opacity: 0.2 }, { scale: 1, opacity: 0.85, duration: 1, ease: "power2.out" }, 0)
      .fromTo(line, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.8, ease: "power2.inOut" }, 0.3);

    return () => tl.kill();
  }, { scope: root });

  return (
    <section ref={root} aria-labelledby="jigsaw-title" className="jigsaw-invitation relative overflow-hidden bg-sand px-6 py-28 text-ocean-950 sm:px-10 sm:py-36 lg:px-16">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
        <div className="relative mx-auto w-full max-w-[22rem]">
          <div className="jigsaw-ripple absolute left-1/2 top-1/2 aspect-square w-[94%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ocean-700/14" aria-hidden="true">
            <span className="absolute inset-[18%] rounded-full border border-ocean-700/12" />
            <span className="absolute inset-[37%] rounded-full border border-ocean-700/12" />
            <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-700/65" />
          </div>

          <svg viewBox="0 0 320 320" className="relative z-10 mx-auto w-full" role="img" aria-label="A single jigsaw piece joining a circular ripple">
            <path
              className="jigsaw-piece"
              d="M89 65h55c0-18 12-31 29-31s29 13 29 31h28v48c16-2 29 9 29 25s-13 27-29 25v48h-48c2-17-9-29-25-29s-27 12-25 29H89v-49c17 2 29-9 29-25s-12-27-29-25V65Z"
              fill="#0d7375"
              fillOpacity=".9"
              stroke="#062b35"
              strokeOpacity=".22"
              strokeWidth="2"
            />
            <circle cx="160" cy="160" r="5" fill="#f5f1e8" />
          </svg>
        </div>

        <div className="max-w-3xl">
          <p className="eyebrow">Become part of it</p>
          <h2 id="jigsaw-title" className="mt-5 font-display text-[clamp(3rem,6vw,6rem)] leading-[0.92] tracking-[-0.055em]">
            There is room for your piece.
          </h2>
          <span className="jigsaw-line mt-8 block h-px w-full origin-left bg-ocean-950/15" aria-hidden="true" />
          <p className="mt-7 max-w-2xl text-base leading-8 text-ocean-950/64 sm:text-lg">
            If Buying for Good feels relevant to you, share a little about your perspective. The same idea can be entered from different places.
          </p>
          <a href="#expression-interest" className="mt-9 inline-flex min-h-12 items-center rounded-full bg-ocean-950 px-6 text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-sand focus:outline-none focus-visible:ring-2 focus-visible:ring-ocean-700 focus-visible:ring-offset-4">
            Express your interest
          </a>
        </div>
      </div>
    </section>
  );
}
