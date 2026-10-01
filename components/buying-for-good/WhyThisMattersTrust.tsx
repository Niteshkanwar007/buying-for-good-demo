"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MoneyFlow } from "./MoneyFlow";
import { GovernanceDetails } from "./GovernanceDetails";
import { FounderPromise } from "./FounderPromise";

gsap.registerPlugin(ScrollTrigger);

export function WhyThisMattersTrust() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const statement = root.current?.querySelector(".trust-transition-statement");
    const ring = root.current?.querySelector(".trust-transition-ring");
    if (!statement || !ring) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root.current,
        start: "top 84%",
        end: "top 30%",
        scrub: 1.25,
      },
    });

    tl.fromTo(statement, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 1.25, ease: "power2.out" })
      .fromTo(ring, { scale: 0.88, opacity: 0.35 }, { scale: 1, opacity: 1, duration: 1, ease: "power2.out" }, 0);

    return () => tl.kill();
  }, { scope: root });

  return (
    <section ref={root} aria-labelledby="why-matters-title" className="trust-chapter overflow-hidden bg-sand text-ocean-950">
      <div className="trust-transition relative px-6 py-32 sm:px-10 sm:py-44 lg:px-16">
        <div className="trust-transition-ring pointer-events-none absolute right-[8%] top-1/2 hidden aspect-square w-[min(34vw,28rem)] -translate-y-1/2 rounded-full border border-ocean-700/12 md:block" aria-hidden="true">
          <span className="absolute inset-[17%] rounded-full border border-ocean-700/10" />
          <span className="absolute inset-[35%] rounded-full border border-ocean-700/10" />
          <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ocean-700/55" />
        </div>

        <div className="trust-transition-statement relative mx-auto max-w-5xl">
          <p className="eyebrow">Why This Matters</p>
          <h2 id="why-matters-title" className="mt-6 max-w-4xl font-display text-[clamp(3.2rem,7vw,7rem)] leading-[0.91] tracking-[-0.055em]">
            If the purchase can create impact, the impact should be understandable too.
          </h2>
          <p className="mt-9 max-w-2xl text-base leading-8 text-ocean-950/62 sm:text-lg">
            The next question is not how much movement we can create. It is whether the model feels clear enough to trust.
          </p>
        </div>
      </div>

      <MoneyFlow />
      <GovernanceDetails />
      <FounderPromise />

      <section aria-label="Next chapter" className="trust-next bg-sand px-6 py-24 text-center sm:px-10 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow">Next</p>
          <h2 className="mt-5 font-display text-4xl leading-[0.96] tracking-[-0.045em] sm:text-6xl">
            Now, choose the perspective that matters to you.
          </h2>
          <div className="mx-auto mt-10 h-px w-20 bg-ocean-950/15" aria-hidden="true" />
        </div>
      </section>
    </section>
  );
}
