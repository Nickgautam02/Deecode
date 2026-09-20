import type { Metadata } from "next";
import CaseStudyDeck from "@/components/CaseStudyDeck";
import { site } from "@/content/site";

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
  title: `Entertainment case studies | ${site.name}`,
  description:
    "Creator-led campaigns for Netflix × Mirzapur, the BTS comeback and Airtel × Netflix — 130+ creators, 53M+ views delivered.",
  robots: { index: false, follow: false },
};

export default function NetflixCaseStudiesPage() {
  return <CaseStudyDeck />;
}
