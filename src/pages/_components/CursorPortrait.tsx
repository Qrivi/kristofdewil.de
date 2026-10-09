import type { ImageMetadata } from "astro";

import { useEffect, useRef, useState } from "react";

// Only the eleven views between -75° and 75° are included in this directory.
const portraits = import.meta.glob<ImageMetadata>("/src/assets/portrait-rotation/*.webp", { eager: true, import: "default" });
const frames = Object.entries(portraits)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, image]) => image.src);
const darkPortraits = import.meta.glob<ImageMetadata>("/src/assets/portrait-rotation-dark/*.webp", { eager: true, import: "default" });
const darkFrames = Object.entries(darkPortraits)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, image]) => image.src);
const frontFrame = Math.floor(frames.length / 2);

export default function CursorPortrait() {
  const portrait = useRef<HTMLPictureElement>(null);
  const [frame, setFrame] = useState(frontFrame);
  const [darkMode, setDarkMode] = useState<boolean | null>(null);

  useEffect(() => {
    // Media queries handle the initial render; the site's class also supports a saved theme override.
    const syncTheme = () => setDarkMode(document.documentElement.classList.contains("dark"));
    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const pointer = window.matchMedia("(any-hover: hover) and (any-pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let ready = false;
    let disposed = false;
    let pendingFrame = 0;
    let cursorX: number | null = null;

    // Decode every view before allowing swaps, so moving the cursor never flashes an unloaded image.
    if (pointer.matches && !reducedMotion.matches) preload();

    function preload() {
      void Promise.all(
        [...frames, ...darkFrames].map((src) => {
          const image = new Image();
          image.src = src;
          return image.decode();
        }),
      )
        .then(() => {
          if (!disposed) {
            ready = true;
            scheduleUpdate();
          }
        })
        .catch(() => {
          // Keep the server-rendered front view if a frame cannot load.
        });
    }

    function update() {
      pendingFrame = 0;
      if (!ready || cursorX === null || !portrait.current || !pointer.matches || reducedMotion.matches) return;

      const bounds = portrait.current.getBoundingClientRect();
      const center = bounds.left + bounds.width / 2;
      // Face forward over the portrait, reaching either extreme at the corresponding viewport edge.
      const distance = cursorX - center;
      const range = distance < 0 ? center : window.innerWidth - center;
      const position = Math.max(-1, Math.min(1, distance / Math.max(1, range)));
      setFrame(Math.round(((position + 1) / 2) * (frames.length - 1)));
    }

    function scheduleUpdate() {
      if (!pendingFrame) pendingFrame = window.requestAnimationFrame(update);
    }

    function track(event: PointerEvent) {
      if (event.pointerType === "touch") return;
      cursorX = event.clientX;
      scheduleUpdate();
    }

    function reset() {
      cursorX = null;
      window.cancelAnimationFrame(pendingFrame);
      pendingFrame = 0;
      setFrame(frontFrame);
    }

    function leave(event: PointerEvent) {
      if (event.relatedTarget === null) reset();
    }

    function preferencesChanged() {
      reset();
      if (!ready && pointer.matches && !reducedMotion.matches) preload();
    }

    window.addEventListener("pointermove", track, { passive: true });
    window.addEventListener("pointerout", leave);
    window.addEventListener("blur", reset);
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    pointer.addEventListener("change", preferencesChanged);
    reducedMotion.addEventListener("change", preferencesChanged);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(pendingFrame);
      window.removeEventListener("pointermove", track);
      window.removeEventListener("pointerout", leave);
      window.removeEventListener("blur", reset);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("scroll", scheduleUpdate);
      pointer.removeEventListener("change", preferencesChanged);
      reducedMotion.removeEventListener("change", preferencesChanged);
    };
  }, []);

  return (
    <picture
      ref={portrait}
      className="block aspect-square w-full mix-blend-multiply opacity-40 dark:mix-blend-lighten"
    >
      <source
        srcSet={darkFrames[frame]}
        media={darkMode === null ? "(prefers-color-scheme: dark)" : darkMode ? "all" : "not all"}
      />
      <img
        src={frames[frame]}
        alt="Pencil portrait of Kristof Dewilde"
        width={512}
        height={512}
        draggable={false}
        className="block aspect-square w-full select-none"
      />
    </picture>
  );
}
