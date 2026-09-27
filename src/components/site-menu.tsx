"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ThemeToggle } from "@/components/theme-toggle";

const items = [
  { href: "#about", label: "About" },
  { href: "#socials", label: "Socials" },
  { href: "#catalogue", label: "Catalogue" },
] as const;

export function SiteMenu() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("button")?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = [...panelRef.current.querySelectorAll<HTMLElement>("a, button")];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      openButtonRef.current?.focus();
    };
  }, [open]);

  return (
    <nav aria-label="Page" className="flex">
      <button
        ref={openButtonRef}
        type="button"
        className="grid size-11 place-items-center text-ink md:hidden"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label="Open menu"
        onClick={() => setOpen(true)}
      >
        <svg viewBox="0 0 24 24" className="size-5" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>
      <ul className="hidden md:flex">
        {items.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="flex min-h-11 items-center px-4 font-display text-[0.68rem] tracking-[0.16em] text-ink uppercase transition-colors hover:bg-[#6e2432] hover:text-[#f8f1e8]"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      {open
        ? createPortal(
            <div
              ref={panelRef}
              id={menuId}
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="fixed inset-0 z-[80] flex flex-col bg-bg md:hidden"
            >
          <div className="flex justify-end px-3 py-3">
            <button
              type="button"
              className="grid size-11 place-items-center border border-line text-ink"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <svg viewBox="0 0 24 24" className="size-5" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>
          <ul className="flex flex-1 flex-col items-center justify-center gap-8">
            {items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="px-4 py-2 font-display text-2xl tracking-[0.18em] text-ink uppercase transition-colors hover:bg-[#6e2432] hover:text-[#f8f1e8]"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex justify-center px-4 pb-10">
            <ThemeToggle className="border border-line bg-raised" />
          </div>
            </div>,
            document.body,
          )
        : null}
    </nav>
  );
}
