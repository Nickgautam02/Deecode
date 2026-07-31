import { Archivo } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import CountUp from "@/components/CountUp";
import Reveal from "@/components/Reveal";
import { gallery } from "@/content/gallery";
import type { mitProposal } from "@/content/mit-proposal";
import { site } from "@/content/site";

// The deck is set entirely in Archivo. next/font is scoped to the
// component that calls it, so this loads only for this route.
const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo" });

// Rendered by two routes — /portfolio/MIT (live, from content/mit-proposal.ts)
// and /UAT/portfolio/MIT (staging, from content/mit-proposal-uat.ts). The
// content and the deck URL are the only things that differ, so both arrive
// as props and nothing about the layout is duplicated.
export type MitProposalProps = {
  proposal: typeof mitProposal;
  deckSrc: string;
};

/* ── Primitives matching the deck's type and rule treatment ───────── */

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-accent-strong">
      {children}
    </p>
  );
}

function Stats({
  items,
  size = "sm",
}: {
  items: readonly { value: string; label: string }[];
  size?: "sm" | "lg";
}) {
  return (
    <dl className="grid grid-cols-3 gap-6">
      {items.map((s) => (
        <div key={s.label}>
          <dd
            className={`-ml-[0.03em] font-extrabold leading-none tracking-[-0.02em] text-accent ${
              size === "lg" ? "text-[44px]" : "text-[30px]"
            }`}
          >
            {s.value}
          </dd>
          <dt className="mt-3 text-[13px] uppercase tracking-[0.06em] text-muted">
            {s.label}
          </dt>
        </div>
      ))}
    </dl>
  );
}

function Section({
  id,
  kicker,
  title,
  sub,
  children,
}: {
  id: string;
  kicker: string;
  title: React.ReactNode;
  sub?: string;
  children?: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 border-t-2 border-line py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal className="mb-12">
          <Kicker>{kicker}</Kicker>
          <h2 className="mt-5 max-w-3xl text-3xl font-extrabold leading-[1.12] tracking-[-0.015em] md:text-[40px]">
            {title}
          </h2>
          {sub && <p className="mt-5 max-w-2xl leading-relaxed text-muted">{sub}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  );
}

/* ── Page ─────────────────────────────────────────────────────────── */

// Destructured under the names the body already used, so the markup below
// reads exactly as it did when this lived in app/portfolio/MIT/page.tsx.
export default function MitProposal({
  proposal: p,
  deckSrc: DECK_SRC,
}: MitProposalProps) {
  return (
    <div
      className={`${archivo.variable} deck-theme flex min-h-screen flex-col bg-background text-foreground`}
    >
      <header className="sticky top-0 z-50 border-b-2 border-line bg-background/95 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-6">
          <Link href="/" className="text-base font-extrabold uppercase tracking-[-0.01em]">
            {site.name}
          </Link>
          <div className="flex items-center gap-5">
            <a
              href={DECK_SRC}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-semibold uppercase tracking-[0.06em] text-muted transition-colors hover:text-accent-strong"
            >
              View as presentation
            </a>
            <a
              href={`mailto:${site.email}`}
              className="bg-accent px-5 py-2 text-sm font-bold text-background transition-colors hover:bg-accent-strong"
            >
              Get in touch
            </a>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        {/* ── Cover ── */}
        <section className="px-6 pb-16 pt-16 md:pb-20 md:pt-24">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <Kicker>{p.kicker}</Kicker>
              <h1 className="-ml-[0.05em] mt-6 max-w-4xl text-4xl font-extrabold leading-[1.0] tracking-[-0.02em] md:text-[62px]">
                Creative &amp; brand marketing{" "}
                <span className="text-accent">partnership proposal</span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">{p.intro}</p>
            </Reveal>

            <Reveal delay={100}>
              <dl className="mt-12 grid gap-6 border-t-2 border-line pt-8 text-sm sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { k: "Prepared for", v: p.client },
                  { k: "Brief", v: p.issued },
                  { k: "Submission", v: p.deadline },
                  { k: "Scope", v: "All five areas — full service" },
                ].map((row) => (
                  <div key={row.k}>
                    <dt className="text-[13px] uppercase tracking-[0.06em] text-muted">
                      {row.k}
                    </dt>
                    <dd className="mt-2 font-bold">{row.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        {/* ── Credentials ── */}
        <Section
          id="about"
          kicker={`About ${site.name}`}
          title="A full-service creative and marketing partner, built for multi-brand mandates."
        >
          <Reveal>
            <dl className="grid grid-cols-2 gap-8 border-y-2 border-line py-9 md:grid-cols-4">
              {site.stats.map((stat) => (
                <div key={stat.label}>
                  <dd className="-ml-[0.03em] text-[44px] font-extrabold leading-none tracking-[-0.02em] text-accent">
                    <CountUp value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                  </dd>
                  <dt className="mt-3 text-[13px] uppercase tracking-[0.06em] text-muted">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={100} className="mt-10">
            <p className="text-[13px] uppercase tracking-[0.06em] text-muted">
              Colleges we&apos;ve worked for
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-10 gap-y-3">
              {p.colleges.map((c) => (
                <li key={c} className="text-xl font-extrabold tracking-[-0.01em] opacity-70">
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </Section>

        {/* ── Scope ── */}
        <Section
          id="scope"
          kicker="Section 3 — scope of work"
          title={
            <>
              We&apos;re pitching as a full-service partner —{" "}
              <span className="text-accent">all five scope areas.</span>
            </>
          }
        >
          <div className="border-t-2 border-line">
            {p.scope.map((area, i) => (
              <Reveal key={area.title} delay={i * 60}>
                <article className="grid gap-5 border-b-2 border-line py-8 md:grid-cols-[64px_1fr_1fr] md:gap-9">
                  <div className="flex items-start gap-3">
                    <span className="mt-1.5 block h-2.5 w-2.5 shrink-0 bg-accent" />
                    <span className="text-sm font-extrabold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold tracking-[-0.01em]">{area.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{area.description}</p>
                  </div>
                  <ul className="space-y-2.5 md:pt-1">
                    {area.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-sm">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-accent" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ── Events: requirement 03, the one the brief says it prefers ── */}
        <Section
          id="events"
          kicker="Section 3, requirement 03 — reference case study"
          title={
            <>
              Events are where <span className="text-accent">we&apos;re strongest.</span>
            </>
          }
          sub={p.events.blurb}
        >
          <Reveal>
            <div className="border-y-2 border-line py-9">
              <Stats items={p.events.stats} size="lg" />
            </div>
          </Reveal>

          <div className="mt-12 grid gap-px border-2 border-line bg-line md:grid-cols-2">
            {p.events.cases.map((ev, i) => (
              <Reveal key={ev.name} delay={i * 70} className="bg-card">
                <article className="h-full p-7">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="text-lg font-extrabold tracking-[-0.01em]">{ev.name}</h3>
                    <span className="text-xs uppercase tracking-[0.08em] text-muted">
                      {ev.meta}
                    </span>
                  </div>
                  <dl className="mt-6 space-y-5">
                    <div>
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.06em] text-accent-strong">
                        As installed on site
                      </dt>
                      <dd className="mt-2 text-sm leading-relaxed text-muted">{ev.onSite}</dd>
                    </div>
                    <div>
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.06em] text-accent-strong">
                        Collateral produced
                      </dt>
                      <dd className="mt-2 text-sm leading-relaxed text-muted">{ev.collateral}</dd>
                    </div>
                  </dl>
                </article>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ── Photographs — images only, no captions. Alt text is kept for
              screen readers but nothing renders visually. ── */}
        <Section
          id="photos"
          kicker="On the ground"
          title="Photographs from the work."
        >
          {/* Rules live on the cells, not on a coloured parent showing
              through the gaps — so an incomplete last row just ends,
              rather than leaving a block of rule colour. */}
          <div className="grid grid-cols-2 border-l-2 border-t-2 border-line md:grid-cols-3">
            {gallery.items.map((item, i) => (
              <Reveal key={item.src} delay={(i % 3) * 70} className="border-b-2 border-r-2 border-line">
                <div className="relative aspect-[4/3] bg-card">
                  <Image
                    src={item.src}
                    alt={item.caption}
                    fill
                    sizes="(min-width: 768px) 33vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ── Video ── */}
        <Section
          id="video"
          kicker="Video / audio production"
          title="Shot, cut and posted by us."
        >
          <div className="grid items-start gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.videos.map((v, i) => (
              <Reveal key={v.src} delay={i * 90}>
                <figure>
                  <div
                    className="w-full border-2 border-line bg-black"
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
                  <figcaption className="mt-4">
                    <p className="font-extrabold tracking-[-0.01em]">{v.title}</p>
                    <p className="mt-1.5 text-[13px] uppercase tracking-[0.06em] text-muted">
                      {v.tag}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ── The other four requirements ── */}
        <Section
          id="requirements"
          kicker="Section 3 — the remaining requirements"
          title="A reference case study behind every scope area."
        >
          <div className="border-t-2 border-line">
            {p.requirements.map((req, i) => (
              <Reveal key={req.num} delay={i * 70}>
                <article className="border-b-2 border-line py-9">
                  <h3 className="flex items-baseline gap-4 text-xl font-extrabold tracking-[-0.01em]">
                    <span className="text-sm text-accent-strong">{req.num}</span>
                    {req.title}
                  </h3>
                  <p className="mt-4 max-w-3xl leading-relaxed text-muted">{req.summary}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ── Education sector ── */}
        <Section
          id="education"
          kicker="Education sector — selected work"
          title="Colleges and universities we already work with."
        >
          <div className="border-t-2 border-line">
            {p.education.map((item, i) => (
              <Reveal key={item.client} delay={i * 70}>
                <div className="grid gap-4 border-b-2 border-line py-8 md:grid-cols-[1fr_2fr] md:gap-10">
                  <div>
                    <h3 className="text-xl font-extrabold tracking-[-0.01em]">{item.client}</h3>
                    <p className="mt-2.5 text-[13px] uppercase tracking-[0.06em] text-accent-strong">
                      {item.sector}
                    </p>
                  </div>
                  <p className="leading-relaxed text-muted">{item.summary}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ── Process ── */}
        <Section
          id="process"
          kicker="How we'd work with MIT Group"
          title="Four steps, run unit-specific and group-wide."
        >
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {p.process.map((step, i) => (
              <Reveal key={step.title} delay={i * 80}>
                <p className="-ml-[0.03em] text-[38px] font-extrabold leading-none tracking-[-0.02em] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-5 text-lg font-extrabold tracking-[-0.01em]">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{step.description}</p>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ── Team ── */}
        <Section
          id="team"
          kicker="Team structure & size"
          title={`${p.team.size}.`}
          sub={p.team.howItWorks}
        >
          <div className="border-t-2 border-line">
            {p.team.roles.map((role, i) => (
              <Reveal key={role.title} delay={i * 50}>
                <div className="grid gap-2 border-b-2 border-line py-6 md:grid-cols-[64px_1fr_1.4fr] md:items-baseline md:gap-9">
                  <div className="flex items-start gap-3">
                    <span className="mt-1.5 block h-2.5 w-2.5 shrink-0 bg-accent" />
                    <span className="text-sm font-extrabold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-extrabold tracking-[-0.01em]">{role.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{role.owns}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ── Commercials ── */}
        {p.commercials && (
          <Section
            id="commercials"
            kicker="Indicative commercials — segment-wise"
            title="A separate quote for each scope area, as requested."
            sub={p.commercials.note}
          >
            {/* Top rule only where the column header shows. On mobile the
                header is hidden, so the first row's own border-t is the top
                rule — otherwise the two stack into a 4px line. */}
            <div className="border-line md:border-t-2">
              <div className="hidden grid-cols-[1fr_240px_170px] gap-6 py-3 text-[13px] uppercase tracking-[0.06em] text-muted md:grid">
                <div>Scope area</div>
                <div>Engagement model</div>
                <div>Indicative *</div>
              </div>
              {p.commercials.rows.map((row, i) => (
                <Reveal key={row.scope} delay={i * 60}>
                  <div className="grid gap-2 border-t-2 border-line py-6 md:grid-cols-[1fr_240px_170px] md:items-baseline md:gap-6">
                    <p className="font-extrabold tracking-[-0.01em]">{row.scope}</p>
                    <p className="text-sm text-muted">{row.model}</p>
                    {/* A ₹ value is a price and takes the asterisk; anything
                        else is a basis-of-quote label, set smaller. */}
                    {row.price.startsWith("₹") ? (
                      <p className="text-lg font-extrabold text-accent">
                        {row.price}
                        <span className="align-super text-xs">&nbsp;*</span>
                      </p>
                    ) : (
                      <p className="text-[13px] font-extrabold uppercase tracking-[0.06em] text-accent-strong">
                        {row.price}
                      </p>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
            {/* No top margin: this rule is the table's closing edge, so it
                sits directly under the last row rather than floating below it. */}
            <p className="border-t-2 border-line pt-5 text-sm text-muted">
              <span className="font-extrabold text-accent-strong">*</span>{" "}
              {p.commercials.footnote}
            </p>
          </Section>
        )}

        {/* ── Close: the system's one poster statement — accent as a field ── */}
        {/* Deliberately NOT wrapped in <Reveal>: that starts at opacity 0 and
            only becomes visible when its observer fires, so a missed trigger
            leaves this as a blank red band. The closing CTA always renders. */}
        <section id="next-steps" className="bg-accent py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-6">
            <div>
              <h2 className="-ml-[0.05em] max-w-3xl text-3xl font-extrabold leading-[1.05] tracking-[-0.02em] text-background md:text-[52px]">
                {p.close.headline}
              </h2>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-background/85">
                {p.close.body}
              </p>
              <div className="mt-11 flex flex-wrap gap-4">
                <a
                  href={`mailto:${site.email}?subject=${encodeURIComponent(
                    `${site.name} — proposal for ${p.client}`,
                  )}`}
                  className="bg-background px-7 py-3.5 font-bold text-foreground transition-opacity hover:opacity-80"
                >
                  {site.email}
                </a>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-background/60 px-7 py-3.5 font-bold text-background transition-colors hover:border-background"
                >
                  WhatsApp {site.phone}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t-2 border-line bg-card">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-[13px] text-muted">
          <p>
            © {new Date().getFullYear()} {site.name}. Proposal prepared for {p.client}.
          </p>
          <span className="flex gap-6">
            <a
              href={DECK_SRC}
              target="_blank"
              rel="noopener noreferrer"
              className="uppercase tracking-[0.06em] transition-colors hover:text-foreground"
            >
              Presentation
            </a>
            <Link
              href="/"
              className="uppercase tracking-[0.06em] transition-colors hover:text-foreground"
            >
              ← Back to site
            </Link>
          </span>
        </div>
      </footer>
    </div>
  );
}
