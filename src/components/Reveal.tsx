"use client";

import { useEffect, useRef } from "react";

export type RevealVariant = "up" | "left" | "right" | "zoom" | "fade";

/**
 * Fades/slides its children in the first time they scroll into view.
 * Elements already on screen at load animate immediately, which gives the
 * page-load entrance. Hidden-until-visible styling only applies once the
 * `reveal-ready` class is on <html> (set by an inline script in the layout),
 * so content is never hidden without JavaScript. Respects reduced motion via
 * CSS in globals.css.
 */
export default function Reveal({
  children,
  variant = "up",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  variant?: RevealVariant;
  /** Milliseconds; use for staggering items in a list. */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal={variant}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={className}
    >
      {children}
    </div>
  );
}
