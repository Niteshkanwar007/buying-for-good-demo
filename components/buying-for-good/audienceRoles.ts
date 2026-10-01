export type AudienceKey = "business" | "charity" | "supporter";

export const audienceOrder: AudienceKey[] = ["business", "charity", "supporter"];

export const audienceLabels: Record<AudienceKey, string> = {
  business: "Business",
  charity: "Charity",
  supporter: "Supporter",
};
