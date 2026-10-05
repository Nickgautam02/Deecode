// ────────────────────────────────────────────────────────────────
//  TALENT MANAGEMENT — the copy behind /talent-management-agency.
//
//  One of the routes on this site built to rank (the full list is in
//  app/sitemap.ts), and the only one aimed at CREATORS rather than at
//  brands. Someone searching "talent management agency" or
//  "creator management India" is asking who would represent them, not
//  who would run their campaign.
//
//  ⚠ THE SAME THREE RULES AS content/locations.ts, AND ONE MORE:
//
//  1. THE `answer` FIELD DOES THE WORK. First prose on the page, and
//     the block an AI Overview or ChatGPT lifts verbatim. It has to
//     make sense quoted with no page around it: factual, self-
//     contained, no build-up.
//
//  2. EVERY CLAIM TRUE AND EVIDENCED ELSEWHERE ON THE SITE. The roster
//     size is site.stats. The niches and geographies are the real
//     entries in site.creators. The brand names are site.brands. The
//     campaigns are the three in content/netflix-case-studies.ts.
//
//  3. NO TEMPLATED FILLER. "We are passionate about creators" ranks
//     for nothing and gets quoted by nobody.
//
//  4. ⚠ NOT ONE WORD ABOUT COMMISSION, SPLITS, EXCLUSIVITY OR CONTRACT
//     LENGTH. Nobody has told me what Deecode's terms are, and a
//     number invented for an FAQ is one a creator will hold us to in
//     the first call — or worse, one a competitor screenshots. The
//     "What does it cost a creator?" question is the obvious eighth
//     FAQ and it stays unwritten until Nikhil supplies the answer.
//
//  ── WHO THE PAGE TALKS TO ──────────────────────────────────────
//  Creators first, brands second. The brand half of the argument is
//  one section near the end, because a brand searching for managed
//  talent will land on the homepage, not here.
// ────────────────────────────────────────────────────────────────

export type TalentFaq = {
  q: string;
  /** Plain prose. Rendered as visible text AND emitted as FAQPage
   *  schema, so it must read as a complete answer on its own — no
   *  markup, no "as mentioned above". Schema that disagrees with the
   *  rendered page is a manual-action risk. */
  a: string;
};

export const talentManagement = {
  /** URL is /talent-management-agency — the search phrase, verbatim,
   *  the same way the city pages are named. Changing it changes a live
   *  URL: add a redirect, do not just rename. */
  slug: "talent-management-agency",

  kicker: "Talent management",
  /** <title> and H1. Close to how the phrase is actually typed. */
  title: "Talent management agency for creators",

  /** See rule 1. */
  answer:
    "Deecode Media House is a talent management agency representing a roster of 600+ creators across India, the USA and Dubai. We negotiate brand deals, plan content and careers, and handle the production, paperwork and reporting around them — for creators in comedy, tech, fashion, lifestyle and entertainment, from 5K-subscriber channels to 3.8M-follower accounts.",

  intro:
    "Most creators sign with a manager somewhere between the brand deals arriving and knowing what to charge for them. That is the gap this side of the agency exists to close — and because we also run campaigns for brands, the briefs we place our creators into are frequently our own.",

  /** What management actually covers. Drawn from the Talent Management
   *  service in content/site.ts, expanded — this page is where that
   *  one card gets its full page. */
  whatWeDo: [
    {
      title: "Brand deals, negotiated",
      text: "Inbound offers get answered, scoped and priced. We handle the back-and-forth on deliverables, usage rights and timelines, so the conversation you have with a brand is about the work rather than about the rate.",
    },
    {
      title: "Rates you can defend",
      text: "What to charge, and why — built from what comparable creators in your niche actually command, not from a number that felt right. A rate card is only useful if it survives a procurement team.",
    },
    {
      title: "Career and content strategy",
      text: "Which formats to lean into, which platforms to grow, what to say no to. Long-term growth plans for every creator on our roster, reviewed as the numbers move.",
    },
    {
      title: "Production that keeps up",
      text: "Concept, scripting, shooting and editing when a campaign needs more than a phone and an evening. Our production team works on brand campaigns all week; it is the same team behind our creators.",
    },
    {
      title: "IP, merch and monetisation",
      text: "The income that is not a brand deal: your own products, formats you own, affiliate and platform revenue. The part of a creator business that compounds after the sponsorships slow down.",
    },
    {
      title: "Invoicing, contracts and chasing",
      text: "Paperwork, deliverable tracking and the unglamorous business of getting paid on time. The work that quietly costs creators a day a week.",
    },
  ],

  /** Who is already on the roster. Every figure here is a real entry in
   *  site.creators — if that list changes, so does this. */
  roster: {
    title: "Who we represent",
    text: "Comedy, tech, fashion, beauty and lifestyle creators across India, the USA and Dubai — from 1.7K-subscriber tech channels finding their footing to a 3.83M-subscriber comedy roster. We sign for the work someone makes, not only for the follower count next to it.",
    facets: [
      { value: "600+", label: "Creators on the roster" },
      { value: "3", label: "Markets: India, USA, Dubai" },
      { value: "80+", label: "Brand partners" },
    ],
  },

  /** How a creator actually joins. Four steps, deliberately concrete —
   *  a vague process section is the thing creators read as "they will
   *  not reply". */
  process: [
    {
      title: "A conversation",
      text: "You tell us what you are making, what you are being offered, and what you want the next year to look like.",
    },
    {
      title: "An audit",
      text: "We look at your numbers, your formats and your existing deals, and say plainly where the money and the growth are.",
    },
    {
      title: "A plan and a rate card",
      text: "What to make, what to charge, which brands to go after — written down, so it is a plan rather than a chat.",
    },
    {
      title: "We go to work",
      text: "Pitching you into briefs, answering the inbound, running the shoots and reporting the numbers back.",
    },
  ],

  /** The brand-side half of the argument. One section, near the end —
   *  a brand searching for managed talent lands on the homepage. */
  forBrands: {
    title: "For brands hiring our creators",
    text: "The creators on a Deecode campaign are frequently creators the agency already represents, which is why they turn a brief around inside a week rather than a month. That roster has carried campaigns for Netflix, Airtel, Garnier, Red Bull and Ixigo, including creator-led launches that delivered 53M+ views across three entertainment campaigns.",
  },

  faqs: [
    {
      q: "What does a talent management agency do for a creator?",
      a: "A talent management agency represents a creator commercially: it fields and negotiates brand deals, sets and defends rates, plans content and career strategy, handles contracts, invoicing and deliverable tracking, and builds income beyond sponsorships through IP, merchandise and platform revenue. Deecode Media House does all of that for a roster of 600+ creators across India, the USA and Dubai.",
    },
    {
      q: "How is talent management different from influencer marketing?",
      a: "Influencer marketing is bought by brands — an agency is hired to run a campaign and casts creators into it. Talent management is bought by creators — an agency represents the creator and works on their career over years. Deecode Media House does both, which means the creators on our campaigns are frequently creators the agency already manages.",
    },
    {
      q: "How many followers do I need to be managed by Deecode?",
      a: "There is no threshold. The roster runs from a 1.72K-subscriber tech channel to a 3.83M-subscriber comedy account, and what decides it is the work and how consistently it is made, not the number beside the handle. A 90K account with a clear niche and a real audience is easier to place than a 500K account with neither.",
    },
    {
      q: "Do you manage creators outside India?",
      a: "Yes. The roster spans India, the USA and Dubai, with US-based tech and lifestyle creators in California and New York among the accounts we represent. Brand deals are placed in whichever market the creator's audience actually sits in.",
    },
    {
      q: "Which niches do you represent?",
      a: "Comedy, tech, fashion and beauty, lifestyle, and entertainment and pop culture. Those are the categories where we have both roster depth and a track record with brands — including creator-led campaigns for Netflix, Airtel, Garnier, Red Bull and Ixigo.",
    },
    {
      q: "Do you help with content production, or only with deals?",
      a: "Both. Content production is a service we run for brands — concept development, scripting, end-to-end video production and multi-platform editing — and the same team works on the creators we manage when a campaign needs more than a self-shot video.",
    },
    {
      q: "How do I join the Deecode Media House roster?",
      a: "Send us your handles and what you are working on through the creator form on the contact section of this site, and we will come back to you. Shortlisted creators go through a conversation and an audit of their numbers and existing deals before anything is signed.",
    },
  ] satisfies TalentFaq[],
} as const;
