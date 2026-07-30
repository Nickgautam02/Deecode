// ────────────────────────────────────────────────────────────────
//  MIT GROUP PROPOSAL PAGE CONTENT — everything rendered at
//  /portfolio/MIT lives in this file. Mirrors the credentials deck
//  in "Portfolio MIT/Deecode Media House - MIT Group Proposal.dc.html".
//
//  ⚠ UNVERIFIED FIGURES: the metrics under `events.stats` are carried over
//  from the deck and are not sourced from anything in this repo. Confirm or
//  remove before sharing the link outside Deecode.
//
//  ⚠ `commercials` puts pricing on a URL. The route is noindexed, but a
//  link can still be forwarded. Delete the key to drop the section —
//  the page renders it only if present.
//
//  Named team members are deliberately omitted; roles are listed
//  instead. Add names if MIT asks for them.
//
//  Headline credentials stats come from content/site.ts so the page can
//  never contradict the rest of the website.
// ────────────────────────────────────────────────────────────────

export const mitProposal = {
  client: "MIT Group of Institutions",
  kicker: "Credentials & proposal",
  issued: "Brief issued 22 July 2026",
  deadline: "Response by 31 July 2026",

  intro:
    "A full-service response to the multi-institution brand mandate — one partner across all seven units, with the flexibility to run unit-specific and group-wide campaigns.",

  // Section 3 of the brief — we are pitching for all five
  scope: [
    {
      title: "Brand identity & guidelines",
      description:
        "Logo restructuring and a unified visual identity system that holds across seven very different units.",
      points: [
        "Logo refinement and unit lockups",
        "Brand voice, tone, typography and colour guidelines",
        "Newspaper, OOH, print and digital placement creative",
      ],
    },
    {
      title: "Promotional campaigns & performance marketing",
      description:
        "Admission-drive and brand campaigns, run on Meta and Google with the numbers reported back per unit.",
      points: [
        "Campaign creative for admission drives and brand promotions",
        "Student testimonials and professor-led podcasts",
        "Awareness, lead-generation and follower-growth campaigns",
      ],
    },
    {
      title: "Event collateral, design & execution",
      description:
        "Our deepest education-sector track record — end-to-end collateral plus a design team on the ground through install and show day.",
      points: [
        "End-to-end collateral for admissions, campus and brand events",
        "On-ground design execution and production support",
        "Vendor and fabrication management, local to each campus",
      ],
    },
    {
      title: "Video / audio production & social media management",
      description:
        "Shooting, editing and post for events and campaigns, plus day-to-day management of every unit page.",
      points: [
        "Event and campaign shoots, edited for every platform",
        "All unit pages across Meta, LinkedIn and YouTube",
        "Content calendars and community management",
      ],
    },
    {
      title: "Website, landing pages & direct marketing",
      description:
        "Websites and admissions funnels built to convert interest into applications, then measured.",
      points: [
        "Website design, development and content",
        "Admissions and promotional landing pages and microsites",
        "Email and WhatsApp campaigns with automation",
      ],
    },
  ],

  // The brief prefers prior education-sector event experience, so this
  // gets the most detailed treatment on the page.
  // TODO(real events): swap in the exact event names, months and scale.
  events: {
    blurb:
      "The brief prefers agencies with prior education-sector event experience. Ours is at Galgotias Educational Institutions — across three faculties and three admission seasons, designing every asset, releasing print-ready files to vendors, and putting a design team on site through install and show day.",
    // TODO(real numbers): confirm with the Galgotias team.
    stats: [
      { value: "20+", label: "Events run on site" },
      { value: "85+", label: "Collateral assets produced" },
      { value: "100%", label: "On-time delivery" },
    ],
    cases: [
      {
        name: "Convocation & degree ceremony",
        meta: "Oct 2024 · 5,000+ guests",
        onSite: "Stage backdrop and LED screen graphics, dais branding, media wall, directional signage",
        collateral: "Degree folders, citation booklets, the invite suite and programme booklets",
      },
      {
        name: "Annual cultural fest",
        meta: "Apr 2025 · 3 days",
        onSite: "Main stage and sponsor branding, entry gates, campus-wide wayfinding",
        collateral: "Fest identity, artist announcement creatives, entry passes and wristbands",
      },
      {
        name: "Techfest & hackathon",
        meta: "May 2025 · inter-college",
        onSite: "Venue branding, leaderboard and results graphics, prize-ceremony stage",
        collateral: "Problem-statement kits, participant badges, certificates, winners' recap reel",
      },
      {
        name: "Drone & robotics competition",
        meta: "Dec 2024 · inter-college",
        onSite:
          "Flight arena and robotics pit branding, safety enclosure, team bays, judging desks and spectator-stand signage",
        collateral:
          "Per-category capability and limit spec boards, team registration kits, scoreboards, certificates and the recap film",
      },
    ],
  },

  // Colleges already on the roster — shown as a credentials strip.
  colleges: ["Galgotias Educational Institutions", "Gautam Buddha University", "GNIOT"],

  // One reference case study per scope area, mirroring the deck.
  // Text only — no imagery, no figures and no client name in this section.
  requirements: [
    {
      num: "01",
      title: "Brand identity & guidelines",
      summary:
        "A unified visual identity system rolled out across three faculties — refreshed logo lockups, brand voice guidelines and consistent creative for newspaper, OOH, print and digital placements ahead of the admissions season.",
    },
    {
      num: "02",
      title: "Promotional campaigns & performance marketing",
      summary:
        "“Meet Your Batch” — a multi-campus admissions campaign pairing student-testimonial content, professor-led podcasts and paid social to drive applications across three faculties ahead of intake.",
    },
    {
      num: "04",
      title: "Video / audio production & social media management",
      summary:
        "Shooting, editing and posting for the unit pages across Meta, LinkedIn and YouTube — student vlogs, faculty interviews and event recaps run on a consistent content calendar.",
    },
    {
      num: "05",
      title: "Website, landing pages & direct marketing",
      summary:
        "Admissions landing pages and email/WhatsApp campaigns built to convert interest into applications — from faculty-specific microsites to automated nurture sequences ahead of counselling.",
    },
  ],

  // Segment-wise, as the brief's submission checklist requires.
  // ⚠ Pricing on a URL — see the file header. Delete this key to remove
  // the section from the page entirely.
  commercials: {
    note: "Indicative only — to be finalised against confirmed scope, unit count and engagement term.",
    footnote:
      "Prices may vary depending on requirements. Final figures are quoted once scope, unit count and event calendar are confirmed.",
    rows: [
      {
        scope: "Brand identity & guidelines",
        model: "One-time project fee",
        price: "₹3–5L",
      },
      {
        scope: "Promotional campaigns & performance marketing",
        model: "Monthly retainer",
        price: "₹6–7L/mo",
      },
      {
        scope: "Event collateral, design & execution",
        model: "Per-event fee",
        // Not a figure — events are too scale-dependent to range usefully.
        // Non-₹ values render as a label rather than a price (see page.tsx).
        price: "On event scale",
      },
      {
        scope: "Video / audio production & social media management",
        model: "Monthly retainer",
        price: "₹2–5L/mo",
      },
      {
        scope: "Website, landing pages & direct marketing",
        model: "One-time build + monthly support",
        price: "₹4–5L + ₹50K/mo",
      },
    ],
  },

  // Education-sector credentials. Deliberately no reach/lead figures —
  // add them here only once they can be evidenced.
  education: [
    {
      client: "Galgotias Educational Institutions",
      sector: "Multi-faculty university",
      summary:
        "Unified identity across three faculties, the \"Meet Your Batch\" admissions campaign, and event design and execution through three admission seasons.",
    },
    {
      client: "Gautam Buddha University",
      sector: "Higher education",
      summary:
        "Schools-wide admissions and brand-awareness work combining faculty-led research features and placement-outcome stories across engineering, management and law.",
    },
    {
      client: "GNIOT",
      sector: "Engineering education",
      summary:
        "Engineering-admissions campaign built on student project showcases, hackathon wins and recruiter testimonials, driving counselling walk-ins through peak season.",
    },
  ],

  process: [
    {
      title: "Discover",
      description:
        "Audit each unit's brand, audience and competitors; agree a group-wide voice and unit-specific goals.",
    },
    {
      title: "Build",
      description:
        "Develop the identity system, guidelines, website and campaign assets — reviewed with each unit before rollout.",
    },
    {
      title: "Launch",
      description:
        "Run admissions and awareness campaigns, events and content calendars across every channel.",
    },
    {
      title: "Report",
      description:
        "Track leads, reach and engagement per unit and group-wide, with monthly reporting against agreed KPIs.",
    },
  ],

  // Structure and size, per the brief's submission checklist.
  // TODO: add the named people against each role before sending — the brief
  // asks for "key people with their designations".
  team: {
    size: "A dedicated pod of eight, backed by the full collective",
    howItWorks:
      "One account lead is your single point of contact for all seven units — you never have to work out who to call. The pod below is assigned to this mandate full-time; the wider studio scales in for event weeks and peak admission season.",
    roles: [
      {
        title: "Account & Strategy Lead",
        owns: "Your single point of contact. Owns the brief, the campaign calendar and the monthly report.",
      },
      {
        title: "Creative Director",
        owns: "Identity, campaign concepts and final creative sign-off, so all seven units stay on one brand.",
      },
      {
        title: "Performance Marketing Lead",
        owns: "Meta and Google campaigns, budget split across units and courses, and lead quality.",
      },
      {
        title: "Influencer & Talent Lead",
        owns: "Creator and student-ambassador selection, briefing, negotiation and delivery.",
      },
      {
        title: "Video Producer",
        owns: "Shoots, edits and post for events and campaigns, including the on-ground crew.",
      },
      {
        title: "Web & Landing Page Lead",
        owns: "Websites, admissions landing pages, microsites and the tracking behind them.",
      },
      {
        title: "Social Media Manager",
        owns: "Content calendars, daily publishing and community management across every unit page.",
      },
      {
        title: "Client Servicing — Education",
        owns: "Day-to-day coordination with each unit's marketing contact and approvals.",
      },
    ],
  },

  close: {
    headline: "Let's build MIT Group's next chapter of brand growth.",
    body: "We're ready to walk through credentials, case studies and commercials in more depth — and to start with a pilot unit if that's a better first step.",
  },
} as const;
