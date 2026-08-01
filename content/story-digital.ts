// ────────────────────────────────────────────────────────────────
//  STORY DIGITAL CREDENTIALS PAGE — everything rendered at
//  /uat-vidhistorydigital lives in this file.
//
//  Context: Story Digital (Vidhi Makol, Business Development) asked for
//  three things over two emails — our creator roster, an overview of our
//  operational process, and a case study. This page answers the first two
//  in full. See `caseStudies` below for how the third is handled.
//
//  ⚠ BEFORE SENDING THE LINK:
//    1. `supply.international.brand` is null. Fill in the real brand we
//       supplied foreign creators to. The page renders a visible
//       "fill before sending" marker while it stays null, so an unfilled
//       version cannot go out by accident.
//    2. Confirm `usRosterNote` — if our real US-based creator count is
//       higher than the profiles published in content/site.ts, say the
//       number. It is the single strongest line on the page for a partner
//       shopping specifically for US execution. Do not inflate it; they
//       will spot-check against the sheet we send.
//
//  No performance figures appear anywhere on this page. That is deliberate
//  and explained in `caseStudies` — the ones in content/site.ts are
//  template placeholders, not our campaigns, and must not be used here.
//
//  The roster is derived from content/site.ts rather than retyped, so this
//  page can never contradict the public site.
// ────────────────────────────────────────────────────────────────

import { site } from "./site";

/** "3.83M" → 3830000, so the roster can be ordered by actual reach. */
function toCount(followers: string) {
  const n = parseFloat(followers);
  if (followers.includes("M")) return n * 1_000_000;
  if (followers.includes("K")) return n * 1_000;
  return n;
}

const byReach = (a: { followers: string }, b: { followers: string }) =>
  toCount(b.followers) - toCount(a.followers);

/** Their brief is the US market, so these lead the page. */
export const usRoster = site.creators
  .filter((c) => c.location === "USA")
  .sort(byReach);

/** Everything else, biggest first. */
export const widerRoster = site.creators
  .filter((c) => c.location !== "USA")
  .sort(byReach);

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
  lede: "An influencer marketing and talent management house running creator campaigns end to end — sourcing, contracting, briefing, delivery and reporting. One roster, three markets, every platform that matters.",
  wireCaption: "Brands in · creators out · USA / India / Dubai",

  roster: {
    kicker: "01 / The roster",
    title: "The US bench, first.",
    sub: "Your brief is the US market, so these lead. Every profile here is managed directly by us — we brief them, we contract them, we pay them.",
    widerLabel: "Also on the roster",
  },

  // ⚠ Confirm the real US-based count before sending — see the header note.
  usRosterNote:
    "This page shows a sample. The full US list — audience geo split, engagement rate, average views and indicative rates per deliverable — goes across on request, and we are glad to sign a mutual NDA first. Where a campaign needs a category or tier we do not already hold, we source against the brief.",

  coverage: {
    kicker: "02 / Coverage",
    title: "Three markets, every surface that matters.",
    groups: [
      { label: "Markets", items: ["United States", "India", "Dubai / UAE"] },
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
        "Jio Saavan",
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
      // ⚠ null until the real brand name is filled in. The page renders a
      // dashed "fill before sending" marker while this is null.
      brand: null as string | null,
      note: "International sourcing is existing work for us, not a new capability. The operating model below is the same one we run on it.",
    },
  },

  process: {
    kicker: "04 / How we operate",
    title: "Six steps, and who owns each one.",
    sub: "This sequence runs on every campaign. Timings are working days and assume normal client turnaround on approvals.",
    steps: [
      {
        title: "Brief intake & feasibility",
        clock: "24–48 hrs",
        body: "Objective, primary KPI, market, platforms, deliverable count, budget band, timeline and any client mandatories or compliance notes. We come back with feasibility plus a recommended creator mix and tier split.",
      },
      {
        title: "Discovery & shortlist",
        clock: "48–72 hrs",
        body: "A shortlist at two to three times the creators you need, sent as a data sheet rather than a name dump. Every profile clears three checks first: audience geography against the target market, an authenticity screen for inflated follower and engagement patterns, and a brand-safety scan of the last 90 days of content.",
      },
      {
        title: "Negotiation & contracting",
        clock: "3–5 days",
        body: "We close individual creator contracts covering deliverables and deadlines, usage and whitelisting rights with duration, exclusivity or category-block windows, revision limits, cancellation terms and mandatory FTC paid-partnership disclosure.",
      },
      {
        title: "Briefing & creative",
        clock: "5–7 days",
        body: "Each creator gets a brief pack: campaign context, hook direction, mandatory mentions and CTAs, dos and don'ts, tracked links or promo codes, and delivery dates. Scripts or storyboards come to you for approval before anyone shoots. One revision round is standard; two where the client needs tighter control.",
      },
      {
        title: "Review & go-live",
        clock: "3–5 days",
        body: "Draft content routes to you for approval, then posts on schedule in the relevant time zones. UTMs, tracked links, promo codes and partnership tags are set up at this stage, so paid amplification or whitelisting can run off the same assets without a re-clear.",
      },
      {
        title: "Reporting",
        clock: "48 hrs, day 7, day 30",
        body: "Per creator and campaign level: reach, impressions, views and watch-through, engagement rate, saves and shares, clicks, CPM, CPV and CPE, and conversions wherever tracking allows. Raw insights screenshots travel with the summary, plus a short read on what over-performed and what is worth scaling.",
      },
    ],
    throughput: [
      { value: "2–3 weeks", label: "Signed brief to first content live" },
      { value: "7–10 days", label: "Fast-track, pre-cleared creators" },
      { value: "One invoice", label: "Creator payouts handled by us" },
      { value: "One manager", label: "Single point of contact, live tracker" },
    ],
  },

  // Their third ask. We hold no campaign numbers we can stand behind in
  // writing, so this says so in the language of client confidentiality —
  // which is also true — and moves the specifics to a call. Anyone taking
  // that call needs two or three campaigns they can describe verbally.
  caseStudies: {
    kicker: "05 / On case studies",
    title: "Why there are no numbers on this page.",
    body: "Most of our work runs white-labelled or under client confidentiality, so we do not circulate campaign decks or performance figures over email — including on a page like this one. We would rather walk you through the campaigns closest to your brief on a call: the creators involved, how each was executed, and what we would do differently second time round.",
    note: "If a specific client of yours needs numbers in writing to sign off, tell us who it is for and we will go back to the brand for clearance on that campaign rather than send you something we cannot stand behind.",
  },

  brief: {
    kicker: "06 / To start",
    title: "Send us six things and we will come back inside 48 hours.",
    items: [
      {
        label: "Market & category",
        text: "Where the campaign runs and what it sells",
      },
      {
        label: "Objective & KPI",
        text: "Awareness, consideration, clicks or conversions",
      },
      { label: "Deliverables", text: "Format, count and platform per creator" },
      {
        label: "Budget band",
        text: "Total, and whether creator fees sit inside it",
      },
      { label: "Timeline", text: "Go-live date and any hard client deadline" },
      {
        label: "Usage rights",
        text: "Whitelisting or paid amplification, and for how long",
      },
    ],
  },

  close: {
    title: "Let's put 30 minutes in the diary.",
    body: "Send a couple of slots that work for you and we will build the rest of the conversation around your upcoming campaigns.",
    cta: "Book a call",
    subject:
      "Deecode Media House x Story Digital — US creator partnership",
  },
};
