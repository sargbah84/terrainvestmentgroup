import Image from "next/image";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import ImpactBand from "@/components/ImpactBand";
import SectorCard from "@/components/SectorCard";
import TeamCard from "@/components/TeamCard";
import {
  ArrowRightIcon,
  ChartIcon,
  GlobeIcon,
  LeafIcon,
  PlayIcon,
  SproutIcon,
  UsersIcon,
} from "@/components/icons";
import { ButtonLink, Eyebrow } from "@/components/ui";
import { FEATURED_TEAM, SECTORS } from "@/lib/site";

const PILLARS = [
  { icon: LeafIcon, title: "Sustainable Growth", text: "Investing in long-term opportunities" },
  { icon: UsersIcon, title: "Community Focus", text: "Creating jobs and empowering people" },
  { icon: ChartIcon, title: "Strategic Development", text: "Combining local knowledge with global best practices" },
  { icon: GlobeIcon, title: "Global Partnerships", text: "Connecting Liberia to international opportunities" },
];

export default function HomePage() {
  return (
    <>
      {/* ------------------------------------------------------------ Hero */}
      <section className="relative isolate -mt-[76px] overflow-hidden pt-[76px]">
        <Image
          src="/images/hero-cocoa-valley-sunrise.jpg"
          alt="Ripe cocoa pods on a tree overlooking a forested valley at sunrise"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-[70%_center]"
        />
        {/* Soft white wash on the left so the copy reads cleanly */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/85 via-white/45 to-white/0 lg:via-white/30" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-canvas/70 to-transparent" />

        <div className="mx-auto max-w-7xl px-5 pb-36 pt-16 lg:px-8 lg:pb-44 lg:pt-24">
          <div className="max-w-[640px]">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink sm:text-[13px]">
              Investing in People. Communities. A Brighter Liberia.
            </p>
            <h1 className="mt-5 text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-[4.1rem]">
              Sustainable Investment for{" "}
              <span className="bg-gradient-to-r from-brand to-leaf bg-clip-text text-transparent">
                Lasting Impact
              </span>
            </h1>
            <p className="mt-6 max-w-[560px] text-base leading-relaxed text-ink/85 sm:text-[17px]">
              Terra Investment Group is an investment firm focused on helping to build the
              future of Liberia through strategic investments in Agriculture, Real Estate,
              Transportation, Technology, and Digital Development.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href="/about#vision">Our Vision</ButtonLink>
              <ButtonLink href="/contact?subject=Partnership" variant="outline" arrow={false}>
                Partner With Us
              </ButtonLink>
            </div>
          </div>
        </div>

        {/* Floating card */}
        <div className="absolute bottom-40 right-8 hidden w-[300px] rounded-2xl bg-white/95 p-5 shadow-xl backdrop-blur xl:right-[max(2rem,calc((100vw-80rem)/2+2rem))] xl:block">
          <div className="flex gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-leaf text-white">
              <SproutIcon className="h-6 w-6" />
            </span>
            <div>
              <p className="font-bold leading-snug text-ink">Building Opportunities Across Liberia</p>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                Economic growth • Job creation • Stronger communities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars strip, overlapping the hero */}
      <section className="relative z-10 mx-auto -mt-24 max-w-7xl px-5 lg:px-8">
        <div className="grid grid-cols-2 rounded-2xl border border-line bg-white/95 py-6 shadow-[0_10px_40px_rgba(12,40,41,0.10)] backdrop-blur lg:grid-cols-4">
          {PILLARS.map(({ icon: PIcon, title, text }, i) => (
            <div
              key={title}
              className={`flex flex-col items-center px-4 py-4 text-center ${
                i > 0 ? "lg:border-l lg:border-line" : ""
              } ${i % 2 === 1 ? "border-l border-line lg:border-l" : ""}`}
            >
              <PIcon className="h-8 w-8 text-leaf" />
              <h2 className="mt-3 text-[15px] font-bold text-ink">{title}</h2>
              <p className="mx-auto mt-1.5 max-w-[190px] text-xs leading-relaxed text-muted">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------- Impact */}
      <div className="mt-14">
        <ImpactBand />
      </div>

      {/* ----------------------------------------------------------- About */}
      <section className="bg-paper">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 lg:grid-cols-2 lg:px-8">
          <div>
            <Eyebrow>About Terra Investment Group</Eyebrow>
            <h2 className="mt-4 max-w-[480px] text-4xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-[2.9rem]">
              Investing Today for a Stronger{" "}
              <span className="text-brand">Liberia Tomorrow</span>
            </h2>
            <p className="mt-5 max-w-[540px] text-base leading-relaxed text-body">
              Formerly known as Terra Liberia, Terra Investment Group is dedicated to supporting
              Liberia&rsquo;s most promising sectors through responsible investment, innovation,
              and community partnerships. We believe in unlocking the country&rsquo;s potential by
              creating opportunities that benefit people, businesses, and future generations.
            </p>
            <ButtonLink href="/about" className="mt-8">
              Learn More About Us
            </ButtonLink>
          </div>

          <div className="relative pb-10 pl-6 sm:pl-10">
            <div className="absolute bottom-6 left-0 top-0 w-[88%] rounded-2xl bg-gradient-to-br from-leaf-soft to-[#c9ecd3]" />
            <div className="dot-grid absolute -right-2 top-16 hidden h-28 w-16 sm:block" />
            <div className="relative aspect-[16/11] overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="/images/field-inspection.jpg"
                alt="Inspecting young cocoa plants at a Terra nursery"
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover object-[50%_30%]"
              />
            </div>
            <div className="absolute bottom-0 right-0 flex max-w-[300px] gap-4 rounded-2xl bg-white p-5 shadow-xl sm:-right-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-leaf-soft text-leaf">
                <SproutIcon className="h-8 w-8" />
              </span>
              <div>
                <p className="text-sm font-bold leading-snug text-ink">
                  Healthy Communities Stronger Futures
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">
                  From farms to families, we invest in people and possibilities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- Sectors */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-5 pb-16 lg:px-8">
          <Eyebrow>Our Business Focus</Eyebrow>
          <div className="mt-3 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-[2.3rem]">
              Strategic Investments Across Key Sectors
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-[15px] text-body">
              We invest in high-potential opportunities that drive economic growth, create jobs,
              and strengthen communities across Liberia.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {SECTORS.map((s) => (
              <SectorCard key={s.slug} sector={s} />
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ Community */}
      <section className="bg-paper px-4 pb-6 lg:px-6">
        <div className="relative isolate mx-auto grid max-w-[1400px] overflow-hidden rounded-3xl bg-forest lg:grid-cols-2">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0f3a22] to-forest" />
          <div className="px-8 py-14 sm:px-12 lg:py-16">
            <Eyebrow light>Communities</Eyebrow>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-[2.3rem]">
              Stronger Communities Through Shared Opportunity
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/85">
              Our work goes beyond business. We partner with local communities to create jobs,
              provide training, and support sustainable development that improves lives and
              builds a more resilient Liberia.
            </p>
            <ButtonLink href="/impact" variant="mint" className="mt-7">
              See Our Impact
            </ButtonLink>
          </div>
          <div className="relative min-h-[300px] lg:min-h-0">
            <Image
              src="/images/community-nursery.jpg"
              alt="Terra team members working with seedlings in a community cocoa nursery"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-y-0 left-0 hidden w-40 bg-gradient-to-r from-forest to-transparent lg:block" />
            <Link
              href="/impact#gallery"
              aria-label="See our work in the field"
              className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-leaf shadow-lg backdrop-blur transition-transform hover:scale-110"
            >
              <PlayIcon className="ml-1 h-7 w-7" />
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ Team */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Eyebrow>Our Team</Eyebrow>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-[2.3rem]">
                People Driving the Vision
              </h2>
              <p className="mt-2 text-[15px] text-body">
                Our team brings diverse experience and a passion for Liberia&rsquo;s future.
              </p>
            </div>
            <Link
              href="/team"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:underline sm:mb-10"
            >
              Meet the Full Team
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 lg:grid-cols-7">
            {FEATURED_TEAM.map((m) => (
              <TeamCard key={m.name} member={m} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
