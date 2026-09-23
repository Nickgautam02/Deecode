import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Reveal from "@/components/Reveal";
import { careers } from "@/content/careers";
import { site } from "@/content/site";

// /careers — the hiring page for whichever role is open. The copy is in
// content/careers.ts; the application form is a Google Form that lives
// outside this repo. It has carried two roles so far — the on-camera
// creator first, now the outreach and social media intern — and the page
// holds one at a time, which is why nothing here names a role.
//
// ── INDEXED, UNLIKE /gallery AND THE PROPOSALS ─────────────────────
// Every other secondary route on this domain carries `robots: { index:
// false }`, because they exist to be sent to someone. This one exists to
// be found: someone searching "social media internship delhi" is exactly
// the reader it wants, and a recruiting page nobody can find is a form
// with no traffic.
//
// Per the rule in app/sitemap.ts that is two decisions in two places —
// no `robots` key here, and an entry in the sitemap. Both are done. To
// pull it back out of search, add `robots: { index: false, follow: true }`
// here AND delete it from app/sitemap.ts; doing one is silent.
export const metadata: Metadata = {
  title: `Careers — ${site.name}`,
  description:
    "We're hiring an outreach and social media intern — creator outreach, our own handles, Canva and research. Paid internship, Delhi NCR or remote.",
  alternates: { canonical: "/careers" },
  openGraph: {
    title: `Careers — ${site.name}`,
    description:
      "We're hiring an outreach and social media intern. Paid internship, real briefs from day one, Delhi NCR or remote.",
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
              {/* The only way in. There was a second button under the
                  cards — same link, lower down — and one CTA answered
                  by one click reads better than two that do the same
                  thing. It opens Google Forms in a new tab. */}
              <a
                href={careers.form.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block rounded-full bg-accent px-6 py-3 text-sm font-semibold text-background transition-transform hover:scale-105"
              >
                Apply now
              </a>
            </Reveal>
          </div>
        </section>

        <section className="px-5 pb-24">
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

      </main>
      <Footer />
    </>
  );
}
