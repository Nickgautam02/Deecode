import Link from "next/link";
import { netflixCaseStudies } from "@/content/netflix-case-studies";
import ClipStrip, { clipsFromCases } from "./ClipStrip";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

/* The homepage's proof section — the three entertainment campaigns, at
   card length, linking into the deck at /netflix-case-studies.

   ── IT READS THE DECK'S CONTENT FILE, IT DOES NOT RESTATE IT ───────
   Every figure here comes out of content/netflix-case-studies.ts, the
   same file the deck renders, so a corrected number reaches both at
   once. The alternative — a short copy of each campaign in
   content/site.ts — is how the homepage ends up claiming 25M+ reach on
   a campaign the deck has since restated at 22M, with the disagreement
   sitting on the two pages a prospect is most likely to open together.

   This component used to render `site.caseStudies`, two invented brands
   (FinPeak, TuneVerse Records) from the original site build, and it was
   not mounted anywhere. Those are gone from content/site.ts with it.

   ── WHY IT SITS ABOVE THE SERVICES GRID ────────────────────────────
   Same argument the deck settled on when its services slide moved below
   the work: a services list is the section every agency has, and in
   front of the proof it spends the best position on the page saying
   what a competitor could say too. Logos, then what we actually ran,
   then what we sell.

   ── WHAT A CARD SHOWS, AND WHY THAT LITTLE ────────────────────────
   Kicker, the one hero number, the campaign's own headline and two
   supporting figures. The brief, the goals and the business impact stay
   in the deck. A homepage card that reprints a case study is not a
   shorter version of it — it is the same length in a worse place, and
   it leaves the deck with nothing to open for.

   The clips under the cards are the same strip the deck runs, from the
   same seven files. They are what makes this section read as work
   rather than as three figures in boxes — a creator agency arguing for
   itself in numbers alone is the one thing it should not have to do.
   Still nothing autoplays: see components/ClipStrip.tsx. */

/** The two figures each card carries under its headline, chosen by
    label rather than by index: the campaigns do not all report the
    same rows — the Airtel one has no engagement rate — and a
    `results[4]` here would silently print the wrong caption the day a
    row is inserted. A label that no campaign reports is skipped. */
const CARD_FIGURES = ["Creators activated", "Engagements"] as const;

function cardFigures(results: readonly { value: string; label: string }[]) {
  return CARD_FIGURES.map((label) =>
    results.find((figure) => figure.label === label),
  ).filter((figure) => figure !== undefined);
}

export default function CaseStudies() {
  const { cases, labels } = netflixCaseStudies;
  const clips = clipsFromCases(cases);

  return (
    <section id="work" className="scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          kicker="Case studies"
          title={
            <>
              Three launches.
              <br />
              <span className="text-accent">One creator playbook.</span>
            </>
          }
          sub="A film launch, a music comeback and a brand film — each cast from our own roster, and each measured the same way."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {cases.map((study, i) => (
            <Reveal key={study.id} delay={i * 120}>
              <Link
                href={`/netflix-case-studies#${study.id}`}
                className="group card-hover flex h-full flex-col rounded-2xl border border-line bg-card p-8"
              >
                {/* Two lines reserved: the Airtel kicker is the only one
                    that wraps, and without the reservation its hero
                    number sits a line lower than the other two across
                    the row. */}
                <p className="text-xs uppercase leading-5 tracking-[0.2em] text-muted md:min-h-10">
                  {study.kicker}
                </p>

                <p className="font-display mt-6 text-5xl font-bold leading-none text-accent md:text-6xl">
                  {study.hero.value}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.15em] text-muted">
                  {study.hero.label}
                </p>

                <h3 className="font-display mt-6 text-xl font-bold leading-snug">
                  {study.title}
                </h3>

                {/* `mt-auto` rather than a fixed height on the headline:
                    the three titles run to different lengths, and this
                    lines their figure rows up anyway. */}
                <dl className="mt-auto grid grid-cols-2 gap-4 border-t border-line pt-6">
                  {cardFigures(study.results).map((figure) => (
                    <div key={figure.label}>
                      <dd className="font-display text-2xl font-bold">
                        {figure.value}
                      </dd>
                      <dt className="mt-1 text-xs text-muted">{figure.label}</dt>
                    </div>
                  ))}
                </dl>

                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                  Read the case study
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        {clips.length > 0 ? (
          <Reveal delay={360}>
            <ClipStrip items={clips} label={labels.clips} className="mt-14" />
          </Reveal>
        ) : null}

        <Reveal delay={420}>
          <p className="mt-10 text-sm text-muted">
            The full deck carries the brief, the process and the content
            itself.{" "}
            <Link
              href="/netflix-case-studies"
              className="font-semibold text-accent underline-offset-4 hover:underline"
            >
              See all three campaigns →
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
