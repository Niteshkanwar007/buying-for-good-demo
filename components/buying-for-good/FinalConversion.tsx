"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { JigsawInvitation } from "./JigsawInvitation";
import { InterestForm } from "./InterestForm";
import { SiteFooter } from "./SiteFooter";

gsap.registerPlugin(ScrollTrigger);

export function FinalConversion() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const copy = root.current?.querySelector(".conversion-intro-copy");
    if (!copy) return;
    const tl = gsap.fromTo(copy, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.95, ease: "power2.out", scrollTrigger: { trigger: copy, start: "top 86%", end: "top 58%", scrub: 1 } });
    return () => tl.kill();
  }, { scope: root });

  return (
    <section ref={root} id="become-part-of-it" aria-labelledby="conversion-title" className="conversion-chapter bg-sand text-ocean-950">
      <JigsawInvitation />

      <section id="expression-interest" aria-labelledby="conversion-title" className="conversion-form-section border-t border-ocean-950/10 px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div className="conversion-intro-copy max-w-md lg:sticky lg:top-24 lg:self-start">
            <p className="eyebrow">Shared expression of interest</p>
            <h2 id="conversion-title" className="mt-5 font-display text-[clamp(2.8rem,5vw,5.3rem)] leading-[0.93] tracking-[-0.05em]">
              Tell us where you fit.
            </h2>
            <p className="mt-7 text-base leading-8 text-ocean-950/62">
              Choose your perspective first. The questions then stay focused on that path.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-ocean-950/10 bg-white/25 p-6 sm:p-10 lg:p-12">
            <InterestForm />
          </div>
        </div>
      </section>

      <section id="contact" aria-labelledby="contact-title" className="border-t border-ocean-950/10 bg-ocean-900 px-6 py-20 text-sand sm:px-10 sm:py-24 lg:px-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-sand/45">Separate contact</p>
            <h2 id="contact-title" className="mt-4 font-display text-4xl leading-[0.95] tracking-[-0.045em] sm:text-5xl">Have an enquiry instead?</h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-sand/60 sm:text-base sm:leading-8">
              For general enquiries, use the contact pathway. It is separate from the expression-of-interest form and does not subscribe you to updates.
            </p>
          </div>
          <span className="inline-flex min-h-11 shrink-0 items-center rounded-full border border-sand/20 px-5 text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-sand/70">
            Contact details — to be supplied
          </span>
        </div>
      </section>

      <SiteFooter />
    </section>
  );
}
