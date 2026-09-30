// The share image, as a value a page can hand to `openGraph.images` and
// `twitter.images`.
//
// ⚠ WHY THIS FILE EXISTS: app/opengraph-image.jpg is attached to the ROOT
// segment's `openGraph`, and Next merges metadata shallowly — a page that
// sets its own `openGraph` (every indexed subpage does, for its own title
// and URL) replaces the root one whole, image included. Until this was
// added, /careers, /talent-management-agency and the three city pages
// shipped `twitter:card=summary_large_image` with no image at all, so a
// shared link rendered as a bare text card. Any new page that sets
// `openGraph` or `twitter` needs to spread these in, or it loses the image
// the same way.
//
// Mirrors the file-based image: same file, same size, and the same alt as
// app/opengraph-image.alt.txt. Change the image there and here together.
export const shareImage = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
  type: "image/jpeg",
  alt: "Deecode Media House — influencer marketing & talent management agency",
};
