// ────────────────────────────────────────────────────────────────
//  ENTERTAINMENT CASE STUDIES — the pitch deck at
//  /netflix-case-studies. Everything rendered there lives here.
//
//  This is a PITCH deck, not a proposal: it argues for the work and
//  ends on an ask, but it carries no pricing, no named recipient and
//  no scope, so the same URL goes to every prospect. The per-client
//  proposals (/rooted-actives-proposal, /surbhi-proposal,
//  /richa-proposal) are what you send after the reply — keep prices
//  out of this file or it stops being reusable.
//
//  ── THE ARC, AND WHY IT IS IN THIS ORDER ───────────────────────
//    why us    → standing, from content/site.ts, before any claim
//    what we do→ what a brand is actually buying
//    THE WORK  → the three case studies, as a marked-off section
//    the case  → what those three have in common: cast size is the
//                strategy. A CONCLUSION, drawn from the evidence just
//                shown — never a claim made ahead of it
//    process   → how a campaign runs
//    the ask   → three concrete first steps
//
//  It opened as case studies alone, which reads as a portfolio: proof
//  with no argument in front of it and no ask behind it. Then `theCase`
//  was put at the front, which was worse in a subtler way — it made the
//  cast-size argument out of campaigns the reader had not met yet, so
//  it spoiled the proof and the proof then repeated it. Proof in the
//  middle, standing before it, meaning after it. If a section is cut,
//  keep that shape.
//
//  ── WHERE EVERY FIGURE CAME FROM ───────────────────────────────
//  Three campaign one-pagers supplied on 20 September 2026:
//    AirtelXNetflix.pdf · BTS Comeback X Netflix.pdf · MizapurXNetflix.pdf
//  Each number below is read straight off them. Nothing is modelled,
//  rounded up or inferred — except the `glance` totals, which are
//  plain sums of the three campaigns and say so in `glance.footnote`.
//
//  ⚠ THE AIRTEL BUSINESS-IMPACT FIGURES ARE ABSENT ON PURPOSE.
//  Its source PDF still carries placeholders there: "Campaign Value:
//  ₹XX Lakh / Crore", "ROI: XXx", "Cost Per View: ₹XX". A rupee figure
//  invented to fill a slide becomes a number you are held to in the
//  meeting that follows. So that case carries `impact: null` and the
//  slide renders `note` instead. Drop the real figures into `impact`
//  when they exist and the slide picks them up with no code change.
//
//  ⚠ BTS: THE SOURCE PDF NEVER NAMES NETFLIX — only its filename
//  does. The kicker below says "Netflix" because that is how the
//  campaign was handed over, but VERIFY BEFORE SENDING. A wrong client
//  attribution is the one error on a credentials deck a prospect will
//  remember. If it is not a Netflix campaign, the fix is the single
//  `kicker` string on that case.
//
//  ⚠ THIS DECK AND content/site.ts DISAGREE ON LIFETIME VIEWS.
//  The homepage stat block claims "10M+ views generated"; these three
//  campaigns alone sum to 53M+. Both cannot be current. Raise the
//  homepage figure rather than shrinking this one — until then, a
//  prospect who opens both will notice.
//
//  ⚠ NO DATES, NO TIMEFRAMES, ANYWHERE IN THE CLIENT-FACING COPY.
//  Not release dates, not "release week", not "a fixed date", not
//  "inside eighteen months", not a countdown or a drop hour. The deck
//  sells delivered numbers, and a date invites the reader to work out
//  how long ago the work was — which is not the question we want them
//  answering. Campaign names stay: Netflix, Mirzapur, BTS and Airtel
//  are the credential. The Indian Air Force's 27-year journey also
//  stays — that is the campaign's subject, from the client's own
//  one-pager, not a date of ours.
//  (The provenance date in the header above is a code comment. It is
//  not rendered, and it should stay.)
//
//  ── TONE. SAME RULE AS content/rooted-actives.ts ───────────────
//  An invitation, not a verdict on the reader. Nothing here should ask
//  a prospect to concede that their own marketing is failing before
//  they read on. The closing slide asks what they are launching; it
//  does not tell them what they are getting wrong. Case-study copy is
//  the easiest place to break this — "most brands never…" is a
//  diagnosis wearing a statistic. Describe our campaigns, not their
//  gaps.
// ────────────────────────────────────────────────────────────────

/** A figure and what it counts. Values stay strings: "7%+" and "₹1.20"
 *  are not numbers, and formatting them at render time would mean
 *  teaching the component about lakhs, multiples and percentages. */
export type DeckFigure = { value: string; label: string };

export type DeckCase = {
  /** Anchor id. Also the href used by the contents row on the cover. */
  id: string;
  /** Two or three words. Used by the cover's contents row and as the
   *  accessible name of this slide's dot in the rail — long enough to
   *  tell the three cases apart, short enough to sit in a pill. */
  label: string;
  /** Client and campaign type, e.g. "Netflix · Film launch". */
  kicker: string;
  title: string;
  overview: string;
  goals: readonly string[];
  results: readonly DeckFigure[];
  /** null while a campaign's business-impact figures are not final —
   *  the slide then renders `note` in the same slot. */
  impact: readonly DeckFigure[] | null;
  /** Only read when `impact` is null. */
  note?: string;
  /** The one number this slide is built around. */
  hero: { value: string; label: string; sub: string };
};

export const netflixCaseStudies = {
  /** Shown in the fixed masthead, opposite the slide counter. */
  eyebrow: "Creator campaigns",

  cover: {
    kicker: "Entertainment · Pop culture · Creator-led",
    headline: {
      lead: "Three launches, one creator playbook,",
      accent: "53M+ views",
    },
    lede:
      "Netflix × Mirzapur, the BTS comeback and Airtel × Netflix — what each campaign was asked for, how big a cast it took, and what the numbers came back as.",
    hint: "Use ← → to move through the deck",
  },

  /* ── 02 The argument ──────────────────────────────────────────
     Built entirely out of our own three campaigns. There is no market
     statistic here on purpose: an invented "83% of Gen Z" is the
     easiest line in a pitch to write and the easiest to be caught on,
     and we have three real campaigns that make the point better.

     Tone: this argues about casting, not about the reader. Nothing in
     it requires a prospect to concede their marketing is failing. */
  theCase: {
    kicker: "The pattern",
    title: "Cast size is a decision, not a budget line.",
    intro:
      "Three launches, none of which wanted the same thing. What they had in common was not the number of creators — it was that the number was chosen on purpose.",
    shapes: [
      {
        cast: "75",
        name: "A fandom already talking",
        text: "Mirzapur came with a community that had been quoting it long before we arrived. That wants volume and simultaneity — enough creators at once that the campaign reads as weather rather than advertising.",
      },
      {
        cast: "50",
        name: "A fanbase in every market",
        text: "A BTS comeback reaches an audience spread across every market at once. That wants a cast big enough to carry the conversation, and to keep carrying it after the first wave.",
      },
      {
        cast: "5",
        name: "A story told slowly",
        text: "Operation Safed Sagar needed weight, not noise. Five creators, five pieces of content — and the most engagement per creator of the three.",
      },
    ],
    closer:
      "Same team, same method, three different answers. The casting is where a campaign is won, which is why it is the first thing we do and the first thing we will show you.",
  },

  /* ── 03 The offer. Descriptions track content/site.ts `services` —
     keep the two in step. Talent management is deliberately absent:
     it is a creator-side offering, and on a brand pitch it blurs what
     this document is asking for. The roster it produces shows up in
     `whyUs` instead, where it is a reason to hire us rather than a
     second thing to buy. */
  whatWeDo: {
    kicker: "What we do",
    title: "One team from casting to the closing report.",
    services: [
      {
        name: "Influencer marketing",
        text: "Creator discovery and matchmaking, campaign strategy and execution, and the performance reporting that closes it out.",
      },
      {
        name: "Content production",
        text: "Concept development and scripting, end-to-end video production, and multi-platform editing and packaging.",
      },
      {
        name: "Brand strategy",
        text: "Social media strategy, audience and trend intelligence, and ROI-driven media planning behind the cast.",
      },
    ],
    note:
      "No hand-offs between agencies, and one team accountable for the number at the end.",
  },

  /* ── 04–07 THE WORK. The proof section, and the reason the deck has
     a second visual register at all: these four slides render inverted
     with a solid section tab, so a reader flipping through can see
     where the evidence starts and stops. `sectionLabel` is that tab.
     If the inversion is ever dropped, the tab has to carry the
     separation on its own — do not remove both. */
  work: {
    sectionLabel: "The work",
    caseLabel: "Case study",
  },

  /* Every fixed word the layout puts on screen. They live here, not in
     the component, so changing a heading never means opening a .tsx —
     which is the whole arrangement this deck is meant to keep: content
     in this file, layout in components/CaseStudyDeck.tsx, and nothing
     readable hard-coded on the other side of that line.

     `cover` is the accessible name of the first slide's dot in the
     rail; every other rail label is a section kicker and comes from
     the section itself. */
  labels: {
    cover: "Cover",
    brief: "The brief",
    impact: "Business impact",
    creators: "creators",
  },

  glance: {
    kicker: "At a glance",
    title: "What the three campaigns delivered.",
    stats: [
      { value: "130+", label: "Creators activated" },
      { value: "255+", label: "Content assets" },
      { value: "43M+", label: "Combined reach" },
      { value: "63M+", label: "Impressions" },
      { value: "3.5M+", label: "Engagements" },
      { value: "53M+", label: "Views delivered" },
    ] as const satisfies readonly DeckFigure[],
    footnote:
      "Totals are the three campaigns' own reported figures added together — reach and impressions are not de-duplicated between them, so treat the combined reach as campaign reach summed, not as unique people. Estimated media value came to ₹65L+ across the two campaigns where it was modelled.",
  },

  /** Order is deliberate: biggest cast first, smallest last, so the
   *  five-creator Airtel campaign reads as the precision one rather
   *  than as the deck running out of steam. Its `note` does that work —
   *  do not move it up the order without rewriting that line. */
  cases: [
    {
      id: "mirzapur",
      label: "Netflix × Mirzapur",
      kicker: "Netflix · Film launch",
      title: "75 creators for a fandom that was already waiting.",
      overview:
        "A high-energy, creator-led campaign around the Mirzapur film: 75 pop-culture creators producing 150+ assets to build buzz, conversation and anticipation for Netflix — aimed at a fan community that already knew every line.",
      goals: [
        "Build mass awareness for the Mirzapur film",
        "Create excitement and anticipation around the film",
        "Leverage the strong Mirzapur fan community",
        "Drive social conversation through creators",
        "Amplify Netflix's messaging across social platforms",
      ],
      results: [
        { value: "75+", label: "Creators activated" },
        { value: "150+", label: "Content assets" },
        { value: "25M+", label: "Total reach" },
        { value: "35M+", label: "Impressions" },
        { value: "2M+", label: "Engagements" },
        { value: "7%+", label: "Engagement rate" },
      ],
      impact: [
        { value: "₹40L+", label: "Estimated media value" },
        { value: "4x", label: "Estimated earned media value" },
        { value: "₹1.20", label: "Estimated cost per engagement" },
      ],
      hero: {
        value: "30M+",
        label: "Views delivered",
        sub: "Across creator-led Reels, Stories and social content.",
      },
    },
    {
      // ⚠ "Netflix" here is from the supplied filename, not from the
      // campaign one-pager itself. See the header note before sending.
      id: "bts",
      label: "BTS Comeback",
      kicker: "Netflix · Music & pop culture",
      title: "50 creators turned a comeback into a conversation.",
      overview:
        "A creator-led social campaign around the BTS comeback: 50+ creators and 100+ assets built to drive conversation and visibility through the youth and pop-culture audiences that carry a fandom of that size.",
      goals: [
        "Create mass awareness around the comeback",
        "Generate excitement and anticipation",
        "Drive social conversation through creators",
        "Reach youth and pop-culture audiences",
        "Maximise organic content amplification",
      ],
      results: [
        { value: "50+", label: "Creators activated" },
        { value: "100+", label: "Content assets" },
        { value: "15M+", label: "Total reach" },
        { value: "20M+", label: "Impressions" },
        { value: "1.2M+", label: "Engagements" },
        { value: "7%+", label: "Engagement rate" },
      ],
      impact: [
        { value: "₹25L+", label: "Estimated media value" },
        { value: "3.5x", label: "Estimated earned media value" },
        { value: "₹1.25", label: "Estimated cost per engagement" },
      ],
      hero: {
        value: "20M+",
        label: "Views delivered",
        sub: "Across creator-led Reels, Stories and social content.",
      },
    },
    {
      id: "airtel",
      label: "Airtel × Netflix",
      kicker: "Airtel × Netflix · Brand storytelling",
      title: "#MillionThankYou: five creators, one story worth telling slowly.",
      overview:
        "Operation Safed Sagar, told through creators rather than around them. The campaign carried Airtel and Netflix's message into the 27-year journey of the Indian Air Force — five creators, five pieces of content, and a cast kept deliberately small so each story could hold its weight.",
      goals: [
        "Build awareness for Operation Safed Sagar",
        "Create an emotional connection with the audience",
        "Drive conversation around the Indian Air Force's 27-year journey",
        "Amplify the Airtel × Netflix campaign message through creators",
        "Generate high-quality social content and organic engagement",
      ],
      results: [
        { value: "5", label: "Creators activated" },
        { value: "5", label: "Content assets" },
        { value: "3M+", label: "Total reach" },
        { value: "8M+", label: "Impressions" },
        { value: "367K", label: "Engagements" },
      ],
      impact: null,
      note:
        "The smallest cast of the three campaigns, and the most engagement per creator of the three — 367K engagements off five pieces of content. Emotional storytelling does not need a crowd to carry it.",
      hero: {
        value: "3M+",
        label: "Views delivered",
        sub: "Across Instagram Reels and Stories.",
      },
    },
  ] as const satisfies readonly DeckCase[],

  /** Our process, stated as ours. Drawn from the service descriptions
   *  already published in content/site.ts — keep the two in step, and
   *  keep every line about what we do rather than what a brand is
   *  missing (see the tone note at the top of this file). */
  process: {
    kicker: "How we run one",
    title: "The same five steps, sized to the title.",
    steps: [
      {
        name: "Casting",
        text: "Creator discovery and matchmaking against the audience the title actually needs — niche by niche, market by market.",
      },
      {
        name: "Creative",
        text: "Concepts and scripts developed per creator, so the message survives being said in their own voice.",
      },
      {
        name: "Production",
        text: "End-to-end video production and multi-platform editing wherever a creator needs the lift.",
      },
      {
        name: "Amplification",
        text: "Sequencing across Reels, Stories and platform-native formats, so the noise lands together rather than trickling.",
      },
      {
        name: "Reporting",
        text: "Reach, impressions, engagement rate and cost per engagement, reported against what we said the campaign would do.",
      },
    ],
  },

  /* ── 09 Why us. ⚠ THE FIGURES ARE NOT TYPED HERE. The component
     reads `stats` out of content/site.ts, so this slide and the
     homepage cannot disagree — the same rule InfluencerCampaignProposal
     follows for its credentials strip.

     ⚠ ONE STAT IS DELIBERATELY SKIPPED. site.ts carries a "10M+ views
     generated" figure, and the proof section of this very deck sums to
     53M+. Putting both in one document is a contradiction a reader
     will find in ten seconds, so the component filters that stat out
     rather than shrinking the campaign numbers. Fix the homepage and
     this filter can go — see the note at the top of this file. */
  whyUs: {
    kicker: "Why Deecode",
    title: "The roster is ours, not rented.",
    points: [
      {
        name: "Direct to the creator",
        text: "We manage the talent we cast, so a shortlist is a phone call rather than a chain of intermediaries — and a brief survives reaching the person who films it.",
      },
      {
        name: "Three markets",
        text: "India, the USA and Dubai, so a launch that has to travel does not need a second agency to leave the country.",
      },
      {
        name: "Judged on business impact",
        text: "Reach, impressions, engagement rate and cost per engagement, reported against what we said the campaign would do before it ran.",
      },
    ],
    brandsLabel: "Brands we have run campaigns for",
  },

  /* ── 10 The ask. A pitch that ends on a phone number ends on a
     shrug; these are three concrete things the reader can say yes to,
     and none of them commits them to a budget. */
  howWeStart: {
    kicker: "How we start",
    steps: [
      {
        name: "Send the brief",
        text: "The title, the audience and what a win looks like. A paragraph is enough to work from.",
      },
      {
        name: "We come back with a cast",
        text: "A shortlist with reach and rates, a content plan, and the numbers we think it does.",
      },
      {
        name: "We run it and report",
        text: "Production, release sequencing, and a closing report against the plan we agreed.",
      },
    ],
  },

  close: {
    kicker: "Next",
    headline: {
      lead: "Tell us what you're launching —",
      accent: "we'll tell you who should say it",
    },
    lede:
      "Same team, same playbook, sized to the title. Tell us what you are putting out and we'll come back with a cast, a content plan and the numbers we think it does.",
  },
} as const;
