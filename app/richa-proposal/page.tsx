import type { Metadata } from "next";
import PersonalBrandProposal from "@/components/PersonalBrandProposal";
import { personalBrand as pb } from "@/content/personal-brand";
import { site } from "@/content/site";

// The personal brand & talent management proposal — the URL we hand out.
//
// Named for the recipient, following the convention used for the other
// per-client routes. The component and its content are NOT named after her:
// the offering is reusable for the next piece of talent, and only the route
// and `recipient` are specific to this one.
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

export default function RichaProposalPage() {
  return <PersonalBrandProposal />;
}
