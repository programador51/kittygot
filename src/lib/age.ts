export const AGE_COOKIE = "kittygot_age";

export type AgeChoice = "allow" | "deny";

export function isAgeChoice(value: string | undefined): value is AgeChoice {
  return value === "allow" || value === "deny";
}
