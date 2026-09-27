"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <h1 className="font-display text-2xl tracking-[0.16em] uppercase">Something went wrong</h1>
      <button
        type="button"
        onClick={reset}
        className="mt-6 min-h-11 bg-[#6e2432] px-5 font-display text-xs tracking-[0.16em] text-[#f8f1e8] uppercase"
      >
        Try again
      </button>
    </div>
  );
}
