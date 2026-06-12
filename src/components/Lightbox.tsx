"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";

type Active = { src: string; alt: string } | null;

/**
 * Wrap any block of <Image>s and tapping one opens a fullscreen viewer.
 * - Tap image to zoom 2x; tap again to reset
 * - Pinch-zoom is enabled on touch devices
 * - ESC, the close button, or tapping the backdrop closes the viewer
 *
 * Skips images that are inside an <a> (clicks should follow the link).
 */
export function LightboxGallery({
  children,
}: {
  children: React.ReactNode;
}) {
  const [active, setActive] = useState<Active>(null);
  const [zoomed, setZoomed] = useState(false);

  function handleClick(e: MouseEvent<HTMLDivElement>) {
    const target = e.target as HTMLElement;
    const img = target.closest("img") as HTMLImageElement | null;
    if (!img) return;
    if (target.closest("a")) return;
    e.preventDefault();
    setActive({ src: img.currentSrc || img.src, alt: img.alt });
    setZoomed(false);
  }

  function close() {
    setActive(null);
    setZoomed(false);
  }

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active]);

  return (
    <>
      <div onClick={handleClick}>{children}</div>
      {active &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-sea-deep/90 p-4 backdrop-blur-sm"
            onClick={close}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              aria-label="Close image viewer"
              className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-shell/15 text-shell backdrop-blur-sm transition-colors hover:bg-shell/30"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden
              >
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="6" y1="18" x2="18" y2="6" />
              </svg>
            </button>

            <div
              className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 rounded-full bg-shell/10 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-shell/70 backdrop-blur-sm md:block"
              aria-hidden
            >
              {zoomed ? "Click to reset · ESC to close" : "Click to zoom · ESC to close"}
            </div>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.src}
              alt={active.alt}
              onClick={(e) => {
                e.stopPropagation();
                setZoomed((z) => !z);
              }}
              style={{
                cursor: zoomed ? "zoom-out" : "zoom-in",
                transform: zoomed ? "scale(1.8)" : "scale(1)",
                transition: "transform 0.3s ease",
                touchAction: "pinch-zoom",
              }}
              className="max-h-[90vh] max-w-[95vw] rounded-lg object-contain shadow-2xl"
            />
          </div>,
          document.body,
        )}
    </>
  );
}