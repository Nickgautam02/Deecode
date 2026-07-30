// ────────────────────────────────────────────────────────────────
//  GALLERY CONTENT — everything rendered at /gallery.
//
//  Assets live in public/gallery/, copied from ~/Desktop/Deecode Images.
//  `w`/`h` are the real intrinsic dimensions, passed to next/image so the
//  masonry columns reserve the right space and nothing shifts on load.
//
//  Captions are written from what is visible in each frame. Anything I
//  could not identify with confidence is described rather than named —
//  correct these freely, they are the one thing I had to infer.
// ────────────────────────────────────────────────────────────────

export type GalleryItem = {
  src: string;
  w: number;
  h: number;
  caption: string;
  tag: string;
};

// `w`/`h` are read from each file's mp4 track header, so each player gets
// its true aspect ratio (two verticals and one square) with no guessing
// and no layout shift once metadata loads.
export type GalleryVideo = {
  src: string;
  w: number;
  h: number;
  title: string;
  tag: string;
};

export const gallery = {
  kicker: "Selected work",
  title: "On the ground.",
  intro:
    "Campus festivals, convocations and brand events — designed, built and shot by us. Stage to signage, install day to show night.",

  videos: [
    {
      src: "/gallery/mun-unplugged.mp4",
      w: 720,
      h: 720,
      title: "MUN UNplugged",
      tag: "Galgotias International Model United Nations",
    },
    {
      src: "/gallery/teaser-the-wait.mp4",
      w: 720,
      h: 1280,
      title: "The wait is anything but over",
      tag: "Teaser",
    },
    {
      src: "/gallery/gallery-video-01.mp4",
      w: 478,
      h: 850,
      title: "Event reel",
      tag: "On the ground",
    },
  ] satisfies GalleryVideo[],

  items: [
    {
      src: "/gallery/gallery-04.jpg",
      w: 1105,
      h: 1280,
      caption: "Galgotias Unifest — main stage on show night",
      tag: "Festival",
    },
    {
      src: "/gallery/gallery-06.jpg",
      w: 1040,
      h: 1256,
      caption: "Akhil Sachdeva live at Galgotias Unifest '24",
      tag: "Festival",
    },
    {
      src: "/gallery/gallery-13.jpg",
      w: 1280,
      h: 788,
      caption: "Festival crowd at full scale",
      tag: "Festival",
    },
    {
      src: "/gallery/gallery-16.jpg",
      w: 919,
      h: 1280,
      caption: "DJ set under the lighting rig",
      tag: "Festival",
    },
    {
      src: "/gallery/gallery-08.jpg",
      w: 1280,
      h: 782,
      caption: "Front of house, hands up",
      tag: "Festival",
    },
    {
      src: "/gallery/gallery-17.jpg",
      w: 911,
      h: 1280,
      caption: "Artist on stage",
      tag: "Festival",
    },
    {
      src: "/gallery/gallery-10.jpg",
      w: 1280,
      h: 679,
      caption: "Unifest showcase — outdoor stage and backdrop",
      tag: "Festival",
    },
    {
      src: "/gallery/gallery-09.jpg",
      w: 1280,
      h: 711,
      caption: "Unifest '24 — ground branding across the main lawn",
      tag: "Branding",
    },
    {
      src: "/gallery/gallery-03.jpg",
      w: 1280,
      h: 654,
      caption: "Convocation 2024 — Galgotias Educational Institutions",
      tag: "Ceremony",
    },
    {
      src: "/gallery/gallery-15.jpg",
      w: 700,
      h: 1238,
      caption: "Stage truss going up",
      tag: "Build",
    },
    {
      src: "/gallery/gallery-12.jpg",
      w: 1600,
      h: 1200,
      caption: "Canopies up on the campus lawn",
      tag: "Build",
    },
    {
      src: "/gallery/gallery-11.jpg",
      w: 1600,
      h: 1200,
      caption: "Seating and table setup before doors",
      tag: "Build",
    },
    {
      src: "/gallery/gallery-14.jpg",
      w: 1280,
      h: 794,
      caption: "Our crew shooting on the floor",
      tag: "Production",
    },
    {
      src: "/gallery/gallery-18.jpg",
      w: 779,
      h: 1152,
      caption: "Passes and lanyards, ready for the gates",
      tag: "Collateral",
    },
    {
      src: "/gallery/gallery-07.jpg",
      w: 1280,
      h: 794,
      caption: "Talent on the line at a promotional appearance",
      tag: "Promotions",
    },
    {
      src: "/gallery/gallery-02.jpg",
      w: 690,
      h: 795,
      caption: "The team",
      tag: "Team",
    },
    {
      src: "/gallery/gallery-05.jpg",
      w: 1600,
      h: 900,
      caption: "On campus",
      tag: "Team",
    },
  ] satisfies GalleryItem[],
} as const;
