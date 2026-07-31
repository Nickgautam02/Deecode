// ────────────────────────────────────────────────────────────────
//  UAT CONTENT for /UAT/portfolio/MIT.
//
//  Starts as a copy of the live proposal, so the staging URL reads
//  identically to /portfolio/MIT until something is deliberately changed
//  here. To try a change: override the key on this object, review it at
//  /UAT/portfolio/MIT, then move the same edit into
//  content/mit-proposal.ts to take it live.
//
//    export const mitProposalUat = {
//      ...mitProposal,
//      intro: "A reworded opening we want to see before the client does.",
//    };
//
//  The spread is shallow, so overriding a nested key means restating that
//  whole key — `scope: [...]`, not `scope[2].title`.
//
//  ⚠ Editing content/mit-proposal.ts changes BOTH pages. Only edits made
//  here stay confined to UAT.
// ────────────────────────────────────────────────────────────────

import { mitProposal } from "@/content/mit-proposal";

export const mitProposalUat = {
  ...mitProposal,
};
