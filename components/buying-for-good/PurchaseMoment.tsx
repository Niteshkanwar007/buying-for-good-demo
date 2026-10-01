"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type PurchaseMomentProps = {
  index: number;
  category: string;
  title: string;
  detail: string;
  active?: boolean;
};

export function PurchaseMoment({ index, category, title, detail, active = false }: PurchaseMomentProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.to(root.current, {
      y: active ? -6 : 0,
      opacity: active ? 1 : 0.78,
      duration: 0.35,
      ease: "power2.out",
    });
  }, { dependencies: [active] });

  return (
    <article
      ref={root}
      aria-current={active ? "step" : undefined}
      className="purchase-moment relative rounded-[1.5rem] border border-ocean-950/10 bg-[#f7f3ea]/95 p-6 shadow-[0_22px_70px_rgba(6,43,53,0.12)] sm:p-8"
    >
      <div className="flex items-start justify-between gap-5">
        <span className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-ocean-700">
          {category}
        </span>
        <span className="font-display text-2xl leading-none text-ocean-700/30">
          {String(index).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mt-9 font-display text-3xl leading-[0.98] tracking-[-0.04em] text-ocean-950 sm:text-4xl">
        {title}
      </h3>
      <p className="mt-4 max-w-sm text-sm leading-6 text-ocean-950/65 sm:text-base sm:leading-7">
        {detail}
      </p>
    </article>
  );
}
