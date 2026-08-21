import LocationPage, { locationMetadata } from "@/components/LocationPage";

// The URL is the keyword, verbatim — /influencer-marketing-agency-greater-noida.
//
// Reachable by direct link and from the footer's Locations column only:
// nothing in the header nav points here, which is deliberate. It is in
// app/sitemap.ts, and that is how Google finds it.
//
// Copy lives in content/locations.ts under the "greater-noida" slug. Nothing on
// this page is city-specific except the string below.
export const metadata = locationMetadata("greater-noida");

export default function Page() {
  return <LocationPage slug="greater-noida" />;
}
