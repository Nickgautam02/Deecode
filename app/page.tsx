import About from "@/components/About";
import BrandMarquee from "@/components/BrandMarquee";
import CaseStudies from "@/components/CaseStudies";
import Contact from "@/components/Contact";
import Creators from "@/components/Creators";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <BrandMarquee />
        <Services />
        <Creators />
        <CaseStudies />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
