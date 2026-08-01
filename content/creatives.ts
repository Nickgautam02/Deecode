// ────────────────────────────────────────────────────────────────
//  CREATIVES — designed work (identity marks, posters, campaign and social
//  creative, print and OOH). Distinct from content/gallery.ts, which is
//  photography and film of events as they happened.
//
//  TO ADD ONE:
//    1. Drop the file in public/creatives/ — a descriptive kebab-case name,
//       not IMG_2043.jpg. Any aspect ratio is fine.
//    2. Read its real pixel size:  sips -g pixelWidth -g pixelHeight <file>
//    3. Add an entry below. `w`/`h` must be the true dimensions — the
//       masonry reserves space from them, so a wrong pair shifts the layout
//       when the image loads.
//
//  Entries in `creatives.items` show on /portfolio/MIT, the client's URL.
//  The section is skipped entirely while the list is empty.
// ────────────────────────────────────────────────────────────────

export type Creative = {
  src: string;
  w: number;
  h: number;
  title: string;
  tag: string;
  // "video" renders an MP4 player instead of an image. Defaults to image.
  kind?: "image" | "video";
};

export type CreativesContent = {
  kicker: string;
  title: string;
  sub: string;
  items: readonly Creative[];
};

export const creatives: CreativesContent = {
  kicker: "Selected creatives",
  title: "The design work itself.",
  sub: "Identity marks, campaign creative and event collateral — the pieces our design team drew, not photographs of them in use.",

  // Ordered identity → campaign → posters → sponsor → collateral → motion,
  // so the section opens on the marks and ends on the moving pieces rather
  // than reading as an unsorted dump.
  //
  // Titles describe what is visible on each piece. Several carry a "Ct
  // Creative Team" badge — if that is not our mark, say so and they come
  // straight back out, since this page presents what it shows as our work.
  items: [
    // ── Identity ──
    {
      src: "/creatives/mun-identity-mark.jpg",
      w: 1280,
      h: 1078,
      title: "Galgotias International MUN — identity mark",
      tag: "Identity",
    },
    {
      src: "/creatives/mun-identity-mark-reversed.jpg",
      w: 1600,
      h: 1350,
      title: "Galgotias International MUN — reversed mark for dark grounds",
      tag: "Identity",
    },
    {
      src: "/creatives/gimun-24-emblem.jpg",
      w: 1080,
      h: 1080,
      title: "GIMUN '24 — “Quam Artibus” emblem",
      tag: "Identity",
    },

    // ── Campaign & announcements ──
    {
      src: "/creatives/creators-hackathon-banner.jpg",
      w: 1280,
      h: 720,
      title: "Galgotias Creators Hackathon — event banner",
      tag: "Event branding",
    },
    {
      src: "/creatives/unifest-akhil-sachdeva-poster.jpg",
      w: 1080,
      h: 1080,
      title: "Unifest — Akhil Sachdeva artist announcement",
      tag: "Artist announcement",
    },
    {
      src: "/creatives/unifest-javed-ali-poster.jpg",
      w: 1080,
      h: 1080,
      title: "Unifest — Javed Ali artist announcement",
      tag: "Artist announcement",
    },
    {
      src: "/creatives/unifest-24-create-a-thon.jpg",
      w: 1080,
      h: 1080,
      title: "Unifest '24 — Create-A-Thon registrations open",
      tag: "Campaign creative",
    },

    // ── Event posters ──
    {
      src: "/creatives/prom-night-2024-poster.jpg",
      w: 720,
      h: 1280,
      title: "Prom Night 2024 — registration poster",
      tag: "Event poster",
    },
    {
      src: "/creatives/club-carnival-meme-day-poster.jpg",
      w: 720,
      h: 1280,
      title: "Club Carnival — Meme Day poster",
      tag: "Event poster",
    },
    {
      src: "/creatives/rangmanch-stageplay-poster.jpg",
      w: 959,
      h: 1280,
      title: "Rangmanch — stageplay and monoact poster",
      tag: "Event poster",
    },

    // ── Sponsor & partner creative ──
    {
      src: "/creatives/unifest-24-beverage-partner.jpg",
      w: 1080,
      h: 1080,
      title: "Unifest '24 — beverage partner announcement",
      tag: "Sponsor creative",
    },
    {
      src: "/creatives/gimun-garnier-collaboration.jpg",
      w: 591,
      h: 1004,
      title: "GIMUN — Garnier collaboration announcement",
      tag: "Sponsor creative",
    },

    // ── Printed collateral ──
    {
      src: "/creatives/gimun-committee-standees.jpg",
      w: 1600,
      h: 1280,
      title: "GIMUN 2024 — committee standees for UNGA, UNHRC, AIPPM, UNSC and IP",
      tag: "Event collateral",
    },
    {
      src: "/creatives/gimun-24-organising-committee-badge.jpg",
      w: 900,
      h: 1600,
      title: "GIMUN '24 — organising committee badge",
      tag: "Event collateral",
    },
    {
      src: "/creatives/aktu-sports-fest-2024-cover.jpg",
      w: 851,
      h: 315,
      title: "AKTU Sports Fest 2024 — cover banner",
      tag: "Event branding",
    },

    // ── Motion ──
    {
      src: "/creatives/freshers-welcome-party-reel.mp4",
      w: 576,
      h: 1024,
      title: "Freshers' welcome party, December 2024 — promo film",
      tag: "Motion",
      kind: "video",
    },
    {
      // 1072×112 is the file's real shape, read off the MP4 header — a banner
      // strip, not a bad export. The section gives anything past 4:1 the full
      // page width, or this would render 30-odd pixels tall.
      src: "/creatives/aarambh-title-strip.mp4",
      w: 1072,
      h: 112,
      title: "Aarambh — animated title strip",
      tag: "Motion",
      kind: "video",
    },
  ],
};

// Staging list — everything live, plus anything being trialled before it
// reaches the client's URL. Add unconfirmed pieces here, review them at
