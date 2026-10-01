import { BuyingForGoodHero } from "@/components/buying-for-good/BuyingForGoodHero";

export default function Home() {
  return (
    <main>
      <BuyingForGoodHero />
      <section
        aria-label="Story continuation"
        className="min-h-[55vh] bg-sand px-6 py-24 text-ocean-950 sm:px-10 lg:px-16"
      >
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow">The story continues</p>
          <p className="mt-5 max-w-2xl font-display text-3xl leading-tight sm:text-5xl">
            One choice can travel further than we think.
          </p>
        </div>
      </section>
    </main>
  );
}
