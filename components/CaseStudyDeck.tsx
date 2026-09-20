"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { netflixCaseStudies } from "@/content/netflix-case-studies";
import { site } from "@/content/site";

/* A full-screen, keyboard-driven credentials deck. Rendered by
   /netflix-case-studies from content/netflix-case-studies.ts.

   Named for the shape rather than the campaigns, like
   InfluencerCampaignProposal: cover → totals → one slide per case →
   process → contact is the shape of any credentials pitch, and only the
   content file names Netflix. Pass `content` to run a different set.

   ── ON THE THEME ───────────────────────────────────────────────────
   The site's own palette and type: violet accent,
   Montserrat over Inter, the rounded cards and the `.card-hover` and
   `.hero-glow` treatments every other page uses. Both fonts come from
   the root layout, so nothing here loads a face of its own.

   This deck spent a while in `.deck-theme`, the /portfolio/MIT system,
   and was brought back. Worth knowing if that ever comes up again:
   `.deck-theme` mirrors a design system a client supplied, which is a
   reason specific to that one route, and everything else client-facing
   on this domain reads as deecodemediahouse.com.

   The deck runs on the LIGHT side of that palette — `.deck-light` in
   globals.css — so the ground is the site's `--foreground` and the
   type is its `--background`. Still the site's colours, and still not
   a re-skin; it simply reads better projected and printed.

   ⚠ USE `text-accent-strong` FOR ANYTHING SMALL, `text-accent` ONLY AT
   DISPLAY SIZE. On this ground the plain violet is 3.1:1 — fine for a
   60px figure, not for a 11px label — and `accent-strong` is a darker
   violet at 5.6:1. Reversing that pair is the quickest way to break
   the page's contrast, and it will still look fine on the big numbers
   while failing on every label.

   ── WHY A SCROLL CONTAINER AND NOT THE PAGE ────────────────────────
   The slides snap inside their own `overflow-y-auto` runner rather than
   on the document, because scroll-snap on the document would have to be
   set on html/body in globals.css and would then apply to every other
   route. The runner also gives the fixed chrome something to sit over
   without the page jumping as the mobile URL bar collapses.

   ── WHY NO <Reveal> ────────────────────────────────────────────────
   Every other page on the site fades sections in on scroll. Here the
   snap IS the transition: a slide arrives already filling the viewport,
   so a reveal would either have fired mid-scroll or fire all at once on
   arrival. Skipping it also avoids the failure this codebase already
   guards against elsewhere — a missed IntersectionObserver leaving a
   slide stuck at opacity 0, which on a deck is the whole page.

   Slides are `min-h-dvh`, not `h-dvh`: a dense case slide on a phone is
   taller than the viewport, and a fixed height would clip it. It grows
   and scrolls instead, and `snap-start` still lands on its top edge. */

/** The house tick, at accent-strong — an icon is small type as far as
    contrast on this ground is concerned. */
function Tick() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="mt-[0.35rem] h-3.5 w-3.5 shrink-0 text-accent-strong"
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

function Chevron({ dir }: { dir: "up" | "down" }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={`h-4 w-4 ${dir === "up" ? "rotate-180" : ""}`}
    >
      <path
        d="M4 6l4 4 4-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const pad = (n: number) => String(n).padStart(2, "0");

/** The solid marker that says these slides are the proof section.
    Ground-on-accent-strong rather than the other way round: at this
    size the label needs the 7:1 the filled block gives it, and a
    filled block is the system's own idiom. */
function SectionTab({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block bg-accent-strong px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.15em] text-background">
      {children}
    </span>
  );
}

/** Matches the Kicker in MitProposal — same size, tracking and colour,
    because they are now the same design system. */
function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-accent-strong">
      {children}
    </p>
  );
}

/** One figure, one caption. The values stay at `--accent`: they are the
    only text on a slide big enough to carry it. */
function Figures({
  items,
  size = "sm",
  className = "",
}: {
  items: readonly { value: string; label: string }[];
  size?: "sm" | "lg";
  className?: string;
}) {
  return (
    <dl className={`grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 ${className}`}>
      {items.map((item) => (
        <div key={item.label}>
          <dd
            className={`font-display font-extrabold tabular-nums leading-none tracking-tight text-accent ${
              size === "lg" ? "text-4xl sm:text-5xl md:text-6xl" : "text-3xl sm:text-4xl"
            }`}
          >
            {item.value}
          </dd>
          <dt className="mt-2.5 text-[0.6875rem] uppercase leading-tight tracking-[0.1em] text-muted">
            {item.label}
          </dt>
        </div>
      ))}
    </dl>
  );
}

function Slide({
  id,
  className = "",
  fill = false,
  children,
}: {
  id: string;
  className?: string;
  /** Let the body grow to the full height of the slide instead of
      sitting centred in it, so a child can use `mt-auto` to sit on the
      bottom edge. Only the cover needs this — every other slide reads
      better as one centred block. */
  fill?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      data-slide
      className={`deck-slide relative flex min-h-dvh snap-start flex-col justify-center border-b border-line/60 bg-background px-5 pb-20 pt-28 sm:px-8 ${className}`}
    >
      <div
        className={`mx-auto w-full max-w-6xl${
          fill ? " flex flex-1 flex-col" : ""
        }`}
      >
        {children}
      </div>
    </section>
  );
}

export default function CaseStudyDeck({
  content: deck = netflixCaseStudies,
}: {
  /** Must match the shape of `netflixCaseStudies`. */
  content?: typeof netflixCaseStudies;
}) {
  const runnerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  /* ⚠ ONE ENTRY PER RENDERED SLIDE, IN ORDER. The rail and the counter
     are driven by this array while the slides themselves are written out
     below by hand, so adding a slide means adding a label here too.
     Getting it wrong shows up as a rail dot that scrolls nowhere. */
  const slideLabels = [
    deck.labels.cover,
    deck.whyUs.kicker,
    deck.glance.kicker,
    ...deck.cases.map((entry) => entry.label),
    deck.theCase.kicker,
    deck.whatWeDo.kicker,
    deck.process.kicker,
    deck.howWeStart.kicker,
  ];

  /* The proof section, by slide index. Tints those dots in the rail so
     the flipped run is legible in the navigation too, not only once you
     land on it. Cover and why us are 0..1, then the totals slide opens
     the section and the case studies follow.

     ⚠ `proofTo` is exclusive and must count the totals slide as well as
     the cases — `3 + cases.length` left the last case study's dot
     untinted, which is exactly the kind of off-by-one nobody notices.
     Keep in step with `slideLabels` above. */
  const proofFrom = 2;
  const proofTo = proofFrom + 1 + deck.cases.length;

  const goTo = useCallback((index: number) => {
    const runner = runnerRef.current;
    if (!runner) return;
    const slides = Array.from(
      runner.querySelectorAll<HTMLElement>("[data-slide]"),
    );
    const target = slides[Math.min(Math.max(index, 0), slides.length - 1)];
    if (!target) return;
    runner.scrollTo({
      top: target.offsetTop,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }, []);

  /* Which slide is showing. Keyed off whatever covers the middle of the
     runner rather than off a visibility threshold: a slide taller than
     the viewport never reaches "55% visible", and the counter would
     freeze on exactly the dense slides that need it most. */
  useEffect(() => {
    const runner = runnerRef.current;
    if (!runner) return;
    const slides = Array.from(
      runner.querySelectorAll<HTMLElement>("[data-slide]"),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = slides.indexOf(entry.target as HTMLElement);
          if (index !== -1) setActive(index);
        }
      },
      { root: runner, rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) {
        return;
      }
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.isContentEditable ||
          /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))
      ) {
        return;
      }

      const runner = runnerRef.current;
      const slides = runner
        ? Array.from(runner.querySelectorAll<HTMLElement>("[data-slide]"))
        : [];
      if (!runner || slides.length === 0) return;

      /* The vertical keys are only taken over when the current slide
         actually fits — otherwise ArrowDown on a phone would jump past
         content the reader has not reached yet. The horizontal keys and
         PageUp/PageDown always move between slides. */
      const current = slides[active];
      const fits = !!current && current.offsetHeight <= runner.clientHeight + 1;
      const forward = ["ArrowRight", "PageDown"];
      const back = ["ArrowLeft", "PageUp"];
      if (fits) {
        forward.push("ArrowDown", " ");
        back.push("ArrowUp");
      }

      if (forward.includes(event.key)) {
        event.preventDefault();
        goTo(active + 1);
      } else if (back.includes(event.key)) {
        event.preventDefault();
        goTo(active - 1);
      } else if (event.key === "Home") {
        event.preventDefault();
        goTo(0);
      } else if (event.key === "End") {
        event.preventDefault();
        goTo(slides.length - 1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, goTo]);

  return (
    <main className="deck-light relative bg-background text-foreground">
      {/* ⚠ NEITHER OF THESE CAN MOVE TO globals.css, and for the same
          reason: both target the document itself. `@page` takes no
          selector at all, and `html` is every page on the site — a copy
          there would re-orient and shrink the printed homepage, the city
          pages and the proposals too. Rendered here, they exist only in
          the HTML this route serves. (A `:root:has(.deck)` guard in
          globals.css was tried first and never applied during print.)

          Landscape A4 is 1123px wide, which clears Tailwind's `lg`
          breakpoint at 1024px — so the printed slide keeps the same
          two-column layout as the screen one instead of stacking.

          The root font-size is measured, not guessed. Tailwind's type
          and spacing are all rem, so the root scales the slide as a
          whole. At the site's 16px the tallest case study needs far
          more than the 793px a landscape sheet gives it, and Chrome
          answers by emitting a near-blank continuation page after every
          slide that overruns.

          10.5px puts the tallest slide at 722px of ink, leaving ~70px.
          That margin is thin on purpose-built content: adding the
          section tab to the case slides alone cost ~30px and pushed a
          previously-fine 11px export back to 12 pages with two blanks.
          ⚠ RE-EXPORT AND COUNT THE PAGES after changing this deck's
          copy or chrome. The failure is silent — the page still looks
          right on screen. */}
      <style>{`
        @page { size: A4 landscape; margin: 0; }
        @media print { html { font-size: 10.5px; } }
      `}</style>

      <div
        ref={runnerRef}
        className="deck relative h-dvh snap-y snap-mandatory overflow-y-auto overscroll-contain bg-background"
      >
        {/* ── 01 Cover ── */}
        <Slide id="cover" fill>
          {/* `my-auto` on this group, nothing on the one below it: the
              two auto margins split the free space above and below the
              headline, which centres it in whatever is left AND drops
              the contents onto the bottom edge. `mt-auto` on the lower
              group instead pins this one to the top, which on a tall
              display opens a void between the lede and the pills. */}
          <div className="my-auto">
            <Kicker>{deck.cover.kicker}</Kicker>
            <h1 className="font-display mt-6 max-w-[19ch] text-4xl font-extrabold leading-[1.0] tracking-tight sm:text-6xl md:text-7xl">
              {deck.cover.headline.lead}{" "}
              <span className="text-accent">{deck.cover.headline.accent}</span>.
            </h1>
            <p className="mt-7 max-w-[56ch] text-lg leading-relaxed text-muted md:text-xl">
              {deck.cover.lede}
            </p>
          </div>

          {/* Anchored to the bottom edge rather than following the lede:
              the cover is the one slide with room to spare, and a foot
              gives the headline somewhere to sit above.

              In print `min-h-dvh` is overridden to 0, so there is no
              free space, the auto margins collapse and this simply
              follows the lede. That is the right result on paper. */}
          <div className="pt-16">
            {/* Plain anchors, not buttons: the slides carry real ids, so
                these work before the deck's JavaScript has hydrated. */}
            <nav
              aria-label="Case studies"
              className="flex flex-wrap gap-3 border-t border-line pt-8"
            >
              {deck.cases.map((entry) => (
                <a
                  key={entry.id}
                  href={`#${entry.id}`}
                  className="rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-accent hover:text-accent"
                >
                  {entry.label}
                </a>
              ))}
            </nav>
            <p className="mt-6 hidden text-[0.6875rem] uppercase tracking-[0.1em] text-muted lg:block">
              {deck.cover.hint}
            </p>
          </div>
        </Slide>

        {/* ── 02 Why us — standing, before any claim.
                The three figures come out of
               content/site.ts, not out of this file, so the deck and
               the homepage cannot drift apart. The views stat is
               filtered: see the note in the content file — it says 10M+
               where the proof section of this deck sums to 53M+. ── */}
        <Slide id="why">
          <Kicker>{deck.whyUs.kicker}</Kicker>
          <h2 className="font-display mt-4 max-w-[20ch] text-3xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl">
            {deck.whyUs.title}
          </h2>

          <dl className="mt-11 grid grid-cols-3 gap-x-6 border-y border-line py-7">
            {site.stats
              .filter((stat) => !/views/i.test(stat.label))
              .map((stat) => (
                <div key={stat.label}>
                  <dd className="font-display text-4xl font-extrabold tabular-nums leading-none tracking-tight text-accent sm:text-5xl">
                    {stat.value}
                    {stat.suffix}
                  </dd>
                  <dt className="mt-2.5 text-[0.6875rem] uppercase tracking-[0.1em] text-muted">
                    {stat.label}
                  </dt>
                </div>
              ))}
          </dl>

          <div className="mt-9 grid gap-7 lg:grid-cols-3">
            {deck.whyUs.points.map((point) => (
              <div key={point.name}>
                <h3 className="font-display text-base font-extrabold tracking-tight">
                  {point.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {point.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-9 border-t border-line pt-6">
            <p className="text-[0.6875rem] uppercase tracking-[0.1em] text-muted">
              {deck.whyUs.brandsLabel}
            </p>
            <p className="mt-3 max-w-[90ch] text-[0.9375rem] font-semibold leading-relaxed">
              {site.brands.join("  ·  ")}
            </p>
          </div>
        </Slide>

        {/* ── 03 THE WORK opens here, and slides 03–06 are the
               This one doubles as the section opener and the totals:
               a separate divider slide would have been a title and
               nothing else. ── */}
        <Slide id="glance" className="slide-feature">
          <SectionTab>{deck.work.sectionLabel}</SectionTab>
          <p className="mt-5 text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-accent-strong">
            {deck.glance.kicker}
          </p>
          <h2 className="font-display mt-3 max-w-[18ch] text-3xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl">
            {deck.glance.title}
          </h2>
          <Figures items={deck.glance.stats} size="lg" className="mt-12" />
          {/* The de-duplication caveat. It stays on the slide rather than
              in a footnote nobody opens — a media buyer will ask, and
              answering before they ask is worth more than the tidier
              layout. */}
          <p className="mt-14 max-w-[80ch] border-t border-line pt-6 text-sm leading-relaxed text-muted">
            {deck.glance.footnote}
          </p>
        </Slide>

        {/* ── 04–06 One slide per campaign, still inside The work ── */}
        {deck.cases.map((entry, index) => (
          <Slide key={entry.id} id={entry.id} className="slide-feature">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-5">
                <div className="flex items-baseline justify-between gap-4">
                  <SectionTab>
                    {deck.work.caseLabel} {pad(index + 1)} / {pad(deck.cases.length)}
                  </SectionTab>
                </div>
                <p className="mt-5 text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-accent-strong">
                  {entry.kicker}
                </p>
                <h2 className="font-display mt-3 text-3xl font-extrabold leading-[1.04] tracking-tight sm:text-4xl">
                  {entry.title}
                </h2>
                <p className="mt-5 max-w-[54ch] leading-relaxed text-muted">
                  {entry.overview}
                </p>

                <div className="mt-8 border-t border-line pt-6">
                  <p className="text-[0.6875rem] uppercase tracking-[0.1em] text-muted">
                    {deck.labels.brief}
                  </p>
                  <ul className="mt-4 grid gap-2.5">
                    {entry.goals.map((goal) => (
                      <li
                        key={goal}
                        className="flex gap-3 text-[0.9375rem] leading-relaxed"
                      >
                        <Tick />
                        <span>{goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="rounded-2xl border border-line bg-card p-7 md:p-9">
                  <p className="font-display text-6xl font-extrabold leading-none tracking-tight text-accent sm:text-7xl md:text-8xl">
                    {entry.hero.value}
                  </p>
                  <p className="font-display mt-4 text-sm font-extrabold uppercase tracking-[0.15em]">
                    {entry.hero.label}
                  </p>
                  <p className="mt-2 text-sm text-muted">{entry.hero.sub}</p>
                </div>

                <Figures items={entry.results} className="mt-9" />

                {/* Business impact, or — while a campaign's rupee figures
                    are still placeholders in the source deck — the line
                    that says what the numbers mean instead. Never both,
                    and never an invented figure to fill the gap. */}
                {entry.impact ? (
                  <div className="mt-9 border-t border-line pt-6">
                    <p className="text-[0.6875rem] uppercase tracking-[0.1em] text-muted">
                      {deck.labels.impact}
                    </p>
                    <dl className="mt-5 grid grid-cols-3 gap-x-6">
                      {entry.impact.map((item) => (
                        <div key={item.label}>
                          <dd className="font-display text-2xl font-extrabold tabular-nums leading-none tracking-tight sm:text-3xl">
                            {item.value}
                          </dd>
                          <dt className="mt-2.5 text-[0.6875rem] uppercase leading-tight tracking-[0.1em] text-muted">
                            {item.label}
                          </dt>
                        </div>
                      ))}
                    </dl>
                  </div>
                ) : entry.note ? (
                  <p className="mt-9 max-w-[60ch] border-t border-line pt-6 text-[0.9375rem] leading-relaxed text-muted">
                    {entry.note}
                  </p>
                ) : null}
              </div>
            </div>
          </Slide>
        ))}

        {/* ── 07 The pattern. Deliberately AFTER the three case
               studies, not before them. Sitting at 02 it built the
               cast-size argument out of campaigns the reader had not
               met yet — it spoiled the proof, and the proof then
               repeated it. Here the same three cards read as a
               conclusion drawn from what was just shown. If it ever
               moves back up, its copy has to move with it. ── */}
        <Slide id="case">
          <Kicker>{deck.theCase.kicker}</Kicker>
          <h2 className="font-display font-display mt-4 max-w-[22ch] text-3xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl">
            {deck.theCase.title}
          </h2>
          <p className="mt-6 max-w-[74ch] text-lg leading-relaxed text-muted">
            {deck.theCase.intro}
          </p>

          <div className="mt-11 grid gap-4 lg:grid-cols-3">
            {deck.theCase.shapes.map((shape) => (
              <article
                key={shape.name}
                className="card-hover flex h-full flex-col rounded-2xl border border-line bg-card p-6"
              >
                <p className="font-display text-4xl font-extrabold leading-none tracking-tight text-accent">
                  {shape.cast}
                  <span className="ml-2 align-middle text-[0.6875rem] uppercase tracking-[0.1em] text-muted">
                    {deck.labels.creators}
                  </span>
                </p>
                <h3 className="font-display mt-4 text-lg font-extrabold tracking-tight">
                  {shape.name}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {shape.text}
                </p>
              </article>
            ))}
          </div>

          <p className="mt-9 max-w-[76ch] border-t border-line pt-6 text-[0.9375rem] leading-relaxed text-muted">
            {deck.theCase.closer}
          </p>
        </Slide>

        {/* ── 08 The offer. Deliberately AFTER the work, not
               before it. A services list is the one slide every agency
               has, and at 03 it spent the deck's best position saying
               nothing a competitor could not. Here it answers the
               question the proof has just raised — and pairs with the
               process slide as one "working with us" block ahead of
               the ask. ── */}
        <Slide id="services">
          <Kicker>{deck.whatWeDo.kicker}</Kicker>
          <h2 className="font-display mt-4 max-w-[20ch] text-3xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl">
            {deck.whatWeDo.title}
          </h2>

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {deck.whatWeDo.services.map((service, i) => (
              <article
                key={service.name}
                className="card-hover flex h-full flex-col rounded-2xl border border-line bg-card p-7"
              >
                <span className="text-xs font-bold tabular-nums tracking-[0.1em] text-accent-strong">
                  {pad(i + 1)}
                </span>
                <h3 className="font-display mt-4 text-xl font-extrabold tracking-tight">
                  {service.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {service.text}
                </p>
              </article>
            ))}
          </div>

          <p className="mt-9 max-w-[70ch] border-t border-line pt-6 text-[0.9375rem] leading-relaxed text-muted">
            {deck.whatWeDo.note}
          </p>
        </Slide>

        {/* ── 09 Process. No `.card-hover` here, unlike the rest of the
               site: its lift and gradient wash are the dark theme's
               idiom, and this system is flat, square and mono. A border
               colour change is the whole hover state. ── */}
        <Slide id="process">
          <Kicker>{deck.process.kicker}</Kicker>
          <h2 className="font-display mt-4 max-w-[20ch] text-3xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl">
            {deck.process.title}
          </h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {deck.process.steps.map((step, index) => (
              <article
                key={step.name}
                className="card-hover flex h-full flex-col rounded-2xl border border-line bg-card p-6"
              >
                <span className="text-xs font-bold tabular-nums tracking-[0.1em] text-accent-strong">
                  {pad(index + 1)}
                </span>
                <h3 className="font-display mt-4 text-xl font-extrabold tracking-tight">
                  {step.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {step.text}
                </p>
              </article>
            ))}
          </div>
        </Slide>

        {/* ── 10 The ask. Three first steps and the ways to reply.
               Deliberately not behind any animation or hover: this is
               the only slide that tells a reader what to do next. ── */}
        <Slide id="contact" className="hero-glow border-b-0">
          <Kicker>{deck.close.kicker}</Kicker>
          <h2 className="font-display font-display mt-4 max-w-[22ch] text-3xl font-extrabold leading-[1.03] tracking-tight sm:text-5xl">
            {deck.close.headline.lead}{" "}
            <span className="text-accent">{deck.close.headline.accent}</span>.
          </h2>
          <p className="mt-6 max-w-[62ch] leading-relaxed text-muted">
            {deck.close.lede}
          </p>

          <p className="mt-10 text-[0.6875rem] uppercase tracking-[0.1em] text-muted">
            {deck.howWeStart.kicker}
          </p>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {deck.howWeStart.steps.map((step, i) => (
              <article
                key={step.name}
                className="card-hover flex h-full flex-col rounded-2xl border border-line bg-card p-6"
              >
                <span className="text-xs font-bold tabular-nums tracking-[0.1em] text-accent-strong">
                  {pad(i + 1)}
                </span>
                <h3 className="font-display mt-3 text-lg font-extrabold tracking-tight">
                  {step.name}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {step.text}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-line pt-7 text-sm font-semibold">
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent(
                `${site.name} — creator campaign enquiry`,
              )}`}
              className="border-b border-line/60 pb-0.5 transition-colors hover:border-accent hover:text-accent"
            >
              {site.email}
            </a>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-line/60 pb-0.5 transition-colors hover:border-accent hover:text-accent"
            >
              WhatsApp {site.phone}
            </a>
            <a
              href={`https://${site.domain}`}
              target="_blank"
              rel="noopener"
              className="border-b border-line/60 pb-0.5 transition-colors hover:border-accent hover:text-accent"
            >
              {site.domain}
            </a>
          </div>
          <p className="mt-6 text-[0.6875rem] uppercase tracking-[0.1em] text-muted">
            {site.name} · {site.tagline} · Confidential
          </p>
        </Slide>

      </div>

      {/* ── Fixed chrome. `deck-chrome` is what the print rules hide. ── */}
      <div className="deck-chrome pointer-events-none fixed inset-x-0 top-0 z-30 border-b border-line/60 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-baseline justify-between gap-6 px-5 py-4 sm:px-8">
          <p className="font-display text-sm font-extrabold uppercase tracking-tight">
            Deecode <span className="text-accent-strong">Media House</span>
          </p>
          <p className="text-[0.6875rem] uppercase tabular-nums tracking-[0.1em] text-muted">
            {deck.eyebrow} <span className="text-accent-strong">/</span>{" "}
            {pad(active + 1)} — {pad(slideLabels.length)}
          </p>
        </div>
      </div>

      <nav
        aria-label="Slides"
        className="deck-chrome fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 lg:block"
      >
        <ol className="flex flex-col items-center gap-1">
          {slideLabels.map((label, index) => (
            <li key={label}>
              <button
                type="button"
                onClick={() => goTo(index)}
                aria-label={label}
                aria-current={index === active ? "true" : undefined}
                className="group flex h-6 w-6 cursor-pointer items-center justify-center"
              >
                <span
                  className={`block rounded-full transition-all ${
                    index === active
                      ? "h-2.5 w-2.5 bg-accent-strong"
                      : index >= proofFrom && index < proofTo
                        ? "h-1.5 w-1.5 bg-accent-strong/45 group-hover:bg-accent-strong"
                        : "h-1.5 w-1.5 bg-muted/60 group-hover:bg-muted"
                  }`}
                />
              </button>
            </li>
          ))}
        </ol>
      </nav>

      <div className="deck-chrome fixed bottom-5 right-5 z-30 flex gap-2 sm:bottom-8 sm:right-8">
        <button
          type="button"
          onClick={() => goTo(active - 1)}
          disabled={active === 0}
          aria-label="Previous slide"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-line bg-card/80 backdrop-blur-sm transition-colors hover:border-accent hover:text-accent disabled:cursor-default disabled:opacity-25 disabled:hover:border-line disabled:hover:text-foreground"
        >
          <Chevron dir="up" />
        </button>
        <button
          type="button"
          onClick={() => goTo(active + 1)}
          disabled={active === slideLabels.length - 1}
          aria-label="Next slide"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-line bg-card/80 backdrop-blur-sm transition-colors hover:border-accent hover:text-accent disabled:cursor-default disabled:opacity-25 disabled:hover:border-line disabled:hover:text-foreground"
        >
          <Chevron dir="down" />
        </button>
      </div>
    </main>
  );
}
