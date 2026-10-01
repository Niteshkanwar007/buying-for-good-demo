"use client";

import { useId, useState } from "react";

const details = [
  {
    title: "What should be clear?",
    body: "Visitors should be able to understand the path from an everyday purchase to charitable contribution without needing to infer the mechanics.",
  },
  {
    title: "What needs to be documented?",
    body: "The final implementation should publish the specific financial, operational and governance details that substantiate how the model works. Those details are not supplied in this prototype brief.",
  },
  {
    title: "What is intentionally not claimed here?",
    body: "This demo does not state percentages, dollar amounts, named organisations, partner relationships, governance arrangements or impact results.",
  },
];

export function GovernanceDetails() {
  const [open, setOpen] = useState<number | null>(null);
  const id = useId();

  return (
    <section aria-labelledby="governance-title" className="trust-governance bg-sand px-6 py-24 text-ocean-950 sm:px-10 sm:py-32 lg:px-16">
      <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
        <div>
          <p className="eyebrow">Details, when you need them</p>
          <h2 id="governance-title" className="mt-5 font-display text-4xl leading-[0.98] tracking-[-0.04em] sm:text-5xl">
            Trust should be easy to inspect.
          </h2>
          <p className="mt-6 max-w-md text-sm leading-7 text-ocean-950/62 sm:text-base sm:leading-8">
            Start with the simple story. Open the detail only when you want to look closer.
          </p>
        </div>

        <div className="divide-y divide-ocean-950/12 border-y border-ocean-950/12">
          {details.map((detail, index) => {
            const isOpen = open === index;
            const panelId = id + "-panel-" + index;
            const buttonId = id + "-button-" + index;

            return (
              <div key={detail.title}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ocean-700 focus-visible:ring-offset-4"
                  >
                    <span className="font-display text-2xl leading-tight sm:text-3xl">{detail.title}</span>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ocean-950/15 text-xl font-light" aria-hidden="true">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!isOpen}>
                  <p className="max-w-2xl pb-7 pr-12 text-sm leading-7 text-ocean-950/65 sm:text-base sm:leading-8">
                    {detail.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
