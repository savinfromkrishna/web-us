import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import JsonLd from "./components/json-ld";
import { siteGraph } from "./lib/schema";
import {
  SITE_URL,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_DESCRIPTION,
  LOCALE,
  LOCALE_BCP47,
} from "./lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Health & Wellness",
  formatDetection: { telephone: false, address: false, email: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: LOCALE,
    url: SITE_URL,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  // Geo signals: this site exclusively targets the United States.
  other: {
    "geo.region": "US",
    "geo.placename": "United States",
    coverage: "United States",
    distribution: "US",
    target: "all",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={LOCALE_BCP47}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd data={siteGraph()} />
        <div className="disclaimer-bar">
          Advertising disclosure: This site contains affiliate links and we may
          earn a commission at no extra cost to you.
        </div>
        <header className="site-header">
          <div className="inner">
            <Link href="/" className="brand-logo">
              Wellness<span>Picks</span>
            </Link>
            <nav className="nav-links">
              <Link href="/">Home</Link>
              <Link href="/#reviews">Reviews</Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="site-footer">
          <div className="inner">
            <p>
              &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
            </p>
            <p>
              Independent supplement reviews for readers across all 50 US states.
            </p>
            <p>
              These statements have not been evaluated by the Food and Drug
              Administration. Products reviewed are not intended to diagnose,
              treat, cure, or prevent any disease. Always consult a qualified
              healthcare provider before starting any supplement.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
