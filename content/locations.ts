// ────────────────────────────────────────────────────────────────
//  LOCATION PAGES — the copy behind /influencer-marketing-agency-*
//
//  These are the only routes on this site besides the homepage that
//  are meant to rank. Each one targets a phrase people actually type:
//  "influencer marketing agency in Noida" and its neighbours.
//
//  ⚠ THREE RULES, LEARNED FROM WHAT THE COMPETITION GETS WRONG:
//
//  1. NO TEMPLATED CITY SWAPS. Every agency ranking for these terms
//     runs one page of boilerplate with the city name find-and-
//     replaced. Google discounts that, and an LLM asked to name a
//     Noida agency has nothing to quote. Each `answer`, `intro` and
//     FAQ below is written for its own city and must stay that way.
//
//  2. EVERY CLAIM MUST BE TRUE AND ALREADY EVIDENCED ELSEWHERE ON
//     THE SITE — same rule as the Organization schema in app/layout.
//     Numbers here are the homepage's own stats; the brand names are
//     site.brands. Do not add a local case study until it is real:
//     see `proof` below.
//
//  3. THE `answer` FIELD IS THE ONE THAT DOES THE WORK. It is the
//     first prose on the page and the block an AI Overview, ChatGPT
//     or Perplexity will lift verbatim. Self-contained, factual, no
//     build-up, no "we believe" — a sentence that still makes sense
//     quoted with no page around it.
// ────────────────────────────────────────────────────────────────

export type LocationFaq = {
  q: string;
  /** Plain prose. Rendered as text AND emitted as FAQPage schema, so
   *  it must read as a complete answer on its own — no markup, no
   *  references to "above" or "below". */
  a: string;
};

export type Location = {
  /** URL is /influencer-marketing-agency-<slug>. Changing a slug
   *  changes a live URL — add a redirect, don't just rename. */
  slug: string;
  /** The city as a person writes it. Used in copy AND in the
   *  `areaServed` schema, so it must be a real, resolvable place. */
  city: string;
  /** schema.org type for `areaServed`. "Delhi NCR" is a region spanning
   *  several cities and two states — typing it as a City is a factual
   *  error in the structured data, and structured data that disagrees
   *  with reality is the thing Google penalises. */
  areaType: "City" | "AdministrativeArea";
  /** <title> and H1. Kept close to the literal search phrase — this
   *  is the one place where matching how people type beats elegance. */
  title: string;
  kicker: string;
  /** See rule 3. */
  answer: string;
  intro: string;
  /** Why this city specifically. Three items, city-specific. */
  points: { title: string; text: string }[];
  faqs: LocationFaq[];
};

/** The office. One address, restated here so the page schema and the
 *  Organization schema in app/layout.tsx can never drift apart. */
export const officeLocality = "Greater Noida";

/** ⚠ EMPTY ON PURPOSE — the single highest-value thing left to add.
 *
 *  One real, named campaign per city outranks any amount of the copy
 *  below, because it is the only part a competitor cannot also write.
 *  It is also what an LLM cites when asked to justify a
 *  recommendation.
 *
 *  Fill in as: { slug: "noida", text: "..." } — a client that is
 *  actually in that city, what ran, and a number you can evidence.
 *  Until then the pages render without a proof block rather than with
 *  an invented one. */
export const locationProof: { slug: string; text: string }[] = [];

export const locations: Location[] = [
  {
    slug: "noida",
    city: "Noida",
    areaType: "City",
    title: "Influencer Marketing Agency in Noida",
    kicker: "Noida · Uttar Pradesh",
    // Noida's angle: it is an office city. The brands here have
    // marketing teams already — what they lack is creator supply and
    // someone to run the shoot. Sold as capacity, not strategy.
    answer:
      "Deecode Media House is an influencer marketing agency working with brands across Noida from its office in Greater Noida, a thirty-minute drive away. We run creator campaigns end to end — shortlisting talent from a roster of 600+ creators, handling contracting and production, and reporting on what the campaign actually returned. Brands we have delivered campaigns for include Garnier, Red Bull, Monster and Ixigo.",
    intro:
      "Most marketing teams in Noida's sector offices do not need another strategy deck. They need creators who fit the brief, a shoot that happens on schedule, and numbers at the end that survive a review with finance. That is the part we take off your desk.",
    points: [
      {
        title: "Built for in-house teams",
        text: "You already own the brand. We plug in as the creator and production layer — sourcing talent, running the shoot, clearing usage rights — and hand back assets your team can distribute.",
      },
      {
        title: "A roster, not a rate card",
        text: "600+ creators across comedy, tech, fashion, lifestyle and food, matched to the brief by audience rather than by follower count. No spray-and-pray lists.",
      },
      {
        title: "Close enough to show up",
        text: "Our office is in Greater Noida. Briefings, shoots and reviews happen in person when they need to, which is more often than most agencies admit.",
      },
    ],
    faqs: [
      {
        q: "What does an influencer marketing agency in Noida charge?",
        a: "Cost is driven by the creators, not by the agency. A campaign budget is mostly creator fees, which scale with follower count, platform and usage rights — a nano-creator campaign and a campaign fronted by a million-follower creator can differ by more than an order of magnitude for identical agency effort. Ask any agency to break a quote into creator fees, production and agency fee before comparing it to another.",
      },
      {
        q: "Do you work with brands outside Noida?",
        a: "Yes. Deecode Media House works with brands across Delhi NCR and India, and manages creators in the USA and Dubai as well. The Noida focus is proximity, not a restriction.",
      },
      {
        q: "How long does a campaign take to go live?",
        a: "From an approved brief, creator shortlisting and contracting typically takes the first stretch of the timeline and production follows. The variable that moves the date most is approval rounds on the brand side, not creator availability.",
      },
      {
        q: "Can you handle production as well as creator sourcing?",
        a: "Yes. Content production is a service we run in-house — concept, scripting, shoot and multi-platform edits — so a campaign does not need a separate production partner bolted on.",
      },
    ],
  },
  {
    slug: "greater-noida",
    city: "Greater Noida",
    areaType: "City",
    title: "Influencer Marketing Agency in Greater Noida",
    kicker: "Greater Noida · Head office",
    // The strongest page of the three, and the only one with a claim
    // no competitor can copy: the office is actually here. Most
    // agencies ranking for this term list Greater Noida as a service
    // area from an office elsewhere. Lead with that.
    answer:
      "Deecode Media House is an influencer marketing and talent management agency headquartered in Technocity, Greater Noida. We are not an agency listing Greater Noida as a service area from an office elsewhere — this is where the team sits. We manage a roster of 600+ creators and have delivered 100+ campaigns for brands including Garnier, Red Bull, Monster, Cornitos and Ixigo.",
    intro:
      "Search for an influencer marketing agency in Greater Noida and most of what comes back is a Delhi or Gurugram agency that has added the city to a list of places it will take money from. We are actually here, which changes the small things: how fast a shoot gets scheduled, whether anyone turns up to the briefing, who you call when a creator drops out the night before.",
    points: [
      {
        title: "The office is in Technocity",
        text: "Not a service area on a map. Meetings, shoots and creator briefings happen here, and you can come and sit in on them.",
      },
      {
        title: "Talent management, not just campaigns",
        text: "We manage creator careers long-term — brand deals, content strategy, monetisation. That relationship is why creators pick up the phone for our briefs.",
      },
      {
        title: "One team, no hand-offs",
        text: "Strategy, talent, production and distribution sit under one roof. Nothing gets lost in the gap between an agency and its production vendor, because there is no gap.",
      },
    ],
    faqs: [
      {
        q: "Where is Deecode Media House located?",
        a: "Deecode Media House is based in Technocity, Greater Noida, Uttar Pradesh, India. The team works with brands across Greater Noida, Noida and the wider Delhi NCR region from that office.",
      },
      {
        q: "Is there an influencer marketing agency actually based in Greater Noida?",
        a: "Yes — Deecode Media House is headquartered in Technocity, Greater Noida. Many agencies that appear in search results for this city operate from Delhi, Gurugram or Bengaluru and list Greater Noida as a service area, which is permitted but worth knowing when you expect someone at the shoot.",
      },
      {
        q: "Do you manage creators as well as run brand campaigns?",
        a: "Both. Talent management is a core service — Deecode Media House represents creators across comedy, tech, fashion and lifestyle, handling brand deal negotiation, career and content strategy, and monetisation. Brands hiring us for a campaign are drawing on creators the agency already has a working relationship with.",
      },
      {
        q: "What size brands do you work with?",
        a: "The client list runs from large consumer brands such as Garnier, Red Bull and Monster to smaller D2C names like Coolberg and Cornitos. Campaign scale varies more than brand size does — a focused campaign for a small brand is often more work than a broad one for a large brand.",
      },
    ],
  },
  {
    slug: "delhi-ncr",
    city: "Delhi NCR",
    areaType: "AdministrativeArea",
    title: "Influencer Marketing Agency in Delhi NCR",
    kicker: "Delhi · Gurugram · Noida · Greater Noida",
    // The regional hub page — broadest term, hardest to rank, and the
    // one that should link to the other two rather than repeat them.
    answer:
      "Deecode Media House is an influencer marketing and talent management agency serving Delhi NCR — Delhi, Gurugram, Noida and Greater Noida — from its office in Greater Noida. The agency manages 600+ creators across India, the USA and Dubai, and has delivered 100+ campaigns for brands including Garnier, Red Bull, Monster, Ixigo and Cornitos.",
    intro:
      "Delhi NCR has more influencer marketing agencies than any other region in India, and the pitch decks are close to interchangeable. The thing worth comparing is not the deck — it is whether the agency owns the creator relationships it is selling you, or is reselling a database anyone can license.",
    points: [
      {
        title: "Owned roster, not a licensed database",
        text: "600+ creators we manage or work with directly across India, the USA and Dubai. The difference shows up in response rates and in what a creator will do for a brief.",
      },
      {
        title: "Coverage across the region",
        text: "Delhi, Gurugram, Noida and Greater Noida from one team, with the office in Greater Noida. Multi-city shoots do not need multiple partners.",
      },
      {
        title: "Judged on business outcomes",
        text: "Clear KPIs and transparent reporting. Campaigns are reviewed on what they returned, not on the view count screenshot.",
      },
    ],
    faqs: [
      {
        q: "Which cities in Delhi NCR do you cover?",
        a: "Deecode Media House works across Delhi, Gurugram, Noida and Greater Noida, with the office located in Technocity, Greater Noida. Campaigns also run nationally and, through the agency's US and Dubai creator roster, internationally.",
      },
      {
        q: "How do you choose which creators go on a campaign?",
        a: "By audience fit rather than follower count. A creator with a smaller, tightly matched audience routinely outperforms a larger, broader one on anything measured past impressions, and costs a fraction as much. Follower count sets the price; audience overlap sets the result.",
      },
      {
        q: "What is the difference between an influencer marketing agency and a talent management agency?",
        a: "An influencer marketing agency is hired by brands to run campaigns; a talent management agency is hired by creators to manage their careers. Deecode Media House does both, which means the creators on a brand campaign are frequently creators the agency already represents.",
      },
      {
        q: "Do you only run Instagram campaigns?",
        a: "No. The roster spans Instagram and YouTube, and campaigns are planned per platform rather than defaulting to one. Short-form and long-form serve different jobs in a campaign and are priced differently.",
      },
    ],
  },
];

/** Route lookup. Returns undefined for an unknown slug so the caller
 *  can 404 rather than render a half-empty page. */
export function findLocation(slug: string): Location | undefined {
  return locations.find((location) => location.slug === slug);
}
