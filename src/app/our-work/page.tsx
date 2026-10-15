import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import { ArrowRightIcon, Icon } from "@/components/icons";
import { SectionHeading } from "@/components/ui";
import { SECTORS } from "@/lib/site";
import StatusBadge from "./StatusBadge";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Strategic investments across Agriculture, Real Estate, Transportation, Technology, and Digital Content Development in Liberia.",
  alternates: { canonical: "/our-work" },
};

const APPROACH = [
  { step: "01", title: "Identify", text: "We look for sectors and entrepreneurs with real potential to create jobs and value in Liberia." },
  { step: "02", title: "Invest", text: "We commit patient capital, people, and on-the-ground management — not just money." },
  { step: "03", title: "Build", text: "We work alongside local communities to build durable operations and skills." },
  { step: "04", title: "Scale", text: "We connect what works to partners and markets to grow its impact." },
];

export default function OurWorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Work"
        title="Strategic Investments Across Key Sectors"
        lead="We invest in high-potential opportunities that drive economic growth, create jobs, and strengthen communities across Liberia."
        image="/images/hero-cocoa-valley-sunrise.jpg"
        crumbs={[{ label: "Our Work" }]}
      />

      <section className="bg-paper">
        <div className="mx-auto max-w-7xl space-y-10 px-5 py-20 lg:px-8">
          {SECTORS.map((s, i) => (
            <article
              key={s.slug}
              className="grid overflow-hidden rounded-3xl border border-line bg-white shadow-sm lg:grid-cols-2"
            >
              <div className={`relative min-h-[260px] ${i % 2 ? "lg:order-2" : ""}`}>
                <Image src={s.image} alt={s.title} fill sizes="(min-width:1024px) 640px, 100vw" className="object-cover" />
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-12">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-leaf-soft text-brand">
                    <Icon name={s.icon} className="h-6 w-6" />
                  </span>
                  <StatusBadge status={s.status} />
                </div>
                <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-ink">{s.title}</h2>
                <p className="mt-3 leading-relaxed text-body">{s.intro}</p>
                {s.ventures && (
                  <p className="mt-4 text-sm text-muted">
                    Operating as{" "}
                    <span className="font-bold text-ink">{s.ventures.map((v) => v.name).join(", ")}</span>
                  </p>
                )}
                <Link
                  href={`/our-work/${s.slug}`}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:underline"
                >
                  Learn more about {s.title}
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-canvas">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <SectionHeading center eyebrow="Our Approach" title="How We Invest" lead="A hands-on model built for Liberia's realities." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {APPROACH.map((a) => (
              <div key={a.step} className="rounded-2xl border border-line bg-white p-6 shadow-sm">
                <span className="text-4xl font-extrabold text-leaf/30">{a.step}</span>
                <h3 className="mt-2 text-lg font-bold text-ink">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
