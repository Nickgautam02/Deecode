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
//  Entries in `creatives.items` show on BOTH /portfolio/MIT (the client's
//  URL) and /UAT/portfolio/MIT. Entries in `creativesUat.items` show only
//  on UAT — put anything unconfirmed there, review it, then move it up.
//  The section renders nothing at all while a list is empty, so the live
//  page stays as it is until an item is promoted.
// ────────────────────────────────────────────────────────────────

export type Creative = {
  src: string;
  w: number;
  h: number;
  title: string;
  tag: string;
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

  // Live list — empty until a piece is promoted from creativesUat below.
  items: [],
};

// ⚠ Staging only. The MUN emblem is in here rather than in `creatives`
// because I could not confirm from the repo that we designed it — confirm
// authorship before promoting, since this page claims credit for what it
// shows.
export const creativesUat: CreativesContent = {
  ...creatives,
  items: [
    ...creatives.items,
    {
      src: "/creatives/mun-identity-mark.jpg",
      w: 1280,
      h: 1078,
      title: "Galgotias International MUN — identity mark",
      tag: "Identity",
    },
  ],
};
