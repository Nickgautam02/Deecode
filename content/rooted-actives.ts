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
//  Read off rootedactives.com on 1 September 2026: the mushroom-first
//  catalogue, the "backed by science, not marketing" positioning, the
//  USDA-organic and third-party-batch-testing claims, and the
//  2M-customers, 40+-SKU and 4.6/5 figures. They are the client's own
//  public claims, repeated back — not ours. If any has changed, correct
//  it here before sending: quoting a brand's own site incorrectly is a
//  worse first impression than not quoting it at all.
//
//  ── THE ARGUMENT, IN ONE LINE ──────────────────────────────────
//  Functional mushrooms are still being discovered rather than searched
//  for in India, so influencer marketing is how the category gets
//  introduced — not simply a reach buy. Every section follows from that.
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
//  health, fitness or nutrition names. `casting` therefore sells
//  archetypes and the sourcing process, and names real people only
//  where the niche genuinely matches (see `casting.proven`). Do not
//  add a wellness creator here with a follower count unless they are
//  in site.creators.
//
//  ⚠ COPY LENGTH IS A FEATURE. Phrases, not sentences, in every list.
//  One line per section sub. If you add to it, cut something else.
// ────────────────────────────────────────────────────────────────

import { site } from "./site";

/** Brand partners from site.brands that are actually relevant to a
 *  supplement pitch, grouped by why they are relevant. Three energy
 *  drinks is the strongest adjacency we have to a stamina SKU, so it
 *  leads. Kept as a lookup into site.brands — if a name is dropped
 *  from the public list it should disappear from here too. */
const relevantBrands = (names: string[]) =>
  names.filter((name) => site.brands.includes(name));

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
  lede: "You brought functional mushrooms to India. The next chapter is introducing them at scale — in the words of the people your customer already trusts.",

  // Hero jump links. Hrefs match the section ids in the component.
  contents: [
    { label: "The opportunity", href: "#opportunity" },
    { label: "Casting", href: "#casting" },
    { label: "What you get", href: "#outputs" },
    { label: "How we run it", href: "#process" },
    { label: "Guardrails", href: "#guardrails" },
    { label: "Packages", href: "#packages" },
  ],

  opportunity: {
    kicker: "01 / The opportunity",
    title: "You built the category. Now it gets an introduction.",
    sub: "Four things already true about Rooted Actives, and what each one opens up.",
    // Strength → what it makes possible. The `implication` line is the
    // point of each card. Note that all four start from something the
    // client has done well; see the tone note at the top of this file.
    notes: [
      {
        observation: "You got here first",
        note: "The brand that brought medicinal mushrooms to India, with two million customers behind it. That is a head start most challengers never get.",
        implication: "A lead worth compounding",
      },
      {
        observation: "Discovery happens on feeds",
        note: "Few people look up Lion's Mane by name — they meet it in someone's morning routine. A viewer who understands it before they click arrives ready to buy.",
        implication: "Creators are where it starts",
      },
      {
        observation: "Your proof deserves an audience",
        note: "USDA-organic, third-party tested every batch, 4.6 out of 5 across roughly 1,500 reviews. Proof like that travels furthest in someone else's voice.",
        implication: "Trust carries when it's told",
      },
      {
        observation: "Forty products, many ways in",
        note: "Brain, stamina, sleep, skin and immunity reach different people for different reasons. Each one deserves an audience of its own.",
        implication: "One roster, seven audiences",
      },
    ],
    // Closing statement on the section rather than a stat card — the
    // same treatment the other proposal pages use.
    statement: {
      value: "You built it.",
      label: "We'd like to help introduce it to the people who haven't met it yet.",
    },
  },

  casting: {
    kicker: "02 / Casting",
    title: "Cast for the reason someone starts.",
    sub: "Your customer feels a mid-afternoon slump. The ingredient is how you answer it.",
    // Product names are the client's own, so each archetype is visibly
    // tied to something they actually sell. Keep it that way — a
    // generic archetype list is the part of a pitch a brand skims.
    archetypes: [
      {
        label: "Doctors, nutritionists & dietitians",
        problem: "“Is this the real thing?”",
        products: "Mushroom Complex · Berberine · Ashwagandha",
        note: "The reassurance a first-time buyer looks for, from someone qualified to give it.",
      },
      {
        label: "Fitness & performance",
        problem: "“I stall on the last set.”",
        products: "Cordyceps · Power Beets · Power Reds",
        note: "A pre-workout that isn't another scoop of caffeine — the most demonstrable story in the range.",
      },
      {
        label: "Work & productivity",
        problem: "“Focus goes by mid-afternoon.”",
        products: "Lion's Mane · Brain Boost · mushroom coffee",
        note: "Desk-life and day-in-the-life creators. The widest audience in the catalogue.",
      },
      {
        label: "Beauty & skin",
        problem: "“Hair fall, dull skin.”",
        products: "Vegan collagen · Tremella",
        note: "Ingestible beauty, told from the inside out. The niche our own roster is strongest in.",
      },
      {
        label: "Sleep, stress & calm",
        problem: "“Still wired at midnight.”",
        products: "Reishi · Calm · Sleep Better",
        note: "High trust, and handled carefully — these scripts get our closest read.",
      },
      {
        label: "Food & recipe",
        problem: "“How do I actually take this?”",
        products: "Mushroom coffee · powders · honey sticks",
        note: "Answers the question every powder gets. Where repeat purchase begins.",
      },
      {
        label: "Regional language",
        // Set in Hindi on purpose: every other row quotes the customer's
        // own words, and the case for vernacular casting is better
        // demonstrated than described.
        problem: "“Yeh actually kaam karta hai?”",
        products: "Full catalogue",
        note: "Hindi belt first. Vernacular is where the category has the most room left to grow.",
      },
    ],
    // ⚠ HONEST FRAMING, DO NOT INFLATE. Our public roster carries no
    // health or fitness names. This block says what we genuinely have
    // and how the rest gets sourced. A science-forward brand will check.
    proven: {
      label: "What we hold today, and what we source",
      held: "Fashion, beauty and lifestyle creators are on our roster now — the archetype your collagen and Tremella range needs.",
      sourced: "Health, fitness, nutrition and regional-language casting is sourced against your brief and shortlisted with rate cards before anything is contracted.",
      // Adjacency argument, built from the public brand list so it can
      // never claim a logo the site does not.
      adjacencyLabel: "Closest category experience",
      energy: relevantBrands(["Red Bull", "Monster", "Hell"]),
      energyNote: "Energy and stamina — the same promise your Cordyceps and beet range makes.",
      fmcg: relevantBrands(["Garnier", "Coolberg", "Cornitos"]),
      fmcgNote: "Beauty and better-for-you FMCG — ingestible-benefit storytelling, already run.",
    },
  },

  // The two things the retainer produces. This section exists because
  // "influencer marketing" reads as one deliverable — posts — and half
  // of what Rooted Actives is buying here is ad creative they own. A
  // brand that only hears "posts" prices this against a reach buy.
  //
  // ⚠ THE TWO OUTPUTS ARE COMMERCIALLY DIFFERENT, keep them separated.
  // Creator posts borrow someone else's audience and expire from the
  // feed. UGC assets are licensed to the brand and keep working in a
  // performance account long after. Merging them into one figure is
  // what makes a proposal look like a reach buy.
  whatYouGet: {
    kicker: "03 / What you get",
    title: "Two outputs, not one.",
    sub: "Reach on their handles, and a library of ad creative on yours.",
    outputs: [
      {
        name: "Creator posts",
        where: "Live on the creator's handle",
        note: "Reach and credibility borrowed from an audience that already trusts the person talking. This is what introduces the category.",
        points: [
          "Reels, carousels and stories, to the brief",
          "Posted to the creator's own audience",
          "Disclosure handled per ASCI",
          "Amplifiable from the creator's handle",
        ],
      },
      {
        name: "UGC videos",
        where: "Yours to run anywhere",
        note: "Creator-shot, brand-owned footage built for paid media — an asset rather than a post. On a performance account, creative volume is usually the constraint long before budget is.",
        // The chain matters commercially: creators supply raw, the edit
        // is ours, and the client receives a finished product. Agencies
        // that hand over a drive of rushes call that a deliverable too,
        // so the difference has to be said rather than implied.
        points: [
          "Shot to your ad brief, in creator register",
          "Ready-to-run cuts plus the raw footage",
          "Creators send the raw; the editing is in-house",
          "Final product delivered by us, not by your team",
          "Hook and opener variants for testing",
          "Cast for craft, not follower count",
        ],
      },
    ],
    // Licence admin, stated upfront. An expired term on an asset still
    // running in an ad account is a real and avoidable exposure, and
    // saying so is more reassuring than leaving it unmentioned.
    // ⚠ AD LICENCE, not a blanket usage grant. The term covers running
    // the asset as advertising. If Rooted Actives also want it on the
    // website, the PDP or organic social, that is a separate grant and
    // has to be negotiated with the creator — do not let the copy imply
    // it is already included.
    note: "Every UGC asset is delivered with its ad licence term recorded, and we flag renewals before they lapse — so nothing you are still running quietly falls out of rights.",
  },

  process: {
    kicker: "04 / How we run it",
    title: "Sourcing to reporting, on one desk.",
    sub: "Six steps. You approve twice — the shortlist and the scripts.",
    steps: [
      {
        name: "Brief & cast",
        outcome: "A shortlist you approve",
        objective: "Map the range onto reasons to start, then cast the reason.",
        points: [
          "Product-to-audience map, signed off before outreach",
          "Shortlist with reach, rates and audience split",
          "Audience quality checked, not just follower count",
          "Category conflicts and past supplement deals flagged",
        ],
      },
      {
        name: "Contract & clear",
        outcome: "Everything in writing",
        objective: "Terms agreed before anyone picks up a camera.",
        points: [
          "Rates negotiated and paid by us",
          "Usage rights and term agreed upfront",
          "Category exclusivity where it's worth holding",
          "Delivery dates that hold against your launch calendar",
        ],
      },
      {
        name: "Script & pre-clear",
        outcome: "Claims checked before the shoot",
        objective: "Better to settle a claim at script stage than after it posts.",
        points: [
          "Hooks written to the reason, not the ingredient",
          "Every claim traced to your own label or dossier",
          "Compliance read before a camera is switched on",
          "Your approval on scripts — the second and last gate",
        ],
      },
      {
        name: "Shoot & ship",
        outcome: "Posted on schedule",
        objective: "Creator-led execution, quality-controlled by us.",
        points: [
          "Creator's own format and voice, kept intact",
          // The efficiency that makes bundling the two outputs work: one
          // call sheet, one creator, both deliverables.
          "Posts and UGC shot in the same session",
          "Raw in from creators, edited in-house by us",
          "Every cut reviewed before it goes live or ships",
          "Disclosure verified on the live post, not the draft",
        ],
      },
      {
        name: "Amplify",
        outcome: "Budget behind the winners",
        objective: "Let the posts that already work do more work.",
        points: [
          "Creator-handle amplification on the top performers",
          "Winning hooks re-cut for paid placements",
          "Best-performing assets handed to your performance team",
          "Spend follows evidence, never the plan",
        ],
      },
      {
        name: "Read & recast",
        outcome: "A decision, not a dashboard",
        objective: "Say what converted, who to re-book, what to retire.",
        points: [
          "Reporting per creator and per product",
          "Hook and retention read as an editorial decision",
          "Re-book, renegotiate or step away — stated plainly",
          "Next month's cast built from this month's evidence",
        ],
      },
    ],
  },

  guardrails: {
    kicker: "05 / Guardrails",
    title: "Your standards, built into the process.",
    // Describes our own commitments, not their exposure. The earlier
    // draft framed this section as what the client stood to lose, which
    // is the same information delivered as a warning.
    sub: "Nutraceutical claims in India sit under FSSAI and ASCI rules. We work inside those lines by default, so it never becomes something you have to check.",
    rules: [
      {
        rule: "No disease claims, ever",
        note: "“Supports focus” is sayable. “Treats”, “cures” and “prevents” are not — in any language or caption.",
      },
      {
        rule: "Claims come from your dossier",
        note: "We quote your label and your test data. We don't write new benefits for a creator to say.",
      },
      {
        rule: "Disclosure on every paid post",
        note: "ASCI-compliant, in the opening lines and visible without a tap.",
      },
      {
        rule: "Scripts cleared before the shoot",
        note: "A pre-clear costs an hour. A correction after posting costs a good deal more.",
      },
      {
        rule: "Claims stay inside the label",
        note: "We keep the framing to what your own testing supports, and leave the rest out.",
      },
      {
        rule: "One escalation route",
        note: "If something goes off-script once it's live, we hold the relationship and the correction. You hear it from us first.",
      },
    ],
  },

  packages: {
    kicker: "06 / Packages",
    title: "Three tracks. Same desk, different intensity.",
    sub: "What changes is the size of the cast and the depth of the read — never the standard of the work.",
    // ⚠ WHAT IS CONFIRMED AND WHAT IS NOT, as of 1 September 2026:
    //   · Seed's three figures (10–12 creators, 10–12 posts, 5–6 UGC)
    //     are Nikhil's numbers. Do not "tidy" them.
    //   · EVERY PRICE, including Seed's, is still a placeholder.
    //   · Scale and Category Lead figures are still placeholders, kept
    //     scaling off the old Seed draft — they will not be right until
    //     Nikhil gives them.
    // They are drafted to be credible for an Indian influencer-marketing
    // retainer of this shape. Set or confirm the rest before this URL is
    // sent. Same caution as the footnote in content/personal-brand.ts.
    //
    // ⚠ AGENCY FEE ONLY. Creator fees sit outside the retainer, which is
    // the honest structure for this service and the one the footnote
    // states. Folding creator cost into a headline price either caps the
    // cast or hides the margin, and both come apart on the call.
    //
    // ⚠ UGC AD LICENCE TERMS. Seed's 2 months is Nikhil's number. Scale's
    // 12 months and Category Lead's perpetual-on-flagships are still
    // mine and are now out of proportion to it — a 2 → 12 month jump is
    // a six-fold step where the price only doubles. Get those two
    // confirmed; a licence ladder is a real reason to move up a track,
    // but only if the steps are defensible on the call.
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
          { value: "10–12", label: "Creator posts" },
          { value: "5–6", label: "UGC videos" },
        ],
        // Ordered by what the client is buying, not by workflow: cast,
        // then the UGC output and its licence, then supporting work,
        // then admin and reporting last. A price card is skimmed from
        // the top, so the lines that justify the number lead. Keep the
        // same order on all three tracks — they are read side by side.
        includes: [
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
          // The call line is phrased identically on all three tracks so
          // cadence is the only thing that changes.
          //
          // ⚠ THE CADENCE LADDER HAS COLLAPSED. Seed's twice a month is
          // Nikhil's number, but Scale's "every 2 weeks" is the same
          // thing said differently, so the two tracks now offer an
          // identical cadence. Scale needs to move to weekly and
          // Category Lead beyond it, or drop cadence as a differentiator
          // altogether — leaving it as-is invites the question on the
          // call. "Twice a month" and not "bi-monthly": the latter reads
          // as both twice a month and every two months.
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
        for: "Reach every audience in the catalogue at once.",
        figures: [
          { value: "18–22", label: "Creators / month" },
          { value: "30–35", label: "Creator posts" },
          { value: "15–18", label: "UGC videos" },
        ],
        // Ordered by what the client is buying, not by workflow: cast,
        // then the UGC output and its licence, then supporting work,
        // then admin and reporting last. A price card is skimmed from
        // the top, so the lines that justify the number lead. Keep the
        // same order on all three tracks — they are read side by side.
        includes: [
          // ⚠ FIRST FOUR LINES ARE SEED'S, VERBATIM AND IN ORDER, so the
          // two cards line up when read side by side and Scale visibly
          // contains Seed. Change one here and change it in Seed too.
          { label: "Influencer casting sourced to brief" },
          { label: "UGC shot to your ad brief" },
          { label: "In-house editing — we deliver the final product" },
          { label: "Ready-to-run cuts plus raw footage" },
          // Scale's own, from here down.
          { label: "12-month ad licence" },
          { label: "Mid-tier casting alongside micro" },
          { label: "UGC hook and opener variants for testing" },
          { label: "Three credentialed experts — doctors, nutritionists" },
          { label: "Regional-language pod, Hindi first" },
          { label: "Creator-handle amplification setup" },
          { label: "Winning assets handed to your paid team" },
          { label: "Competitor and category monitoring" },
          { label: "Monthly report, per creator and per product" },
          // "every 2 weeks" rather than "fortnightly" or "bi-weekly" —
          // the latter reads as both "twice a week" and "every two
          // weeks", not an ambiguity to leave in a priced deliverable.
          { label: "Review call, every 2 weeks" },
        ],
      },
      {
        name: "Category Lead",
        price: "₹4,50,000",
        badge: null as string | null,
        for: "Be the name that answers the category when it's searched.",
        figures: [
          { value: "35–40", label: "Creators / month" },
          { value: "60–70", label: "Creator posts" },
          { value: "30–35", label: "UGC videos" },
        ],
        // Ordered by what the client is buying, not by workflow: cast,
        // then the UGC output and its licence, then supporting work,
        // then admin and reporting last. A price card is skimmed from
        // the top, so the lines that justify the number lead. Keep the
        // same order on all three tracks — they are read side by side.
        includes: [
          { label: "Macro casting and a standing expert panel" },
          { label: "A UGC library built month over month" },
          { label: "In-house editing — we deliver the final product" },
          { label: "Perpetual ad licence on flagship assets" },
          { label: "Always-on cadence plus launch moments" },
          { label: "Category exclusivity where it's worth holding" },
          { label: "Multi-language pods beyond Hindi" },
          { label: "Full amplification management" },
          { label: "Signature formats — a series, not one-offs" },
          { label: "Creative testing roadmap" },
          { label: "Dedicated campaign lead" },
          { label: "Review call, weekly" },
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
