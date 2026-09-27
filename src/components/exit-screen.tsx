"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { clearAgePreference } from "@/app/actions/age";
import { Ornament, Panel } from "@/components/ornament";

export function ExitScreen() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function reconsider() {
    startTransition(async () => {
      await clearAgePreference();
      router.refresh();
    });
  }

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-5.5rem)] w-full max-w-lg items-center px-4 py-8">
      <Panel className="w-full text-center">
        <Ornament />
        <h1 className="mt-5 font-display text-3xl tracking-[0.14em] uppercase sm:text-4xl">This space is for adults</h1>
        <p className="mx-auto mt-4 max-w-sm font-body text-xl leading-snug text-muted">
          You need to be 18 or older to view this site. You can close this tab.
        </p>
        <button
          type="button"
          disabled={pending}
          onClick={reconsider}
          className="mt-8 font-display text-xs tracking-[0.18em] text-muted uppercase underline decoration-gold/70 underline-offset-4 hover:text-ink disabled:opacity-60"
        >
          Change my answer
        </button>
      </Panel>
    </div>
  );
}
