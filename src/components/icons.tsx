import type { SVGProps } from "react";
import type { IconName } from "@/lib/site";

type P = SVGProps<SVGSVGElement>;

const base = (props: P): P => ({
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
  ...props,
});

/* ---------------------------- Filled feature icons ---------------------------- */

export const LeafIcon = (p: P) => (
  <svg {...base(p)} fill="currentColor">
    <path d="M20.6 3.4c-6.9-.6-12.3 1-14.9 4.6-1.9 2.6-1.9 5.8-.3 8.4L3 19.1 4.4 20.5l2.7-2.7c2.6 1.6 5.8 1.6 8.4-.3 3.6-2.6 5.2-8 4.6-14.9l.5.8zM8.5 15.5c1.9-3.1 4.4-5.5 7.6-7.2-2.5 2.3-4.6 4.7-6.2 8.6l-1.4-1.4z" />
  </svg>
);

export const SproutIcon = (p: P) => (
  <svg {...base(p)} fill="currentColor">
    <path d="M12 22c-.6 0-1-.4-1-1v-6.1C10.3 11.6 7.6 9.4 3.5 9 3.2 9 3 8.7 3 8.4 3.1 5.5 5.3 3.5 8.2 3.9c2.6.4 4.4 2.7 4.7 6.3 1-2.9 3.3-4.8 6.3-5 .4 0 .8.3.8.7.1 3.9-2.6 6.8-7 7.3V21c0 .6-.4 1-1 1z" />
  </svg>
);

export const UsersIcon = (p: P) => (
  <svg {...base(p)} fill="currentColor">
    <circle cx="12" cy="7" r="3.2" />
    <circle cx="5" cy="9" r="2.4" />
    <circle cx="19" cy="9" r="2.4" />
    <path d="M12 11.5c-3.3 0-6 2.1-6 4.8V18h12v-1.7c0-2.7-2.7-4.8-6-4.8zM5 12.8c-2.3 0-4 1.5-4 3.4V18h3.5v-1.7c0-1.3.4-2.5 1.2-3.5H5zM19 12.8h-.7c.8 1 1.2 2.2 1.2 3.5V18H23v-1.8c0-1.9-1.7-3.4-4-3.4z" />
  </svg>
);

export const ChartIcon = (p: P) => (
  <svg {...base(p)} fill="currentColor">
    <rect x="3" y="13" width="4.5" height="8" rx="1" />
    <rect x="9.75" y="8.5" width="4.5" height="12.5" rx="1" />
    <rect x="16.5" y="3" width="4.5" height="18" rx="1" />
  </svg>
);

export const GlobeIcon = (p: P) => (
  <svg {...base(p)} fill="none" stroke="currentColor" strokeWidth={2.2}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
  </svg>
);

export const TreeIcon = (p: P) => (
  <svg {...base(p)} fill="currentColor">
    <path d="M12 2a5 5 0 0 0-4.9 4A4.5 4.5 0 0 0 4 10.3 4.6 4.6 0 0 0 8.5 15H11v6a1 1 0 1 0 2 0v-6h2.5a4.6 4.6 0 0 0 4.5-4.7A4.5 4.5 0 0 0 16.9 6 5 5 0 0 0 12 2z" />
  </svg>
);

export const PinIcon = (p: P) => (
  <svg {...base(p)} fill="currentColor">
    <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
  </svg>
);

export const HomeIcon = (p: P) => (
  <svg {...base(p)} fill="currentColor">
    <path d="M11.3 2.3a1 1 0 0 1 1.4 0l9 8.4a1 1 0 0 1-.7 1.7H20V21a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1v-8.6H3a1 1 0 0 1-.7-1.7l9-8.4z" />
  </svg>
);

export const TruckIcon = (p: P) => (
  <svg {...base(p)} fill="currentColor">
    <path d="M2 5.5A1.5 1.5 0 0 1 3.5 4h10A1.5 1.5 0 0 1 15 5.5V8h3.4a1.5 1.5 0 0 1 1.2.6l2.1 2.9c.2.3.3.6.3.9v4.1a1.5 1.5 0 0 1-1.5 1.5h-.6a3 3 0 0 1-5.8 0H9.9a3 3 0 0 1-5.8 0h-.6A1.5 1.5 0 0 1 2 16.5v-11zM17 10v2.5h3l-1.8-2.5H17zM7 19a1.2 1.2 0 1 0 0-2.4A1.2 1.2 0 0 0 7 19zm10 0a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4z" />
  </svg>
);

export const GearIcon = (p: P) => (
  <svg {...base(p)} fill="currentColor">
    <path d="M13.6 2l.5 2.6c.6.2 1.2.5 1.7.9l2.5-.9 1.6 2.8-2 1.7c.1.6.1 1.2 0 1.8l2 1.7-1.6 2.8-2.5-.9c-.5.4-1.1.7-1.7.9l-.5 2.6h-3.2l-.5-2.6c-.6-.2-1.2-.5-1.7-.9l-2.5.9-1.6-2.8 2-1.7a5.6 5.6 0 0 1 0-1.8l-2-1.7 1.6-2.8 2.5.9c.5-.4 1.1-.7 1.7-.9l.5-2.6h3.2zM12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" transform="translate(0 1)" />
  </svg>
);

export const HandshakeIcon = (p: P) => (
  <svg {...base(p)} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="m11 17 2 2a1 1 0 1 0 3-3" />
    <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.9-3.9a3 3 0 0 0-4.2 0l-.9.9a1 1 0 1 1-3-3l2.8-2.8a5.8 5.8 0 0 1 7 .9l.6.6a2 2 0 0 0 1.4.6H22" />
    <path d="m21 3 1 11h-2M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3M3 4h8" />
  </svg>
);

export const TargetIcon = (p: P) => (
  <svg {...base(p)} fill="none" stroke="currentColor" strokeWidth={2.2}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

export const EyeIcon = (p: P) => (
  <svg {...base(p)} fill="none" stroke="currentColor" strokeWidth={2.2}>
    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" fill="currentColor" />
  </svg>
);

export const ShieldIcon = (p: P) => (
  <svg {...base(p)} fill="currentColor">
    <path d="M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3zm-1.2 13.6-3.5-3.5 1.4-1.4 2.1 2.1 4.6-4.6 1.4 1.4-6 6z" />
  </svg>
);

export const SparkIcon = (p: P) => (
  <svg {...base(p)} fill="currentColor">
    <path d="M12 2l2.2 6.3L20.5 10.5l-6.3 2.2L12 19l-2.2-6.3L3.5 10.5l6.3-2.2L12 2z" />
  </svg>
);

/* ------------------------------- Line UI icons ------------------------------- */

export const ArrowRightIcon = (p: P) => (
  <svg {...base(p)} fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ChevronDownIcon = (p: P) => (
  <svg {...base(p)} fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const MenuIcon = (p: P) => (
  <svg {...base(p)} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const CloseIcon = (p: P) => (
  <svg {...base(p)} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const PlayIcon = (p: P) => (
  <svg {...base(p)} fill="currentColor">
    <path d="M8 5.1v13.8a1 1 0 0 0 1.5.9l10.8-6.9a1 1 0 0 0 0-1.7L9.5 4.2A1 1 0 0 0 8 5.1z" />
  </svg>
);

export const CheckIcon = (p: P) => (
  <svg {...base(p)} fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const MailIcon = (p: P) => (
  <svg {...base(p)} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
  </svg>
);

export const ClockIcon = (p: P) => (
  <svg {...base(p)} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const ExternalIcon = (p: P) => (
  <svg {...base(p)} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
  </svg>
);

/* ------------------------------- Social icons ------------------------------- */

export const FacebookIcon = (p: P) => (
  <svg {...base(p)} fill="currentColor">
    <path d="M12 2a10 10 0 0 0-1.6 19.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 12 2z" />
  </svg>
);

export const LinkedinIcon = (p: P) => (
  <svg {...base(p)} fill="currentColor">
    <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM8.3 18.3H5.7V9.7h2.6v8.6zM7 8.6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm11.3 9.7h-2.6v-4.2c0-1 0-2.3-1.4-2.3s-1.6 1.1-1.6 2.2v4.3h-2.6V9.7h2.5v1.2c.4-.7 1.2-1.4 2.5-1.4 2.7 0 3.2 1.8 3.2 4.1v4.7z" />
  </svg>
);

export const YoutubeIcon = (p: P) => (
  <svg {...base(p)} fill="currentColor">
    <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3L10 15z" />
  </svg>
);

export const InstagramIcon = (p: P) => (
  <svg {...base(p)} fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const SOCIAL_ICONS = {
  facebook: FacebookIcon,
  linkedin: LinkedinIcon,
  youtube: YoutubeIcon,
  instagram: InstagramIcon,
};

const ICONS: Record<IconName, (p: P) => React.JSX.Element> = {
  leaf: LeafIcon,
  users: UsersIcon,
  chart: ChartIcon,
  globe: GlobeIcon,
  tree: TreeIcon,
  pin: PinIcon,
  home: HomeIcon,
  truck: TruckIcon,
  gear: GearIcon,
  sprout: SproutIcon,
  handshake: HandshakeIcon,
  target: TargetIcon,
  eye: EyeIcon,
  shield: ShieldIcon,
  spark: SparkIcon,
};

/** Render a feature icon by name (used by data-driven sections). */
export function Icon({ name, ...props }: P & { name: IconName }) {
  const C = ICONS[name];
  return <C {...props} />;
}
