import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { business, SITE_URL } from "@/lib/business";

// Display — warm soft serif, moderate weights (restrained, not loud).
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  // Variable font — full weight range available; SOFT axis for the warmer cut.
  axes: ["SOFT"],
  display: "swap",
});

// Body / UI — high-readability humanist grotesk.
const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${business.name} — Catering & Deli in West Boylston, MA`,
    template: `%s · ${business.name}`,
  },
  description:
    "Full-service catering and a fresh made-to-order deli in West Boylston, MA. Corporate breakfasts & lunches, college team boxed lunches, BBQs, and our signature Breakfast Pizza. Get a catering quote.",
  keywords: [
    "catering West Boylston",
    "Worcester catering",
    "corporate catering",
    "boxed lunches",
    "breakfast pizza",
    "deli West Boylston MA",
  ],
  openGraph: {
    type: "website",
    siteName: business.name,
    title: `${business.name} — Catering that makes you look good`,
    description:
      "Full-service catering and a fresh deli serving the Greater Worcester area.",
    url: SITE_URL,
    // Absolute URLs so they resolve correctly under the Pages subpath.
    images: [
      {
        url: `${SITE_URL}/breakfast-pizza.webp`,
        width: 1796,
        height: 1318,
        alt: `${business.name} — signature Breakfast Pizza`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${business.name}`,
    description:
      "Full-service catering and a fresh deli serving the Greater Worcester area.",
    images: [`${SITE_URL}/breakfast-pizza.webp`],
  },
  alternates: { canonical: "/" },
  // Icons live in /public (from the generated favicon set). Declaring them here
  // rather than as hand-written <link> tags lets Next emit them into <head> and
  // keeps them right under basePath/metadataBase changes.
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${hanken.variable} h-full antialiased`}
    >
      {/* Shell only — grain adds subtle paper atmosphere. The site's header,
          footer and mobile action bar live in the (site) layout so they don't
          follow the owner into /admin. */}
      <body className="grain flex min-h-full flex-col">{children}</body>
    </html>
  );
}
