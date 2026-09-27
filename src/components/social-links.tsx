import type { SocialLink } from "@/data/profile";

function SocialIcon({ id }: { id: SocialLink["id"] }) {
  const common = "size-5 shrink-0";
  if (id === "fansly") {
    return (
      <svg viewBox="0 0 24 24" className={common} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 3.2 14.1 9.9 20.8 12 14.1 14.1 12 20.8 9.9 14.1 3.2 12 9.9 9.9 12 3.2Z" />
      </svg>
    );
  }
  if (id === "instagram") {
    return (
      <svg viewBox="0 0 24 24" className={common} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="4" width="16" height="16" rx="4" />
        <circle cx="12" cy="12" r="3.4" />
        <circle cx="17.2" cy="6.8" r="0.7" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (id === "manyvids") {
    return (
      <svg viewBox="0 0 24 24" className={common} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3.5" y="6" width="17" height="12" rx="2" />
        <path d="M10 9.2v5.6l5-2.8-5-2.8Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={common} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 12h8M12 7.5 16.5 12 12 16.5" />
      <circle cx="12" cy="12" r="8" />
    </svg>
  );
}

export function SocialLinks({ links }: { links: SocialLink[] }) {
  return (
    <ul className="mt-6 flex flex-col gap-3">
      {links.filter((link) => link.href.trim() !== "").map((link) => (
        <li key={link.id}>
          <a
            href={link.href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${link.label} ${link.handle}, opens in a new tab`}
            className="group flex min-h-16 items-center justify-between gap-3 border border-line bg-raised px-4 py-3 no-underline transition hover:border-gold"
          >
            <span className="flex min-w-0 items-center gap-3">
              <span className="text-gold">
                <SocialIcon id={link.id} />
              </span>
              <span className="min-w-0 text-left">
                <span className="block font-display text-sm tracking-[0.16em] uppercase">{link.label}</span>
                <span className="block truncate font-body text-lg text-muted">{link.handle}</span>
              </span>
            </span>
            <span aria-hidden className="font-display text-gold transition group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
