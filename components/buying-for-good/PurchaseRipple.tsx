"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type PurchaseRippleProps = {
  activeIndex: number;
  count: number;
};

export function PurchaseRipple({ activeIndex, count }: PurchaseRippleProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rings = gsap.utils.toArray<SVGCircleElement>(".purchase-ripple-ring");
    const pulse = root.current?.querySelector(".purchase-ripple-pulse");
    if (!pulse) return;

    gsap.to(pulse, { scale: 1 + activeIndex * 0.055, duration: 0.6, ease: "power2.out" });
    gsap.to(rings, {
      opacity: (i) => i <= activeIndex ? 0.56 : 0.1,
      duration: 0.45,
      stagger: 0.035,
      ease: "power2.out",
    });
  }, { dependencies: [activeIndex] });

  return (
    <div ref={root} className="purchase-ripple relative aspect-square w-full max-w-[28rem] text-ocean-700" aria-hidden="true">
      <div className="purchase-ripple-pulse absolute inset-[37%] rounded-full bg-ocean-700/10" />
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full overflow-visible">
        {Array.from({ length: count }, (_, index) => {
          const radius = 62 + index * 38;
          return (
            <circle
              key={index}
              className="purchase-ripple-ring"
              cx="200"
              cy="200"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity={index === 0 ? 0.56 : 0.1}
            />
          );
        })}
        <circle cx="200" cy="200" r="7" fill="currentColor" opacity="0.72" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="max-w-[9rem] text-center text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-ocean-950/45">
          One purchase can join a wider ripple
        </span>
      </div>
    </div>
  );
}
