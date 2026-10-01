export type StoryCardData = {
  index: number;
  eyebrow: string;
  title: string;
  body: string;
};

type StoryCardProps = StoryCardData;

export function StoryCard({ index, eyebrow, title, body }: StoryCardProps) {
  return (
    <article
      className="understanding-card absolute left-1/2 top-1/2 w-[min(31rem,78vw)] -translate-x-1/2 -translate-y-1/2 rounded-[1.75rem] border border-ocean-950/10 bg-[#f7f3ea]/95 p-7 shadow-[0_24px_80px_rgba(6,43,53,0.12)] backdrop-blur-sm sm:p-9 lg:p-10"
      data-card={index}
    >
      <div className="flex items-start justify-between gap-6">
        <span className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-ocean-700">
          {eyebrow}
        </span>
        <span className="font-display text-3xl leading-none text-ocean-700/35">
          {String(index).padStart(2, "0")}
        </span>
      </div>

      <h3 className="mt-12 max-w-md font-display text-3xl leading-[1.02] tracking-[-0.035em] text-ocean-950 sm:text-4xl">
        {title}
      </h3>

      <p className="mt-5 max-w-md text-sm leading-6 text-ocean-950/65 sm:text-base sm:leading-7">
        {body}
      </p>
    </article>
  );
}
