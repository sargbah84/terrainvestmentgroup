import type { Metadata } from "next";
import Image from "next/image";
import CtaBand from "@/components/CtaBand";
import ImpactBand from "@/components/ImpactBand";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { CheckIcon, Icon } from "@/components/icons";
import { ButtonLink, Eyebrow, SectionHeading } from "@/components/ui";
import { VENTURES, type IconName } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Formerly Terra Liberia, Terra Investment Group invests in Liberia's most promising sectors through responsible investment, innovation, and community partnerships.",
  alternates: { canonical: "/about" },
};

const VALUES: { icon: IconName; title: string; text: string }[] = [
  { icon: "sprout", title: "Long-Term Thinking", text: "We invest in assets and people that grow in value over decades, not quarters." },
  { icon: "users", title: "Community First", text: "Our projects are built with — and for — the communities where we work." },
  { icon: "shield", title: "Integrity", text: "We operate transparently and responsibly with partners, investors, and employees." },
  { icon: "spark", title: "Innovation", text: "We pair local knowledge with modern practices and technology to do more with less." },
];

const MILESTONES = [
  { year: "Founded", title: "Terra Liberia is born", text: "Started with a simple goal: invest in Liberia's most promising entrepreneurs and build a more prosperous, equitable future for all Liberians." },
  { year: "Agriculture", title: "Terra Cocoa takes root", text: "We cleared land, built nurseries, and began planting cocoa with local caretakers across multiple communities." },
  { year: "Digital", title: "Media & technology ventures", text: "TrueLiberia and Terra Market Group extend our work into digital content, marketing, and software." },
  { year: "Today", title: "Terra Investment Group", text: "A diversified group investing across Agriculture, Real Estate, Transportation, Technology, and Digital Content Development." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Investing Today for a Stronger Liberia Tomorrow"
        lead="We're an investment firm focused on helping to build the future of Liberia by investing in the country's most promising sectors and entrepreneurs."
        image="/images/cocoa-nursery.jpg"
        crumbs={[{ label: "About" }]}
      />

      {/* Who we are */}
      <section className="bg-paper">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 lg:grid-cols-2 lg:px-8">
          <Reveal variant="left" className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-2xl">
                <Image src="/images/community-nursery.jpg" alt="Terra team members in a cocoa nursery" fill sizes="(min-width:1024px) 560px, 100vw" className="object-cover" />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Image src="/images/land-preparation.jpg" alt="Preparing land for planting" fill sizes="280px" className="object-cover" />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Image src="/images/cocoa-seedlings.jpg" alt="Cocoa seedlings" fill sizes="280px" className="object-cover" />
              </div>
            </div>
          </Reveal>
          <Reveal variant="right" delay={150}>
            <SectionHeading
              eyebrow="Who We Are"
              title={<>Formerly Terra Liberia, <span className="text-brand">built for Liberia</span></>}
            />
            <div className="mt-5 space-y-4 text-base leading-relaxed text-body">
              <p>
                Terra Investment Group — formerly known as Terra Liberia — is an investment firm
                focused on helping to build the future of Liberia. Our goal is to build a more
                prosperous and equitable future for all Liberians.
              </p>
              <p>
                We started in agriculture, planting cocoa alongside rural communities, and have
                grown into a diversified group with ventures in digital marketing, software
                engineering, and digital content — with investments in real estate and
                transportation on the way.
              </p>
            </div>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {["Locally rooted, globally connected", "Hands-on, on-the-ground operations", "Jobs created in every community", "Patient, long-term capital"].map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-sm font-semibold text-ink">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-leaf-soft text-brand">
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section id="vision" className="scroll-mt-24 bg-canvas">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <SectionHeading center eyebrow="Mission & Vision" title="What Drives Us" />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {[
              { icon: "target" as const, title: "Our Mission", text: "To invest in Liberia's most promising sectors and entrepreneurs — creating jobs, building skills, and generating lasting value for communities, partners, and investors." },
              { icon: "eye" as const, title: "Our Vision", text: "A prosperous and equitable Liberia where every community has access to opportunity, and where local enterprises compete and thrive on the global stage." },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 150} className="rounded-2xl border border-line bg-white p-8 shadow-sm">
                <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-leaf-soft text-brand">
                  <Icon name={c.icon} className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-2xl font-extrabold text-ink">{c.title}</h3>
                <p className="mt-3 leading-relaxed text-body">{c.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <SectionHeading center eyebrow="Our Values" title="How We Work" lead="The principles that guide every investment we make." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 110} className="rounded-2xl border border-line bg-white p-6 text-center shadow-sm">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-leaf-soft text-leaf">
                  <Icon name={v.icon} className="h-7 w-7" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-ink">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ImpactBand />

      {/* Journey */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <SectionHeading eyebrow="Our Journey" title="From One Farm to a Group of Companies" />
          <ol className="mt-12 grid gap-8 md:grid-cols-4">
            {MILESTONES.map((m, i) => (
              <li key={m.title} className="relative">
                <Reveal delay={i * 150}>
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="hidden h-[2px] flex-1 bg-line md:block" />
                </div>
                <p className="mt-4 text-xs font-bold uppercase tracking-wider text-leaf">{m.year}</p>
                <h3 className="mt-1 text-lg font-bold text-ink">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{m.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Group companies */}
      <section className="bg-canvas">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="Our Companies" title="The Terra Family" />
            <ButtonLink href="/our-work" variant="outline">Explore Our Work</ButtonLink>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VENTURES.map((v, i) => {
              const inner = (
                <>
                  <Eyebrow>{v.sector}</Eyebrow>
                  <p className="mt-3 text-xl font-extrabold text-ink">{v.name}</p>
                  <p className="mt-2 text-sm font-semibold text-brand">
                    {v.href ? "Visit website →" : "Coming soon"}
                  </p>
                </>
              );
              return (
                <Reveal key={v.name} delay={i * 110}>
                  {v.href ? (
                    <a href={v.href} target="_blank" rel="noreferrer" className="block h-full rounded-2xl border border-line bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                      {inner}
                    </a>
                  ) : (
                    <div className="h-full rounded-2xl border border-dashed border-line bg-white/60 p-6">
                      {inner}
                    </div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
