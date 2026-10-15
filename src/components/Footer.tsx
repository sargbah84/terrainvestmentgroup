import Link from "next/link";
import Logo from "./Logo";
import { NAV, SITE_NAME, SOCIALS } from "@/lib/site";
import { SOCIAL_ICONS } from "./icons";

export default function Footer() {
  const socials = SOCIALS.filter((s) => s.href);

  return (
    <footer className="bg-forest-2 text-white">
      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-between">
          <Logo light />

          <nav aria-label="Footer">
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-white/85">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-mint">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex items-center gap-4">
            {socials.map((s) => {
              const Icon = SOCIAL_ICONS[s.name];
              return (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="text-white transition-colors hover:text-mint"
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <p className="mt-8 text-center text-xs text-white/60">
          &copy; {new Date().getFullYear()} {SITE_NAME}. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
