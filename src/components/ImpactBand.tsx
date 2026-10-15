import Image from "next/image";
import { STATS } from "@/lib/site";
import CountUp from "./CountUp";
import { Icon } from "./icons";
import Reveal from "./Reveal";
import { ButtonLink } from "./ui";

/** Dark-green "Our Impact So Far" band with the four headline numbers. */
export default function ImpactBand({
  showButton = true,
  title = "Our Impact So Far",
  lead = "Real progress in communities across Liberia through agriculture, training, and local development.",
}: {
  showButton?: boolean;
  title?: string;
  lead?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-forest">
      <Image
        src="/images/impact-cocoa-leaves.jpg"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover opacity-45"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest/90 via-forest/70 to-forest/80" />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 lg:grid-cols-[1fr_1.25fr] lg:px-8">
        <Reveal variant="left">
          <span className="block h-[3px] w-6 rounded-full bg-mint" />
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-[2.1rem]">
            {title}
          </h2>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/85">{lead}</p>
          {showButton && (
            <ButtonLink href="/impact" className="mt-6 bg-[#1f8a4c] text-white hover:bg-[#23a058]">
              View Our Impact
            </ButtonLink>
          )}
        </Reveal>

        <dl className="grid grid-cols-2 gap-y-8 sm:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 120}
              className={`flex flex-col items-center px-2 text-center ${
                i > 0 ? "sm:border-l sm:border-white/15" : ""
              }`}
            >
              <Icon name={s.icon} className="h-7 w-7 text-mint" />
              <dd className="mt-3 text-3xl font-extrabold tabular-nums tracking-tight text-white sm:text-[2.1rem]">
                <CountUp value={s.value} />
              </dd>
              <dt className="mt-1 text-sm text-white/85">{s.label}</dt>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
