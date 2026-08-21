import type { Metadata } from "next";
import Link from "next/link";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Reveal from "./Reveal";
import { findLocation, locationProof, locations, officeLocality } from "@/content/locations";
import { site } from "@/content/site";

// One implementation behind three URLs. The route folders named
// app/influencer-marketing-agency-<slug> are two lines each and differ
// only by slug; everything that varies between cities lives in
// content/locations.ts, so this file never needs a city name in it.

function urlFor(slug: string) {
  return `https://${site.domain}/influencer-marketing-agency-${slug}`;
}

/** Called from each route's `export const metadata`. Evaluated at
 *  build time, so an unknown slug is a build failure rather than a
 *  page that quietly ships with the wrong <title>. */
export function locationMetadata(slug: string): Metadata {
  const location = findLocation(slug);
  if (!location) {
    throw new Error(`locationMetadata: no location with slug "${slug}" in content/locations.ts`);
  }

  const title = `${location.title} | ${site.name}`;
  const url = urlFor(slug);

  return {
    title,
    // The `answer` doubles as the meta description. It is already
    // written to stand alone (see content/locations.ts rule 3), which
    // is the same thing a description needs, so there is no second
    // string to keep in sync. Trimmed by Google at ~160 chars — the
    // first sentence is built to carry the page on its own.
    description: location.answer,
    alternates: { canonical: `/influencer-marketing-agency-${slug}` },
    // ⚠ NO `robots` KEY HERE, DELIBERATELY. These three pages are the
    // only routes besides the homepage that are meant to rank, and
    // they are listed in app/sitemap.ts to match. Adding a `robots`
    // key would silently undo that — see the warning in sitemap.ts.
    openGraph: {
      title,
      description: location.answer,
      url,
      siteName: site.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: location.answer,
    },
  };
}

export default function LocationPage({ slug }: { slug: string }) {
  const location = findLocation(slug);
  if (!location) {
    throw new Error(`LocationPage: no location with slug "${slug}" in content/locations.ts`);
  }

  const url = urlFor(slug);
  const proof = locationProof.find((entry) => entry.slug === slug);
  const others = locations.filter((entry) => entry.slug !== slug);

  // Three entities, one graph.
  //
  //  · ProfessionalService — the local-business entity Google reads
  //    for city intent. `areaServed` is the field doing the work;
  //    `address` stays the real office in every case, because a
  //    fabricated per-city address is the fastest way to lose a
  //    Business Profile.
  //  · FAQPage — the highest-value block on the page for AI answers.
  //    Every Q/A here is also rendered as visible text below, which
  //    is a requirement, not a nicety.
  //  · BreadcrumbList — these pages are reachable by direct link and
  //    from the footer, not from the main nav, so this is how the
  //    hierarchy gets stated explicitly rather than inferred.
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${url}#business`,
        name: site.name,
        url,
        // Ties this page's business entity back to the single
        // Organization declared in app/layout.tsx, so the two are read
        // as one company rather than as separate businesses.
        parentOrganization: { "@id": `https://${site.domain}/#organization` },
        description: location.answer,
        image: `https://${site.domain}/opengraph-image.jpg`,
        logo: `https://${site.domain}/icon.png`,
        email: site.email,
        telephone: site.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Technocity",
          addressLocality: officeLocality,
          addressRegion: "Uttar Pradesh",
          addressCountry: "IN",
        },
        areaServed: { "@type": location.areaType, name: location.city },
        knowsAbout: site.services.map((service) => service.title),
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: location.faqs.map((faq) => ({
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
          { "@type": "ListItem", position: 2, name: location.title },
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
        {/* ── Hero. The answer paragraph sits directly under the H1 with
              nothing between them: no scene-setting, no value prop. It
              is the block that gets quoted, so it goes first. ── */}
        <section className="hero-glow px-5 pb-14 pt-28 md:pb-20 md:pt-32">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                {location.kicker}
              </p>
              <h1 className="font-display max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
                {location.title}
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-relaxed text-foreground/90">
                {location.answer}
              </p>
              <p className="mt-5 max-w-2xl text-muted">{location.intro}</p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href="/#contact"
                  className="rounded-full bg-accent px-7 py-3 text-sm font-semibold text-background transition-transform hover:scale-[1.03]"
                >
                  Start a campaign
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

        {/* ── Stats. The homepage's own numbers, restated as plain text
              a crawler and an LLM can both read. ── */}
        <section className="border-y border-line bg-card/40 px-5 py-10">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 md:grid-cols-4">
            {site.stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl font-bold text-accent md:text-4xl">
                  {stat.value}
                  {stat.suffix}
                </p>
                <p className="mt-1 text-sm text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Why this city. City-specific by construction. ── */}
        <section className="px-5 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <Reveal className="mb-12">
              <h2 className="font-display max-w-2xl text-3xl font-bold tracking-tight md:text-4xl">
                Working with brands in <span className="text-accent">{location.city}</span>
              </h2>
            </Reveal>
            <div className="grid gap-6 md:grid-cols-3">
              {location.points.map((point, i) => (
                <Reveal key={point.title} delay={i * 100}>
                  <article className="card-hover h-full rounded-2xl border border-line bg-card p-7">
                    <h3 className="font-display text-xl font-bold">{point.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{point.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>

            {/* Renders only when a real, named local campaign has been
                added to `locationProof`. An empty block beats an
                invented one — see content/locations.ts. */}
            {proof && (
              <Reveal className="mt-10">
                <div className="rounded-2xl border border-accent/30 bg-card p-7">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                    Recent work in {location.city}
                  </p>
                  <p className="leading-relaxed text-muted">{proof.text}</p>
                </div>
              </Reveal>
            )}
          </div>
        </section>

        {/* ── Services. Same five as the homepage, listed rather than
              re-described — this page is not the place to re-pitch
              them, but a crawler should see them on it. ── */}
        <section className="border-t border-line px-5 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <Reveal className="mb-10">
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                Services for {location.city} brands
              </h2>
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {site.services.map((service, i) => (
                <Reveal key={service.title} delay={i * 80}>
                  <article className="h-full rounded-2xl border border-line bg-card p-6">
                    <h3 className="font-display text-lg font-bold">{service.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {service.description}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Brands. Names only, exactly as on the homepage. ── */}
        <section className="border-t border-line px-5 py-14">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <h2 className="font-display text-2xl font-bold tracking-tight">
                Brands we have delivered campaigns for
              </h2>
              <p className="mt-5 leading-relaxed text-muted">{site.brands.join(" · ")}</p>
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
              {location.faqs.map((faq, i) => (
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

        {/* ── The other two cities. Internal links between these pages
              are most of the link equity they get: nothing in the main
              nav points here by design. ── */}
        <section className="border-t border-line px-5 py-14">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                Also serving
              </p>
              <div className="flex flex-wrap gap-4">
                {others.map((other) => (
                  <Link
                    key={other.slug}
                    href={`/influencer-marketing-agency-${other.slug}`}
                    className="rounded-full border border-line px-6 py-2.5 text-sm transition-colors hover:border-accent hover:text-accent"
                  >
                    {other.title}
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
