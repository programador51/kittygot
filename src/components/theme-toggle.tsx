"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const modes = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
  { id: "system", label: "System" },
] as const;

function subscribe() {
  return () => {};
}

function ThemeIcon({ id }: { id: (typeof modes)[number]["id"] }) {
  const common = "size-5";
  if (id === "light") {
    return (
      <svg viewBox="0 0 24 24" className={common} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3.4" />
        <path d="M12 3.2v2M12 18.8v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M3.2 12h2M18.8 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
      </svg>
    );
  }
  if (id === "dark") {
    return (
      <svg viewBox="0 0 24 24" className={common} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16.8 14.6A6.4 6.4 0 0 1 9.4 6.2 6.6 6.6 0 1 0 16.8 14.6Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={common} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="4.5" width="16" height="11" rx="1.5" />
      <path d="M9 19.5h6M12 15.5v4" />
    </svg>
  );
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  return (
    <div role="group" aria-label="Color theme" className={`flex ${className}`}>
      {modes.map((mode) => {
        const selected = mounted && theme === mode.id;
        return (
          <button
            key={mode.id}
            type="button"
            aria-label={mode.label}
            aria-pressed={selected}
            onClick={() => setTheme(mode.id)}
            className={`grid size-11 place-items-center transition ${
              selected ? "bg-[#6e2432] text-[#f8f1e8]" : "text-ink hover:text-blood"
            }`}
          >
            <ThemeIcon id={mode.id} />
          </button>
        );
      })}
    </div>
  );
}
