// ────────────────────────────────────────────────────────────────
//  PERSONAL BRAND & TALENT MANAGEMENT PROPOSAL — everything rendered
//  at /uat-richa lives in this file.
//
//  Built from the client's own outline. Their wording is kept wherever it
//  was already doing the work: the cover line, the four transformation
//  stages, the BUILD → GROW → POSITION → LAUNCH phase names, the prices
//  and every package line item.
//
//  ⚠ COPY LENGTH IS A FEATURE HERE. This page was rewritten once because
//  it read as a wall of text. Everything below is deliberately terse —
//  phrases, not sentences, in every list; one line per section sub; one
//  sentence per phase objective. If you add to it, cut something else.
//
//  Two structural changes to the outline, both deliberate:
//   · The thirteen scope items are grouped into four ownership areas
//     rather than listed flat. Every item survives, none were merged.
//   · Reels, shoot days and script counts are lifted out of each package
//     list into a three-up figure row, so the tracks can be compared at a
//     glance instead of read line by line.
//
//  ⚠ THE REEL COUNTS ARE THE OUTLINE'S, PLUS TWO. Two extra reels a month
//  were added to every track: 8–10 → 10–12, 14–16 → 16–18, 20–24 → 22–26.
//  Script counts were raised to match, because the outline paired them 1:1
//  and a track offering more reels than scripts reads as an error on a
//  price card rather than as a bonus.
//
//  ⚠ No performance figures anywhere on this page, deliberately. Nothing
//  here claims a follower, view or engagement outcome — we cannot evidence
//  one for a personality who has not launched yet, and a number on a
//  proposal becomes a commitment in the negotiation that follows.
//
//  `recipient` drives the masthead and the page title. Set to null for a
//  generic line if this page is ever reused for other talent.
// ────────────────────────────────────────────────────────────────

export const personalBrand = {
  /** The talent this went out to. Null → the masthead reads generically.
   *  Taken from the /uat-richa route name — correct the spelling or use her
   *  full name if that is what should appear on the masthead. */
  recipient: "Richa" as string | null,

  kicker: "Personal brand & talent management",
  prepared: "Prepared 14 August 2026",

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

  vision: {
    kicker: "01 / Our vision",
    title: "Twelve months, four stages, one recognisable name.",
    sub: "Each stage is only attempted once the one before it is real.",
    stages: [
      {
        stage: "Emerging talent",
        note: "Presence, but no position.",
        via: "Where we start",
      },
      {
        stage: "Recognisable face",
        note: "A clear identity, and formats people know on sight.",
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
      {
        name: "Build",
        months: "Months 1–3",
        outcome: "A defined identity",
        objective: "Stop posting, start positioning.",
        points: [
          "Brand discovery — audience, tone, what you're known for",
          "Content pillars locked",
          "Profile rebuild: bio, highlights, grid",
          "First shoots — finding your register on camera",
          "Baseline metrics recorded",
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
          "First creator collaborations",
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
        price: "₹59,999",
        badge: null as string | null,
        for: "A strong, consistent digital identity.",
        figures: [
          { value: "10–12", label: "Reels / month" },
          { value: "2", label: "Shoot days" },
          { value: "10–12", label: "Scripts" },
        ],
        includes: [
          { label: "Monthly content calendar" },
          { label: "Professional crew + equipment" },
          { label: "Editing & post-production" },
          { label: "Captions + posting" },
          { label: "Basic growth strategy" },
          { label: "Monthly analytics" },
          // Monthly here, fortnightly on Growth, weekly on Signature — the
          // call cadence is one of the things the tracks step up on.
          { label: "Monthly 1:1 review call" },
          { label: "Personal branding direction" },
        ],
      },
      {
        name: "Growth",
        price: "₹89,999",
        // The outline starred this tier. This badge is that star, in words —
        // and it is the *only* thing marking the recommended track. The card
        // itself is styled identically to the other two on purpose; see the
        // note in components/PersonalBrandProposal.tsx. Move the badge to
        // another tier to change the recommendation.
        badge: "Most chosen",
        for: "Aggressive reach, recognition and audience.",
        figures: [
          { value: "16–18", label: "Reels / month" },
          { value: "4", label: "Shoot days" },
          { value: "16–18", label: "Scripts" },
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
          { label: "Fortnightly 1:1 review call" },
          { label: "Brand-deal positioning" },
          { label: "Product / brand positioning" },
        ],
      },
      {
        name: "Signature",
        price: "₹1,29,999",
        badge: null as string | null,
        for: "A high-value brand with commercial potential.",
        figures: [
          { value: "22–26", label: "Reels / month" },
          { value: "6", label: "Shoot days" },
          { value: "22–26", label: "Scripts" },
        ],
        includes: [
          { label: "Dedicated production planning" },
          { label: "Full crew + equipment" },
          { label: "Premium post-production" },
          { label: "Complete brand strategy" },
          // Replaces the outline's "Weekly strategy reviews" rather than
          // sitting beside it — two weekly cadence lines on one card just
          // invites "what's the difference?".
          { label: "Weekly 1:1 review call" },
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

  // The "05 / Next steps" closing block was removed at Nikhil's request. Its
  // email and WhatsApp links moved into the page footer — the page must keep
  // a way to reply to it. To bring the section back, restore a `close` key
  // here and the matching <section> before the footer in the component.
};
