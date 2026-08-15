import type { Metadata } from "next";
import PersonalBrandProposal from "@/components/PersonalBrandProposal";
import { personalBrandSurbhi as pb } from "@/content/personal-brand-surbhi";
import { site } from "@/content/site";

// The personal brand & talent management proposal — the URL we hand out.
//
// The same page as /richa-proposal on a separate URL, with its own content
// file: different prices and reel counts, same layout. Only the route,
// `recipient` and the numbers are specific to this one.
//
// Kept out of the index: it carries pricing and is meant for one reader,
// not for search.
export const metadata: Metadata = {
  title: `Personal brand & talent management${
    pb.recipient ? ` — ${pb.recipient}` : ""
  } | ${site.name}`,
  description: pb.lede,
  robots: { index: false, follow: false },
};

export default function SurbhiProposalPage() {
  return <PersonalBrandProposal content={pb} />;
}
