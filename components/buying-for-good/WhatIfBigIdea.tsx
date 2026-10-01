"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WhatIfCard } from "./WhatIfCard";
import { BigIdea } from "./BigIdea";
import { StakeholderSystem } from "./StakeholderSystem";

gsap.registerPlugin(ScrollTrigger);

const whatIfs = [
  { question: "What if buying could do more?", answer: "What if an everyday purchase could carry a charitable purpose with it?" },
  { question: "What if the good was built into the journey?", answer: "What if giving was connected to the way people and businesses already buy, rather than feeling like a separate action?" },
  { question: "What if more people could take part?", answer: "What if businesses, charities and supporters could each have a meaningful place in the same model?" },
  { question: "What if everyday choices could create shared impact?", answer: "What if the ordinary act of purchasing became one way to participate in something bigger?" },
];

export function WhatIfBigIdea() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const cards = gsap.utils.toArray<HTMLElement>(".what-if-card");
      gsap.set(cards, { opacity: 0, y: 90, scale: 0.94, rotate: 1 });
      gsap.set(cards[0], { opacity: 1, y: 0, scale: 1, rotate: 0 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "+=460%", scrub: 1.25, pin: true, anticipatePin: 1 } });

      cards.forEach((card, index) => {
        if (index === 0) tl.to(card, { y: -12, scale: 1.01, duration: 0.62, ease: "none" });
        else {
          const previous = cards[index - 1];
          tl.to(previous, { opacity: 0, y: -85, scale: 0.9, rotate: index % 2 ? -1.5 : 1.5, duration: 0.78, ease: "power2.inOut" })
            .fromTo(card, { opacity: 0, y: 90, scale: 0.94, rotate: index % 2 ? 1.5 : -1.5 }, { opacity: 1, y: 0, scale: 1, rotate: 0, duration: 0.88, ease: "power2.out" }, "<0.12")
            .to(card, { y: -12, scale: 1.01, duration: 0.55, ease: "none" });
        }
      });
      tl.to(".what-if-orbit", { scale: 1.22, opacity: 0.75, duration: 1.3, ease: "none" }, 0)
        .to(".what-if-label", { y: -20, opacity: 0.25, duration: 1, ease: "none" }, 0)
        .to(".what-if-exit", { opacity: 1, scale: 1, duration: 0.95, ease: "power2.out" }, "-=0.35");
      return () => tl.kill();
    });

    mm.add("(max-width: 767px)", () => {
      gsap.utils.toArray<HTMLElement>(".what-if-card").forEach((card) => gsap.fromTo(card, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: card, start: "top 88%", end: "top 64%", scrub: 0.85 } }));
    });
    return () => mm.revert();
  }, { scope: root });

  return (
    <>
      <section ref={root} aria-labelledby="what-if-title" className="what-if-section relative overflow-hidden bg-ocean-900 text-sand">
        <div className="what-if-stage relative min-h-[100svh]">
          <div className="what-if-orbit pointer-events-none absolute left-1/2 top-1/2 h-[min(70vw,58rem)] w-[min(70vw,58rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-sand/10" aria-hidden="true"><span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sand/65" /><span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 rounded-full bg-sand/35" /></div>
          <div className="what-if-label absolute left-6 top-9 z-20 sm:left-10 lg:left-16"><p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-sand/55">Understanding → Possibility</p><h2 id="what-if-title" className="mt-4 font-display text-3xl leading-none tracking-[-0.035em] sm:text-4xl">What if?</h2></div>
          <div className="what-if-cards absolute inset-0 z-10">{whatIfs.map((item, index) => <WhatIfCard key={item.question} index={index + 1} {...item} />)}</div>
          <div className="what-if-exit absolute bottom-8 left-1/2 z-20 w-[calc(100%-3rem)] max-w-xl -translate-x-1/2 scale-95 text-center opacity-0 sm:bottom-10"><span className="text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-sand/50">The question becomes an idea</span><div className="mx-auto mt-4 h-px w-24 bg-sand/30" aria-hidden="true" /></div>
        </div>
      </section>
      <BigIdea />
      <StakeholderSystem />
    </>
  );
}
