import { BuyingForGoodHero } from "@/components/buying-for-good/BuyingForGoodHero";
import { CuriosityUnderstanding } from "@/components/buying-for-good/CuriosityUnderstanding";
import { WhatIfBigIdea } from "@/components/buying-for-good/WhatIfBigIdea";
import { WelcomeHowItWorks } from "@/components/buying-for-good/WelcomeHowItWorks";

export default function Home() {
  return (
    <main>
      <BuyingForGoodHero />
      <CuriosityUnderstanding />
      <WhatIfBigIdea />
      <WelcomeHowItWorks />
    </main>
  );
}
