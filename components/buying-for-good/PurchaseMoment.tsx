"use client";

import Image from "next/image";

type PurchaseMomentProps = {
  index: number;
  category: string;
  title: string;
  detail: string;
  image: string;
  imageAlt: string;
  active?: boolean;
};

export function PurchaseMoment({ index, category, title, detail, image, imageAlt, active = false }: PurchaseMomentProps) {
  return (
    <article
      aria-current={active ? "step" : undefined}
      className="purchase-moment relative min-h-[28rem] overflow-hidden rounded-[1.75rem] border border-ocean-950/10 bg-ocean-950 text-sand shadow-[0_28px_90px_rgba(6,43,53,0.2)] sm:min-h-[32rem]"
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes="(max-width: 767px) 100vw, 42rem"
        className="purchase-moment-image object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ocean-950 via-ocean-950/38 to-ocean-950/5" aria-hidden="true" />
      <div className="relative z-10 flex min-h-[28rem] flex-col justify-between p-6 sm:min-h-[32rem] sm:p-8">
        <div className="flex items-start justify-between gap-5">
          <span className="rounded-full border border-sand/20 bg-ocean-950/20 px-3 py-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-sand/84 backdrop-blur-sm">
            {category}
          </span>
          <span className="font-display text-3xl leading-none text-sand/42">
            {String(index).padStart(2, "0")}
          </span>
        </div>
        <div className="max-w-xl">
          <h3 className="font-display text-4xl leading-[0.94] tracking-[-0.045em] text-sand sm:text-5xl">
            {title}
          </h3>
          <p className="mt-4 max-w-md text-sm leading-7 text-sand/76 sm:text-base sm:leading-7">
            {detail}
          </p>
        </div>
      </div>
    </article>
  );
}
