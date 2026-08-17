import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// The crawl map Google asks for. Until this existed, /sitemap.xml returned
// 404 and Search Console had nothing to submit.
//
// ⚠ THE HOMEPAGE IS THE ONLY INDEXED PAGE ON THIS SITE — Nikhil's call, so
// this list is one entry long by design and an empty-looking sitemap is not
// a bug. Every other route sets `index: false` in its own metadata:
// /gallery, /storydigital, /portfolio/MIT and the per-client proposals.
//
// Never list a noindex page here. It asks Google to crawl a page we then
// tell it to drop, and for the proposal routes that is how a URL sent to
// one person ends up in a stranger's search results.
//
// Adding a route that SHOULD rank means two edits, not one: add it here and
// drop the `robots` key from its metadata. Doing only the first is silent —
// the page is submitted and then refused, with nothing to show why.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `https://${site.domain}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
