"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PurchaseMoment } from "./PurchaseMoment";
import { PurchaseRipple } from "./PurchaseRipple";
import { CharityCulmination } from "./CharityCulmination";

gsap.registerPlugin(ScrollTrigger);

const purchases = [
  { category: "Everyday / food", title: "A grocery purchase.", detail: "An ordinary purchase becomes a point of participation." },
  { category: "Everyday / drink", title: "A coffee on the way through.", detail: "The action stays familiar. The meaning around it changes." },
  { category: "Everyday / clothing", title: "Something to wear.", detail: "Another purchase joins the same shared model." },
  { category: "Everyday / home", title: "Something for home.", detail: "More everyday choices can become part of the same ripple." },
  { category: "Everyday / giving", title: "A gift for someone else.", detail: "One more purchase connects a person to the wider idea." },
];

export function WelcomeHowItWorks() {
  const root = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const moments = gsap.utils.toArray<HTMLElement>(".purchase-moment");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=520%",
          scrub: 1.25,
          pin: true,
          anticipatePin: 1,
        },
      });

      moments.forEach((moment, index) => {
        if (index === 0) {
          tl.fromTo(moment, { opacity: 0, y: 70, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.72, ease: "power2.out" }, 0);
        } else {
          tl.to(moments[index - 1], { opacity: 0.34, y: -55, scale: 0.94, duration: 0.72, ease: "power2.inOut" })
            .fromTo(moment, { opacity: 0, y: 70, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.78, ease: "power2.out" }, "<0.1");
        }

        tl.call(() => setActiveIndex(index), [], ">")
          .to(".how-it-works-ripple", { scale: 1 + index * 0.08, duration: 0.58, ease: "none" }, "<")
          .to(".how-it-works-copy", { opacity: 0.55, y: -8, duration: 0.5, ease: "none" }, "<")
          .to(".how-it-works-copy", { opacity: 1, y: 0, duration: 0.35, ease: "none" });
      });

      tl.to(".how-it-works-ripple", { scale: 1.5, opacity: 0.9, duration: 0.95, ease: "power2.out" })
        .to(".how-it-works-transition", { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" }, "<0.15");

      return () => tl.kill();
    });

    mm.add("(max-width: 767px)", () => {
      gsap.utils.toArray<HTMLElement>(".purchase-moment").forEach((moment, index) => {
        gsap.fromTo(moment, { opacity: 0, y: 38 }, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: moment,
            start: "top 88%",
            end: "top 64%",
            scrub: 0.85,
            onEnter: () => setActiveIndex(index),
            onEnterBack: () => setActiveIndex(index),
          },
        });
      });
    });

    return () => mm.revert();
  }, { scope: root });

  return (
    <>
      <section ref={root} aria-labelledby="how-it-works-title" className="how-it-works-section relative overflow-hidden bg-sand text-ocean-950">
        <div className="how-it-works-stage relative min-h-[100svh]">
          <div className="absolute left-6 top-9 z-20 max-w-sm sm:left-10 sm:top-12 lg:left-16">
            <p className="eyebrow">Welcome to Buying for Good</p>
            <h2 id="how-it-works-title" className="how-it-works-copy mt-4 font-display text-3xl leading-[0.98] tracking-[-0.04em] sm:text-4xl">
              See how an everyday purchase can join the ripple.
            </h2>
          </div>

          <div className="how-it-works-ripple-wrap pointer-events-none absolute left-1/2 top-1/2 z-0 w-[min(64vw,34rem)] -translate-x-1/2 -translate-y-1/2">
            <PurchaseRipple activeIndex={activeIndex} count={purchases.length} />
          </div>

          <div className="how-it-works-purchases absolute left-6 right-6 top-1/2 z-10 -translate-y-1/2 sm:left-10 sm:right-10 lg:left-16 lg:right-16">
            <div className="mx-auto max-w-md">
              {purchases.map((purchase, index) => (
                <div key={purchase.title} className="how-it-works-purchase-slot absolute inset-x-0 top-0">
                  <PurchaseMoment index={index + 1} {...purchase} active={activeIndex === index} />
                </div>
              ))}
            </div>
          </div>

          <div className="how-it-works-transition absolute bottom-8 left-1/2 z-20 w-[calc(100%-3rem)] max-w-lg -translate-x-1/2 translate-y-6 text-center opacity-0 sm:bottom-10">
            <span className="text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-ocean-950/45">Purchase → participation → contribution → ripple</span>
            <div className="mx-auto mt-4 h-px w-24 bg-ocean-950/20" aria-hidden="true" />
          </div>

          <div className="how-it-works-progress absolute inset-x-6 bottom-7 z-20 h-px bg-ocean-950/15 sm:inset-x-10 lg:inset-x-16">
            <span className="absolute -top-5 left-0 text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-ocean-950/38">Everyday</span>
            <span className="absolute -top-5 right-0 text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-ocean-950/38">Shared impact</span>
          </div>
        </div>
      </section>

      <CharityCulmination />
    </>
  );
}
