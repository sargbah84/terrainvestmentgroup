"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import { NAV } from "@/lib/site";
import {
  ArrowRightIcon,
  ChevronDownIcon,
  CloseIcon,
  MenuIcon,
} from "./icons";

/** Scroll distance before the header may hide on scroll-down. */
const HIDE_AFTER = 320;

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

/**
 * Fixed site header with scroll behavior:
 * - slides down on page load,
 * - shrinks and turns solid with a shadow once the page is scrolled,
 * - hides while scrolling down and returns when scrolling up,
 * - shows a reading-progress bar along its bottom edge.
 */
export default function Header() {
  const pathname = usePathname();
  // The mobile menu stays open only on the page where it was opened,
  // so navigating anywhere closes it without an effect.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (fn: (v: boolean) => boolean) => setOpenOn(fn(open) ? pathname : null);

  const [scrolled, setScrolled] = useState(false);
  const [hiddenOnScroll, setHiddenOnScroll] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      setScrolled(y > 8);

      // Ignore tiny jitters so the header doesn't flicker.
      const delta = y - lastY;
      if (Math.abs(delta) > 6) {
        setHiddenOnScroll(delta > 0 && y > HIDE_AFTER);
        lastY = y;
      }

      // Progress bar is updated directly to avoid a re-render per frame.
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Never hide while the mobile menu is open.
  const hidden = hiddenOnScroll && !open;
  const solid = scrolled || open;

  return (
    <header
      // Keyboard users tabbing into a hidden header bring it back.
      onFocusCapture={() => setHiddenOnScroll(false)}
      className={`header-in fixed inset-x-0 top-0 z-50 border-b transition-[translate,background-color,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${
        solid
          ? "border-line bg-white/95 shadow-[0_8px_30px_rgba(12,40,41,0.08)] backdrop-blur-md"
          : "border-transparent bg-white/80 backdrop-blur"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:px-8 ${
          scrolled ? "h-16" : "h-[76px]"
        }`}
      >
        <div
          className={`origin-left transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            scrolled ? "scale-[0.88]" : ""
          }`}
        >
          <Logo />
        </div>

        <nav aria-label="Main" className="hidden h-full lg:block">
          <ul className="flex h-full items-center gap-8">
            {NAV.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href} className="group relative flex h-full items-center">
                  <Link
                    href={item.href}
                    className={`group/link relative flex items-center gap-1 py-2 text-[15px] font-medium transition-colors ${
                      active ? "text-brand" : "text-ink hover:text-brand"
                    }`}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDownIcon className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                    )}
                    {/* Underline: full on the active page, grows from center on hover. */}
                    <span
                      className={`absolute inset-x-0 -bottom-0.5 h-[3px] rounded-full bg-brand transition-transform duration-300 ease-out ${
                        active ? "scale-x-100" : "scale-x-0 group-hover/link:scale-x-100"
                      }`}
                    />
                  </Link>

                  {item.children && (
                    // pt-3 bridges the gap so the menu stays open while the pointer moves down.
                    <div className="invisible absolute left-1/2 top-full w-[420px] -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition-all duration-300 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="rounded-2xl border border-line bg-white p-3 shadow-xl">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block rounded-xl px-4 py-3 transition-colors hover:bg-leaf-soft"
                          >
                            <span className="block text-sm font-bold text-ink">
                              {child.label}
                            </span>
                            {child.description && (
                              <span className="mt-0.5 block text-xs text-muted">
                                {child.description}
                              </span>
                            )}
                          </Link>
                        ))}
                        <Link
                          href={item.href}
                          className="mt-1 flex items-center gap-1.5 rounded-xl px-4 py-3 text-sm font-bold text-brand hover:bg-leaf-soft"
                        >
                          View all sectors
                          <ArrowRightIcon className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact?subject=Partnership"
            className="hidden items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-md sm:inline-flex"
          >
            Partner With Us
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-ink hover:bg-leaf-soft lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Reading progress */}
      <div
        ref={progressRef}
        aria-hidden
        style={{ transform: "scaleX(0)" }}
        className="pointer-events-none absolute inset-x-0 -bottom-px h-[3px] origin-left bg-gradient-to-r from-brand via-leaf to-mint"
      />

      {/* Mobile navigation */}
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="max-h-[calc(100vh-76px)] overflow-y-auto border-t border-line bg-white px-5 pb-6 lg:hidden"
        >
          <ul className="divide-y divide-line">
            {NAV.map((item) => (
              <li key={item.href} className="py-1">
                <Link
                  href={item.href}
                  className={`block py-3 text-base font-semibold ${
                    isActive(pathname, item.href) ? "text-brand" : "text-ink"
                  }`}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <ul className="mb-2 ml-3 border-l-2 border-leaf-soft pl-4">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block py-2 text-sm font-medium text-body hover:text-brand"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <Link
            href="/contact?subject=Partnership"
            className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-bold text-white"
          >
            Partner With Us
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </nav>
      )}
    </header>
  );
}
