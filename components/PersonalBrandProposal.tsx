import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { site } from "@/content/site";
import { personalBrand as pb } from "@/content/personal-brand";

/* Personal brand & talent management proposal, written for one recipient.
   Deliberately not in site.nav — it is reached by the link we send.

   Uses the site's own tokens and components (Reveal, SectionHeading, the
   .card-hover and .hero-glow treatments) so it reads as part of
   deecodemediahouse.com rather than as a one-off microsite. */

function Rule() {
  return <div className="h-px flex-1 bg-line" />;
}

/** Muted by default; accent where the line is a step up on the track below. */
function Tick({ step }: { step: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={`mt-[0.3rem] h-3.5 w-3.5 shrink-0 ${
        step ? "text-accent" : "text-muted"
      }`}
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

export default function PersonalBrandProposal() {
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
            {/* Generic line until `recipient` is filled in — see the note in
                content/personal-brand.ts. */}
            {pb.recipient
              ? `prepared for ${pb.recipient}`
              : "personal brand & talent management"}
          </p>
        </div>
      </header>

      {/* ── Cover ── */}
      <section className="hero-glow relative overflow-hidden border-b border-line/60">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <Reveal>
            <p className="text-[0.6875rem] uppercase tracking-[0.15em] text-muted">
              {pb.kicker} <span className="text-accent">·</span> {pb.prepared}
            </p>
            {/* Document-scale, not landing-page-scale: this page is read,
                not scrolled past, so the headline stays under the size the
                marketing hero on / uses. */}
            <h1 className="font-display mt-5 max-w-[24ch] text-3xl font-extrabold leading-[1.06] tracking-tight sm:text-4xl md:text-5xl">
              {pb.headline.lead}{" "}
              <span className="text-accent">{pb.headline.accent}</span>.
            </h1>
            <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-muted">
              {pb.lede}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <nav
              aria-label="Contents"
              className="mt-11 flex flex-wrap gap-2.5 border-t border-line pt-8"
            >
              {pb.contents.map((item) => (
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

      {/* ── 01 The vision. A four-stage chain: the arc is the argument, so
             the stages are numbered and connected rather than gridded. ── */}
      <section id="vision" className="scroll-mt-4 border-b border-line/60">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <SectionHeading
            kicker={pb.vision.kicker}
            title={pb.vision.title}
            sub={pb.vision.sub}
          />

          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pb.vision.stages.map((stage, i) => (
              <Reveal key={stage.stage} delay={i * 90} className="h-full">
                <li className="card-hover flex h-full flex-col gap-3 rounded-2xl border border-line bg-card p-5">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-xs tabular-nums tracking-wider text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {/* Connector, not decoration: it carries the arrow from
                        one stage to the next. Suppressed on the last. */}
                    <Rule />
                    {i < pb.vision.stages.length - 1 && (
                      <span aria-hidden="true" className="text-accent">
                        &rarr;
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-lg font-bold leading-tight tracking-tight">
                    {stage.stage}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {stage.note}
                  </p>
                  <p className="mt-auto pt-3 text-[0.625rem] uppercase tracking-[0.11em] text-accent">
                    {stage.via}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 02 Scope ── */}
      <section id="scope" className="scroll-mt-4 border-b border-line/60">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <SectionHeading
            kicker={pb.scope.kicker}
            title={pb.scope.title}
            sub={pb.scope.sub}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {pb.scope.groups.map((group, i) => (
              <Reveal key={group.label} delay={(i % 2) * 80} className="h-full">
                <article className="card-hover flex h-full flex-col gap-4 rounded-2xl border border-line bg-card p-6">
                  <h3 className="font-display flex items-center gap-2.5 font-bold tracking-tight">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {group.label}
                  </h3>
                  <ul className="grid gap-2.5">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-[0.9375rem] leading-relaxed"
                      >
                        <Tick step={false} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-10 flex flex-wrap items-baseline gap-x-4 gap-y-1 rounded-r-xl border-l-2 border-accent bg-accent/[0.08] px-5 py-4">
              <p className="font-display text-lg font-bold tracking-tight">
                {pb.scope.statement.value}
              </p>
              <p className="text-muted">{pb.scope.statement.label}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 03 Roadmap. A real sequence over twelve months, so it reads as a
             numbered spine rather than four independent cards. ── */}
      <section id="roadmap" className="scroll-mt-4 border-b border-line/60">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <SectionHeading
            kicker={pb.roadmap.kicker}
            title={pb.roadmap.title}
            sub={pb.roadmap.sub}
          />

          <ol className="border-t border-line">
            {pb.roadmap.phases.map((phase, i) => (
              <li key={phase.name} className="border-b border-line/60">
                <Reveal>
                  <div className="grid gap-x-10 gap-y-5 py-8 lg:grid-cols-[15rem_minmax(0,1fr)]">
                    <div>
                      <p className="text-xs tabular-nums tracking-wider text-accent">
                        Phase {String(i + 1).padStart(2, "0")}
                      </p>
                      <h3 className="font-display mt-2 text-2xl font-extrabold uppercase tracking-tight md:text-3xl">
                        {phase.name}
                      </h3>
                      <p className="mt-1.5 text-sm text-muted">
                        {phase.months}
                      </p>
                      <p className="mt-4 inline-block rounded-full bg-accent/15 px-3 py-1.5 text-[0.6875rem] uppercase tracking-[0.1em] text-accent">
                        {phase.outcome}
                      </p>
                    </div>

                    <div>
                      {/* One short sentence, set as a lead line — the detail
                          is in the two-column list under it. */}
                      <p className="font-display text-lg font-bold tracking-tight md:text-xl">
                        {phase.objective}
                      </p>
                      {/* Two columns: five one-line points stacked single-file
                          made every phase twice as tall as it needed to be. */}
                      <ul className="mt-4 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                        {phase.points.map((point) => (
                          <li
                            key={point}
                            className="flex gap-3 text-[0.9375rem] leading-relaxed text-muted"
                          >
                            <Tick step={false} />
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

      {/* ── 04 Packages ── */}
      <section id="packages" className="scroll-mt-4 border-b border-line/60">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <SectionHeading
            kicker={pb.packages.kicker}
            title={pb.packages.title}
            sub={pb.packages.sub}
          />

          {/* items-start, not stretch: the longer tracks sit taller rather
              than padding the shortest one out to match. */}
          <div className="grid items-start gap-4 lg:grid-cols-3">
            {pb.packages.tiers.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 90} className="h-full">
                {/* All three tracks get identical treatment. An accent border
                    and glow on the recommended one read as a stuck selection
                    state next to two plain cards — the badge below does the
                    recommending instead. */}
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
                        className={`flex gap-3 text-[0.9375rem] ${
                          line.step ? "" : "text-muted"
                        }`}
                      >
                        <Tick step={line.step} />
                        <span>{line.label}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-8 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-line pt-6 text-sm text-muted">
              <p className="flex items-center gap-2">
                <Tick step={true} />
                {pb.packages.legend}
              </p>
              <p className="max-w-[70ch]">{pb.packages.footnote}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 05 Next steps. Deliberately NOT wrapped in <Reveal>: that starts
             at opacity 0 and only clears when its observer fires, so a
             missed trigger would leave the closing block blank. ── */}
      <section className="border-b border-line/60 bg-accent/[0.06]">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            {pb.close.kicker}
          </p>
          <h2 className="font-display max-w-2xl text-3xl font-extrabold tracking-tight md:text-4xl">
            {pb.close.headline}
          </h2>
          <p className="mt-4 max-w-[58ch] text-muted">{pb.close.body}</p>

          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pb.close.steps.map((step, i) => (
              <li
                key={step}
                className="rounded-2xl border border-line bg-card p-5"
              >
                <span className="font-display text-xs tabular-nums tracking-wider text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed">
                  {step}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent(
                `${site.name} — personal brand & talent management`,
              )}`}
              className="rounded-full bg-accent px-7 py-3.5 font-semibold text-background transition-transform hover:scale-105"
            >
              {site.email}
            </a>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-line px-7 py-3.5 font-semibold transition-colors hover:border-accent hover:text-accent"
            >
              WhatsApp {site.phone}
            </a>
          </div>
        </div>
      </section>

      <footer>
        <div className="mx-auto flex max-w-6xl flex-wrap items-baseline justify-between gap-x-8 gap-y-4 px-5 py-10">
          <a
            href={`https://${site.domain}`}
            target="_blank"
            rel="noopener"
            className="border-b border-line pb-0.5 text-sm transition-colors hover:border-accent hover:text-accent"
          >
            {site.domain}
          </a>
          <p className="text-[0.6875rem] uppercase tracking-[0.1em] text-muted">
            {site.name} · {site.tagline} · Confidential
          </p>
        </div>
      </footer>
    </main>
  );
}
