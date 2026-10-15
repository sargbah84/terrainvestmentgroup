import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const DEFAULT_TITLE = `${SITE_NAME} — Sustainable Investment for Lasting Impact in Liberia`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: DEFAULT_TITLE, template: `%s · ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "Terra Investment Group",
    "Terra Liberia",
    "Liberia investment",
    "agriculture",
    "cocoa",
    "real estate",
    "transportation",
    "technology",
    "digital content",
  ],
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: DEFAULT_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [{ url: "/images/hero-cocoa-valley-sunrise.jpg", width: 1945, height: 808, alt: SITE_NAME }],
  },
  twitter: { card: "summary_large_image", title: DEFAULT_TITLE, description: SITE_DESCRIPTION },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  alternateName: "Terra Liberia",
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  areaServed: "Liberia",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: browser extensions (e.g. Google Analytics
    // Opt-out) inject attributes on <html> before React hydrates. This only
    // silences attribute diffs on this element, not its children.
    <html lang="en" suppressHydrationWarning className={`${jakarta.variable} h-full antialiased`}>
      <head>
        {/* Enables scroll-reveal hidden states before first paint (no flash);
            without JS the class is never added and content stays visible. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('reveal-ready')",
          }}
        />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-brand"
        >
          Skip to content
        </a>
        <Header />
        {/* Reserves the fixed header's full (unscrolled) height. */}
        <div aria-hidden className="h-[76px] shrink-0" />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
