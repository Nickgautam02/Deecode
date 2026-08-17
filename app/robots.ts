import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// /robots.txt — was a 404 before this file existed.
//
// ⚠ DO NOT ADD `disallow` FOR THE PRIVATE ROUTES. It is the obvious next
// thought and it backfires twice:
//
//  1. robots.txt is public. Listing /surbhi-proposal here publishes the
//     existence of a URL we only sent to one person — anyone can read
//     deecodemediahouse.com/robots.txt.
//  2. Disallow blocks the crawl, so Google never reads the `noindex` on
//     those pages. A blocked URL can still be indexed from a link
//     elsewhere, and then it is stuck there, because we have forbidden
//     the only mechanism that would remove it.
//
// The private routes already set `robots: { index: false, follow: false }`
// in their own metadata. That is the correct lever, and it needs the crawl
// to be allowed in order to work. Keeping them out of sitemap.ts is the
// other half.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `https://${site.domain}/sitemap.xml`,
    host: `https://${site.domain}`,
  };
}
