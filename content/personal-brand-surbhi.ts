// ────────────────────────────────────────────────────────────────
//  PERSONAL BRAND & TALENT MANAGEMENT PROPOSAL — everything rendered
//  at /surbhi-proposal lives in this file.
//
//  A second copy of content/personal-brand.ts (the /richa-proposal page),
//  kept as its own file rather than parameterised: the two proposals are
//  priced differently and will drift further, and a per-recipient content
//  file is easier to edit mid-negotiation than a shared one with branches.
//  The component is shared — see components/PersonalBrandProposal.tsx.
//
//  ⚠ COPY LENGTH IS A FEATURE HERE. Everything below is deliberately terse —
//  phrases, not sentences, in every list; one line per section sub; one
//  sentence per phase objective. If you add to it, cut something else.
//
//  ⚠ HOW THIS DIFFERS FROM /richa-proposal — three things:
//   · Prices. ₹30,000 / ₹50,000 / ₹70,000, against ₹59,999 / ₹89,999 /
//     ₹1,29,999 there. Do not quote one page's figures on a call about
//     the other.
//   · Reels, down two on every track (10–12 → 8–10, 16–18 → 14–16,
//     22–26 → 20–24). Script counts moved with them: the outline pairs
//     them 1:1, and a track offering more scripts than reels reads as an
//     error rather than a bonus.
//   · The vision arc starts at an existing 130K audience rather than at
//     "emerging talent" — see the note above `vision`. This is the only
//     recipient-specific claim on the page; check it is still true before
//     the page goes out.
//
//  Shoot days are unchanged (2 / 3 / 5), so every track now lands at
//  roughly 4–5 reels per shoot day — worth knowing before the call if she
//  asks how the day is used.
//
//  ⚠ No performance figures anywhere on this page, deliberately. Nothing
//  here claims a follower, view or engagement outcome — we cannot evidence
//  one for a personality who has not launched yet, and a number on a
//  proposal becomes a commitment in the negotiation that follows.
// ────────────────────────────────────────────────────────────────

export const personalBrandSurbhi = {
  /** The talent this went out to. Null → the masthead reads generically.
   *  Taken from the /surbhi-proposal route name — correct the spelling or
   *  use her full name if that is what should appear on the masthead. */
  recipient: "Surbhi" as string | null,

  kicker: "Personal brand & talent management",
  prepared: "Prepared 15 August 2026",

  headline: {
    // The accent half renders in the brand colour, matching the convention
    // used across content/site.ts.
    lead: "Building a face. Growing an audience.",
    accent: "Creating a brand",
  },
  lede: "Positioning, calendar, concepts, shoots, edits, posting and growth — one team, one retainer. You show up on shoot day. The rest is ours.",

  // Hero jump links. Hrefs match the section ids in the component.
  contents: [
    { label: "The vision", href: "#vision" },
    { label: "Scope", href: "#scope" },
    { label: "Roadmap", href: "#roadmap" },
    { label: "Packages", href: "#packages" },
  ],

  // ⚠ THIS ARC STARTS FROM 130K, not from zero — she is not emerging talent
  // and a proposal that opens by telling her she has "presence, but no
  // position" reads as though we never looked at her account. Stage 01 is
  // the audience she already has; the twelve months are what we put behind
  // it. If this page is reused for talent at a different size, stage 01 is
  // the line to rewrite first.
  //
  // The 130K is the one number on this page and it is deliberate: it is a
  // fact about today, not a forecast, so it does not cross the
  // no-performance-figures rule below. Do NOT add a target beside it.
  vision: {
    kicker: "01 / Our vision",
    title: "Twelve months, four stages. From reach to a brand.",
    sub: "Each stage is only attempted once the one before it is real.",
    stages: [
      {
        stage: "An audience of 130K",
        note: "The reach is already earned. The positioning isn't.",
        via: "Where we start",
      },
      {
        stage: "Recognisable face",
        note: "Formats they know on sight — not posts they scroll past.",
        via: "Build + Grow",
      },
      {
        stage: "Trusted creator",
        note: "Authority, not just attention.",
        via: "Position",
      },
      {
        stage: "Brand-ready personality",
        note: "An audience that can carry a partnership or a product.",
        via: "Launch",
      },
    ],
  },

  scope: {
    kicker: "02 / What we take care of",
    title: "Everything except being on camera.",
    // 13 items, grouped by who owns them on our side — the outline's full
    // list, reordered but not edited.
    sub: "Thirteen moving parts. One retainer, one point of contact.",
    groups: [
      {
        label: "Strategy & positioning",
        items: [
          "Personal brand strategy",
          "Content pillars & positioning",
          "Long-term brand positioning",
        ],
      },
      {
        label: "Planning & creative",
        items: [
          "Monthly content calendar",
          "Concepts & scripting",
          "Trend & competitor research",
        ],
      },
      {
        label: "Production",
        items: [
          "Professional shoots",
          "Production crew & equipment",
          "Editing & post-production",
        ],
      },
      {
        label: "Growth & distribution",
        items: [
          "Posting & optimisation",
          "Growth strategy",
          "Audience building",
          "Collaboration positioning",
        ],
      },
    ],
    // A closing statement on the section rather than a stat card — same
    // treatment as the credentials page at /storydigital.
    statement: {
      value: "You show up.",
      label: "Everything either side of the shoot is ours.",
    },
  },

  roadmap: {
    kicker: "03 / The 12-month roadmap",
    title: "Build → Grow → Position → Launch.",
    sub: "Four phases of three months. Each one closes with a review.",
    phases: [
      // ⚠ Three bullets across Build and Grow are tuned for talent that
      // already has an audience — see the note on `vision`. The phase
      // structure is NOT: Build → Grow → Position → Launch still works at
      // 130K because it builds the brand, not the following, and "stop
      // posting, start positioning" is the sharpest line on the page for
      // someone who already has reach. Restructure and you lose it.
      {
        name: "Build",
        months: "Months 1–3",
        outcome: "A defined identity",
        objective: "Stop posting, start positioning.",
        points: [
          "Brand discovery — audience, tone, what you're known for",
          "Content pillars locked",
          "Profile rebuild: bio, highlights, grid",
          // Not "finding your register on camera" — she has been on camera
          // for 130K people. What changes on day one is the production, not
          // her comfort in front of a lens.
          "First shoots — your look, at production standard",
          // Not "baseline metrics recorded". At her size the back catalogue
          // is already the research: there is a year of performance data to
          // read before we shoot anything.
          "Back-catalogue audit — what already worked, what stalled",
        ],
      },
      {
        name: "Grow",
        months: "Months 4–6",
        outcome: "A recognisable face",
        objective: "Turn a consistent feed into compounding reach.",
        points: [
          "Full cadence, shipped on schedule",
          "Trend formats mapped onto your pillars",
          "Hook and retention testing — winners get sequels",
          // Not "first creator collaborations". At 130K she is the one being
          // approached, and the job is choosing upward, not starting out.
          "Collaborations at your size and above",
          "Analytics read as an editorial decision",
        ],
      },
      {
        name: "Position",
        months: "Months 7–9",
        outcome: "A trusted creator",
        objective: "Recognisable becomes credible.",
        points: [
          "Signature formats — a series people return for",
          "Authority content: opinion, teaching, the real work",
          "Media kit and rate card, outreach-ready",
          "Brand-deal positioning — what to take, what to refuse",
          "Community layer: comments, DMs, closer channels",
        ],
      },
      {
        name: "Launch",
        months: "Months 10–12",
        outcome: "A brand-ready personality",
        objective: "Turn the audience into commercial optionality.",
        points: [
          "Partnerships negotiated against the rate card",
          "Product positioning, audience-tested before spend",
          "Cross-platform expansion, where the audience justifies it",
          "Year-one review — keep, kill, or double down",
        ],
      },
    ],
  },

  packages: {
    kicker: "04 / Packages",
    title: "Three tracks. Same team, different intensity.",
    sub: "What changes between tracks is volume and depth of strategy — never the standard of the work.",
    // `figures` are the three numbers each track is judged on — pulled out
    // of the list so the tracks can be compared without reading prose.
    //
    // Every line in `includes` renders identically. An earlier version
    // marked the lines that stepped up from the track below in accent and
    // dimmed the rest, which made included items read as excluded. Do not
    // reintroduce a two-tier treatment inside a price card.
    tiers: [
      {
        name: "Foundation",
        price: "₹30,000",
        badge: null as string | null,
        for: "A strong, consistent digital identity.",
        figures: [
          { value: "8–10", label: "Reels / month" },
          { value: "2", label: "Shoot days" },
          { value: "8–10", label: "Scripts" },
        ],
        includes: [
          { label: "Monthly content calendar" },
          { label: "Professional crew + equipment" },
          { label: "Editing & post-production" },
          { label: "Captions + posting" },
          { label: "Basic growth strategy" },
          { label: "Monthly analytics" },
          // The call line is phrased identically on all three tracks so the
          // cadence is the only thing that changes between them: monthly
          // here, every 2 weeks on Growth, weekly on Signature.
          { label: "1:1 review call, monthly" },
          { label: "Personal branding direction" },
        ],
      },
      {
        name: "Growth",
        price: "₹50,000",
        // The outline starred this tier. This badge is that star, in words —
        // and it is the *only* thing marking the recommended track. The card
        // itself is styled identically to the other two on purpose; see the
        // note in components/PersonalBrandProposal.tsx. Move the badge to
        // another tier to change the recommendation.
        badge: "Most chosen",
        for: "Aggressive reach, recognition and audience.",
        figures: [
          { value: "14–16", label: "Reels / month" },
          { value: "3", label: "Shoot days" },
          { value: "14–16", label: "Scripts" },
        ],
        includes: [
          { label: "Monthly + weekly planning" },
          { label: "Production crew + equipment" },
          { label: "Advanced editing" },
          { label: "Posting & optimisation" },
          { label: "Advanced growth strategy" },
          { label: "Trend-led content" },
          { label: "Personal brand positioning" },
          { label: "Collaboration strategy" },
          { label: "Monthly performance analysis" },
          // "every 2 weeks" rather than "fortnightly" or "bi-weekly" — the
          // latter reads as both "twice a week" and "every two weeks", which
          // is not an ambiguity to leave in a priced deliverable.
          { label: "1:1 review call, every 2 weeks" },
          { label: "Brand-deal positioning" },
          { label: "Product / brand positioning" },
        ],
      },
      {
        name: "Signature",
        price: "₹70,000",
        badge: null as string | null,
        for: "A high-value brand with commercial potential.",
        figures: [
          { value: "20–24", label: "Reels / month" },
          { value: "5", label: "Shoot days" },
          { value: "20–24", label: "Scripts" },
        ],
        includes: [
          { label: "Dedicated production planning" },
          { label: "Full crew + equipment" },
          { label: "Premium post-production" },
          { label: "Complete brand strategy" },
          // Replaces the outline's "Weekly strategy reviews" rather than
          // sitting beside it — two weekly cadence lines on one card just
          // invites "what's the difference?".
          { label: "1:1 review call, weekly" },
          { label: "Aggressive growth strategy" },
          { label: "Audience & community building" },
          { label: "Collaboration & campaign strategy" },
          { label: "Competitor analysis" },
          { label: "Brand positioning" },
          { label: "Brand-launch strategy" },
          { label: "Priority production support" },
        ],
      },
    ],
    // ⚠ CONFIRM before sending — these exclusions are the usual ones for a
    // retainer of this shape, but they have not been agreed with anyone.
    // Delete the line rather than send terms we have not decided.
    footnote:
      "Monthly retainers. Ad spend, outstation travel and licensing are quoted separately.",
  },
};
