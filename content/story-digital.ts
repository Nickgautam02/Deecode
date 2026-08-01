// ────────────────────────────────────────────────────────────────
//  STORY DIGITAL CREDENTIALS PAGE — everything rendered at
//  /storydigital lives in this file.
//
//  Context: Story Digital (Vidhi Makol, Business Development) asked for
//  three things over two emails — our creator roster, an overview of our
//  operational process, and a case study. This page answers the first two;
//  the case study is handled in the covering email, not here.
//
//  No performance figures appear anywhere on this page, deliberately — the
//  case studies in content/site.ts are template placeholders, not our
//  campaigns, and must not be used here.
//
//  The roster is derived from content/site.ts rather than retyped, so this
//  page can never contradict the public site.
// ────────────────────────────────────────────────────────────────

import { site } from "./site";

/** "3.83M" → 3830000, so the roster can be ordered by actual reach.
 *  Case-insensitive: counts arrive written both "70.2k" and "217K". */
function toCount(followers: string) {
  const n = parseFloat(followers);
  const unit = followers.replace(/[\d.,\s]/g, "").toUpperCase();
  if (unit.startsWith("M")) return n * 1_000_000;
  if (unit.startsWith("K")) return n * 1_000;
  return n;
}

const byReach = (a: { followers: string }, b: { followers: string }) =>
  toCount(b.followers) - toCount(a.followers);

/** Their brief is the US market, so these lead the page. Filtered on
 *  `market`, not `location` — several are listed by city. */
export const usRoster = site.creators
  .filter((c) => c.market === "USA")
  .sort(byReach);

/** Everything else, biggest first. */
export const widerRoster = site.creators
  .filter((c) => c.market !== "USA")
  .sort(byReach);

/** Selection for the hero switchboard. Round-robins across the three
 *  markets by reach so the row reads as one roster spanning USA, India and
 *  Dubai rather than a US-only list — the US still leads, since that is the
 *  brief. Photo-only: an initials circle in the hero reads as a missing
 *  asset rather than as a creator. */
export const wireRoster = (() => {
  const order: Array<"USA" | "India" | "Dubai"> = ["USA", "India", "Dubai"];
  const byMarket = new Map(
    order.map((m) => [
      m,
      site.creators.filter((c) => c.market === m && c.image).sort(byReach),
    ]),
  );

  // One creator per market per round. Deliberately a plain loop: `some`
  // short-circuits on the first push, which would take six from the USA
  // list and never reach India or Dubai.
  const picked: typeof site.creators = [];
  for (let rank = 0; picked.length < 6; rank++) {
    let addedThisRound = false;
    for (const market of order) {
      if (picked.length >= 6) break;
      const candidate = byMarket.get(market)?.[rank];
      if (!candidate) continue;
      picked.push(candidate);
      addedThisRound = true;
    }
    if (!addedThisRound) break;
  }
  return picked;
})();

export const storyDigital = {
  recipient: "Story Digital",
  kicker: "US creator partnership",
  prepared: "Prepared 1 August 2026",

  headline: {
    // The bracketed words render in the accent colour, matching the
    // convention used across content/site.ts.
    lead: "We put the right faces in front of the",
    accent: "right audiences",
  },
  lede: "An influencer marketing and talent management house running creator campaigns end to end — sourcing, contracting, briefing, delivery and reporting. One roster, twelve markets, every platform that matters.",
  // Regions rather than the full twelve-country list — the caption sits under
  // the switchboard and has to stay on one line.
  wireCaption:
    "Brands in · creators out · USA / India / Middle East / North Africa",

  // The hub at the centre of the switchboard. ⚠ `sub` says 1000+, while
  // content/site.ts still states 600+ in `stats` and in the About copy —
  // the homepage and this page disagree until one of them is updated.
  wireHub: { name: "Deecode", sub: "1000+ creators" },

  roster: {
    kicker: "01 / Top creators",
    title: "Our top creators.",
    sub: "Your brief is the US market, so those lead. Every profile here is managed directly by us — we brief them, we contract them, we pay them.",
    usLabel: "Leading the US roster",
    widerLabel: "Also on the roster",
  },


  coverage: {
    kicker: "02 / Coverage",
    title: "Twelve markets, every surface that matters.",
    groups: [
      // "Markets served" rather than "Markets": the roster above is based in
      // the US, India and Dubai, so an unqualified list of twelve countries
      // invites "you show creators in three of these". Keep the label honest
      // and the distinction holds up in conversation.
      {
        label: "Markets served",
        items: [
          "United States",
          "India",
          "Dubai / UAE",
          "Saudi Arabia",
          "Qatar",
          "Bahrain",
          "Kuwait",
          "Oman",
          "Jordan",
          "Lebanon",
          "Egypt",
          "Morocco",
        ],
      },
      {
        label: "Platforms",
        items: [
          "Instagram",
          "YouTube",
          "TikTok",
          "Facebook",
          "X",
          "LinkedIn",
          "Reddit",
        ],
      },
      {
        label: "Categories",
        items: [
          "Tech",
          "Lifestyle",
          "Fashion & beauty",
          "Comedy",
          "Fitness",
          "Finance",
          "Food & beverage",
        ],
      },
    ],
  },

  supply: {
    kicker: "03 / Placements",
    title: "Brands we have put our creators in front of.",
    sub: "A mix of sourcing-only mandates and full end-to-end execution, across both domestic and international creator supply.",
    domestic: {
      label: "Indian creators supplied to",
      // Drawn from site.brands, minus the entries that are not brand-side
      // campaign work, so the list holds up if they ask about any one of them.
      brands: [
        "Garnier",
        "Red Bull",
        "Monster",
        "Jio Saavn",
        "Ixigo",
        "Red Bus",
        "Cornitos",
        "Coolberg",
        "Polka Pop",
        "Vedorra",
        "Qoneqt",
        "Commudle",
      ],
    },
    international: {
      label: "Foreign creators supplied to",
      // Empty renders a dashed "fill before sending" marker instead, so the
      // page cannot go out claiming international work with nothing behind it.
      brands: ["Auralis Buzz", "Capital.com"],
      note: "International sourcing is existing work for us, not a new capability — the same team and the same operating model run it.",
    },
  },

  // No durations anywhere in this section — the per-step timings and the
  // headline ones were both removed at Nikhil's request. To bring them back,
  // add a `clock` per step and render it beside the title.
  process: {
    kicker: "04 / How we operate",
    title: "Six steps, and who owns each one.",
    sub: "This sequence runs on every campaign, and assumes normal client turnaround on approvals.",
    steps: [
      {
        title: "Brief intake & feasibility",
        body: "Objective, primary KPI, market, platforms, deliverable count, budget band, timeline and any client mandatories or compliance notes. We come back with feasibility plus a recommended creator mix and tier split.",
      },
      {
        title: "Discovery & shortlist",
        body: "A shortlist at two to three times the creators you need, sent as a data sheet rather than a name dump. Every profile clears three checks first: audience geography against the target market, an authenticity screen for inflated follower and engagement patterns, and a brand-safety scan of the last 90 days of content.",
      },
      {
        title: "Negotiation & contracting",
        body: "We close individual creator contracts covering deliverables and deadlines, usage and whitelisting rights with duration, exclusivity or category-block windows, revision limits, cancellation terms and mandatory FTC paid-partnership disclosure.",
      },
      {
        title: "Briefing & creative",
        body: "Each creator gets a brief pack: campaign context, hook direction, mandatory mentions and CTAs, dos and don'ts, tracked links or promo codes, and delivery dates. Scripts or storyboards come to you for approval before anyone shoots. One revision round is standard; two where the client needs tighter control.",
      },
      {
        title: "Review & go-live",
        body: "Draft content routes to you for approval, then posts on schedule in the relevant time zones. UTMs, tracked links, promo codes and partnership tags are set up at this stage, so paid amplification or whitelisting can run off the same assets without a re-clear.",
      },
      {
        title: "Reporting",
        body: "Per creator and campaign level: reach, impressions, views and watch-through, engagement rate, saves and shares, clicks, CPM, CPV and CPE, and conversions wherever tracking allows. Raw insights screenshots travel with the summary, plus a short read on what over-performed and what is worth scaling.",
      },
    ],
    // One statement rather than a row of stat cards — a single card in a
    // four-up grid reads as three that failed to load.
    payouts: {
      value: "One invoice",
      label: "Creator payouts handled by us",
    },
  },
};
