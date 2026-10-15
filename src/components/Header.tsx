"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { NAV } from "@/lib/site";
import {
  ArrowRightIcon,
  ChevronDownIcon,
  CloseIcon,
  MenuIcon,
} from "./icons";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function Header() {
  const pathname = usePathname();
  // The mobile menu stays open only on the page where it was opened,
  // so navigating anywhere closes it without an effect.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (fn: (v: boolean) => boolean) => setOpenOn(fn(open) ? pathname : null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled || open
          ? "border-line bg-white/95 shadow-sm backdrop-blur"
          : "border-transparent bg-white/85 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-6 px-5 lg:px-8">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {NAV.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    className={`relative flex items-center gap-1 py-6 text-[15px] font-medium transition-colors ${
                      active ? "text-brand" : "text-ink hover:text-brand"
                    }`}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDownIcon className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                    )}
                    {active && (
                      <span className="absolute inset-x-0 bottom-4 h-[3px] rounded-full bg-brand" />
                    )}
                  </Link>

                  {item.children && (
                    <div className="invisible absolute left-1/2 top-full w-[420px] -translate-x-1/2 translate-y-2 opacity-0 transition-all group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
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
            className="hidden items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-brand-dark sm:inline-flex"
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
