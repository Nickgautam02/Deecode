import type { Metadata } from "next";
import InfluencerCampaignProposal from "@/components/InfluencerCampaignProposal";
import { rootedActives as ra } from "@/content/rooted-actives";
import { site } from "@/content/site";

// The influencer marketing proposal for Rooted Active Naturals — the URL
// we hand out.
//
// Named for the recipient, following the convention used for the other
// per-client routes. The component is NOT named after them: the layout is
// reusable for the next brand-side pitch, and only this route and the
// content file are specific to this one.
//
// Kept out of the index: it carries pricing and is meant for one reader,
// not for search. Per the note in app/sitemap.ts, that is two decisions
// in two places — this `robots` key, and staying absent from the sitemap.
// Both are done; do not add this route there.
export const metadata: Metadata = {
  title: `Influencer marketing${
    ra.recipient ? ` — ${ra.recipient}` : ""
  } | ${site.name}`,
  description: ra.lede,
  robots: { index: false, follow: false },
};

export default function RootedActivesProposalPage() {
  return <InfluencerCampaignProposal />;
}
