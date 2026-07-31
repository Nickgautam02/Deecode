import type { Metadata } from "next";
import MitProposal from "@/components/MitProposal";
import { mitProposalUat as p } from "@/content/mit-proposal-uat";
import { site } from "@/content/site";

// Staging copy of /portfolio/MIT. Same layout component, its own content
// object and its own deck, so work can be pushed here and reviewed without
// touching the URL the client has.
const DECK_SRC = "/UAT/portfolio/MIT/deck.html";

export const metadata: Metadata = {
  title: `[UAT] ${p.client} — Creative & brand marketing proposal | ${site.name}`,
  description: p.intro,
  // Points at the live page: this URL is for review, not for indexing or
  // for sharing as the canonical one.
  alternates: { canonical: "/portfolio/MIT" },
  robots: { index: false, follow: false },
};

export default function MITProposalUATPage() {
  return <MitProposal proposal={p} deckSrc={DECK_SRC} />;
}
