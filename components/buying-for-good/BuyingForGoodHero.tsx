"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ImpactRipple } from "./ImpactRipple";

gsap.registerPlugin(ScrollTrigger);

export function BuyingForGoodHero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion) return;

      const intro = gsap.timeline({
        defaults: { ease: "power2.out" },
      });

      intro
        .from(".hero-nav", { y: -18, opacity: 0, duration: 1.0 }, 0.15)
        .from(".hero-kicker", { y: 18, opacity: 0, duration: 0.9 }, 0.25)
        .from(".hero-title-line", { yPercent: 105, opacity: 0, duration: 1.45, stagger: 0.12 }, 0.35)
        .from(".hero-copy", { y: 16, opacity: 0, duration: 0.95 }, 0.72)
        .from(".hero-scroll-cue", { y: 10, opacity: 0, duration: 0.75 }, 1.05);

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const story = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=120%",
            scrub: 1.35,
            pin: true,
            anticipatePin: 1,
          },
        });

        story
          .to(".hero-content", { yPercent: -15, opacity: 0.78, ease: "none" }, 0)
          .to(".story-glow", { scale: 1.24, opacity: 0.92, ease: "none" }, 0)
          .to(".hero-sun", { scale: 0.72, yPercent: 12, opacity: 0.3, ease: "none" }, 0)
          .to(".hero-water", { yPercent: -10, ease: "none" }, 0)
          .to(".hero-ripple", { opacity: 1, scale: 1.08, ease: "none" }, 0.2);
      });

      mm.add("(max-width: 767px)", () => {
        gsap.timeline({ defaults: { ease: "power2.out" } })
          .fromTo(".story-glow", { scale: 0.92, opacity: 0.45 }, { scale: 1.04, opacity: 0.82, duration: 1.5 })
          .fromTo(".hero-ripple", { opacity: 0.35, scale: 0.94 }, { opacity: 0.82, scale: 1, duration: 1.7 }, "<0.25");
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="hero-shell" aria-labelledby="hero-title">
      <div className="hero-horizon" aria-hidden="true" />
      <div className="hero-water" aria-hidden="true" />
      <div className="hero-sun absolute left-1/2 top-[24%] z-[-1] h-28 w-28 -translate-x-1/2 rounded-full bg-[#ffe3aa]/75 blur-[1px] shadow-[0_0_100px_rgba(255,224,168,0.42)] sm:h-40 sm:w-40" aria-hidden="true" />
      <div className="story-glow" aria-hidden="true" />
      <ImpactRipple />

      <div className="hero-nav absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-6 sm:px-10 lg:px-16 lg:py-8">
        <span className="text-sm font-semibold tracking-[-0.02em] text-white">Buying for Good</span>
        <span className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-white/65">
          A more meaningful way to buy
        </span>
      </div>

      <div className="hero-content relative z-10 flex min-h-[100svh] items-center px-6 pb-20 pt-28 sm:px-10 sm:pb-24 lg:px-16">
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-4xl">
            <p className="hero-kicker eyebrow text-white/80">A shared idea, starting here.</p>

            <h1
              id="hero-title"
              className="mt-5 max-w-4xl overflow-hidden font-display text-[clamp(3.6rem,9vw,8.8rem)] leading-[0.9] tracking-[-0.055em] text-white"
            >
              <span className="hero-title-line block">Every purchase</span>
              <span className="hero-title-line block italic text-[#d9eee8]">leaves a mark.</span>
            </h1>

            <p className="hero-copy mt-8 max-w-xl text-base leading-7 text-white/78 sm:text-lg sm:leading-8">
              What if the things we choose every day could create a little more good?
              This is where the story begins.
            </p>
          </div>
        </div>
      </div>

      <div className="hero-scroll-cue absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3 text-white/70 sm:bottom-9">
        <span className="text-[0.6rem] font-semibold uppercase tracking-[0.28em]">Scroll to explore</span>
        <span className="h-10 w-px overflow-hidden bg-white/25">
          <span className="block h-1/2 w-full origin-top animate-pulse bg-white/80" />
        </span>
      </div>
    </section>
  );
}
