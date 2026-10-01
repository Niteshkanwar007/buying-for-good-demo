"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type AudienceKey = "business" | "charity" | "supporter";

type Audience = {
  label: string;
  index: string;
  perspective: string;
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  benefits: string[];
};

const audiences: Record<AudienceKey, Audience> = {
  business: {
    label: "Business",
    index: "01",
    perspective: "Build the purchase around a wider purpose.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72",
    imageAlt: "People gathered around a table in a bright workspace",
    title: "Business perspective",
    description: "Approved business perspective and benefit detail to be confirmed from the final brief.",
    benefits: ["Participation detail to be confirmed", "Benefit detail to be confirmed", "Ecosystem detail to be confirmed"],
  },
  charity: {
    label: "Charity",
    index: "02",
    perspective: "Bring charitable purpose closer to everyday purchasing.",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a",
    imageAlt: "People joining hands together in a circle",
    title: "Charity perspective",
    description: "Approved charity perspective and benefit detail to be confirmed from the final brief.",
    benefits: ["Participation detail to be confirmed", "Benefit detail to be confirmed", "Ecosystem detail to be confirmed"],
  },
  supporter: {
    label: "Supporter",
    index: "03",
    perspective: "Make an everyday purchase part of something shared.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
    imageAlt: "Person choosing products while shopping",
    title: "Supporter perspective",
    description: "Approved supporter perspective and benefit detail to be confirmed from the final brief.",
    benefits: ["Participation detail to be confirmed", "Benefit detail to be confirmed", "Experience detail to be confirmed"],
  },
};

const order: AudienceKey[] = ["business", "charity", "supporter"];

export function AudienceExperience() {
  const [active, setActive] = useState<AudienceKey>("business");
  const root = useRef<HTMLElement>(null);
  const selected = audiences[active];

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const panel = root.current?.querySelector(".audience-benefits");
    const image = root.current?.querySelector(".audience-focus-image");
    if (!panel || !image) return;

    const tl = gsap.timeline();
    tl.fromTo(panel, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" })
      .fromTo(image, { scale: 1.04 }, { scale: 1, duration: 0.95, ease: "power2.out" }, 0);
    return () => tl.kill();
  }, { dependencies: [active], scope: root });

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const intro = root.current?.querySelector(".audience-intro");
    const choices = gsap.utils.toArray<HTMLElement>(".audience-choice");
    if (!intro || !choices.length) return;

    const tl = gsap.timeline({
      scrollTrigger: { trigger: root.current, start: "top 86%", end: "top 42%", scrub: 1.2 },
    });
    tl.fromTo(intro, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" })
      .fromTo(choices, { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power2.out" }, 0.12);
    return () => tl.kill();
  }, { scope: root });

  const selectAudience = (key: AudienceKey) => {
    setActive(key);
    requestAnimationFrame(() => document.getElementById(`audience-choice-${key}`)?.focus());
  };

  return (
    <section ref={root} aria-labelledby="audience-title" className="audience-chapter overflow-hidden bg-ocean-950 text-sand">
      <div className="audience-intro px-6 pb-12 pt-28 sm:px-10 sm:pb-16 sm:pt-36 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-sand/48">Who Is This For?</p>
          <h2 id="audience-title" className="mt-5 max-w-5xl font-display text-[clamp(3.2rem,7vw,7rem)] leading-[0.9] tracking-[-0.055em]">Three ways into the same ripple.</h2>
          <p className="mt-8 max-w-2xl text-base leading-8 text-sand/62 sm:text-lg">Choose the perspective that brings the Buying for Good idea closest to your role.</p>
        </div>
      </div>

      <div className="audience-choice-field px-6 pb-24 sm:px-10 sm:pb-32 lg:px-16">
        <div className="audience-choice-grid mx-auto flex max-w-6xl flex-col gap-3 lg:grid lg:grid-cols-3 lg:items-stretch">
          {order.map((key) => {
            const item = audiences[key];
            const selectedState = active === key;
            return (
              <button
                key={key}
                id={`audience-choice-${key}`}
                type="button"
                aria-expanded={selectedState}
                aria-controls="audience-panel"
                onClick={() => selectAudience(key)}
                className={`audience-choice group relative min-h-[18rem] overflow-hidden rounded-[1.5rem] border text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-sand/90 focus-visible:ring-offset-4 focus-visible:ring-offset-ocean-950 lg:min-h-[34rem] ${selectedState ? "audience-choice-active" : ""} border-sand/12`}
              >
                <Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 767px) 100vw, 33vw" priority={key === "business"} className="absolute inset-0 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]" />
                <span className="absolute inset-0 bg-gradient-to-t from-ocean-950 via-ocean-950/35 to-ocean-950/5" aria-hidden="true" />
                <span className="absolute inset-0 bg-ocean-950/20 transition-opacity duration-500 group-hover:bg-ocean-950/10" aria-hidden="true" />
                <span className="relative flex h-full min-h-[18rem] flex-col justify-between p-6 sm:p-8 lg:min-h-[34rem]">
                  <span className="flex items-center justify-between">
                    <span className="text-[0.58rem] font-semibold uppercase tracking-[0.24em] text-sand/60">{item.index}</span>
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-sand/25 bg-ocean-950/15 text-sand/75 transition-transform duration-500 group-hover:rotate-45" aria-hidden="true">↗</span>
                  </span>
                  <span>
                    <span className="block font-display text-4xl leading-none tracking-[-0.04em] sm:text-5xl">{item.label}</span>
                    <span className={`mt-3 block max-w-md text-sm leading-6 text-sand/72 transition-all duration-500 ${selectedState ? "max-h-20 opacity-100" : "max-h-12 opacity-70 lg:max-h-0 lg:overflow-hidden lg:opacity-0"}`}>{item.perspective}</span>
                    <span className="mt-5 block h-px w-14 bg-sand/45" aria-hidden="true" />
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div id="audience-panel" className="audience-benefits border-y border-sand/10 bg-sand text-ocean-950" aria-live="polite">
        <div className="mx-auto grid max-w-6xl lg:grid-cols-[0.82fr_1.18fr]">
          <div className="relative min-h-[25rem] overflow-hidden lg:min-h-[38rem]">
            {order.map((key) => (
              <div key={key} className={`audience-focus-layer absolute inset-0 transition-[opacity,transform] duration-500 ease-out ${active === key ? "opacity-100 scale-100" : "pointer-events-none opacity-0 scale-[1.015]"}`} aria-hidden={active !== key}>
                <Image src={audiences[key].image} alt="" fill sizes="(max-width: 1023px) 100vw, 41vw" priority={key === "business"} className="audience-focus-image object-cover" />
              </div>
            ))}
            <div className="absolute inset-0 bg-ocean-950/18" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ocean-950/70 to-transparent p-7 text-sand sm:p-10">
              <span className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-sand/65">Selected perspective</span>
              <p className="mt-2 font-display text-3xl">{selected.label}</p>
            </div>
          </div>

          <div className="p-7 sm:p-12 lg:p-16">
            <p className="eyebrow">{selected.label}</p>
            <h3 className="mt-5 max-w-2xl font-display text-4xl leading-[0.95] tracking-[-0.045em] sm:text-5xl">{selected.title}</h3>
            <p className="mt-7 max-w-xl text-base leading-8 text-ocean-950/66">{selected.description}</p>
            <ul className="mt-12 grid gap-0 border-t border-ocean-950/12" aria-label={`${selected.label} benefits`}>
              {selected.benefits.map((benefit, index) => (
                <li key={benefit} className="flex gap-5 border-b border-ocean-950/12 py-5 text-sm leading-7 sm:text-base">
                  <span className="pt-1 text-[0.58rem] font-semibold tracking-[0.2em] text-ocean-950/38">0{index + 1}</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            <button type="button" onClick={() => document.getElementById("audience-faq")?.scrollIntoView({ block: "start" })} className="mt-10 inline-flex items-center gap-3 border-b border-ocean-950/25 pb-2 text-[0.66rem] font-semibold uppercase tracking-[0.2em] focus:outline-none focus-visible:ring-2 focus-visible:ring-ocean-700 focus-visible:ring-offset-4">
              Questions about this path <span aria-hidden="true">↓</span>
            </button>
          </div>
        </div>
      </div>

      <AudienceFaq active={active} />

      <section aria-labelledby="interest-title" className="audience-interest bg-sand px-6 py-24 text-ocean-950 sm:px-10 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-5xl border-t border-ocean-950/12 pt-12 sm:pt-16">
          <p className="eyebrow">Shared next step</p>
          <h2 id="interest-title" className="mt-5 max-w-4xl font-display text-[clamp(2.8rem,6vw,5.8rem)] leading-[0.92] tracking-[-0.05em]">Ready to explore a place in the ecosystem?</h2>
          <p className="mt-7 max-w-2xl text-base leading-8 text-ocean-950/62">Approved expression-of-interest introduction to be confirmed from the final brief.</p>
          <a href="#expression-interest" className="mt-9 inline-flex min-h-12 items-center justify-center rounded-full bg-ocean-950 px-6 text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-sand focus:outline-none focus-visible:ring-2 focus-visible:ring-ocean-700 focus-visible:ring-offset-4">Express your interest</a>
        </div>
      </section>
    </section>
  );
}

function AudienceFaq({ active }: { active: AudienceKey }) {
  const [open, setOpen] = useState<string | null>(null);
  const groups = [
    { id: "how", question: "How does this audience take part?", answer: `Approved participation explanation to be confirmed from the final brief.` },
    { id: "what", question: "What would happen after registering interest?", answer: "Approved next-step process to be confirmed from the final brief." },
    { id: "clarity", question: "Where can I understand the model in more detail?", answer: "Approved documentation and governance detail to be confirmed from the final brief." },
  ];

  return (
    <section id="audience-faq" aria-labelledby="faq-title" className="audience-faq bg-ocean-900 px-6 py-24 text-sand sm:px-10 sm:py-32 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-sand/45">Common questions</p>
          <h2 id="faq-title" className="mt-5 font-display text-4xl leading-[0.96] tracking-[-0.045em] sm:text-6xl">Before you take the next step.</h2>
        </div>
        <div className="mt-12 border-t border-sand/12">
          {groups.map((item) => {
            const expanded = open === item.id;
            const panelId = `faq-panel-${item.id}`;
            return (
              <div key={item.id} className="border-b border-sand/12">
                <h3>
                  <button type="button" aria-expanded={expanded} aria-controls={panelId} onClick={() => setOpen(expanded ? null : item.id)} className="flex w-full items-center justify-between gap-8 py-6 text-left font-display text-2xl leading-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-sand/90 focus-visible:ring-offset-4 focus-visible:ring-offset-ocean-900 sm:text-3xl">
                    <span>{item.question}</span>
                    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-sand/20 text-base transition-transform duration-300 ${expanded ? "rotate-45" : ""}`} aria-hidden="true">+</span>
                  </button>
                </h3>
                <div id={panelId} hidden={!expanded} className="pb-6 pr-12">
                  <p className="max-w-2xl text-sm leading-7 text-sand/62 sm:text-base sm:leading-8">{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
