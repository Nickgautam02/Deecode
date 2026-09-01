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

function Rule() {
  return <div className="h-px flex-1 bg-line" />;
}

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

      {/* ── 01 The opportunity. Four parallel strengths, not a sequence,
             so the cards are numbered but not chained. ── */}
      <section id="opportunity" className="scroll-mt-4 border-b border-line/60">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <SectionHeading
            kicker={ra.opportunity.kicker}
            title={ra.opportunity.title}
            sub={ra.opportunity.sub}
          />

          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ra.opportunity.notes.map((item, i) => (
              <Reveal key={item.observation} delay={i * 90} className="h-full">
                <li className="card-hover flex h-full flex-col gap-3 rounded-2xl border border-line bg-card p-5">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-xs tabular-nums tracking-wider text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Rule />
                  </div>
                  <h3 className="font-display text-lg font-bold leading-tight tracking-tight">
                    {item.observation}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {item.note}
                  </p>
                  {/* The point of the card. Accent, and always last. */}
                  <p className="mt-auto pt-3 text-[0.625rem] uppercase tracking-[0.11em] text-accent">
                    {item.implication}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>

          <Reveal>
            <div className="mt-10 flex flex-wrap items-baseline gap-x-4 gap-y-1 rounded-r-xl border-l-2 border-accent bg-accent/[0.08] px-5 py-4">
              <p className="font-display text-lg font-bold tracking-tight">
                {ra.opportunity.statement.value}
              </p>
              <p className="text-muted">{ra.opportunity.statement.label}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 02 Casting. Seven archetypes: a row spine rather than a card
             grid, because seven cards leaves a ragged last row and the
             left-hand labels are what the reader scans. ── */}
      <section id="casting" className="scroll-mt-4 border-b border-line/60">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <SectionHeading
            kicker={ra.casting.kicker}
            title={ra.casting.title}
            sub={ra.casting.sub}
          />

          <ul className="border-t border-line">
            {ra.casting.archetypes.map((archetype) => (
              <li key={archetype.label} className="border-b border-line/60">
                <Reveal>
                  <div className="grid gap-x-10 gap-y-3 py-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
                    <div>
                      <h3 className="font-display font-bold leading-tight tracking-tight">
                        {archetype.label}
                      </h3>
                      {/* The client's own products, so each archetype is
                          visibly tied to something they actually sell. */}
                      <p className="mt-2 text-[0.6875rem] uppercase tracking-[0.08em] leading-relaxed text-accent">
                        {archetype.products}
                      </p>
                    </div>
                    <div>
                      <p className="font-display text-lg font-bold tracking-tight">
                        {archetype.problem}
                      </p>
                      <p className="mt-2 max-w-[70ch] text-[0.9375rem] leading-relaxed text-muted">
                        {archetype.note}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

          {/* What we hold today vs what we source. Deliberately explicit:
              our public roster carries no health or fitness names, and a
              science-forward brand will check. */}
          <Reveal>
            <div className="mt-10 rounded-2xl border border-line bg-card p-6">
              <h3 className="font-display flex items-center gap-2.5 font-bold tracking-tight">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {ra.casting.proven.label}
              </h3>
              <div className="mt-5 grid gap-x-10 gap-y-4 sm:grid-cols-2">
                <p className="flex gap-3 text-[0.9375rem] leading-relaxed">
                  <Tick />
                  <span>{ra.casting.proven.held}</span>
                </p>
                <p className="flex gap-3 text-[0.9375rem] leading-relaxed">
                  <Tick />
                  <span>{ra.casting.proven.sourced}</span>
                </p>
              </div>

              <p className="mt-7 text-[0.6875rem] uppercase tracking-[0.1em] text-muted">
                {ra.casting.proven.adjacencyLabel}
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    brands: ra.casting.proven.energy,
                    note: ra.casting.proven.energyNote,
                  },
                  {
                    brands: ra.casting.proven.fmcg,
                    note: ra.casting.proven.fmcgNote,
                  },
                ].map((group) => (
                  <div
                    key={group.note}
                    className="rounded-xl border border-line bg-background/40 p-4"
                  >
                    <p className="font-display font-bold tracking-tight">
                      {group.brands.join(" · ")}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {group.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 03 What you get. Two outputs, side by side and equally
             weighted: the whole point of the section is that UGC is not
             a bonus attached to the posts. Two cards, not a row spine —
             these are a comparison, not a sequence. ── */}
      <section id="outputs" className="scroll-mt-4 border-b border-line/60">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <SectionHeading
            kicker={ra.whatYouGet.kicker}
            title={ra.whatYouGet.title}
            sub={ra.whatYouGet.sub}
          />

          <div className="grid gap-4 lg:grid-cols-2">
            {ra.whatYouGet.outputs.map((output, i) => (
              <Reveal key={output.name} delay={i * 90} className="h-full">
                <article className="card-hover flex h-full flex-col rounded-2xl border border-line bg-card p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                    <h3 className="font-display text-xl font-extrabold tracking-tight">
                      {output.name}
                    </h3>
                    {/* Where the asset ends up — the actual difference
                        between the two, so it sits in the header. */}
                    <span className="text-[0.6875rem] uppercase tracking-[0.1em] text-accent">
                      {output.where}
                    </span>
                  </div>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">
                    {output.note}
                  </p>
                  <ul className="mt-5 grid gap-2.5 border-t border-line pt-5">
                    {output.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 text-[0.9375rem] leading-relaxed"
                      >
                        <Tick />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-8 max-w-[80ch] border-t border-line pt-6 text-sm leading-relaxed text-muted">
              {ra.whatYouGet.note}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 04 How we run it. A real sequence, so it reads as a numbered
             spine rather than six independent cards. ── */}
      <section id="process" className="scroll-mt-4 border-b border-line/60">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <SectionHeading
            kicker={ra.process.kicker}
            title={ra.process.title}
            sub={ra.process.sub}
          />

          <ol className="border-t border-line">
            {ra.process.steps.map((step, i) => (
              <li key={step.name} className="border-b border-line/60">
                <Reveal>
                  <div className="grid gap-x-10 gap-y-5 py-8 lg:grid-cols-[15rem_minmax(0,1fr)]">
                    <div>
                      <p className="text-xs tabular-nums tracking-wider text-accent">
                        Step {String(i + 1).padStart(2, "0")}
                      </p>
                      <h3 className="font-display mt-2 text-2xl font-extrabold uppercase tracking-tight md:text-3xl">
                        {step.name}
                      </h3>
                      <p className="mt-4 inline-block rounded-full bg-accent/15 px-3 py-1.5 text-[0.6875rem] uppercase tracking-[0.1em] text-accent">
                        {step.outcome}
                      </p>
                    </div>

                    <div>
                      {/* One short sentence, set as a lead line — the
                          detail is in the two-column list under it. */}
                      <p className="font-display text-lg font-bold tracking-tight md:text-xl">
                        {step.objective}
                      </p>
                      <ul className="mt-4 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                        {step.points.map((point) => (
                          <li
                            key={point}
                            className="flex gap-3 text-[0.9375rem] leading-relaxed text-muted"
                          >
                            <Tick />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 05 Guardrails ── */}
      <section id="guardrails" className="scroll-mt-4 border-b border-line/60">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <SectionHeading
            kicker={ra.guardrails.kicker}
            title={ra.guardrails.title}
            sub={ra.guardrails.sub}
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ra.guardrails.rules.map((rule, i) => (
              <Reveal key={rule.rule} delay={(i % 3) * 80} className="h-full">
                <article className="card-hover flex h-full flex-col gap-3 rounded-2xl border border-line bg-card p-5">
                  <h3 className="font-display flex items-start gap-2.5 font-bold leading-tight tracking-tight">
                    <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {rule.rule}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {rule.note}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 06 Packages ── */}
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
