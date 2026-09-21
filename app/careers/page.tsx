import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Reveal from "@/components/Reveal";
import { careers } from "@/content/careers";
import { site } from "@/content/site";

// /careers — the creator hiring page. The copy is in content/careers.ts;
// the application form is a Google Form that lives outside this repo.
//
// ── INDEXED, UNLIKE /gallery AND THE PROPOSALS ─────────────────────
// Every other secondary route on this domain carries `robots: { index:
// false }`, because they exist to be sent to someone. This one exists to
// be found: a creator searching "content creator internship delhi" is
// exactly the reader it wants, and a recruiting page nobody can find is
// a form with no traffic.
//
// Per the rule in app/sitemap.ts that is two decisions in two places —
// no `robots` key here, and an entry in the sitemap. Both are done. To
// pull it back out of search, add `robots: { index: false, follow: true }`
// here AND delete it from app/sitemap.ts; doing one is silent.
export const metadata: Metadata = {
  title: `Careers — ${site.name}`,
  description:
    "We're hiring an on-camera content creator in Delhi NCR. Paid internship, in the field from day one — apply with a reel you're on camera in.",
  alternates: { canonical: "/careers" },
  openGraph: {
    title: `Careers — ${site.name}`,
    description:
      "We're hiring an on-camera content creator in Delhi NCR. Paid internship, in the field from day one.",
    url: `https://${site.domain}/careers`,
    siteName: site.name,
    type: "website",
  },
};

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="hero-glow px-5 pb-12 pt-28 md:pb-16 md:pt-32">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                {careers.kicker}
              </p>
              <h1 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
                {careers.title.lead}{" "}
                <span className="text-accent">{careers.title.accent}</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-muted">{careers.lede}</p>
              <a
                href="#apply"
                className="mt-8 inline-block rounded-full bg-accent px-6 py-3 text-sm font-semibold text-background transition-transform hover:scale-105"
              >
                Apply now
              </a>
            </Reveal>
          </div>
        </section>

        <section className="px-5 pb-16">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 md:grid-cols-3">
              {careers.blocks.map((block, i) => (
                <Reveal key={block.title} delay={i * 100}>
                  <article className="card-hover h-full rounded-2xl border border-line bg-card p-8">
                    <h2 className="font-display text-xl font-bold">
                      {block.title}
                    </h2>
                    <ul className="mt-6 space-y-2.5">
                      {block.points.map((point) => (
                        <li key={point} className="flex items-start gap-3 text-sm">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── The form ──────────────────────────────────────────────
            Embedded rather than linked, so applying never leaves the
            site — a creator who taps through to Google is a creator who
            can be distracted by Google.

            It renders in Google's own light theme inside the frame,
            which is why it sits on a white card with a little padding:
            an unframed white rectangle butting against the dark page
            looks like a rendering fault, and a framed one looks like a
            form. Nothing can restyle the inside of that frame — it is
            another origin, and that is the deal with an embed.

            The height is fixed and generous because the frame cannot
            measure its own content across origins. The form paginates
            into six sections, so this only has to fit the longest one;
            anything taller scrolls inside the frame. */}
        <section id="apply" className="scroll-mt-20 px-5 pb-24">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                  {careers.form.heading}
                </h2>
                <a
                  href={careers.form.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-accent underline-offset-4 hover:underline"
                >
                  {careers.form.fallback} →
                </a>
              </div>

              <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-white p-2 sm:p-3">
                <iframe
                  src={`${careers.form.url}?embedded=true`}
                  title="Deecode Media House creator application form"
                  loading="lazy"
                  className="h-[1100px] w-full md:h-[1350px]"
                >
                  Loading the application form…
                </iframe>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
