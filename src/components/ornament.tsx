export function Ornament() {
  return (
    <div aria-hidden className="flex items-center justify-center gap-3 text-gold">
      <span className="h-px w-8 bg-gold/70 sm:w-12" />
      <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
        <path
          d="M9 1.4 10.45 7.55 16.6 9 10.45 10.45 9 16.6 7.55 10.45 1.4 9 7.55 7.55 9 1.4Z"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
      <span className="h-px w-8 bg-gold/70 sm:w-12" />
    </div>
  );
}

export function Panel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative border border-line bg-[var(--panel)] px-5 py-8 shadow-[0_24px_70px_rgb(28_18_22_/_0.12)] sm:px-8 ${className}`}>
      <span aria-hidden className="pointer-events-none absolute top-2 left-2 size-4 border-t border-l border-gold" />
      <span aria-hidden className="pointer-events-none absolute top-2 right-2 size-4 border-t border-r border-gold" />
      <span aria-hidden className="pointer-events-none absolute bottom-2 left-2 size-4 border-b border-l border-gold" />
      <span aria-hidden className="pointer-events-none absolute right-2 bottom-2 size-4 border-r border-b border-gold" />
      {children}
    </div>
  );
}

export function Monogram({ letters, src }: { letters: string; src?: string }) {
  const picture = src?.trim();
  return (
    <div className="mx-auto grid size-24 place-items-center rounded-full border border-gold/80">
      <div className="grid size-[5.15rem] place-items-center overflow-hidden rounded-full border border-blood/80">
        {picture ? (
          // Portrait may be a local file or a remote URL, so this stays a plain image.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={picture} alt="" className="size-full object-cover" />
        ) : (
          <span className="font-display text-xl tracking-[0.22em] text-ink">{letters}</span>
        )}
      </div>
    </div>
  );
}
