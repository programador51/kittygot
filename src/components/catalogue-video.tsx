"use client";

import { useEffect, useRef } from "react";

export function CatalogueVideo({
  src,
  poster,
  label,
}: {
  src: string;
  poster: string | null;
  label: string;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const backdropRef = useRef<HTMLVideoElement>(null);

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

    const onVisibility = () => {
      if (document.visibilityState !== "visible") stop();
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) stop();
    });

    observer.observe(frame);
    video.addEventListener("play", syncBackdrop);
    video.addEventListener("pause", onPause);
    video.addEventListener("seeked", syncBackdrop);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      video.removeEventListener("play", syncBackdrop);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("seeked", syncBackdrop);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

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
          loop
          playsInline
          preload="metadata"
          poster={poster ?? undefined}
          aria-label={label}
          className="max-h-full max-w-full"
          src={src}
        />
      </div>
    </div>
  );
}
