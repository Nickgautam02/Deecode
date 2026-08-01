import type { Metadata } from "next";
import StoryDigitalCredentials from "@/components/StoryDigitalCredentials";
import { site } from "@/content/site";
import { storyDigital as sd } from "@/content/story-digital";

// The live credentials page for Story Digital — this is the URL we hand out.
// /uat-vidhistorydigital renders the same component and stays as the staging
// copy, same arrangement as /portfolio/MIT and /UAT/portfolio/MIT.
//
// Kept out of the index: it names the recipient and is meant for one reader,
// not for search.
export const metadata: Metadata = {
  title: `${sd.recipient} — credentials & US creator roster | ${site.name}`,
  description: sd.lede,
  robots: { index: false, follow: false },
};

export default function StoryDigitalPage() {
  return <StoryDigitalCredentials />;
}
