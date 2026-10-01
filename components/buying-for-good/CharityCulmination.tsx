"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const photos = [
  { src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c", alt: "Children gathered together outdoors", label: "People / possibility" },
  { src: "https://images.unsplash.com/photo-1559027615-cd4628902d4a", alt: "Hands joined together in a circle", label: "Community / connection" },
  { src: "https://images.unsplash.com/photo-1504159506876-f8338247a14a", alt: "People walking together in a natural setting", label: "Together / participation" },
  { src: "https://images.unsplash.com/photo-1469571486292-0ba58a26c8c8", alt: "People supporting one another outdoors", label: "Care / action" },
  { src: "https://images.unsplash.com/photo-1494386346843-e12284507169", alt: "People gathered in a shared community space", label: "Community / shared purpose" },
  { src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18", alt: "Friends together outside", label: "People / togetherness" },
];

export function CharityCulmination() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tiles = gsap.utils.toArray<HTMLElement>(".charity-photo");
    gsap.fromTo(tiles, { opacity: 0, y: 42, scale: 1.035 }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.05,
      stagger: 0.14,
      ease: "power2.out",
      scrollTrigger: { trigger: root.current, start: "top 82%", end: "top 30%", scrub: 1 },
    });
  }, { scope: root });

  return (
    <section ref={root} aria-labelledby="impact-title" className="charity-culmination overflow-hidden bg-ocean-950 px-6 py-24 text-sand sm:px-10 sm:py-32 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-sand/55">From mechanics to meaning</p>
          <h2 id="impact-title" className="mt-5 font-display text-4xl leading-[0.96] tracking-[-0.045em] sm:text-6xl">
            The ripple has somewhere to go.
          </h2>
          <p className="mt-6 max-w-xl text-sm leading-7 text-sand/68 sm:text-base sm:leading-8">
            Buying for Good brings the purchase journey into a shared space where businesses, charities and supporters can participate in charitable impact.
          </p>
        </div>

        <div className="charity-photo-grid mt-14 grid grid-cols-2 gap-3 sm:mt-16 sm:grid-cols-3 sm:gap-4">
          {photos.map((photo, index) => (
            <figure key={photo.src} className="charity-photo group relative overflow-hidden rounded-[1.35rem] border border-sand/10 bg-white/5">
              <div className={index % 3 === 1 ? "relative aspect-[4/5]" : "relative aspect-[5/6]"}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover saturate-[0.7] contrast-[0.95] transition-transform duration-700 group-hover:scale-[1.025]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/65 via-transparent to-ocean-950/10" />
                <figcaption className="absolute inset-x-4 bottom-4 text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-sand/78 sm:inset-x-5 sm:bottom-5">
                  {photo.label}
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
