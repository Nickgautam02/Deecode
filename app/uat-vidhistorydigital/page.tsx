import type { Metadata } from "next";
import StoryDigitalCredentials from "@/components/StoryDigitalCredentials";
import { site } from "@/content/site";
import { storyDigital as sd } from "@/content/story-digital";

// Credentials one-pager for Story Digital's US influencer-marketing brief,
// served at /uat-vidhistorydigital. The URL is handed out in a single email,
// so it is kept out of the index and out of site.nav — same treatment as
// /UAT/portfolio/MIT.
export const metadata: Metadata = {
  title: `${sd.recipient} — credentials & US creator roster | ${site.name}`,
  description: sd.lede,
  robots: { index: false, follow: false },
};

export default function StoryDigitalPage() {
  return <StoryDigitalCredentials />;
}
