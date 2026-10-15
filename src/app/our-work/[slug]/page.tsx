import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectorCard from "@/components/SectorCard";
import { CheckIcon, ExternalIcon } from "@/components/icons";
import { ButtonLink, Eyebrow, SectionHeading } from "@/components/ui";
import { SECTORS, getSector } from "@/lib/site";
import StatusBadge from "../StatusBadge";

export function generateStaticParams() {
  return SECTORS.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(props: PageProps<"/our-work/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const sector = getSector(slug);
  if (!sector) return {};
  return {
    title: sector.title,
    description: sector.intro,
    alternates: { canonical: `/our-work/${sector.slug}` },
  };
}

export default async function SectorPage(props: PageProps<"/our-work/[slug]">) {
  const { slug } = await props.params;
  const sector = getSector(slug);
  if (!sector) notFound();

  const others = SECTORS.filter((s) => s.slug !== sector.slug).slice(0, 4);

  return (
    <>
      <PageHero
        eyebrow="Our Work"
        title={sector.title}
        lead={sector.summary}
        image={sector.image}
        crumbs={[{ label: "Our Work", href: "/our-work" }, { label: sector.title }]}
      />

      <section className="bg-paper">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 lg:grid-cols-[1.2fr_1fr] lg:px-8">
          <Reveal variant="left">
            <StatusBadge status={sector.status} />
            <p className="mt-5 text-xl font-semibold leading-relaxed text-ink">{sector.intro}</p>
            <div className="mt-5 space-y-4 leading-relaxed text-body">
              {sector.body.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>

            <h2 className="mt-12 text-2xl font-extrabold text-ink">Focus Areas</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {sector.focus.map((f, i) => (
                <li key={f.title}>
                <Reveal delay={i * 100} className="h-full rounded-2xl border border-line bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-leaf-soft text-brand">
                      <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                    <h3 className="font-bold text-ink">{f.title}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-body">{f.text}</p>
                </Reveal>
                </li>
              ))}
            </ul>
          </Reveal>

          <aside className="lg:sticky lg:top-28 lg:self-start">
          <Reveal variant="right" delay={150} className="space-y-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
              <Image src={sector.image} alt={sector.title} fill sizes="(min-width:1024px) 480px, 100vw" className="object-cover" />
            </div>

            {sector.ventures?.map((v) => (
              <div key={v.name} className="rounded-2xl bg-forest p-6 text-white">
                <Eyebrow light>Our Venture</Eyebrow>
                <p className="mt-3 text-2xl font-extrabold">{v.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/80">{v.text}</p>
                {v.href && (
                  <a
                    href={v.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-mint hover:underline"
                  >
                    Visit {v.name}
                    <ExternalIcon className="h-4 w-4" />
                  </a>
                )}
              </div>
            ))}

            <div className="rounded-2xl border border-line bg-white p-6">
              <p className="text-lg font-bold text-ink">Interested in {sector.title.toLowerCase()}?</p>
              <p className="mt-2 text-sm text-body">
                We&rsquo;re open to partners, co-investors, and suppliers who share our vision.
              </p>
              <ButtonLink href={`/contact?subject=Partnership`} className="mt-4 w-full">
                Talk to Us
              </ButtonLink>
            </div>
          </Reveal>
          </aside>
        </div>
      </section>

      <section className="bg-canvas">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="flex items-end justify-between gap-6">
            <SectionHeading eyebrow="Explore More" title="Other Sectors" />
            <Link href="/our-work" className="hidden text-sm font-bold text-brand hover:underline sm:block">
              View all sectors →
            </Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((s, i) => (
              <Reveal key={s.slug} delay={i * 110}>
                <SectorCard sector={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
