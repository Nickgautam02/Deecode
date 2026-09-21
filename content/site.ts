// ────────────────────────────────────────────────────────────────
//  SITE CONTENT — edit this one file to change everything on the
//  website: brand name, contact details, stats, services, creators,
//  case studies and footer links. No other file needs touching.
// ────────────────────────────────────────────────────────────────

export type Creator = {
  name: string;
  niche: string;
  /** Display string, e.g. "217K". Case-insensitive K/M when sorted. */
  followers: string;
  platform: string;
  /** Human-readable place, shown on the site — a city, state or country. */
  location: string;
  /** Market, used for filtering. Must stay in step with `location`: a
   *  creator in "California" is market "USA". Filtering on `location`
   *  instead would silently drop anyone listed by city. */
  market: "USA" | "India" | "Dubai";
  /** File in public/creators/ — "" renders initials instead. */
  image: string;
};

/** One input in a contact form. `name` is the key posted to the sheet
 *  webhook — it must match a column the Apps Script writes. `label` is
 *  only used by the mailto fallback. */
export type ContactField = {
  name: string;
  label: string;
  placeholder: string;
  /** "textarea" and "select" render those elements; anything else is
   *  used verbatim as the input's `type` attribute. */
  kind: "text" | "email" | "tel" | "textarea" | "select";
  /** Required by kind "select", ignored otherwise. */
  options?: string[];
};

/** One of the two forms behind the contact toggle. */
export type ContactAudience = {
  id: string;
  /** Label on the toggle that picks this form. */
  tab: string;
  /** Chips inside the form; the chosen one lands in the sheet's Role column. */
  roles: string[];
  fields: ContactField[];
  /** The Apps Script web app this form posts to — each audience has its
   *  own deployment writing to its own spreadsheet. Empty falls back to
   *  opening the visitor's email client. */
  webhookUrl: string;
  submitLabel: string;
  /** Shown in place of the form once it has been submitted. */
  sentTitle: string;
  sentBody: string;
};

export const site = {
  // ← Replace with your real brand name
  name: "Deecode Media House",
  domain: "www.deecodemediahouse.com",
  tagline: "Influencer marketing & talent management agency",

  email: "deecode.mediahouse@gmail.com",
  phone: "+91 89370 66066",
  whatsapp: "https://wa.me/918937066066",
  address: "Technocity, Greater Noida, India",

  socials: {
    linkedin: "https://www.linkedin.com/company/deecode-media-house/",
  },

  // Root-relative so these resolve from sub-routes (/gallery, /portfolio/*)
  // as well as the homepage.
  nav: [
    // Straight to the deck, not to the homepage's #work section — the
    // full campaigns are the thing worth landing on, and #work already
    // links through to the same place for anyone reading the homepage.
    //
    // ⚠ /netflix-case-studies CARRIES `robots: { index: false }`, and a
    // sitewide nav link does not change that — the page's own metadata
    // decides. What it does change is that the URL is now reachable by
    // anyone on the site rather than only by someone we sent it to. That
    // is deliberate; see the note in app/netflix-case-studies/page.tsx
    // about whose numbers those are before making the page indexable too.
    { label: "Case studies", href: "/netflix-case-studies" },
    { label: "Services", href: "/#services" },
    { label: "Creators", href: "/#creators" },
    { label: "Gallery", href: "/gallery" },
    { label: "About", href: "/#about" },
    // Hiring is a route, not an anchor: it is the one page on this site
    // written for someone who wants to work here rather than hire us.
    { label: "Careers", href: "/careers" },
  ],

  hero: {
    kicker: "Influencer Marketing · Talent Management",
    // The word wrapped in [brackets] is rendered in the accent color
    headline: "We Don't Just Create Campaigns.\nWe Create [Brand Momentum].",
    sub: "From first brief to millions of views — we build digital stars and run creator campaigns that drive massive, measurable brand growth.",
    primaryCta: { label: "Let's Talk", href: "#contact" },
    secondaryCta: { label: "Explore our services", href: "#services" },
  },

  stats: [
    { value: 600, suffix: "+", label: "Creator roster", decimals: 0 },
    { value: 100, suffix: "+", label: "Campaigns delivered", decimals: 0 },
    { value: 10, suffix: "M+", label: "Views generated", decimals: 0 },
    { value: 80, suffix: "+", label: "Brand partners", decimals: 0 },
  ],

  // Logos strip under the hero
  brands: [
    "Garnier",
    "Monster",
    "Red Bull",
    "Polka Pop",
    "Red Bus",
    "Jio Saavn",
    "Commudle",
    "Qoneqt",
    "Coolberg",
    "Hell",
    "Cornitos",
    "Hilary Rhoda",
    "Ixigo",
    "Vedorra",
  ],

  services: [
    {
      title: "Influencer Marketing",
      description:
        "End-to-end creator campaigns — from shortlisting the right faces to reporting the numbers that matter.",
      points: [
        "Creator discovery & matchmaking",
        "Campaign strategy & execution",
        "Performance analytics & reporting",
      ],
    },
    {
      title: "Talent Management",
      description:
        "We manage careers, not just deals. Long-term growth plans for every creator on our roster.",
      points: [
        "Brand deal negotiation",
        "Career & content strategy",
        "IP, merch & monetisation",
      ],
    },
    {
      title: "Content Production",
      description:
        "Studio-grade content creation for brands and creators - from concept to final cut. We make content that stops thumbs and starts conversations.",
      points: [
        "Concept development & scripting",
        "End-to-end video production",
        "Multi-platform editing & packaging",
      ],
    },
    {
      title: "Brand Strategy",
      description:
        "We go beyond likes and views - building narratives that drive real business outcomes. Strategy-first, always.",
      points: [
        "Social media strategy",
        "Audience & trend intelligence",
        "ROI-driven media planning",
      ],
    },
    {
      title: "Website Creation",
      description:
        "High-converting websites for brands and creators — designed, built and launched end-to-end. Fast, beautiful and made to turn visitors into customers.",
      points: [
        "Custom design & development",
        "Landing pages & brand sites",
        "SEO, performance & maintenance",
      ],
    },
  ],

  // image: file in public/creators/ — leave "" to show initials instead
  creators: [
    { name: "Chhoti Philim", niche: "Comedy", followers: "1M", platform: "Instagram", location: "India", market: "India", image: "/creators/choti-philim.jpg" },
    { name: "The Ass Tag", niche: "Comedy", followers: "3.83M", platform: "YouTube", location: "India", market: "India", image: "/creators/the-ass-tag.jpg" },
    { name: "Ridey Behl", niche: "Comedy", followers: "260K", platform: "Instagram", location: "India", market: "India", image: "/creators/ridey-behl.jpg" },
    { name: "Megi Mali", niche: "Lifestyle & Tech", followers: "217K", platform: "Instagram", location: "USA", market: "USA", image: "/creators/megi-mali.jpg" },
    { name: "Nick", niche: "Tech", followers: "300K", platform: "Instagram", location: "USA", market: "USA", image: "/creators/nick.jpg" },
    { name: "Raman Yadav", niche: "Sketches", followers: "1.5M", platform: "Instagram", location: "India", market: "India", image: "/creators/raman-yadav.jpg" },
    { name: "Matthew A.", niche: "Lifestyle & Tech", followers: "178K", platform: "Instagram", location: "USA", market: "USA", image: "/creators/matthew-a.jpg" },
    { name: "Sonam Pirani", niche: "Fashion & Beauty", followers: "120K", platform: "Instagram", location: "Dubai", market: "Dubai", image: "/creators/sonam-pirani.jpg" },
    { name: "Gauri Bhasin", niche: "Fashion & Lifestyle", followers: "150K", platform: "Instagram", location: "India", market: "India", image: "/creators/gauri-bhasin.jpg" },

    // US tech roster. Names and follower counts exactly as supplied; avatars
    // were pulled from each public profile. The Instagram pair are 100x100 —
    // Instagram serves no larger rendition to logged-out clients — which is
    // the same size as the rest of this list and ample at display size.
    { name: "fatihlabs", niche: "Tech", followers: "95.6K", platform: "Instagram", location: "California", market: "USA", image: "/creators/fatihlabs.jpg" },
    { name: "soojintech", niche: "Tech", followers: "70.2K", platform: "Instagram", location: "New York", market: "USA", image: "/creators/soojintech.jpg" },
    { name: "KuyikBassey", niche: "Tech", followers: "5.1K", platform: "YouTube", location: "USA", market: "USA", image: "/creators/kuyikbassey.jpg" },
    { name: "A1 republic", niche: "Tech", followers: "1.72K", platform: "YouTube", location: "USA", market: "USA", image: "/creators/a1-republic.jpg" },
  ] satisfies Creator[],

  about: {
    // The words wrapped in [brackets] are rendered in the accent color
    heading: "Where brands meet the [creator economy].",
    body: "Deecode Media House connects ambitious brands with a network of 600+ creators across India, the USA and Dubai. From Garnier to Red Bull to Ixigo, we've turned briefs into 10M+ views by matching the right voices to the right audiences — and backing every campaign with strategy, production muscle and numbers that hold up in the boardroom.",
    pillars: [
      {
        title: "Right creator, right audience",
        text: "Data-led matchmaking across niches and geographies — no spray-and-pray influencer lists.",
      },
      {
        title: "Results you can measure",
        text: "Clear KPIs, transparent reporting and campaigns judged by business impact, not vanity metrics.",
      },
      {
        title: "Everything under one roof",
        text: "Strategy, talent, production and distribution handled end-to-end — one team, zero hand-offs.",
      },
    ],
  },

  contact: {
    // The word wrapped in [brackets] is rendered in the accent color
    heading: "Let's build something [massive].",
    sub: "Tell us whether you're a brand looking to scale or a creator ready to go pro — we'll get back within 24 hours.",

    // ── Two forms, one section ──
    // Brands (and website enquiries) fill the first; creators and
    // everyone else fill the second. A toggle at the top of the card
    // swaps between them so each audience only sees the fields that
    // apply to it.
    //
    // Both post to the one webhook below, and the Apps Script files them
    // into two different spreadsheets based on `id` — so renaming an id
    // means editing that script too.
    //
    // `roles` are the chips inside a form, and the chosen one lands in
    // the sheet's Role column. Keep those four strings exactly as they
    // are: rows are already filed under them.
    //
    // `fields` drive the inputs, in order. A field's `name` is the key
    // the Apps Script reads, so a new name needs a new column there too
    // (see scripts/google-apps-script.gs).
    audiences: [
      {
        id: "brand",
        tab: "Brand / business",
        roles: ["I'm a Brand", "I need a website"],
        // The standalone brand script (scripts/google-apps-script.gs),
        // writing to the "Deecode Brands" spreadsheet.
        webhookUrl:
          "https://script.google.com/macros/s/AKfycbyV5AmvtaBVbRJxal1v9L7pCKNxNoqp5TBLSM6g5qSEzvLchpTkXsPLPsyO0ONitRZCOw/exec",
        submitLabel: "Send brief",
        sentTitle: "Brief received 🎉",
        sentBody:
          "Thanks — we'll come back with a plan and a shortlist of creators within 24 hours.",
        fields: [
          { name: "name", label: "Name", placeholder: "Your name", kind: "text" },
          {
            name: "email",
            label: "Work email",
            placeholder: "Work email address",
            kind: "email",
          },
          {
            name: "phone",
            label: "Phone",
            placeholder: "Phone / WhatsApp number",
            kind: "tel",
          },
          {
            name: "company",
            label: "Brand",
            placeholder: "Brand or company name",
            kind: "text",
          },
          {
            name: "profile",
            label: "Website / handle",
            placeholder: "Website or Instagram handle",
            kind: "text",
          },
          {
            name: "budget",
            label: "Budget",
            placeholder: "Budget range",
            kind: "select",
            options: [
              "Under ₹1 lakh",
              "₹1–3 lakh",
              "₹3–10 lakh",
              "₹10 lakh+",
              "Not sure yet",
            ],
          },
          {
            name: "message",
            label: "Brief",
            placeholder: "What are you launching? Product, timeline, platforms…",
            kind: "textarea",
          },
        ],
      },
      {
        id: "creator",
        tab: "Creator / other",
        roles: ["I'm a Creator", "Something else"],
        // The original deployment, bound to the "Deecode" spreadsheet.
        // Unchanged, and now only ever sees creator submissions.
        webhookUrl:
          "https://script.google.com/macros/s/AKfycbxMk9YOMH3WNzs-6mb1PG9XXwQYwY2bReNNElV5bNfqxzjOD_MVw6JcS13BKzRgvuh-1A/exec",
        submitLabel: "Send message",
        sentTitle: "Message sent 🎉",
        sentBody: "Thanks for reaching out — we'll get back to you within 24 hours.",
        fields: [
          { name: "name", label: "Name", placeholder: "Your name", kind: "text" },
          {
            name: "email",
            label: "Email",
            placeholder: "Email address",
            kind: "email",
          },
          {
            name: "phone",
            label: "Phone",
            placeholder: "Phone / WhatsApp number",
            kind: "tel",
          },
          {
            name: "profile",
            label: "Profile",
            placeholder: "Your profile link (Instagram / YouTube)",
            kind: "text",
          },
          {
            name: "message",
            label: "Goal",
            placeholder: "Tell us about your goals…",
            kind: "textarea",
          },
        ],
      },
    ] satisfies ContactAudience[],
  },
};

export type Site = typeof site;
