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

export default function Home() {
  return (
    <>
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
