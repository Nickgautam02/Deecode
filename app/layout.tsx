import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter, Montserrat } from "next/font/google";
import { locations } from "@/content/locations";
import { site } from "@/content/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: `${site.name} — ${site.tagline}`,
  description: site.hero.sub,
  // Self-referencing canonical. Without it the homepage had none, which
  // leaves Google to pick its own preferred URL if the page is ever reached
  // with tracking params (?fbclid=, ?utm_source=) — each of those is a
  // separate URL to a crawler, splitting the signals across duplicates.
  alternates: { canonical: "/" },
  // Google has ignored the keywords meta since 2009. Kept only because it
  // costs nothing; do not spend time tuning it. Ranking comes from the
  // JSON-LD below, the page copy, and links pointing at the domain.
  keywords: [
    "influencer marketing agency",
    "talent management",
    "creator economy",
    "content production",
    "brand strategy",
    site.name,
  ],
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.hero.sub,
    url: `https://${site.domain}`,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.hero.sub,
  },
};

// Structured data — how Google learns that this domain IS an organisation
// called Deecode Media House, rather than guessing from the copy. This is
// what feeds the knowledge panel on a brand search, and it is why `sameAs`
// matters: each link is a claim Google can corroborate elsewhere.
//
// ⚠ EVERY FIELD HERE MUST BE TRUE AND VISIBLE ON THE PAGE. Structured data
// that disagrees with the rendered page is a manual-action risk, not a
// clever shortcut. Add awards, ratings or review counts only when they are
// real and shown on the site.
//
// Add profiles to `sameAs` as they go live (Instagram, YouTube, X) — a
// single LinkedIn is thin, and this list is one of the cheapest wins left.
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  // A stable identifier for this company, so the ProfessionalService
  // entity each city page emits can point `parentOrganization` at it.
  // Without an @id those pages describe an unrelated business that
  // happens to share a name.
  "@id": `https://${site.domain}/#organization`,
  name: site.name,
  url: `https://${site.domain}`,
  logo: `https://${site.domain}/icon.png`,
  image: `https://${site.domain}/opengraph-image.jpg`,
  description: site.hero.sub,
  email: site.email,
  telephone: site.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Technocity",
    addressLocality: "Greater Noida",
    addressRegion: "Uttar Pradesh",
    addressCountry: "IN",
  },
  // ⚠ THE MOST LOAD-BEARING FIELD ON THIS PAGE, for one specific reason:
  // Google rewrites "deecode" to "decode" and serves results for Decode
  // Media House Pvt Ltd, Decode House and Decode Mediacom instead. It does
  // that because it does not yet believe "Deecode" is a real name.
  //
  // What teaches it otherwise is the same spelling appearing on several
  // independent sources it already trusts. These profiles ALREADY outrank
  // this website on a brand search, so they are the corroboration — listing
  // them here ties them to this domain as one entity.
  //
  // Add every profile as it goes live (YouTube, X, Google Business Profile)
  // and keep the name spelt identically on each. One inconsistent listing
  // is a wasted signal.
  sameAs: [
    site.socials.linkedin,
    "https://www.instagram.com/deecode.media/",
  ],
  // The services block on the homepage, restated in a form a crawler can
  // read. Keep in step with site.services.
  knowsAbout: site.services.map((service) => service.title),
  // Where the company works, as distinct from where it sits. `address`
  // above is the office; this is the catchment. Both are true, and a
  // search for an agency "in Noida" is matched by this field, not by
  // the address — which is why claiming a fake Noida address is both
  // unnecessary and a Business Profile risk.
  //
  // Keep in step with content/locations.ts: a city listed here with no
  // page behind it is a claim with nothing to land on.
  areaServed: locations.map((location) => ({
    "@type": location.areaType,
    name: location.city,
  })),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // Next 16 no longer overrides `scroll-behavior: smooth` (set in
      // globals.css) during route transitions; this opts back in so
      // navigating to /portfolio/MIT jumps instead of animating.
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Rendered server-side so it is in the HTML Googlebot receives on
            the first pass, rather than something it has to run JS to find. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
      <GoogleAnalytics gaId="G-1RNV3LT3X7" />
    </html>
  );
}
