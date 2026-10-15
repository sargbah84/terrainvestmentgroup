import Link from "next/link";

/** The three-leaf Terra mark, redrawn as SVG from the original logo.png. */
export function LogoMark({
  className = "",
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      {/* tall back leaf */}
      <path
        d="M30 3c7.5 5 10.5 13 8 21.5-1.6 5.4-5.6 9.3-10.5 11.5-3.2-4.6-4.6-10-3.6-15.6C25 13.2 27.3 7.6 30 3z"
        fill={light ? "#ffffff" : "#1f6b35"}
      />
      {/* front leaf */}
      <path
        d="M3 27.5c6.2-4.4 14.3-5.4 21.2-2.4 4.6 2 7.7 5.6 9.2 10-4.6 3.6-10.6 5.2-16.4 4.2C10.8 38.2 5.7 33.7 3 27.5z"
        fill={light ? "#d6efdd" : "#3b9a4c"}
      />
      {/* sun accent */}
      <path
        d="M31.5 37.5c2.8-2.6 6.6-3.7 10.4-3-1.2 3.6-4.2 6.2-8 6.9-1.2.2-2.4.2-3.6 0 .1-1.4.5-2.7 1.2-3.9z"
        fill="#f2c94c"
      />
    </svg>
  );
}

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5"
      aria-label="Terra Investment Group — home"
    >
      <LogoMark className="h-12 w-12 shrink-0" light={light} />
      <span className="leading-none">
        <span
          className={`block text-[1.7rem] font-extrabold tracking-tight ${
            light ? "text-white" : "text-ink"
          }`}
        >
          Terra
        </span>
        <span
          className={`mt-0.5 block text-[1.02rem] font-bold tracking-tight ${
            light ? "text-white/90" : "text-brand"
          }`}
        >
          Investment Group
        </span>
      </span>
    </Link>
  );
}
