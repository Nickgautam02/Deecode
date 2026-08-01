import CreatorSwitchboard, { type WireFace } from "./CreatorSwitchboard";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { site } from "@/content/site";
import { storyDigital as sd, usRoster, widerRoster } from "@/content/story-digital";

/* Credentials one-pager written for a single recipient. Deliberately not
   wired into site.nav — it is reached by the link we send, not by browsing.

   Shares the site's tokens and components (Reveal, SectionHeading, the
   .card-hover treatment) so it reads as part of deecodemediahouse.com
   rather than as a one-off microsite. */

// Six of each keeps the two switchboard columns visually balanced.
const WIRE_BRANDS = sd.supply.domestic.brands.slice(0, 6);
const WIRE_FACES: WireFace[] = [...usRoster, ...widerRoster]
  .slice(0, 6)
  .map((c) => ({
    name: c.name,
    image: c.image,
    meta: `${c.niche.split(" & ")[0]} · ${c.location}`,
  }));

function Rule() {
  return <div className="h-px flex-1 bg-line" />;
}

export default function StoryDigitalCredentials() {
  const intl = sd.supply.international;

  return (
    <main className="bg-background text-foreground">
      {/* ── Masthead ── */}
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-baseline justify-between gap-x-6 gap-y-2 px-5 py-4">
          <p className="font-display text-sm font-extrabold uppercase tracking-[0.12em]">
            Deecode <span className="text-accent">Media House</span>
          </p>
          <p className="text-[0.6875rem] uppercase tracking-[0.15em] text-muted">
            Credentials <span className="text-accent">/</span> prepared for{" "}
            {sd.recipient}
          </p>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="border-b border-line/60">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <Reveal>
            <p className="text-[0.6875rem] uppercase tracking-[0.15em] text-muted">
              {sd.kicker} <span className="text-accent">·</span> {sd.prepared}
            </p>
            <h1 className="font-display mt-5 max-w-[22ch] text-4xl font-extrabold leading-[0.98] tracking-tight sm:text-5xl md:text-6xl">
              {sd.headline.lead}{" "}
              <span className="text-accent">{sd.headline.accent}</span>.
            </h1>
            <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-muted">
              {sd.lede}
            </p>
          </Reveal>

          <CreatorSwitchboard
            brands={WIRE_BRANDS}
            faces={WIRE_FACES}
            caption={sd.wireCaption}
          />
        </div>
      </section>

      {/* ── 01 Roster ── */}
      <section className="border-b border-line/60">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <SectionHeading
            kicker={sd.roster.kicker}
            title={sd.roster.title}
            sub={sd.roster.sub}
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {usRoster.map((c, i) => (
              <Reveal key={c.name} delay={(i % 3) * 80} className="h-full">
                <article className="card-hover flex h-full flex-col gap-4 rounded-2xl border border-line bg-card p-5">
                  <span className="self-start rounded-full bg-accent/15 px-2.5 py-1 text-[0.625rem] uppercase tracking-[0.11em] text-accent">
                    United States
                  </span>
                  <div className="flex items-center gap-3.5">
                    <img
                      src={c.image}
                      alt={c.name}
                      width={52}
                      height={52}
                      loading="lazy"
                      className="shrink-0 rounded-full object-cover"
                      style={{ height: 52, width: 52 }}
                    />
                    <div className="min-w-0">
                      <h3 className="font-display font-bold tracking-tight">
                        {c.name}
                      </h3>
                      <p className="text-sm text-muted">{c.niche}</p>
                    </div>
                  </div>
                  <dl className="grid gap-1.5 border-t border-line pt-4 text-[0.6875rem] uppercase tracking-[0.07em]">
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="text-muted">Platform</dt>
                      <dd>{c.platform}</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="text-muted">Following</dt>
                      <dd className="tabular-nums text-accent">{c.followers}</dd>
                    </div>
                    {/* No niche row — it already sits under the name, and the
                        figures we could add here are not ones we hold. */}
                  </dl>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-14 mb-5 flex items-baseline gap-4">
              <p className="whitespace-nowrap text-[0.6875rem] uppercase tracking-[0.15em] text-muted">
                {sd.roster.widerLabel}
              </p>
              <Rule />
            </div>

            <div className="grid gap-x-10 sm:grid-cols-2">
              {widerRoster.map((c) => (
                <div
                  key={c.name}
                  className="flex items-center gap-3.5 border-b border-line/60 py-3"
                >
                  <img
                    src={c.image}
                    alt={c.name}
                    width={34}
                    height={34}
                    loading="lazy"
                    className="shrink-0 rounded-full object-cover"
                    style={{ height: 34, width: 34 }}
                  />
                  <div className="min-w-0 leading-tight">
                    <p className="font-display text-[0.9375rem] font-semibold">
                      {c.name}
                    </p>
                    <p className="truncate text-sm text-muted">
                      {c.niche} · {c.platform} · {c.location}
                    </p>
                  </div>
                  <span className="ml-auto whitespace-nowrap text-sm tabular-nums text-muted">
                    {c.followers}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <p className="mt-10 max-w-[68ch] rounded-r-xl border-l-2 border-accent bg-accent/[0.08] px-5 py-4 text-sm">
              {sd.usRosterNote}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 02 Coverage ── */}
      <section className="border-b border-line/60">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <SectionHeading
            kicker={sd.coverage.kicker}
            title={sd.coverage.title}
          />
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {sd.coverage.groups.map((group, i) => (
              <Reveal key={group.label} delay={i * 80}>
                <p className="mb-4 border-b border-line pb-3 text-[0.6875rem] uppercase tracking-[0.15em] text-muted">
                  {group.label}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-line bg-card px-2.5 py-1.5 text-sm"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03 Placements ── */}
      <section className="border-b border-line/60">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <SectionHeading
            kicker={sd.supply.kicker}
            title={sd.supply.title}
            sub={sd.supply.sub}
          />
          <div className="grid gap-4 lg:grid-cols-2">
            <Reveal className="h-full">
              <article className="flex h-full flex-col gap-4 rounded-2xl border border-line bg-card p-6">
                <h3 className="font-display flex items-center gap-2.5 font-bold">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {sd.supply.domestic.label}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {sd.supply.domestic.brands.map((brand) => (
                    <li
                      key={brand}
                      className="rounded-lg border border-line px-2.5 py-1.5 text-sm"
                    >
                      {brand}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>

            <Reveal delay={80} className="h-full">
              <article className="flex h-full flex-col gap-4 rounded-2xl border border-line bg-card p-6">
                <h3 className="font-display flex items-center gap-2.5 font-bold">
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: "var(--accent-2)" }}
                  />
                  {intl.label}
                </h3>
                {intl.brand ? (
                  <ul className="flex flex-wrap gap-2">
                    <li className="rounded-lg border border-line px-2.5 py-1.5 text-sm">
                      {intl.brand}
                    </li>
                  </ul>
                ) : (
                  /* Unmissable on purpose: this page must not go out with the
                     placeholder still in it. See content/story-digital.ts. */
                  <p
                    className="self-start rounded-lg border border-dashed px-3 py-2 text-sm"
                    style={{
                      color: "var(--accent-2)",
                      borderColor: "var(--accent-2)",
                    }}
                  >
                    [ BRAND NAME — fill in content/story-digital.ts before
                    sending ]
                  </p>
                )}
                <p className="max-w-[46ch] text-muted">{intl.note}</p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 04 Process. A real sequence, so the steps are numbered. ── */}
      <section className="border-b border-line/60">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <SectionHeading
            kicker={sd.process.kicker}
            title={sd.process.title}
            sub={sd.process.sub}
          />

          <ol className="border-t border-line">
            {sd.process.steps.map((step, i) => (
              <li key={step.title} className="border-b border-line/60">
                <Reveal>
                  <div className="grid gap-x-5 py-6 sm:grid-cols-[2.75rem_minmax(0,1fr)]">
                    <span className="pt-1 text-xs tabular-nums tracking-wider text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-baseline gap-x-3.5 gap-y-2">
                        <h3 className="font-display font-bold tracking-tight">
                          {step.title}
                        </h3>
                        <span className="whitespace-nowrap rounded-full border border-line px-2.5 py-0.5 text-[0.6875rem] uppercase tracking-[0.08em] text-muted">
                          {step.clock}
                        </span>
                      </div>
                      <p className="mt-2 max-w-[66ch] text-muted">{step.body}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {sd.process.throughput.map((t, i) => (
              <Reveal key={t.label} delay={(i % 4) * 70} className="h-full">
                <div className="h-full rounded-xl border border-line bg-card p-4">
                  <p className="font-display text-xl font-bold tracking-tight">
                    {t.value}
                  </p>
                  <p className="mt-1 text-[0.6875rem] uppercase tracking-[0.1em] text-muted">
                    {t.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 05 Case studies ── */}
      <section className="border-b border-line/60">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <SectionHeading
            kicker={sd.caseStudies.kicker}
            title={sd.caseStudies.title}
          />
          <Reveal>
            <p className="max-w-[62ch] text-muted">{sd.caseStudies.body}</p>
            <p className="mt-8 max-w-[68ch] rounded-r-xl border-l-2 border-accent bg-accent/[0.08] px-5 py-4 text-sm">
              {sd.caseStudies.note}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 06 What we need ── */}
      <section>
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <SectionHeading kicker={sd.brief.kicker} title={sd.brief.title} />
          <Reveal>
            <ul className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {sd.brief.items.map((item) => (
                <li
                  key={item.label}
                  className="bg-background px-5 py-4 md:px-6 md:py-5"
                >
                  <p className="text-[0.6875rem] uppercase tracking-[0.12em] text-accent">
                    {item.label}
                  </p>
                  <p className="mt-1.5 text-muted">{item.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── Close ── */}
      <section className="mx-auto max-w-6xl px-5 pb-16 md:pb-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-8 rounded-3xl border border-line bg-card p-7 md:p-10">
            <div className="max-w-[40ch]">
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                {sd.close.title}
              </h2>
              <p className="mt-3 text-muted">{sd.close.body}</p>
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent(sd.close.subject)}`}
                className="font-display mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-bold text-background transition-transform hover:-translate-y-0.5"
              >
                {sd.close.cta}
                <svg
                  width="14"
                  height="10"
                  viewBox="0 0 14 10"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M1 5h11M8.5 1.5 12 5l-3.5 3.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>

            <div className="flex flex-col gap-1.5 text-sm">
              <a
                href={`mailto:${site.email}`}
                className="border-b border-line pb-0.5 transition-colors hover:border-accent hover:text-accent"
              >
                {site.email}
              </a>
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="border-b border-line pb-0.5 transition-colors hover:border-accent hover:text-accent"
              >
                {site.phone}
              </a>
              <a
                href={`https://${site.domain}`}
                target="_blank"
                rel="noopener"
                className="border-b border-line pb-0.5 transition-colors hover:border-accent hover:text-accent"
              >
                {site.domain}
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="border-t border-line/60">
        <div className="mx-auto max-w-6xl px-5 py-6">
          <p className="text-[0.6875rem] uppercase tracking-[0.1em] text-muted">
            {site.name} · {site.tagline} · Confidential
          </p>
        </div>
      </footer>
    </main>
  );
}
