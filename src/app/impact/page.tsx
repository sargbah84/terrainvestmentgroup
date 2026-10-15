import type { Metadata } from "next";
import Image from "next/image";
import CtaBand from "@/components/CtaBand";
import ImpactBand from "@/components/ImpactBand";
import PageHero from "@/components/PageHero";
import { Icon, PinIcon } from "@/components/icons";
import { SectionHeading } from "@/components/ui";
import { COMMUNITIES, GALLERY, type IconName } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Impact",
  description:
    "42 acres cultivated, 20,163 cocoa trees planted, and 1,113 people impacted across communities in Liberia.",
  alternates: { canonical: "/impact" },
};

const PROGRAMS: { icon: IconName; title: string; text: string }[] = [
  { icon: "users", title: "Job Creation", text: "Caretakers, nursery workers, builders, and creators hired directly from the communities we serve." },
  { icon: "sprout", title: "Training & Skills", text: "Hands-on agronomy, construction, and digital skills that stay with people for life." },
  { icon: "leaf", title: "Sustainable Farming", text: "Shade-grown cocoa and responsible land use that protect soil and forest for future generations." },
  { icon: "handshake", title: "Community Partnerships", text: "Working with local leaders so every project reflects community priorities." },
];

export default function ImpactPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Impact"
        title="Stronger Communities Through Shared Opportunity"
        lead="Our work goes beyond business. We partner with local communities to create jobs, provide training, and support sustainable development that builds a more resilient Liberia."
        image="/images/community-nursery.jpg"
        crumbs={[{ label: "Impact" }]}
      />

      <ImpactBand showButton={false} title="By the Numbers" lead="Measured progress from our agriculture program and the communities it supports." />

      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <SectionHeading center eyebrow="How We Create Impact" title="Investing in People and Possibilities" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROGRAMS.map((p) => (
              <div key={p.title} className="rounded-2xl border border-line bg-white p-6 shadow-sm">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-leaf-soft text-brand">
                  <Icon name={p.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Communities */}
      <section className="bg-canvas">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionHeading
              eyebrow="Where We Work"
              title="Rooted in Local Communities"
              lead="Each of our farms is cared for by people from the community itself — creating steady income close to home and keeping local knowledge at the heart of everything we do."
            />
            <ul className="mt-8 space-y-3">
              {COMMUNITIES.map((c) => (
                <li key={c} className="flex items-center gap-3 rounded-xl border border-line bg-white px-5 py-4 shadow-sm">
                  <PinIcon className="h-5 w-5 text-leaf" />
                  <span className="font-bold text-ink">{c}</span>
                  <span className="ml-auto text-xs font-semibold uppercase tracking-wide text-muted">Cocoa farm</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lg">
            <Image src="/images/cocoa-nursery.jpg" alt="Cocoa nursery rows under shade netting" fill sizes="(min-width:1024px) 560px, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="scroll-mt-24 bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <SectionHeading center eyebrow="In the Field" title="Our Work on the Ground" />
          <div className="mt-12 grid auto-rows-[200px] grid-cols-2 gap-4 md:grid-cols-4">
            {GALLERY.map((g, i) => (
              <figure
                key={g.src}
                className={`group relative overflow-hidden rounded-2xl ${
                  i === 0 ? "col-span-2 row-span-2" : ""
                }`}
              >
                <Image
                  src={g.src}
                  alt={g.alt}
                  fill
                  sizes={i === 0 ? "(min-width:768px) 50vw, 100vw" : "(min-width:768px) 25vw, 50vw"}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                  {g.alt}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
