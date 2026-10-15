/**
 * Site-wide content: navigation, sectors, team, impact numbers, ventures.
 * Edit this file to update copy across every page.
 */

export const SITE_NAME = "Terra Investment Group";
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://terraliberia.com"
).replace(/\/$/, "");
export const SITE_DESCRIPTION =
  "Terra Investment Group is an investment firm helping to build the future of Liberia through strategic investments in Agriculture, Real Estate, Transportation, Technology, and Digital Content Development.";

export type IconName =
  | "leaf"
  | "users"
  | "chart"
  | "globe"
  | "tree"
  | "pin"
  | "home"
  | "truck"
  | "gear"
  | "sprout"
  | "handshake"
  | "target"
  | "eye"
  | "shield"
  | "spark";

/* -------------------------------------------------------------------------- */
/* Navigation                                                                 */
/* -------------------------------------------------------------------------- */

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
}

/* -------------------------------------------------------------------------- */
/* Sectors (Our Work)                                                         */
/* -------------------------------------------------------------------------- */

export type SectorStatus = "Active" | "Growing" | "Coming Soon";

export interface Sector {
  slug: string;
  title: string;
  /** Optional shorter name for compact cards, so titles stay on one line. */
  shortTitle?: string;
  icon: IconName;
  image: string;
  summary: string;
  status: SectorStatus;
  /** Lead paragraph on the sector detail page. */
  intro: string;
  /** Longer narrative paragraphs on the sector detail page. */
  body: string[];
  focus: { title: string; text: string }[];
  /** Operating brand(s) within the sector, if any. */
  ventures?: { name: string; href?: string; text: string }[];
}

export const SECTORS: Sector[] = [
  {
    slug: "agriculture",
    title: "Agriculture",
    icon: "leaf",
    image: "/images/sector-agriculture.jpg",
    summary:
      "Cocoa and other crops to boost local production and global markets.",
    status: "Active",
    intro:
      "Agriculture is where Terra began. Through Terra Cocoa we cultivate cocoa alongside rural communities, creating jobs and building a reliable supply for local and global markets.",
    body: [
      "Liberia's soil and climate are among the best in West Africa for tree crops, yet much of that potential remains untapped. We work directly on the ground — clearing and preparing land, raising seedlings in our own nurseries, and planting and caring for cocoa farms with local caretakers in each community.",
      "Every farm is a long-term commitment. Cocoa trees take years to mature, and we invest in the people, training, and infrastructure needed to keep them productive for decades.",
    ],
    focus: [
      {
        title: "Cocoa cultivation",
        text: "Nurseries, planting, and long-term farm management across multiple communities.",
      },
      {
        title: "Local employment",
        text: "Caretakers and seasonal workers hired from the communities we farm in.",
      },
      {
        title: "Training & knowledge",
        text: "Sharing modern agronomy practices to raise yields and quality.",
      },
      {
        title: "Market access",
        text: "Connecting Liberian produce to regional and international buyers.",
      },
    ],
    ventures: [
      {
        name: "Terra Cocoa",
        href: "https://www.facebook.com/terraliberia",
        text: "Our cocoa farming operation, active in communities including Bargblor Town, Tuzon, and Gorla.",
      },
    ],
  },
  {
    slug: "real-estate",
    title: "Real Estate",
    icon: "home",
    image: "/images/sector-real-estate.jpg",
    summary:
      "Developing residential, commercial, and community projects.",
    status: "Coming Soon",
    intro:
      "Through Terra Estates we are preparing residential, commercial, and community developments that meet the growing demand for quality, affordable spaces in Liberia.",
    body: [
      "Housing and commercial space are fundamental to economic growth. We focus on durable, locally built projects that create construction jobs today and lasting value for families and businesses tomorrow.",
      "Our approach combines local building knowledge with modern planning standards, working with communities to ensure every project fits the needs of the people who will use it.",
    ],
    focus: [
      {
        title: "Residential",
        text: "Quality homes built with durable, locally sourced materials.",
      },
      {
        title: "Commercial",
        text: "Spaces that help local businesses start, grow, and serve their customers.",
      },
      {
        title: "Community projects",
        text: "Facilities that serve the wider community, from storage to shared workspaces.",
      },
      {
        title: "Local construction jobs",
        text: "Skilled and unskilled work for local builders and tradespeople.",
      },
    ],
    ventures: [
      {
        name: "Terra Estates",
        text: "Our real estate venture — launching soon.",
      },
    ],
  },
  {
    slug: "transportation",
    title: "Transportation",
    icon: "truck",
    image: "/images/sector-transportation.jpg",
    summary: "Improving mobility and infrastructure across regions.",
    status: "Coming Soon",
    intro:
      "Moving people and goods efficiently is essential to every other sector we invest in. We are exploring transportation solutions that connect farms to markets and communities to opportunity.",
    body: [
      "Many of Liberia's most productive areas are also its hardest to reach. Reliable transport lowers costs for farmers, shortens the path from harvest to market, and opens up new economic opportunities for rural communities.",
      "We are building the groundwork for investments in logistics and mobility that complement our agriculture and real estate work.",
    ],
    focus: [
      {
        title: "Farm-to-market logistics",
        text: "Getting produce from rural farms to buyers faster and at lower cost.",
      },
      {
        title: "Regional mobility",
        text: "Better connections between towns, counties, and commercial centers.",
      },
      {
        title: "Fleet & services",
        text: "Practical transport services that create jobs and serve communities.",
      },
    ],
  },
  {
    slug: "technology",
    title: "Technology",
    icon: "gear",
    image: "/images/sector-technology.jpg",
    summary:
      "Digital solutions for business, education, and community growth.",
    status: "Growing",
    intro:
      "Technology lets Liberian businesses compete anywhere. Through Terra Market Group we provide digital marketing, software engineering, and online tools that help organizations grow.",
    body: [
      "We build and operate digital products and services — from websites and software platforms to marketing and analytics — for businesses in Liberia and beyond.",
      "Our technology work also creates skilled jobs and trains a new generation of Liberian developers, designers, and digital marketers.",
    ],
    focus: [
      {
        title: "Software engineering",
        text: "Web and mobile platforms built for real business needs.",
      },
      {
        title: "Digital marketing",
        text: "SEO, social media, and content that help organizations reach their audience.",
      },
      {
        title: "Skills & training",
        text: "Developing local talent for the digital economy.",
      },
    ],
    ventures: [
      {
        name: "Terra Market Group",
        href: "https://www.terramarketgroup.com",
        text: "Digital marketing agency and free growth tools for businesses.",
      },
    ],
  },
  {
    slug: "digital-content",
    title: "Digital Content Development",
    shortTitle: "Digital Content",
    icon: "chart",
    image: "/images/sector-digital-content.jpg",
    summary: "Telling Liberia's story through news, media, and online platforms.",
    status: "Active",
    intro:
      "Through TrueLiberia we tell Liberia's story — news, culture, and the people shaping the country — while creating opportunities for local journalists, broadcasters, and creators.",
    body: [
      "Media shapes how a country sees itself and how the world sees it. We invest in digital platforms that inform, celebrate, and connect Liberians at home and across the diaspora.",
      "Our content team includes reporters, live broadcasters, and videographers producing original stories and coverage every week.",
    ],
    focus: [
      {
        title: "News & storytelling",
        text: "Original reporting on Liberia's people, culture, and progress.",
      },
      {
        title: "Live broadcasting & video",
        text: "Coverage of events and conversations that matter to Liberians.",
      },
      {
        title: "Creator opportunities",
        text: "Paid work and training for local journalists and creators.",
      },
    ],
    ventures: [
      {
        name: "TrueLiberia",
        href: "https://www.trueliberia.com",
        text: "Digital media platform telling Liberia's story.",
      },
    ],
  },
];

export function getSector(slug: string): Sector | undefined {
  return SECTORS.find((s) => s.slug === slug);
}

export const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Our Work",
    href: "/our-work",
    children: [
      ...SECTORS.map((s) => ({
        label: s.title,
        href: `/our-work/${s.slug}`,
        description: s.summary,
      })),
    ],
  },
  { label: "Impact", href: "/impact" },
  { label: "Team", href: "/team" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

/* -------------------------------------------------------------------------- */
/* Impact                                                                     */
/* -------------------------------------------------------------------------- */

export const STATS: { value: number; label: string; icon: IconName }[] = [
  { value: 42, label: "acres cultivated", icon: "leaf" },
  { value: 20163, label: "cocoa trees planted", icon: "tree" },
  { value: 1113, label: "people impacted", icon: "users" },
  { value: 4, label: "communities", icon: "pin" },
];

/** Communities we currently work in (from caretaker assignments). */
export const COMMUNITIES = ["Bargblor Town", "Tuzon", "Gorla"];

export const GALLERY: { src: string; alt: string }[] = [
  { src: "/images/community-nursery.jpg", alt: "Team members tending cocoa seedlings in a community nursery" },
  { src: "/images/cocoa-nursery.jpg", alt: "Rows of cocoa seedlings growing under shade netting" },
  { src: "/images/field-inspection.jpg", alt: "Inspecting young cocoa plants in the nursery" },
  { src: "/images/land-preparation.jpg", alt: "Preparing land for planting with an earth auger" },
  { src: "/images/cocoa-seedlings.jpg", alt: "Cocoa seedlings ready for transplanting" },
  { src: "/images/real-estate-construction.jpg", alt: "Building construction with locally made blocks" },
  { src: "/images/safety-gear.jpg", alt: "Safety helmets and boots for field and construction teams" },
];

/* -------------------------------------------------------------------------- */
/* Team                                                                       */
/* -------------------------------------------------------------------------- */

export interface TeamMember {
  name: string;
  role: string;
  photo?: string;
  group: "Leadership" | "Management & Operations" | "Field Operations" | "Media";
}

export const TEAM: TeamMember[] = [
  { name: "Prince J. Sargbah", role: "Managing Partner", photo: "/images/team/prince.jpg", group: "Leadership" },
  { name: "Mike Lathrop", role: "Managing Partner", photo: "/images/team/mike.jpg", group: "Leadership" },
  { name: "Rebecca T. Flomo", role: "President", photo: "/images/team/rebecca.jpg", group: "Leadership" },
  { name: "Konah Sargbah", role: "Executive Director", photo: "/images/team/konah.jpg", group: "Leadership" },
  { name: "Likuna Datuashvili", role: "Executive Bookkeeper", photo: "/images/team/lika.jpg", group: "Management & Operations" },
  { name: "Pst. Cyrus Thompson", role: "Regional Manager", photo: "/images/team/thompson.jpg", group: "Management & Operations" },
  { name: "Aaron Flomo", role: "Manager - TrueLiberia", photo: "/images/team/aaron.jpg", group: "Management & Operations" },
  { name: "Prince Nagbe", role: "Administrator", photo: "/images/team/nagbe.jpg", group: "Management & Operations" },
  { name: "Autry Q. Suku Jr.", role: "Research Analyst", photo: "/images/team/autry.jpg", group: "Management & Operations" },
  { name: "Deborah T. Kollie", role: "Office Secretary", group: "Management & Operations" },
  { name: "Emmanuel Diggs", role: "Caretaker - Bargblor Town", photo: "/images/team/diggs.jpg", group: "Field Operations" },
  { name: "Marcus Gaye", role: "Caretaker - Bargblor Town", group: "Field Operations" },
  { name: "Emmanuel Flomo", role: "Caretaker - Tuzon", photo: "/images/team/flomo.jpg", group: "Field Operations" },
  { name: "Isaac Dolo", role: "Caretaker - Gorla", photo: "/images/team/isaac.jpg", group: "Field Operations" },
  { name: "Lawrence Garteh", role: "Live Broadcaster", photo: "/images/team/lawrence.jpg", group: "Media" },
  { name: "Alexander Williams", role: "Videographer", group: "Media" },
];

/** The seven people featured on the homepage, in mockup order. */
export const FEATURED_TEAM = TEAM.slice(0, 7);

/* -------------------------------------------------------------------------- */
/* Ventures & social                                                          */
/* -------------------------------------------------------------------------- */

export const VENTURES = [
  { name: "Terra Cocoa", sector: "Agriculture", href: "https://www.facebook.com/terraliberia" },
  { name: "Terra Market Group", sector: "Technology", href: "https://www.terramarketgroup.com" },
  { name: "TrueLiberia", sector: "Digital Content", href: "https://www.trueliberia.com" },
  { name: "Terra Estates", sector: "Real Estate", href: undefined },
];

/**
 * Social profiles shown in the footer. Leave a URL empty to hide that icon.
 * TODO: fill in LinkedIn, YouTube, and Instagram once the profiles exist.
 */
export const SOCIALS: { name: "facebook" | "linkedin" | "youtube" | "instagram"; label: string; href: string }[] = [
  { name: "facebook", label: "Facebook", href: "https://www.facebook.com/terraliberia" },
  { name: "linkedin", label: "LinkedIn", href: "" },
  { name: "youtube", label: "YouTube", href: "" },
  { name: "instagram", label: "Instagram", href: "" },
];
