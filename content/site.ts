// ────────────────────────────────────────────────────────────────
//  SITE CONTENT — edit this one file to change everything on the
//  website: brand name, contact details, stats, services, creators,
//  case studies and footer links. No other file needs touching.
// ────────────────────────────────────────────────────────────────

export const site = {
  // ← Replace with your real brand name
  name: "Deecode Media House",
  domain: "deecode.in",
  tagline: "Influencer marketing & talent management agency",

  email: "deecode.mediahouse@gmail.com",
  phone: "+91 95360 81111",
  whatsapp: "https://wa.me/919536081111",
  address: "B-104, Proview Technocity, Chi V, Greater Noida, India",

  socials: {
    linkedin: "https://www.linkedin.com/company/deecode-media-house/",
  },

  nav: [
    { label: "Services", href: "#services" },
    { label: "Creators", href: "#creators" },
    { label: "About", href: "#about" },
  ],

  hero: {
    kicker: "Influencer Marketing · Talent Management",
    // The word wrapped in [brackets] is rendered in the accent color
    headline: "We Don't Just Create Campaigns.\nWe Create [Brand Momentum].",
    sub: "From first brief to billion views — we build digital stars and run creator campaigns that drive massive, measurable brand growth.",
    primaryCta: { label: "Let's Talk", href: "#contact" },
    secondaryCta: { label: "Explore our work", href: "#services" },
  },

  stats: [
    { value: 600, suffix: "+", label: "Creators managed", decimals: 0 },
    { value: 100, suffix: "+", label: "Campaigns delivered", decimals: 0 },
    { value: 2, suffix: "B+", label: "Views generated", decimals: 0 },
    { value: 80, suffix: "+", label: "Brand partners", decimals: 0 },
  ],

  // Logos strip under the hero
  brands: [
    "Garnier",
    "Monster",
    "Red Bull",
    "Polka Pop",
    "Red Bus",
    "Jio Saavan",
    "Commudle",
    "Qoneqt",
    "Coolberg",
    "Hell",
    "Cornitos",
    "Hilary Rhoda",
    "Ixigo",
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
  ],

  creators: [
    { name: "Megi Mali", niche: "Lifestyle & Tech", followers: "217K", platform: "Instagram", location: "USA" },
    { name: "Nick", niche: "Tech", followers: "300K", platform: "Instagram", location: "Texas" },
    { name: "Raman Yadav", niche: "Sketches", followers: "1.5M", platform: "Instagram", location: "India" },
    { name: "Matthew A.", niche: "Lifestyle & Tech", followers: "178K", platform: "Instagram", location: "Texas" },
    { name: "The Ass Tag", niche: "Comedy", followers: "3.83M", platform: "YouTube", location: "India" },
    { name: "Choti Philim", niche: "Comedy", followers: "1M", platform: "Instagram", location: "India" },
    { name: "Sonam Pirani", niche: "Fashion & Beauty", followers: "120K", platform: "Instagram", location: "Dubai" },
    { name: "Gauri Bhasin", niche: "Fashion & Lifestyle", followers: "150K", platform: "Instagram", location: "India" },
  ],

  caseStudies: [
    {
      brand: "FinPeak",
      category: "Fintech · Performance Campaign",
      title: "50M+ views in 45 days for a fintech launch",
      description:
        "A 40-creator finance squad took FinPeak's new investing app from unknown to unmissable — short-form explainers, long-form deep dives and a viral challenge that made investing feel simple.",
      metrics: [
        { value: "50M+", label: "Views" },
        { value: "12x", label: "ROAS" },
        { value: "40+", label: "Creators" },
      ],
    },
    {
      brand: "TuneVerse Records",
      category: "Music Label · Creator Growth",
      title: "120M views across three artist launches",
      description:
        "We paired a leading music label with our dance and music roster to launch three artists in six months — choreography trends, creator remixes and fan-first content that kept every drop trending.",
      metrics: [
        { value: "120M", label: "Views" },
        { value: "2.1M", label: "Subscribers gained" },
        { value: "3", label: "Chart-topping launches" },
      ],
    },
  ],

  about: {
    heading: "The team behind the momentum.",
    body: "Deecode Media House is where brands and creators build together. With a network of 600+ creators across India, the USA and Dubai, we've delivered 100+ campaigns and 2B+ views for brands like Garnier, Red Bull and Ixigo — pairing sharp strategy with content people actually want to watch. One rule drives everything: every view has to work as hard as we do.",
    pillars: [
      {
        title: "Creator-first",
        text: "We grow people, not just channels. Long-term careers beat one-off virality.",
      },
      {
        title: "Performance-obsessed",
        text: "Every campaign ships with clear KPIs, live dashboards and honest reporting.",
      },
      {
        title: "Full-stack",
        text: "Strategy, talent, production and distribution under one roof — no hand-offs.",
      },
    ],
  },

  contact: {
    heading: "Let's build something massive.",
    sub: "Tell us whether you're a brand looking to scale or a creator ready to go pro — we'll get back within 24 hours.",
    roles: ["I'm a Brand", "I'm a Creator", "Something else"],

    // ── Google Sheet integration ──
    // Submissions are appended to the "Deecode" spreadsheet via a Google
    // Apps Script web app (see scripts/google-apps-script.gs for the code
    // and setup steps). Paste the deployed web-app URL (ends in /exec)
    // below. While it's empty, the form falls back to opening the
    // visitor's email client instead.
    sheetWebhookUrl:
      "https://script.google.com/macros/s/AKfycbwZWaEFsTo91xl9vsf9J0tMBICMWliCFJZpVn92IZCmnq-C5W6V-uwkT190xy5_STF4lg/exec",
  },
};

export type Site = typeof site;
