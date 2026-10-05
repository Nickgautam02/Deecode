import About from "@/components/About";
import BrandMarquee from "@/components/BrandMarquee";
import CaseStudies from "@/components/CaseStudies";

import Contact from "@/components/Contact";
import Creators from "@/components/Creators";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import PlatformFlywheel from "@/components/PlatformFlywheel";
import Services from "@/components/Services";
import { site } from "@/content/site";

// The WebSite entity — what Google's site-name system reads to decide
// the name printed above every result from this domain. Without it that
// name is inferred from titles and og:site_name, which is the same
// guesswork that has Google rewriting "Deecode" to "Decode" (see
// `sameAs` in app/layout.tsx). Google reads this from the homepage only,
// so it lives here rather than in the layout beside the Organization,
// and `publisher` points at that Organization's @id so the two are one
// entity. Name and URL only: both are already on every page.
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `https://${site.domain}/#website`,
  name: site.name,
  url: `https://${site.domain}`,
  publisher: { "@id": `https://${site.domain}/#organization` },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <BrandMarquee />
        {/* Proof before the offer — the same order the case-study deck
            settled on. Moving <Services /> back above this puts the
            list every agency has in front of the work only we ran. */}
        <CaseStudies />
        <Services />
        <PlatformFlywheel />
        <Creators />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
