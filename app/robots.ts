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

// The assistants people now ask "who is the best influencer marketing
// agency in Noida" instead of typing it into Google. Each reads a
// different token; a site is only quotable by the ones it admits.
//
// ⚠ THIS BLOCK CHANGES NOTHING TODAY. The `*` rule below already allows
// every one of them, and that is what is actually granting access. It is
// written out for two reasons: so the list is a decision on the record
// rather than an accident of the wildcard, and so that the day someone
// adds a `disallow` to `*`, these keep their own more-specific grant
// instead of being caught by it. Delete a line here to shut one out.
//
// Grouped because the behaviours differ and the distinction matters if
// this is ever narrowed:
//   · index crawlers — build the corpus an assistant searches
//   · on-demand fetchers — retrieve a page live when a user asks about
//     it; blocking these removes the site from answers even when the
//     index crawler is allowed
//   · Google-Extended — Gemini and AI Overviews grounding ONLY. It is
//     not a crawler and has no effect on ordinary Google Search
//     ranking, so disallowing it costs AI visibility and buys nothing.
const AI_CRAWLERS = [
  // Index crawlers
  "GPTBot", // OpenAI
  "OAI-SearchBot", // ChatGPT search
  "ClaudeBot", // Anthropic
  "Claude-SearchBot",
  "PerplexityBot",
  "Applebot-Extended", // Apple Intelligence
  "Amazonbot",
  "meta-externalagent",
  "Bytespider",
  // On-demand fetchers
  "ChatGPT-User",
  "Claude-User",
  "Perplexity-User",
  // Grounding
  "Google-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: AI_CRAWLERS,
        allow: "/",
      },
    ],
    sitemap: `https://${site.domain}/sitemap.xml`,
    host: `https://${site.domain}`,
  };
}
