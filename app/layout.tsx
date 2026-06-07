import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_NAME = "WellnessPicks";

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "WellnessPicks — Honest Supplement Reviews",
    template: "%s | WellnessPicks",
  },
  description:
    "In-depth, honest reviews of today's most popular health and wellness supplements, with ingredients, pricing, guarantees, and where to buy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
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
