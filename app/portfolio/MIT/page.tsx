import type { Metadata } from "next";
import MitProposal from "@/components/MitProposal";
import { mitProposal as p } from "@/content/mit-proposal";
import { site } from "@/content/site";

// The live proposal. The layout lives in components/MitProposal.tsx, shared
// with /UAT/portfolio/MIT — see content/mit-proposal-uat.ts for how staging
// diverges from this.
const DECK_SRC = "/portfolio/MIT/deck.html";

export const metadata: Metadata = {
  title: `${p.client} — Creative & brand marketing proposal | ${site.name}`,
  description: p.intro,
  alternates: { canonical: "/portfolio/MIT" },
  // A client-specific proposal: reachable by link, kept out of search.
  robots: { index: false, follow: false },
};

export default function MITProposalPage() {
  return <MitProposal proposal={p} deckSrc={DECK_SRC} />;
}
