import type { Metadata } from "next";
import StoryDigitalCredentials from "@/components/StoryDigitalCredentials";
import { site } from "@/content/site";
import { storyDigital as sd } from "@/content/story-digital";

// Staging copy of /storydigital — same component and the same content object,
// so the two are identical by construction. Kept for review; /storydigital is
// the URL we hand out. Same arrangement as /UAT/portfolio/MIT.
export const metadata: Metadata = {
  title: `[UAT] ${sd.recipient} — credentials & US creator roster | ${site.name}`,
  description: sd.lede,
  // Points at the live page: this URL is for review, not for sharing as the
  // canonical one.
  alternates: { canonical: "/storydigital" },
  robots: { index: false, follow: false },
};

export default function StoryDigitalUATPage() {
  return <StoryDigitalCredentials />;
}
