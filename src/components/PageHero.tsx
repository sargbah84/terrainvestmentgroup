import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import { Eyebrow } from "./ui";

/** Banner at the top of every inner page: photo, dark-green wash, breadcrumb. */
export default function PageHero({
  eyebrow,
  title,
  lead,
  image = "/images/impact-cocoa-leaves.jpg",
  crumbs = [],
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  image?: string;
  crumbs?: { label: string; href?: string }[];
}) {
  return (
    <section className="relative isolate overflow-hidden bg-forest">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="hero-zoom -z-10 object-cover opacity-40"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest via-forest/85 to-forest/40" />

      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/70">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-mint">
                Home
              </Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex items-center gap-2">
                <span aria-hidden>/</span>
                {c.href ? (
                  <Link href={c.href} className="hover:text-mint">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-white">{c.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <Reveal>
          <Eyebrow light>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
            {title}
          </h1>
        </Reveal>
        {lead && (
          <Reveal delay={240}>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85">{lead}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
