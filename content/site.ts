// ────────────────────────────────────────────────────────────────
//  SITE CONTENT — edit this one file to change everything on the
//  website: brand name, contact details, stats, services, creators,
//  case studies and footer links. No other file needs touching.
// ────────────────────────────────────────────────────────────────

export const site = {
  // ← Replace with your real brand name
  name: "Deecode Media House",
  domain: "www.deecodemediahouse.com",
  tagline: "Influencer marketing & talent management agency",

  email: "deecode.mediahouse@gmail.com",
  phone: "+91 95360 81111",
  whatsapp: "https://wa.me/919536081111",
  address: "Technocity, Greater Noida, India",

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
    secondaryCta: { label: "Explore our services", href: "#services" },
  },

  stats: [
    { value: 600, suffix: "+", label: "Creator roster", decimals: 0 },
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
    { name: "Choti Philim", niche: "Comedy", followers: "1M", platform: "Instagram", location: "India", image: "/creators/choti-philim.jpg" },
    { name: "The Ass Tag", niche: "Comedy", followers: "3.83M", platform: "YouTube", location: "India", image: "/creators/the-ass-tag.jpg" },
    { name: "Ridey Behl", niche: "Comedy", followers: "260K", platform: "Instagram", location: "India", image: "/creators/ridey-behl.jpg" },
    { name: "Megi Mali", niche: "Lifestyle & Tech", followers: "217K", platform: "Instagram", location: "USA", image: "/creators/megi-mali.jpg" },
    { name: "Nick", niche: "Tech", followers: "300K", platform: "Instagram", location: "USA", image: "/creators/nick.jpg" },
    { name: "Raman Yadav", niche: "Sketches", followers: "1.5M", platform: "Instagram", location: "India", image: "/creators/raman-yadav.jpg" },
    { name: "Matthew A.", niche: "Lifestyle & Tech", followers: "178K", platform: "Instagram", location: "USA", image: "/creators/matthew-a.jpg" },
    { name: "Sonam Pirani", niche: "Fashion & Beauty", followers: "120K", platform: "Instagram", location: "Dubai", image: "/creators/sonam-pirani.jpg" },
    { name: "Gauri Bhasin", niche: "Fashion & Lifestyle", followers: "150K", platform: "Instagram", location: "India", image: "/creators/gauri-bhasin.jpg" },
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
    // The words wrapped in [brackets] are rendered in the accent color
    heading: "Where brands meet the [creator economy].",
    body: "Deecode Media House connects ambitious brands with a network of 600+ creators across India, the USA and Dubai. From Garnier to Red Bull to Ixigo, we've turned briefs into 2B+ views by matching the right voices to the right audiences — and backing every campaign with strategy, production muscle and numbers that hold up in the boardroom.",
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
    roles: ["I'm a Brand", "I'm a Creator", "Something else"],

    // ── Google Sheet integration ──
    // Submissions are appended to the "Deecode" spreadsheet via a Google
    // Apps Script web app (see scripts/google-apps-script.gs for the code
    // and setup steps). Paste the deployed web-app URL (ends in /exec)
    // below. While it's empty, the form falls back to opening the
    // visitor's email client instead.
    sheetWebhookUrl:
      "https://script.google.com/macros/s/AKfycbxMk9YOMH3WNzs-6mb1PG9XXwQYwY2bReNNElV5bNfqxzjOD_MVw6JcS13BKzRgvuh-1A/exec",
  },
};

export type Site = typeof site;
