"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { setAgePreference } from "@/app/actions/age";
import { Ornament, Panel } from "@/components/ornament";

export function AgeGate() {
  const router = useRouter();
  const [remember, setRemember] = useState(false);
  const [pending, startTransition] = useTransition();

  function choose(choice: "allow" | "deny") {
    startTransition(async () => {
      await setAgePreference(choice, remember);
      router.refresh();
    });
  }

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-5.5rem)] w-full max-w-lg items-center px-4 py-8">
      <Panel className="w-full text-center">
        <Ornament />
        <h1 className="mt-5 font-display text-3xl tracking-[0.18em] uppercase sm:text-4xl">Adults only</h1>
        <p className="mx-auto mt-4 max-w-sm font-body text-xl leading-snug text-muted">
          This page shares adult social links and media previews. You must be 18 or older to continue.
        </p>
        <label className="mx-auto mt-6 flex max-w-xs cursor-pointer items-start gap-3 text-left font-body text-lg leading-snug">
          <input
            type="checkbox"
            checked={remember}
            onChange={(event) => setRemember(event.target.checked)}
            className="mt-1 size-4 shrink-0 accent-[#6e2432]"
          />
          <span>Remember my choice on this device</span>
        </label>
        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            disabled={pending}
            onClick={() => choose("allow")}
            className="min-h-12 bg-[#6e2432] px-4 font-display text-sm tracking-[0.16em] text-[#f8f1e8] uppercase transition hover:bg-[#581c28] disabled:opacity-60"
          >
            I am 18 or older
          </button>
          <button
            type="button"
            disabled={pending}
            onClick={() => choose("deny")}
            className="min-h-12 border border-line px-4 font-display text-sm tracking-[0.16em] uppercase transition hover:border-gold disabled:opacity-60"
          >
            Leave
          </button>
        </div>
      </Panel>
    </div>
  );
}
