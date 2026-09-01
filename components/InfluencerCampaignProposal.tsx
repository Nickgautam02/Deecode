import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { site } from "@/content/site";
import { rootedActives } from "@/content/rooted-actives";

/* Brand-side influencer marketing proposal, written for one recipient.
   Deliberately not in site.nav — it is reached by the link we send.

   One layout, one content file per brand: pass `content` to render a
   different cast, set of guardrails and prices. It defaults to
   content/rooted-actives.ts, which is /rooted-actives-proposal.

   Named for the offering rather than the client because the shape —
   opportunity, casting, process, guardrails, packages — is the shape of
   any brand-side creator pitch. Only the content file is client-specific.

   Uses the site's own tokens and components (Reveal, SectionHeading, the
   .card-hover and .hero-glow treatments) so it reads as part of
   deecodemediahouse.com rather than as a one-off microsite. A scoped
   earthy re-skin was tried here and reverted — this page stays on the
   site palette, like every other proposal route except /portfolio/MIT. */

/** One treatment, everywhere on the page. Two tick colours inside a price
    card made the dimmer lines read as "not included". */
function Tick() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="mt-[0.3rem] h-3.5 w-3.5 shrink-0 text-accent"
    >
      <path
        d="M2.5 8.5l3.5 3.5 7.5-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function InfluencerCampaignProposal({
  content: ra = rootedActives,
}: {
  /** A brand's content file. Must match the shape of `rootedActives` —
      the pages that render this each own one, so the cast, the prices and
      the guardrails can differ per proposal without branching in here. */
  content?: typeof rootedActives;
}) {
  return (
    <main className="bg-background text-foreground">
      {/* ── Masthead ── */}
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-baseline justify-between gap-x-6 gap-y-2 px-5 py-4">
          <p className="font-display text-sm font-extrabold uppercase tracking-[0.12em]">
            Deecode <span className="text-accent">Media House</span>
          </p>
          <p className="text-[0.6875rem] uppercase tracking-[0.15em] text-muted">
            Proposal <span className="text-accent">/</span>{" "}
            {ra.recipient
              ? `prepared for ${ra.recipient}`
              : "influencer marketing"}
          </p>
        </div>
      </header>

      {/* ── Cover ── */}
      <section className="hero-glow relative overflow-hidden border-b border-line/60">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <Reveal>
            <p className="text-[0.6875rem] uppercase tracking-[0.15em] text-muted">
              {ra.kicker} <span className="text-accent">·</span> {ra.prepared}
            </p>
            {/* Document-scale, not landing-page-scale: this page is read,
                not scrolled past, so the headline stays under the size the
                marketing hero on / uses. */}
            <h1 className="font-display mt-5 max-w-[24ch] text-3xl font-extrabold leading-[1.06] tracking-tight sm:text-4xl md:text-5xl">
              {ra.headline.lead}{" "}
              <span className="text-accent">{ra.headline.accent}</span>.
            </h1>
            <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-muted">
              {ra.lede}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <nav
              aria-label="Contents"
              className="mt-11 flex flex-wrap gap-2.5 border-t border-line pt-8"
            >
              {ra.contents.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-accent hover:text-accent"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </Reveal>
        </div>
      </section>

      {/* ── Credentials strip. Figures come from content/site.ts, so this
             page and the homepage cannot disagree.

             Rendered as plain text rather than with components/CountUp:
             that starts at 0 and only animates when its observer fires, so
             a missed trigger leaves a credentials row reading "0+" — worse
             on a document sent to one reader than no animation at all. ── */}
      <section className="border-b border-line/60 bg-card/40">
        <div className="mx-auto max-w-6xl px-5 py-8">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
            {ra.credentials.stats.map((stat) => (
              <div key={stat.label}>
                <dd className="font-display text-3xl font-extrabold tabular-nums tracking-tight text-accent">
                  {stat.value}
                  {stat.suffix}
                </dd>
                <dt className="mt-1.5 text-[0.6875rem] uppercase tracking-[0.1em] leading-tight text-muted">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── 01 The opportunity. Intro only — the four cards and the
             closing statement were cut as overselling. ── */}
      <section id="opportunity" className="scroll-mt-4 border-b border-line/60">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <SectionHeading
            kicker={ra.opportunity.kicker}
            title={ra.opportunity.title}
            sub={ra.opportunity.sub}
          />
          <Reveal>
            <p className="max-w-[70ch] text-lg leading-relaxed text-muted">
              {ra.opportunity.intro}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 02 What you get. Two names, nothing else: the per-output
             detail was cut. Kept as two equal panels rather than a
             sentence so the pair still reads as two deliverables. ── */}
      <section id="outputs" className="scroll-mt-4 border-b border-line/60">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <SectionHeading
            kicker={ra.whatYouGet.kicker}
            title={ra.whatYouGet.title}
            sub={ra.whatYouGet.sub}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {ra.whatYouGet.outputs.map((output, i) => (
              <Reveal key={output.name} delay={i * 90} className="h-full">
                <article className="card-hover flex h-full items-center gap-4 rounded-2xl border border-line bg-card px-6 py-8">
                  <span className="font-display text-xs tabular-nums tracking-wider text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-2xl font-extrabold tracking-tight">
                    {output.name}
                  </h3>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03 Packages ── */}
      <section id="packages" className="scroll-mt-4 border-b border-line/60">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <SectionHeading
            kicker={ra.packages.kicker}
            title={ra.packages.title}
            sub={ra.packages.sub}
          />

          {/* items-start, not stretch: the longer tracks sit taller rather
              than padding the shortest one out to match. */}
          <div className="grid items-start gap-4 lg:grid-cols-3">
            {ra.packages.tiers.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 90} className="h-full">
                {/* All three tracks get identical treatment. An accent
                    border and glow on the recommended one read as a stuck
                    selection state next to two plain cards — the badge
                    below does the recommending instead. */}
                <article className="card-hover flex h-full flex-col rounded-2xl border border-line bg-card p-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-sm font-extrabold uppercase tracking-[0.15em]">
                      {tier.name}
                    </h3>
                    {tier.badge && (
                      <span className="rounded-full bg-accent px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.11em] text-background">
                        {tier.badge}
                      </span>
                    )}
                  </div>

                  <p className="font-display mt-5 text-4xl font-extrabold tabular-nums tracking-tight">
                    {tier.price}
                    <span className="ml-1.5 align-baseline text-sm font-normal tracking-normal text-muted">
                      / month
                    </span>
                  </p>
                  <p className="mt-3 min-h-[3rem] max-w-[36ch] text-sm leading-relaxed text-muted">
                    {tier.for}
                  </p>

                  {/* The three numbers the tracks are actually compared on. */}
                  <dl className="mt-6 grid grid-cols-3 gap-3 border-y border-line py-4">
                    {tier.figures.map((figure) => (
                      <div key={figure.label}>
                        <dd className="font-display text-xl font-bold tabular-nums text-accent">
                          {figure.value}
                        </dd>
                        <dt className="mt-1 text-[0.6875rem] uppercase tracking-[0.07em] leading-tight text-muted">
                          {figure.label}
                        </dt>
                      </div>
                    ))}
                  </dl>

                  <ul className="mt-5 grid gap-2.5">
                    {tier.includes.map((line) => (
                      <li
                        key={line.label}
                        className="flex gap-3 text-[0.9375rem] leading-relaxed"
                      >
                        <Tick />
                        <span>{line.label}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-8 max-w-[70ch] border-t border-line pt-6 text-sm text-muted">
              {ra.packages.footnote}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Footer. Carries the contact routes — without them the page ends
             on a price list with no way to reply to it.

             Deliberately NOT wrapped in <Reveal>: that starts at opacity 0
             and only clears when its observer fires, so a missed trigger
             would leave the only response routes on the page invisible. ── */}
      <footer>
        <div className="mx-auto flex max-w-6xl flex-wrap items-baseline justify-between gap-x-8 gap-y-4 px-5 py-10">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent(
                `${site.name} — influencer marketing${
                  ra.recipient ? ` for ${ra.recipient}` : ""
                }`,
              )}`}
              className="border-b border-line pb-0.5 transition-colors hover:border-accent hover:text-accent"
            >
              {site.email}
            </a>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-line pb-0.5 transition-colors hover:border-accent hover:text-accent"
            >
              WhatsApp {site.phone}
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
          <p className="text-[0.6875rem] uppercase tracking-[0.1em] text-muted">
            {site.name} · {site.tagline} · Confidential
          </p>
        </div>
      </footer>
    </main>
  );
}
