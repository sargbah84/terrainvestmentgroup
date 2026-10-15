"use client";

import { useEffect, useRef } from "react";

const format = (n: number) => Math.round(n).toLocaleString("en-US");

/**
 * Counts from 0 up to `value` when scrolled into view (ease-out).
 * The server renders the final number, so crawlers and no-JS visitors see the
 * real figure. On the client the existing text node is updated in place, which
 * keeps React's DOM in sync and avoids a re-render per frame.
 */
export default function CountUp({
  value,
  duration = 2000,
}: {
  value: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current?.firstChild;
    if (!ref.current || !node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    node.nodeValue = format(0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          node.nodeValue = format(value * (1 - Math.pow(1 - p, 3)));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(ref.current);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      node.nodeValue = format(value);
    };
  }, [value, duration]);

  return <span ref={ref}>{format(value)}</span>;
}
