import Image from "next/image";
import { ButtonLink, Eyebrow } from "./ui";

/** "Let's Build a Brighter Liberia Together" partner call-to-action. */
export default function CtaBand() {
  return (
    <section className="relative isolate overflow-hidden bg-forest">
      <Image
        src="/images/cta-river-valley-sunrise.jpg"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest/90 via-forest/60 to-forest/20" />

      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-14 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <Eyebrow light>Partner With Us</Eyebrow>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-[2.2rem]">
            Let&rsquo;s Build a Brighter Liberia Together
          </h2>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/90">
            We welcome partners, investors, and organizations that share our vision for a
            thriving, sustainable Liberia.
          </p>
        </div>
        <ButtonLink href="/contact" variant="mint" className="shrink-0 self-start lg:self-center">
          Get In Touch
        </ButtonLink>
      </div>
    </section>
  );
}
