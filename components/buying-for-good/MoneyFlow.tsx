"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { label: "Everyday purchase", detail: "A normal purchase starts the journey." },
  { label: "Participation", detail: "The purchase becomes a way to take part." },
  { label: "Contribution", detail: "The model connects that participation with charitable contribution." },
  { label: "Charitable impact", detail: "The contribution is directed toward the charitable purpose of the model." },
];

export function MoneyFlow() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const nodes = gsap.utils.toArray<HTMLElement>(".money-flow-node");
    const connectors = gsap.utils.toArray<HTMLElement>(".money-flow-connector");
    gsap.fromTo(
      [...nodes, ...connectors],
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: { trigger: root.current, start: "top 82%", end: "top 32%", scrub: 1.1 },
      }
    );
  }, { scope: root });

  return (
    <section ref={root} aria-labelledby="money-flow-title" className="trust-money-flow bg-ocean-900 px-6 py-24 text-sand sm:px-10 sm:py-32 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-sand/50">How the model connects</p>
          <h2 id="money-flow-title" className="mt-5 font-display text-4xl leading-[0.98] tracking-[-0.04em] sm:text-5xl">
            Keep the flow simple enough to understand.
          </h2>
          <p className="mt-6 max-w-xl text-sm leading-7 text-sand/68 sm:text-base sm:leading-8">
            The exact financial mechanics should be understood from the final Buying for Good model. This prototype shows the conceptual path without adding unsupported amounts or claims.
          </p>
        </div>

        <ol className="mt-16 grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] md:items-center md:gap-2" aria-label="Conceptual flow from purchase to charitable impact">
          {steps.map((step, index) => (
            <li key={step.label} className="contents">
              <div className="money-flow-node rounded-[1.4rem] border border-sand/12 bg-white/[0.035] p-6 sm:p-7">
                <span className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-sand/40">0{index + 1}</span>
                <h3 className="mt-8 font-display text-2xl leading-tight">{step.label}</h3>
                <p className="mt-3 text-sm leading-6 text-sand/60">{step.detail}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="money-flow-connector hidden h-px w-8 bg-sand/20 md:block" aria-hidden="true">
                  <span className="block h-px origin-left scale-x-50 bg-teal-300/40" />
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
