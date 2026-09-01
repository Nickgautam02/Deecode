// ────────────────────────────────────────────────────────────────
//  ROOTED ACTIVE NATURALS — INFLUENCER MARKETING PROPOSAL.
//  Everything rendered at /rooted-actives-proposal lives in this file.
//
//  Scope is influencer marketing, and it produces TWO outputs — see
//  `whatYouGet`. Creator posts go live on the creator's handle; UGC
//  videos are creator-shot but brand-owned, delivered for Rooted
//  Actives to run as paid and owned media. Both are in the retainer.
//
//  Page/account management and talent management stay deliberately
//  absent — separate offerings, and pitching them here would blur the
//  one thing this document is asking for. Note the distinction that
//  keeps UGC inside scope: it is campaign creative produced alongside
//  a cast, not a standalone content-production retainer.
//
//  ── TONE. READ THIS BEFORE EDITING ANY COPY ────────────────────
//  The first draft of this page was rewritten wholesale because it read
//  as rude. It diagnosed the client: their discounting "was doing the
//  selling", their own tagline "cut both ways", their positioning was
//  "built to avoid scrutiny". Every line was defensible and the document
//  was still insulting, because a pitch that opens by listing what a
//  brand is getting wrong asks them to agree they are failing before
//  they agree to anything else.
//
//  The register now is: they built something real, and there is a large
//  audience that has not met it yet. Same strategic argument, offered
//  rather than diagnosed. Specifically:
//   · Credit what is theirs. They pioneered this category in India.
//   · Frame the gap as headroom, never as a mistake.
//   · Guardrails describe OUR process, not their exposure.
//   · No line should require them to concede a weakness to read on.
//  If a new line would make the reader defensive, it is wrong even if
//  it is true.
//
//  ── WHERE THE BRAND FACTS CAME FROM ────────────────────────────
//  Read off rootedactives.com on 1 September 2026: the catalogue, the
//  catalogue, the "backed by science, not marketing" positioning, the
//  USDA-organic and third-party-batch-testing claims, and the
//  2M-customers, 40+-SKU and 4.6/5 figures. They are the client's own
//  public claims, repeated back — not ours. If any has changed, correct
//  it here before sending: quoting a brand's own site incorrectly is a
//  worse first impression than not quoting it at all.
//
//  ── THE ARGUMENT, IN ONE LINE ──────────────────────────────────
//  Functional supplements are still being discovered rather than
//  searched for in India, so influencer marketing is how the category
//  gets introduced — not simply a reach buy. Every section follows.
//
//  ⚠ DO NOT LET THIS BECOME A MUSHROOM DECK. An earlier draft leaned so
//  hard on Lion's Mane, Cordyceps and Reishi that it read as though
//  mushrooms were the whole catalogue. They are the origin story, not
//  the range: collagen, beets, ashwagandha, maca, berberine and the
//  greens/reds line all carry the same argument, and several reach
//  bigger audiences. Keep product mentions spread across the catalogue
//  and keep the framing at category level.
//
//  ⚠ NO PERFORMANCE FIGURES ANYWHERE ON THIS PAGE, DELIBERATELY.
//  The `caseStudies` in content/site.ts are template placeholders, not
//  our campaigns — content/story-digital.ts flags the same trap. There
//  is no Rooted Actives campaign to report on yet, and a view or ROAS
//  number on a proposal becomes a commitment in the negotiation that
//  follows. The credential figures in `credentials` are pulled from
//  content/site.ts rather than retyped, so this page cannot contradict
//  the public site.
//
//  ⚠ NO INVENTED CREATORS. Our public roster in content/site.ts is
//  Tech, Comedy, Fashion & Beauty and Lifestyle — it contains no
//  health, fitness or nutrition names. The casting section that listed
//  audience archetypes has been removed entirely, so nothing on the
//  page now describes who we would cast. If any of it comes back, it
//  sells archetypes only — never a named person or a follower count
//  unless they are actually in site.creators.
//
//  ⚠ The block that said this out loud on the page ("What we hold
//  today, and what we source") was removed on Nikhil's instruction.
//  Nothing on the page now tells the client that doctors and dieticians
//  are sourced to brief rather than already on the roster — so it must
//  be said on the call instead. Do not let the copy start implying we
//  hold them.
//
//  ⚠ COPY LENGTH IS A FEATURE. Phrases, not sentences, in every list.
//  One line per section sub. If you add to it, cut something else.
// ────────────────────────────────────────────────────────────────

import { site } from "./site";

export const rootedActives = {
  /** Drives the masthead and the page title. */
  recipient: "Rooted Active Naturals" as string | null,

  kicker: "Influencer marketing — creator campaign proposal",
  prepared: "Prepared 1 September 2026",

  headline: {
    // The accent half renders in the brand colour, matching the
    // convention used across content/site.ts. Deliberately a
    // compliment: they did create this category in India, and the
    // document has to earn the right to its argument early.
    lead: "You didn't launch a product. You launched a",
    accent: "category",
  },
  lede: "You've built a range that covers focus, stamina, sleep, skin and immunity. The next chapter is introducing it at scale — in the words of the people your customer already trusts.",

  // Hero jump links. Hrefs match the section ids in the component.
  contents: [
    { label: "The opportunity", href: "#opportunity" },
    { label: "What you get", href: "#outputs" },
    { label: "Packages", href: "#packages" },
  ],

  // ⚠ INTRO ONLY. This section used to carry four "here is what is true
  // about your category" cards and a closing statement. They were cut:
  // read together they oversold, and a proposal that spends its first
  // screen telling a brand about its own market is posturing. It sets
  // the frame in three sentences and moves on.
  opportunity: {
    kicker: "01 / The opportunity",
    title: "Wellness is bought on trust.",
    sub: "Few people search for a supplement by name. They hear about it from someone they already follow.",
    intro: "Rooted Actives has the products, the certifications and the reviews. What creator marketing adds is reach and explanation — the right people describing what each product does, to audiences who take their word for it.",
  },

  // The two things the retainer produces. Stripped to the two names on
  // Nikhil's instruction — the per-output detail (where each lands, the
  // bullet lists, the ad-licence note) was cut as overselling. The
  // section heading carries the distinction now; the numbers that differ
  // per track live in `packages.tiers[].figures`.
  //
  // ⚠ The commercial difference still matters even though the copy no
  // longer spells it out: creator posts borrow someone else's audience,
  // UGC assets are licensed to the brand and keep working in an ad
  // account. Do not merge them into one figure.
  whatYouGet: {
    kicker: "02 / What you get",
    title: "Two outputs, not one.",
    sub: "Reach on their handles, and a library of ad creative on yours.",
    outputs: [{ name: "Creator posts" }, { name: "UGC videos" }],
  },

  packages: {
    kicker: "03 / Packages",
    title: "Three tracks. Same desk, different intensity.",
    sub: "What changes is the size of the cast and the depth of the read — never the standard of the work.",
    // ⚠ WHAT IS CONFIRMED AND WHAT IS NOT, as of 1 September 2026:
    //   · Seed's three figures (10–12 creators, 10–12 posts, 5–6 UGC)
    //     are Nikhil's numbers. Do not "tidy" them.
    //   · EVERY PRICE, including Seed's, is still a placeholder.
    //   · Scale's creators and UGC, and Category Lead's UGC, are also
    //     Nikhil's now. The ONLY figure still mine is Category Lead's
    //     35–40 creators (and the 70–80 posts derived from it).
    // They are drafted to be credible for an Indian influencer-marketing
    // retainer of this shape. Set or confirm the rest before this URL is
    // sent. Same caution as the footnote in content/personal-brand.ts.
    //
    // ⚠ AGENCY FEE ONLY. Creator fees sit outside the retainer, which is
    // the honest structure for this service and the one the footnote
    // states. Folding creator cost into a headline price either caps the
    // cast or hides the margin, and both come apart on the call.
    //
    // ⚠ UGC AD LICENCE TERMS. All three are Nikhil's: 2 months on
    // Seed, 3 on Scale, 4 on Category Lead. Finite on every track — an
    // earlier draft gave Category Lead a perpetual licence on flagship
    // assets and that was replaced. The steps are one month apart while
    // the price nearly doubles each time, so the licence is not the
    // reason to move up a track; cast size and the extras are.
    //
    // ⚠ CREATOR POSTS = 2 x CREATORS, on every track. 10–12 creators
    // gives 20–24 posts, 18–20 gives 36–40, 35–40 gives 70–80. If the
    // creator count changes, recompute the posts figure with it — they
    // are one decision, and a card where the ratio slips is the kind of
    // thing a client checks with a calculator.
    //
    // `figures` are the three numbers the tracks are compared on. They
    // deliberately separate creator posts from UGC videos — one figure
    // covering "deliverables" hides the half of this retainer the brand
    // actually keeps. Every line in `includes` renders identically; do
    // not reintroduce a two-tier treatment inside a price card.
    tiers: [
      {
        name: "Seed",
        price: "₹1,25,000",
        badge: null as string | null,
        for: "A measured start — see the engine work before scaling it.",
        figures: [
          { value: "10–12", label: "Creators / month" },
          { value: "20–24", label: "Creator posts" },
          { value: "5–6", label: "UGC videos" },
        ],
        // Ordered by what the client is buying, not by workflow: cast,
        // then the UGC output and its licence, then supporting work,
        // then admin and reporting last. A price card is skimmed from
        // the top, so the lines that justify the number lead. Keep the
        // same order on all three tracks — they are read side by side.
        includes: [
          // ⚠ ORDER IS NIKHIL'S, on all three tracks. Lines 3 and 4 are
          // deliberately two lines and not one merged "edited in-house,
          // final cuts plus raw footage" — that merge was tried and
          // reversed. Do not re-merge them.
          { label: "Influencer casting sourced to brief" },
          { label: "UGC shot to your ad brief" },
          { label: "In-house editing — we deliver the final product" },
          { label: "Ready-to-run cuts plus raw footage" },
          { label: "2-month ad licence" },
          { label: "One credentialed expert voice" },
          { label: "Scripts written and pre-cleared" },
          { label: "Product-to-audience mapping" },
          { label: "Contracting and creator payouts" },
          { label: "Delivery QC and disclosure checks" },
          { label: "Monthly report, per creator and per product" },
          // Cadence: twice a month here, three times a month on Scale
          // and four on Category Lead — all Nikhil's numbers. Written as
          // counts per month, never "bi-monthly" or "bi-weekly": both
          // read two ways, which is not an ambiguity to leave in a
          // priced deliverable.
          //
          // Reporting steps with it: monthly, fortnightly, weekly.
          { label: "Review calls, twice a month" },
        ],
      },
      {
        name: "Scale",
        price: "₹2,50,000",
        // The badge is the ONLY thing marking the recommended track —
        // the card is styled identically to the other two on purpose.
        // Move the badge to change the recommendation.
        badge: "Recommended",
        for: "Everything in Seed, at twice the cast — plus expert voices, regional reach and a longer licence.",
        figures: [
          { value: "18–20", label: "Creators / month" },
          { value: "36–40", label: "Creator posts" },
          { value: "10–12", label: "UGC videos" },
        ],
        // Ordered by what the client is buying, not by workflow: cast,
        // then the UGC output and its licence, then supporting work,
        // then admin and reporting last. A price card is skimmed from
        // the top, so the lines that justify the number lead. Keep the
        // same order on all three tracks — they are read side by side.
        includes: [
          // ⚠ "UGC shot to your ad brief" IS DELIBERATELY ABSENT HERE.
          // Nikhil has removed it from this track twice; it was put back
          // by accident during the rebuild below. Do not restore it.
          //
          // ⚠ SCALE MUST CONTAIN SEED. It briefly listed 9 lines against
          // Seed's 12, so the cheaper card read as the richer one — for
          // the track badged "Recommended". Every operational line Seed
          // states is repeated here (they were always included, just
          // unlisted), then Scale's own upgrades on top. If you add a
          // line to Seed, add it here too or this inverts again.
          { label: "Influencer casting sourced to brief" },
          { label: "UGC hook and opener variants for testing" },
          { label: "In-house editing — we deliver the final product" },
          { label: "Ready-to-run cuts plus raw footage" },
          { label: "3-month ad licence" },
          { label: "Credentialed expert voices" },
          { label: "Regional-language creators, Hindi first" },
          { label: "Scripts written and pre-cleared" },
          { label: "Product-to-audience mapping" },
          { label: "Contracting and creator payouts" },
          { label: "Delivery QC and disclosure checks" },
          { label: "Creative refresh on the assets that work" },
          { label: "Named point of contact" },
          { label: "Fortnightly report, per creator and per product" },
          { label: "Review calls, three times a month" },
        ],
      },
      {
        name: "Category Lead",
        price: "₹4,50,000",
        badge: null as string | null,
        for: "Everything in Scale, across the full catalogue and every language.",
        figures: [
          { value: "35–40", label: "Creators / month" },
          { value: "70–80", label: "Creator posts" },
          { value: "20–25", label: "UGC videos" },
        ],
        // Ordered by what the client is buying, not by workflow: cast,
        // then the UGC output and its licence, then supporting work,
        // then admin and reporting last. A price card is skimmed from
        // the top, so the lines that justify the number lead. Keep the
        // same order on all three tracks — they are read side by side.
        includes: [
          // ⚠ "UGC shot to your ad brief" is deliberately absent here and
          // on Scale. It survives on Seed alone. Do not restore it.
          //
          // Contains Scale, which contains Seed — same rule as above, so
          // the three cards grow strictly rightwards. Category Lead's own
          // upgrades are the perpetual licence, macro casting, the expert
          // panel, exclusivity and the dedicated lead.
          { label: "Influencer casting sourced to brief" },
          { label: "A UGC library built month over month" },
          { label: "In-house editing — we deliver the final product" },
          { label: "Ready-to-run cuts plus raw footage" },
          { label: "4-month ad licence" },
          { label: "A standing panel of expert voices" },
          { label: "Category exclusivity where it's worth holding" },
          { label: "Multi-language creators beyond Hindi" },
          { label: "Scripts written and pre-cleared" },
          { label: "Product-to-audience mapping" },
          { label: "Contracting and creator payouts" },
          { label: "Delivery QC and disclosure checks" },
          { label: "Always-on cadence plus launch moments" },
          { label: "Signature formats — a series, not one-offs" },
          { label: "Creative testing roadmap" },
          { label: "Dedicated campaign lead" },
          { label: "Weekly report, per creator and per product" },
          { label: "Review calls, four times a month" },
        ],
      },
    ],
    // ⚠ CONFIRM before sending. This is the usual shape for a retainer
    // of this kind, but it has not been agreed with anyone. Delete a
    // line rather than send terms we have not decided.
    footnote:
      "Agency retainers, billed monthly, inclusive of UGC production and the ad licence terms listed. Creator fees, paid amplification, product seeding, shipping and outstation travel are quoted separately and passed through at cost.",
  },

  // Credentials strip. Derived from content/site.ts rather than retyped
  // so this page can never contradict the public site.
  //
  // ⚠ site.ts `stats` says a 600+ roster while content/story-digital.ts
  // states 1000+ in `wireHub`. The two disagree. This page follows
  // site.ts because that is what the public homepage shows — fix the
  // discrepancy at the source, not here.
  credentials: {
    label: "Deecode Media House",
    stats: site.stats,
  },
};
