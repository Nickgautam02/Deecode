import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Reveal from "@/components/Reveal";
import { gallery } from "@/content/gallery";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Gallery — ${site.name}`,
  description: gallery.intro,
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: `Gallery — ${site.name}`,
    description: gallery.intro,
    url: `https://${site.domain}/gallery`,
    siteName: site.name,
    type: "website",
  },
};

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="hero-glow px-5 pb-12 pt-28 md:pb-16 md:pt-32">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                {gallery.kicker}
              </p>
              <h1 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
                {gallery.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-muted">{gallery.intro}</p>
              <p className="mt-8 text-xs uppercase tracking-[0.2em] text-muted">
                {gallery.items.length} photographs · {gallery.videos.length} films
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── Films — each in a box set to its own aspect ratio, read from
              the file, so nothing shifts once metadata loads ── */}
        <section className="px-5 pb-14">
          <div className="mx-auto max-w-6xl">
            <div className="grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.videos.map((v, i) => (
                <Reveal key={v.src} delay={i * 90}>
                  <figure className="overflow-hidden rounded-2xl border border-line bg-card">
                    <div
                      className="w-full bg-black"
                      style={{ aspectRatio: `${v.w} / ${v.h}` }}
                    >
                      <video
                        controls
                        preload="metadata"
                        playsInline
                        className="h-full w-full"
                      >
                        <source src={v.src} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <figcaption className="flex items-baseline justify-between gap-4 px-5 py-4">
                      <span className="text-sm">{v.title}</span>
                      <span className="shrink-0 text-[11px] uppercase tracking-[0.15em] text-accent">
                        {v.tag}
                      </span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Photographs — CSS columns give a natural masonry that
              respects each frame's own aspect ratio ── */}
        <section className="px-5 pb-24">
          <div className="mx-auto max-w-6xl">
            <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
              {gallery.items.map((item, i) => (
                <Reveal key={item.src} delay={(i % 3) * 90} className="break-inside-avoid">
                  <figure className="group overflow-hidden rounded-2xl border border-line bg-card">
                    <a
                      href={item.src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                      aria-label={`Open full size: ${item.caption}`}
                    >
                      <Image
                        src={item.src}
                        alt={item.caption}
                        width={item.w}
                        height={item.h}
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </a>
                    <figcaption className="flex items-baseline justify-between gap-4 px-5 py-4">
                      <span className="text-sm">{item.caption}</span>
                      <span className="shrink-0 text-[11px] uppercase tracking-[0.15em] text-accent">
                        {item.tag}
                      </span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
