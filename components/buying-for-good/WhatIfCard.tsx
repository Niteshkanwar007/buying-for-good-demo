type WhatIfCardProps = {
  index: number;
  question: string;
  answer: string;
};

export function WhatIfCard({ index, question, answer }: WhatIfCardProps) {
  return (
    <article className="what-if-card absolute left-1/2 top-1/2 w-[min(30rem,78vw)] -translate-x-1/2 -translate-y-1/2 rounded-[1.75rem] border border-white/15 bg-ocean-950/92 p-7 text-sand shadow-[0_28px_90px_rgba(6,43,53,0.24)] backdrop-blur-md sm:p-9 lg:p-10">
      <div className="flex items-center justify-between">
        <span className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-sand/55">What if</span>
        <span className="font-display text-3xl leading-none text-sand/25">0{index}</span>
      </div>
      <h3 className="mt-12 font-display text-4xl leading-[0.98] tracking-[-0.04em] sm:text-5xl">{question}</h3>
      <p className="mt-6 max-w-md text-sm leading-7 text-sand/68 sm:text-base">{answer}</p>
    </article>
  );
}
