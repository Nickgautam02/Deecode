import type { MetadataRoute } from "next";
import { locations } from "@/content/locations";
import { site } from "@/content/site";

// The crawl map Google asks for. Until this existed, /sitemap.xml returned
// 404 and Search Console had nothing to submit.
//
// ⚠ THIS LIST AND THE `robots` KEY IN EACH PAGE'S METADATA ARE ONE
// DECISION IN TWO PLACES. A route belongs here only if its metadata has
// no `robots: { index: false }`, and vice versa. Listing a noindex page
// asks Google to crawl a page we then tell it to drop; for the proposal
// routes that is how a URL sent to one person ends up in a stranger's
// search results.
//
// Indexed on purpose:
//   /                                       the homepage
//   /influencer-marketing-agency-<city>     three city landing pages
//
// Deliberately absent, each carrying `index: false` in its own metadata:
//   /gallery, /storydigital, /portfolio/MIT, and the per-client proposals.
//
// The city pages are in no navigation menu — they are reached by direct
// link, from this sitemap, and from the Locations column in the footer.
// That is intentional; being unlisted in the nav does not stop them
// ranking, but it does mean this file is their main discovery path. If a
// city page vanishes from Search Console, check here first.
//
// Adding a route that SHOULD rank means two edits, not one: add it here
// and leave `robots` off its metadata. Doing only the first is silent —
// the page is submitted and then refused, with nothing to show why.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `https://${site.domain}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    // 0.8, not 1 — priority is relative within this file only, and it
    // says the homepage is still the page to prefer on a brand search.
    // It has no effect on ranking for the city terms themselves.
    ...locations.map((location) => ({
      url: `https://${site.domain}/influencer-marketing-agency-${location.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
