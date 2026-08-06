import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The Capital.com case-study deck is a single self-contained HTML file in
  // public/, not a Next route — so it can also be attached to an email or
  // opened off a drive with nothing serving it. The rewrite is what gives it
  // the clean /uat-capitalagency URL; without it the deck is only reachable
  // at /uat-capitalagency.html.
  //
  // Returned as a plain array, so it is checked *after* the filesystem. That
  // ordering matters: the rewrite can never shadow a real page or public file
  // added at the same path later.
  async rewrites() {
    return [
      {
        source: "/uat-capitalagency",
        destination: "/uat-capitalagency.html",
      },
    ];
  },

  // A staging URL handed out by link. The deck carries its own
  // <meta name="robots" content="noindex, nofollow">, but a static .html is
  // served straight off disk, so this header is the belt to that braces —
  // crawlers that never parse the document still see it.
  //
  // Both paths are listed because headers match the *incoming* request, not
  // the rewritten one: matching only the .html file would leave the clean URL
  // — the one actually handed out — without the header.
  async headers() {
    const noindex = [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];
    return [
      { source: "/uat-capitalagency", headers: noindex },
      { source: "/uat-capitalagency.html", headers: noindex },
    ];
  },
};

export default nextConfig;
