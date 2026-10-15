import Link from "next/link";
import { ArrowRightIcon } from "./icons";

type Variant = "primary" | "outline" | "mint" | "ghost-light";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-brand text-white shadow-sm hover:bg-brand-dark",
  outline:
    "border-2 border-brand/40 bg-white/40 text-ink backdrop-blur-sm hover:border-brand hover:bg-white/70",
  mint: "bg-mint text-forest hover:bg-mint-dark",
  "ghost-light":
    "border-2 border-white/40 text-white hover:border-white hover:bg-white/10",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  arrow = true,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
}) {
  const external = href.startsWith("http");
  const cls = `inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold transition-colors ${VARIANTS[variant]} ${className}`;
  const inner = (
    <>
      {children}
      {arrow && <ArrowRightIcon className="h-4 w-4" />}
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

export function Eyebrow({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return <p className={`eyebrow ${light ? "eyebrow-light" : ""}`}>{children}</p>;
}

/** Eyebrow + heading + optional lead paragraph. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  center = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-[2.6rem] sm:leading-[1.15]">
        {title}
      </h2>
      {lead && <p className="mt-4 text-[17px] leading-relaxed text-body">{lead}</p>}
    </div>
  );
}
