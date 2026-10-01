import Image from "next/image";

type PhotoBandProps = {
  src: string;
  alt: string;
  label: string;
  index: number;
  priority?: boolean;
};

export function PhotoBand({ src, alt, label, index }: PhotoBandProps) {
  return (
    <figure
      className="understanding-photo absolute left-1/2 w-[120vw] -translate-x-1/2 overflow-hidden opacity-0 sm:w-[110vw]"
      data-photo={index}
    >
      <div className="relative h-[18vh] min-h-36 max-h-56 sm:h-[20vh]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 767px) 120vw, 110vw"
          className="object-cover saturate-[0.75] contrast-[0.95]"
          priority={priority}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ocean-950/60 via-transparent to-ocean-950/30" />
        <figcaption className="absolute inset-x-6 bottom-5 flex items-center justify-between text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-white/80 sm:inset-x-10">
          <span>{label}</span>
          <span aria-hidden="true">Buying for Good</span>
        </figcaption>
      </div>
    </figure>
  );
}
