import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Reveal from "@/components/Reveal";
import { locations } from "@/content/locations";
import { site } from "@/content/site";
import { talentManagement as tm } from "@/content/talent-management";
import { shareImage } from "@/app/shared-metadata";

// /talent-management-agency — the creator-facing service page.
//
// ── INDEXED, AND THE URL IS THE KEYWORD ────────────────────────────
// Same construction as the city pages: the search phrase is the slug,
// the phrase is the H1, and the `answer` paragraph sits directly under
// it as the block an AI Overview can quote. Copy is in
// content/talent-management.ts.
//
// Per the rule in app/sitemap.ts this is two decisions in two places —
// no `robots` key here, and an entry in the sitemap. Both are done.
// Adding a `robots` key later without removing the sitemap entry asks
// Google to crawl a page we then tell it to drop.
//
// ⚠ NOTHING ON THIS SITE LINKS HERE, ON PURPOSE. It had a footer link
// and a link from the "Talent Management" card on the homepage; both
// were removed so the page is unlisted — a URL to hand out, not a
// section of the website. Do not re-add either without asking.
//
// Which makes app/sitemap.ts this page's ONLY discovery path, and the
// entry there load-bearing rather than routine. It is still indexable:
// no `robots` key here means Google may rank and list it for "talent
// management agency", which is the point of the page. Unlisted is not
// the same as private — if it should be out of search too, it needs
// `robots: { index: false, follow: true }` here AND removal from the
// sitemap, the same pair the proposal routes use.
//
// One consequence worth knowing: with no internal links, this page
// inherits no link equity from the homepage, so it ranks on its own
// content alone. A single footer link is the cheapest fix if it ever
// under-performs.

const url = `https://${site.domain}/${tm.slug}`;
const title = `${tm.title} | ${site.name}`;

export const metadata: Metadata = {
  title,
  // The `answer` doubles as the meta description, as on the city pages:
  // it is already written to stand alone, which is what a description
  // needs. Google trims at ~160 characters and the first sentence is
  // built to carry the page on its own.
  description: tm.answer,
  alternates: { canonical: `/${tm.slug}` },
  openGraph: {
    title,
    description: tm.answer,
    url,
    siteName: site.name,
    type: "website",
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: tm.answer,
    images: [shareImage],
  },
};

export default function TalentManagementPage() {
  // Three entities, one graph — the same shape the city pages emit.
  //
  //  · Service — what this page is, tied to the single Organization in
  //    app/layout.tsx as its provider, so the two read as one company.
  //  · FAQPage — the highest-value block here for AI answers. Every
  //    Q/A is also rendered as visible text below. Both, always.
  //  · BreadcrumbList — the page hangs off the homepage and nothing in
  //    the header nav says so, which makes stating it explicitly worth
  //    the twelve lines.
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: "Talent management",
        serviceType: "Creator and influencer talent management",
        url,
        description: tm.answer,
        provider: { "@id": `https://${site.domain}/#organization` },
        areaServed: [
          { "@type": "Country", name: "India" },
          { "@type": "Country", name: "United States" },
          { "@type": "Country", name: "United Arab Emirates" },
        ],
        audience: { "@type": "Audience", audienceType: "Content creators" },
        // The six things management actually covers, as an itemised
        // offer catalogue rather than a paragraph a crawler has to
        // infer a list from.
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Talent management services",
          itemListElement: tm.whatWeDo.map((item) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: item.title },
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: tm.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: site.name,
            item: `https://${site.domain}`,
          },
          { "@type": "ListItem", position: 2, name: tm.title },
        ],
      },
    ],
  };

  return (
    <>
      {/* Server-rendered, like the Organization schema in the root
          layout — in the HTML on the first pass, no JS required. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Navbar />
      <main className="flex-1">
        {/* ── Hero. The answer sits directly under the H1 with nothing
              between them — it is the block that gets quoted. ── */}
        <section className="hero-glow px-5 pb-14 pt-28 md:pb-20 md:pt-32">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                {tm.kicker}
              </p>
              <h1 className="font-display max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
                {tm.title}
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-relaxed text-foreground/90">
                {tm.answer}
              </p>
              <p className="mt-5 max-w-2xl text-muted">{tm.intro}</p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href="/#contact"
                  className="rounded-full bg-accent px-7 py-3 text-sm font-semibold text-background transition-transform hover:scale-[1.03]"
                >
                  Join the roster
                </Link>
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="rounded-full border border-line px-7 py-3 text-sm font-semibold text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  {site.phone}
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Roster facts, as plain text a crawler and an LLM can both
              read. Deliberately not site.stats: this page argues to
              creators, so roster size, markets and brand partners are
              the numbers that answer "would they represent me". The
              campaign-volume figures live on the pages that sell to
              brands. (It also sidestepped a stale views figure when it
              was written; that one is fixed, and this choice stands on
              its own.) ── */}
        <section className="border-y border-line bg-card/40 px-5 py-10">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-3">
            {tm.roster.facets.map((facet) => (
              <div key={facet.label}>
                <p className="font-display text-3xl font-bold text-accent md:text-4xl">
                  {facet.value}
                </p>
                <p className="mt-1 text-sm text-muted">{facet.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── What management covers ── */}
        <section className="px-5 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <Reveal className="mb-12">
              <h2 className="font-display max-w-2xl text-3xl font-bold tracking-tight md:text-4xl">
                What we actually do for{" "}
                <span className="text-accent">a creator</span>
              </h2>
            </Reveal>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {tm.whatWeDo.map((item, i) => (
                <Reveal key={item.title} delay={i * 80}>
                  <article className="card-hover h-full rounded-2xl border border-line bg-card p-7">
                    <h3 className="font-display text-xl font-bold">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {item.text}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── The roster, with a link into the homepage's own list ── */}
        <section className="border-t border-line px-5 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                {tm.roster.title}
              </h2>
              <p className="mt-6 max-w-3xl leading-relaxed text-muted">
                {tm.roster.text}
              </p>
              <Link
                href="/#creators"
                className="mt-7 inline-block text-sm font-semibold text-accent underline-offset-4 hover:underline"
              >
                See creators we represent →
              </Link>
            </Reveal>
          </div>
        </section>

        {/* ── How signing works ── */}
        <section className="border-t border-line px-5 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <Reveal className="mb-10">
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                How it works
              </h2>
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {tm.process.map((step, i) => (
                <Reveal key={step.title} delay={i * 80}>
                  <article className="h-full rounded-2xl border border-line bg-card p-6">
                    <span className="font-display text-sm font-bold text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display mt-3 text-lg font-bold">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {step.text}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── The brand half, and the brand names as proof ── */}
        <section className="border-t border-line px-5 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                {tm.forBrands.title}
              </h2>
              <p className="mt-6 max-w-3xl leading-relaxed text-muted">
                {tm.forBrands.text}
              </p>
              <p className="mt-7 leading-relaxed text-muted">
                {site.brands.join(" · ")}
              </p>
              <Link
                href="/netflix-case-studies"
                className="mt-7 inline-block text-sm font-semibold text-accent underline-offset-4 hover:underline"
              >
                Read the campaign case studies →
              </Link>
            </Reveal>
          </div>
        </section>

        {/* ── FAQ. Visible text for the same Q/A emitted as FAQPage
              schema above. Both, always — schema that disagrees with
              the rendered page is a manual-action risk. ── */}
        <section className="border-t border-line px-5 py-16 md:py-20">
          <div className="mx-auto max-w-4xl">
            <Reveal className="mb-10">
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                Frequently asked
              </h2>
            </Reveal>
            <div className="space-y-4">
              {tm.faqs.map((faq, i) => (
                <Reveal key={faq.q} delay={i * 70}>
                  <details className="group rounded-2xl border border-line bg-card p-6 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-start justify-between gap-6 font-display text-lg font-bold">
                      <h3>{faq.q}</h3>
                      <span className="mt-1 shrink-0 text-accent transition-transform duration-300 group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-4 leading-relaxed text-muted">{faq.a}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Close, and the links out. The city pages get most of their
              link equity from pages like this one; nothing in the main
              nav points at any of them. ── */}
        <section className="border-t border-line px-5 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <h2 className="font-display max-w-2xl text-3xl font-bold tracking-tight md:text-4xl">
                Looking for a manager?
              </h2>
              <p className="mt-5 max-w-2xl text-muted">
                Tell us what you are making and what you are being offered.
                The creator form takes a minute.
              </p>
              <Link
                href="/#contact"
                className="mt-8 inline-block rounded-full bg-accent px-7 py-3 text-sm font-semibold text-background transition-transform hover:scale-[1.03]"
              >
                Join the roster
              </Link>

              <p className="mb-5 mt-14 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                Also from Deecode
              </p>
              <div className="flex flex-wrap gap-4">
                {locations.map((location) => (
                  <Link
                    key={location.slug}
                    href={`/influencer-marketing-agency-${location.slug}`}
                    className="rounded-full border border-line px-6 py-2.5 text-sm transition-colors hover:border-accent hover:text-accent"
                  >
                    {location.title}
                  </Link>
                ))}
                <Link
                  href="/gallery"
                  className="rounded-full border border-line px-6 py-2.5 text-sm transition-colors hover:border-accent hover:text-accent"
                >
                  Selected work
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
