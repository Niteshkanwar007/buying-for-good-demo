import Image from "next/image";

type PhotoBandProps = {
  src: string;
  alt: string;
  label: string;
  index: number;
};

export function PhotoBand({ src, alt, label, index }: PhotoBandProps) {
  return (
    <figure
      className="understanding-photo absolute left-1/2 w-[120vw] -translate-x-1/2 overflow-hidden opacity-0 sm:w-[110vw]"
      data-photo={index}
    >
      <div className="relative h-[21vh] min-h-40 max-h-72 sm:h-[23vh]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 767px) 120vw, 110vw"
          className="understanding-photo-image object-cover object-center contrast-[1.04]"
          priority={index === 0}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ocean-950/62 via-ocean-950/10 to-ocean-950/28" />
        <figcaption className="absolute inset-x-6 bottom-5 flex items-center justify-between text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-white/84 sm:inset-x-10">
          <span>{label}</span>
          <span aria-hidden="true">Buying for Good</span>
        </figcaption>
      </div>
    </figure>
  );
}
