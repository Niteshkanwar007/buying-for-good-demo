"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type Stakeholder = "business" | "charity" | "supporter";

const stakeholders: Record<Stakeholder, { label: string; title: string; description: string; points: string[] }> = {
  business: {
    label: "Business",
    title: "Business perspective",
    description: "Approved business perspective and benefit detail to be confirmed from the final brief.",
    points: ["Participation detail to be confirmed", "Benefit detail to be confirmed"],
  },
  charity: {
    label: "Charity",
    title: "Charity perspective",
    description: "Approved charity perspective and benefit detail to be confirmed from the final brief.",
    points: ["Participation detail to be confirmed", "Benefit detail to be confirmed"],
  },
  supporter: {
    label: "Supporter",
    title: "Supporter perspective",
    description: "Approved supporter perspective and benefit detail to be confirmed from the final brief.",
    points: ["Participation detail to be confirmed", "Benefit detail to be confirmed"],
  },
};

export function StakeholderSystem() {
  const [active, setActive] = useState<Stakeholder>("business");
  const root = useRef<HTMLElement>(null);
  const current = stakeholders[active];

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const panel = root.current?.querySelector(".stakeholder-panel");
    if (!panel) return;
    gsap.fromTo(panel, { opacity: 0.55, y: 10 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" });
  }, { dependencies: [active], scope: root });

  return (
    <section ref={root} aria-labelledby="stakeholder-title" className="relative overflow-hidden bg-ocean-950 px-6 py-24 text-sand sm:px-10 sm:py-32 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-sand/55">Three parts of the idea</p>
          <h2 id="stakeholder-title" className="mt-5 font-display text-4xl leading-[0.98] tracking-[-0.04em] sm:text-5xl">The value moves through everyone.</h2>
        </div>
        <div className="mt-14 grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-stretch lg:gap-16">
          <div role="tablist" aria-label="Buying for Good stakeholder groups" className="grid grid-cols-3 gap-2 lg:grid-cols-1 lg:gap-3">
            {(Object.keys(stakeholders) as Stakeholder[]).map((key) => {
              const item = stakeholders[key];
              const selected = key === active;
              return (
                <button key={key} id={`stakeholder-tab-${key}`} type="button" role="tab" aria-selected={selected} aria-controls="stakeholder-panel" tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(key)}
                  onKeyDown={(event) => {
                    if (!["ArrowRight","ArrowDown","ArrowLeft","ArrowUp"].includes(event.key)) return;
                    event.preventDefault();
                    const keys = Object.keys(stakeholders) as Stakeholder[];
                    const delta = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1;
                    const next = keys[(keys.indexOf(key) + delta + keys.length) % keys.length];
                    setActive(next);
                    document.getElementById(`stakeholder-tab-${next}`)?.focus();
                  }}
                  className={`group rounded-2xl border px-4 py-4 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sand/80 lg:px-6 lg:py-5 ${selected ? "border-sand/45 bg-sand text-ocean-950" : "border-sand/15 bg-white/[0.03] text-sand hover:border-sand/30"}`}>
                  <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.22em] opacity-55">0{Object.keys(stakeholders).indexOf(key) + 1}</span>
                  <span className="mt-2 block font-display text-xl sm:text-2xl">{item.label}</span>
                </button>
              );
            })}
          </div>
          <div id="stakeholder-panel" role="tabpanel" aria-labelledby={`stakeholder-tab-${active}`} className="stakeholder-panel min-h-[20rem] rounded-[1.75rem] border border-sand/12 bg-[#0a5963] p-7 sm:p-10 lg:p-12">
            <span className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-sand/55">{current.label}</span>
            <h3 className="mt-12 max-w-2xl font-display text-4xl leading-[0.98] tracking-[-0.04em] sm:text-5xl">{current.title}</h3>
            <p className="mt-6 max-w-xl text-sm leading-7 text-sand/72 sm:text-base sm:leading-8">{current.description}</p>
            <ul className="mt-9 grid gap-3 sm:grid-cols-2" aria-label={`${current.label} value`}>
              {current.points.map((point) => <li key={point} className="flex gap-3 border-t border-sand/15 pt-4 text-sm leading-6 text-sand/80"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sand/75" aria-hidden="true" />{point}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
