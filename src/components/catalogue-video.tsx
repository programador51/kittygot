"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

const skipPromptKey = "kittygot_skip_full_prompt";

const prompts = [
  "That was only the tease. The full set is filthier. Want to keep going?",
  "Still horny? This preview stopped. The rest does not.",
  "You stayed until the end. Be honest. You want the full video.",
  "Don't leave yourself hanging. The full media is where it gets good.",
  "The good part starts after this. Open the full set and finish it.",
];

function skippedPrompt() {
  try {
    return localStorage.getItem(skipPromptKey) === "1";
  } catch {
    return false;
  }
}

function rememberSkip() {
  try {
    localStorage.setItem(skipPromptKey, "1");
  } catch {
    // Private mode can block storage. The prompt can show again next time.
  }
}

export function CatalogueVideo({
  src,
  poster,
  label,
  fullHref,
}: {
  src: string;
  poster: string | null;
  label: string;
  fullHref: string | null;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const backdropRef = useRef<HTMLVideoElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef(false);
  const [prompt, setPrompt] = useState<string | null>(null);
  const [skipNext, setSkipNext] = useState(false);
  const titleId = useId();
  skipRef.current = skipNext;

  useEffect(() => {
    const frame = frameRef.current;
    const video = videoRef.current;
    const backdrop = backdropRef.current;
    if (!frame || !video || !backdrop) return;

    const stop = () => {
      video.pause();
      backdrop.pause();
    };

    const syncBackdrop = () => {
      if (Math.abs(backdrop.currentTime - video.currentTime) > 0.35) {
        try {
          backdrop.currentTime = video.currentTime;
        } catch {
          // The backdrop may not have metadata yet.
        }
      }
      if (video.paused) {
        backdrop.pause();
        return;
      }
      void backdrop.play().catch(() => {});
    };

    const onPause = () => {
      backdrop.pause();
    };

    const onEnded = () => {
      backdrop.pause();
      if (skippedPrompt()) return;
      setSkipNext(false);
      setPrompt(prompts[Math.floor(Math.random() * prompts.length)] ?? prompts[0]);
    };

    const onVisibility = () => {
      if (document.visibilityState !== "visible") stop();
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) stop();
    });

    observer.observe(frame);
    video.addEventListener("play", syncBackdrop);
    video.addEventListener("pause", onPause);
    video.addEventListener("ended", onEnded);
    video.addEventListener("seeked", syncBackdrop);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      video.removeEventListener("play", syncBackdrop);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("seeked", syncBackdrop);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    if (!prompt) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (skipRef.current) rememberSkip();
        setPrompt(null);
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = [...dialogRef.current.querySelectorAll<HTMLElement>("a, button, input")];
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
    };
  }, [prompt]);

  function closePrompt() {
    if (skipRef.current) rememberSkip();
    setPrompt(null);
  }

  return (
    <div ref={frameRef} className="relative aspect-[4/5] overflow-hidden bg-[#120c0f]">
      <video
        ref={backdropRef}
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster ?? undefined}
        tabIndex={-1}
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full scale-125 object-cover blur-2xl"
        src={src}
      />
      <div className="relative z-10 flex h-full items-center justify-center">
        <video
          ref={videoRef}
          controls
          playsInline
          preload="metadata"
          poster={poster ?? undefined}
          aria-label={label}
          className="max-h-full max-w-full"
          src={src}
        />
      </div>
      {prompt
        ? createPortal(
            <div className="fixed inset-0 z-[90] grid place-items-center bg-[#0c090c]/75 px-4">
              <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                className="w-full max-w-md border border-line bg-raised px-5 py-8 text-center shadow-[0_24px_70px_rgb(28_18_22_/_0.28)] sm:px-8"
              >
                <p className="font-display text-xs tracking-[0.28em] text-gold uppercase">Preview over</p>
                <p id={titleId} className="mt-4 font-body text-2xl leading-snug text-ink">
                  {prompt}
                </p>
                <label className="mx-auto mt-6 flex max-w-xs cursor-pointer items-start gap-3 text-left font-body text-lg leading-snug text-muted">
                  <input
                    type="checkbox"
                    checked={skipNext}
                    onChange={(event) => setSkipNext(event.target.checked)}
                    className="mt-1 size-4 shrink-0 accent-[#6e2432]"
                  />
                  <span>Don&apos;t ask again for other videos</span>
                </label>
                <div className="mt-6 flex flex-col gap-3">
                  {fullHref ? (
                    <a
                      href={fullHref}
                      target="_blank"
                      rel="noreferrer noopener"
                      onClick={closePrompt}
                      className="inline-flex min-h-12 items-center justify-center bg-[#6e2432] px-4 font-display text-sm tracking-[0.16em] text-[#f8f1e8] uppercase transition hover:bg-[#581c28]"
                    >
                      Watch the full set
                    </a>
                  ) : null}
                  <button
                    type="button"
                    onClick={closePrompt}
                    className="min-h-12 border border-line px-4 font-display text-sm tracking-[0.16em] text-ink uppercase transition hover:border-gold"
                  >
                    Not now
                  </button>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
