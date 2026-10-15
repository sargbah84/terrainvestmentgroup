import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import TeamCard from "@/components/TeamCard";
import { SectionHeading } from "@/components/ui";
import { TEAM, type TeamMember } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the people driving Terra Investment Group's vision — leadership, operations, field caretakers, and media.",
  alternates: { canonical: "/team" },
};

const GROUPS: { name: TeamMember["group"]; lead: string }[] = [
  { name: "Leadership", lead: "Setting the direction and building the partnerships that move Terra forward." },
  { name: "Management & Operations", lead: "Running day-to-day operations, finance, research, and our ventures." },
  { name: "Field Operations", lead: "Caring for our farms and the communities they serve." },
  { name: "Media", lead: "Telling Liberia's story through broadcast and video." },
];

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Team"
        title="People Driving the Vision"
        lead="Our team brings diverse experience and a shared passion for Liberia's future — from the boardroom to the farm."
        image="/images/field-inspection.jpg"
        crumbs={[{ label: "Team" }]}
      />

      {GROUPS.map((g, i) => {
        const members = TEAM.filter((m) => m.group === g.name);
        return (
          <section key={g.name} className={i % 2 ? "bg-canvas" : "bg-paper"}>
            <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
              <SectionHeading eyebrow={g.name} title={g.name === "Leadership" ? "Leadership Team" : g.name} lead={g.lead} />
              <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
                {members.map((m, i) => (
                  <Reveal key={m.name} variant="zoom" delay={i * 80}>
                    <TeamCard member={m} />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="bg-forest">
        <Reveal className="mx-auto max-w-4xl px-5 py-16 text-center lg:px-8">
          <h2 className="text-3xl font-extrabold text-white">Want to join us?</h2>
          <p className="mt-3 text-white/80">
            We&rsquo;re always looking for talented, committed people who want to help build
            Liberia&rsquo;s future.
          </p>
          <Link
            href="/contact?subject=Careers"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-mint px-6 py-3 text-sm font-bold text-forest hover:bg-mint-dark"
          >
            Get in Touch →
          </Link>
        </Reveal>
      </section>
    </>
  );
}
