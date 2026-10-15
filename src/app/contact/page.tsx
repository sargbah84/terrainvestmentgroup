import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { HandshakeIcon, MailIcon, PinIcon, SOCIAL_ICONS } from "@/components/icons";
import { SOCIALS } from "@/lib/site";
import ContactForm from "./ContactForm";
import { SUBJECTS } from "./subjects";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Partner with Terra Investment Group. Get in touch about investment opportunities, partnerships, media, and careers.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage(props: PageProps<"/contact">) {
  const { subject } = await props.searchParams;
  const defaultSubject =
    typeof subject === "string" && SUBJECTS.includes(subject) ? subject : SUBJECTS[0];
  const socials = SOCIALS.filter((s) => s.href);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's Build a Brighter Liberia Together"
        lead="We welcome partners, investors, and organizations that share our vision for a thriving, sustainable Liberia."
        image="/images/cta-river-valley-sunrise.jpg"
        crumbs={[{ label: "Contact" }]}
      />

      <section className="bg-paper">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1fr_1.6fr] lg:px-8">
          <Reveal variant="left" className="space-y-5">
            <h2 className="text-2xl font-extrabold text-ink">Get in touch</h2>
            <p className="leading-relaxed text-body">
              Whether you&rsquo;re an investor, a potential partner, a member of the press, or
              someone who wants to join our team, we&rsquo;d love to hear from you.
            </p>

            {[
              { icon: HandshakeIcon, title: "Partnerships & investment", text: "Co-investment, joint ventures, and supply partnerships across our sectors." },
              { icon: MailIcon, title: "General inquiries", text: "Questions about our work, our ventures, or our communities." },
              { icon: PinIcon, title: "Where we work", text: "Communities across Liberia, West Africa." },
            ].map(({ icon: I, title, text }) => (
              <div key={title} className="flex gap-4 rounded-2xl border border-line bg-white p-5 shadow-sm">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-leaf-soft text-brand">
                  <I className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-bold text-ink">{title}</p>
                  <p className="mt-1 text-sm text-body">{text}</p>
                </div>
              </div>
            ))}

            {socials.length > 0 && (
              <div className="pt-2">
                <p className="text-sm font-bold text-ink">Follow us</p>
                <div className="mt-3 flex gap-3">
                  {socials.map((s) => {
                    const I = SOCIAL_ICONS[s.name];
                    return (
                      <a key={s.name} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-10 w-10 items-center justify-center rounded-full bg-forest text-white hover:bg-brand">
                        <I className="h-5 w-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </Reveal>

          <Reveal variant="right" delay={150} className="rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-10">
            <h2 className="text-2xl font-extrabold text-ink">Send us a message</h2>
            <p className="mb-8 mt-2 text-sm text-body">Fields marked optional can be left blank.</p>
            <ContactForm defaultSubject={defaultSubject} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
