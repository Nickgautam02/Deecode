import type { Metadata } from "next";
import CaseStudyDeck from "@/components/CaseStudyDeck";
import { site } from "@/content/site";
import { shareImage } from "@/app/shared-metadata";

const title = `Entertainment case studies | ${site.name}`;
const description =
  "Creator-led campaigns for Netflix × Mirzapur, the BTS comeback and Airtel × Netflix — 130+ creators, 53M+ views delivered.";

// The entertainment credentials deck — the URL we hand out when a
// prospect asks what we have run.
//
// Unlike the per-client proposal routes, this one is named for its
// contents rather than for a recipient: it carries no pricing and no
// scope, so the same link goes to every prospect. The component is named
// for the shape (CaseStudyDeck) so a second deck can reuse it with a
// different content file.
//
// Kept out of the index, for a different reason than the proposals: it
// reports named clients' campaign performance, which is theirs to
// publish, not ours. Per the note in app/sitemap.ts that is two
// decisions in two places — this `robots` key, and staying absent from
// the sitemap. Both are done; do not add this route there.
export const metadata: Metadata = {
  title,
  description,
  // Self-referencing, and not optional. With no `alternates` here the
  // page inherited the root layout's canonical of "/", so it said
  // "noindex" and "the real version of this page is the homepage" at
  // once — two contradictory signals, and the second one asks Google to
  // fold this URL's links into the homepage's.
  alternates: { canonical: "/netflix-case-studies" },
  // Its own share card. This is the URL we paste to prospects, and
  // before this it inherited the homepage's og:url, title and
  // description, so the preview under the link described a different
  // page. noindex does not affect link previews; these still render.
  openGraph: {
    title,
    description,
    url: `https://${site.domain}/netflix-case-studies`,
    siteName: site.name,
    type: "website",
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [shareImage],
  },
  // `follow: true`, unlike the proposal routes. Both keep the page out
  // of search, and the difference matters now that this one sits in the
  // main menu: `nofollow` would also discard what its links back to the
  // homepage and the city pages contribute. noindex removes the page
  // from results, which is the whole intent; nofollow additionally
  // throws away a signal we have no reason to give up. /gallery made
  // the same call for the same reason.
  robots: { index: false, follow: true },
};

export default function NetflixCaseStudiesPage() {
  return <CaseStudyDeck />;
}
