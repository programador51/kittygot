"use server";

import { cookies } from "next/headers";
import { AGE_COOKIE, isAgeChoice, type AgeChoice } from "@/lib/age";

function cookieOptions(maxAge?: number) {
  return {
    path: "/",
    sameSite: "lax" as const,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    ...(maxAge === undefined ? {} : { maxAge }),
  };
}

export async function setAgePreference(choice: AgeChoice, remember: boolean) {
  if (!isAgeChoice(choice)) return;

  const jar = await cookies();
  jar.set(
    AGE_COOKIE,
    choice,
    cookieOptions(remember ? 60 * 60 * 24 * 365 : undefined),
  );
}

export async function clearAgePreference() {
  const jar = await cookies();
  jar.set(AGE_COOKIE, "", cookieOptions(0));
}
