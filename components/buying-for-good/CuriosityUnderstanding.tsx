"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PhotoBand } from "./PhotoBand";
import { StoryCard, type StoryCardData } from "./StoryCard";

gsap.registerPlugin(ScrollTrigger);

const cards: StoryCardData[] = [
  {
    index: 1,
    eyebrow: "The question",
    title: "We buy every day. But rarely see the whole picture.",
    body: "A product arrives in our hands carrying a story that began long before the checkout button.",
  },
  {
    index: 2,
    eyebrow: "The beginning",
    title: "Every choice starts somewhere.",
    body: "Materials, makers, energy, distance and decisions are all part of what makes an everyday purchase possible.",
  },
  {
    index: 3,
    eyebrow: "The unseen",
    title: "Some of the biggest impacts happen out of sight.",
    body: "The things we cannot see at the shelf can still shape communities, waterways, landscapes and livelihoods.",
  },
  {
    index: 4,
    eyebrow: "The connection",
    title: "What feels small can become meaningful at scale.",
    body: "A single decision is one point in a much larger network of people, places and resources.",
  },
  {
    index: 5,
    eyebrow: "The signal",
    title: "Buying is also a signal about what matters.",
    body: "Demand can encourage better materials, fairer practices and businesses willing to make a different choice.",
  },
  {
    index: 6,
    eyebrow: "The possibility",
    title: "Good does not have to feel complicated.",
    body: "The goal is not perfect consumption. It is making better information easier to notice and act on.",
  },
  {
    index: 7,
    eyebrow: "The shift",
    title: "Understanding changes the way a choice feels.",
    body: "Once the hidden connections become visible, an ordinary purchase can carry a little more intention.",
  },
  {
    index: 8,
    eyebrow: "The invitation",
    title: "Now, let us follow the ripple.",
    body: "This is the point where curiosity becomes understanding, and understanding can become action.",
  },
];

const photos = [
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    alt: "Wide coastal water and warm light",
    label: "Coast / open water",
  },
  {
    src: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57",
    alt: "Calm blue water meeting a natural shoreline",
    label: "Shore / connection",
  },
  {
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    alt: "Sunlight moving across a green landscape",
    label: "Land / possibility",
  },
];

export function CuriosityUnderstanding() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const cardsEls = gsap.utils.toArray<HTMLElement>(".understanding-card");
        const photoEls = gsap.utils.toArray<HTMLElement>(".understanding-photo");

        gsap.set(cardsEls, { opacity: 0, y: 70, scale: 0.96, rotate: 1 });
        gsap.set(cardsEls[0], { opacity: 1, y: 0, scale: 1, rotate: 0 });
        gsap.set(photoEls, { opacity: 0, y: 70 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=500%",
            scrub: 1.25,
            pin: true,
            anticipatePin: 1,
          },
        });

        cardsEls.forEach((card, index) => {
          if (index === 0) {
            tl.to(card, { y: -18, scale: 1.015, duration: 0.72, ease: "none" }, 0.15);
          } else {
            const previous = cardsEls[index - 1];
            tl.to(previous, {
              y: -90,
              scale: 0.91,
              rotate: index % 2 ? -2 : 2,
              opacity: 0,
              duration: 0.88,
              ease: "power2.inOut",
            })
              .fromTo(
                card,
                { opacity: 0, y: 90, scale: 0.93, rotate: index % 2 ? 2 : -2 },
                { opacity: 1, y: 0, scale: 1, rotate: 0, duration: 0.92, ease: "power2.out" },
                "<0.18"
              )
              .to(card, {
                y: -18,
                scale: 1.015,
                duration: 0.58,
                ease: "none",
              });
          }

          if (index === 1 || index === 4 || index === 7) {
            const photoIndex = index === 1 ? 0 : index === 4 ? 1 : 2;
            const photo = photoEls[photoIndex];
            tl.fromTo(
              photo,
              { opacity: 0, x: index % 2 ? 80 : -80, y: 50 },
              { opacity: 0.88, x: 0, y: 0, duration: 0.78, ease: "power2.out" },
              "<0.08"
            ).to(
              photo,
              {
                opacity: 0,
                x: index % 2 ? -70 : 70,
                duration: 0.8,
                ease: "power2.inOut",
              },
              "+=0.12"
            );
          }
        });

        tl.to(".understanding-intro", { y: -35, opacity: 0.3, duration: 0.7 }, 0)
          .to(".understanding-progress", { scaleX: 1, duration: 0.98, ease: "none" }, 0);

        return () => tl.kill();
      });

      mm.add("(max-width: 767px)", () => {
        const cardsEls = gsap.utils.toArray<HTMLElement>(".understanding-card");
        const photoEls = gsap.utils.toArray<HTMLElement>(".understanding-photo");

        cardsEls.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 45 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                end: "top 58%",
                scrub: 0.95,
              },
            }
          );
        });

        photoEls.forEach((photo) => {
          gsap.fromTo(
            photo,
            { opacity: 0, scale: 1.04 },
            {
              opacity: 0.88,
              scale: 1,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: photo,
                start: "top 92%",
                end: "top 58%",
                scrub: 0.8,
              },
            }
          );
        });
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      aria-labelledby="understanding-title"
      className="understanding-section relative overflow-hidden bg-sand text-ocean-950"
    >
      <div className="understanding-stage relative min-h-[100svh]">
        <div className="understanding-intro absolute left-6 top-8 z-20 max-w-sm sm:left-10 sm:top-12 lg:left-16">
          <p className="eyebrow">Curiosity → Understanding</p>
          <h2
            id="understanding-title"
            className="mt-4 max-w-md font-display text-3xl leading-[1.02] tracking-[-0.035em] sm:text-4xl"
          >
            Look a little closer.
          </h2>
        </div>

        <div className="understanding-progress absolute inset-x-6 bottom-7 z-20 h-px origin-left scale-x-0 bg-ocean-950/25 sm:inset-x-10 lg:inset-x-16">
          <span className="absolute -top-2 left-0 text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-ocean-950/45">
            Understanding
          </span>
        </div>

        <div className="understanding-photo-layer absolute inset-0 z-0" aria-hidden="true">
          <PhotoBand {...photos[0]} index={0} />
          <PhotoBand {...photos[1]} index={1} />
          <PhotoBand {...photos[2]} index={2} />
        </div>

        <div className="understanding-cards absolute inset-0 z-10">
          {cards.map((card) => (
            <StoryCard key={card.index} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
