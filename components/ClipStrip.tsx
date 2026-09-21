import type { DeckCase, DeckClip } from "@/content/netflix-case-studies";

/* A row of campaign clips as phone-shaped players. Used twice: on the
   slide that opens the work section of /netflix-case-studies, and in the
   case-study section of the homepage. One implementation, because the
   two would otherwise drift — and it carries no colour of its own, so it
   reads correctly on the site's dark ground and on the deck's light one.

   Nothing autoplays and nothing preloads. Seven muted videos starting by
   themselves would be the loudest thing on either page, and on a phone it
   would pull seven files down before the reader has asked for one. The
   poster frame is what the page shows; pressing play is what fetches the
   video.

   ⚠ `print:hidden`, and it has to stay that way for the deck's sake. The
   print block in CaseStudyDeck documents the budget: at 10.5px the
   tallest slide already uses 722px of a landscape sheet's 793, and this
   strip is ~200px at that scale. A printed slide that overruns does not
   clip — Chrome emits a blank continuation page after it, silently, and
   only a page count catches it. Nothing is lost on paper either way: a
   video prints as a still. */

/** A clip with the campaign it belongs to, which the strip prints above
    the caption. A mixed strip without it leaves the reader to guess
    which case each clip came from. */
export type LabelledClip = DeckClip & { campaign: string };

/** Flattens the cases into one list, in case order, skipping campaigns
    that have no clips.

    The cast is `readonly DeckCase[]` because the content file's `as
    const` gives each case its own literal type, and a campaign with no
    clips then has no `clips` property to read at all. */
export function clipsFromCases(cases: readonly DeckCase[]): LabelledClip[] {
  return cases.flatMap((entry) =>
    (entry.clips ?? []).map((clip) => ({ ...clip, campaign: entry.label })),
  );
}

/** How many columns the widest breakpoint gets — one per clip, so the
    whole set is one row on a desktop. The class has to exist in this
    file for Tailwind to emit it: `lg:grid-cols-${n}` would compile to
    nothing. Anything past seven wraps onto a second row rather than
    shrinking the players below the size where a control bar is usable.

    The narrower breakpoints are fixed counts in the list below — two up
    on a phone, three on a large phone, four on a tablet. */
function clipColumns(count: number) {
  if (count >= 7) return "lg:grid-cols-7";
  if (count === 6) return "lg:grid-cols-6";
  if (count === 5) return "lg:grid-cols-5";
  return "lg:grid-cols-4";
}

export default function ClipStrip({
  items,
  label,
  className = "",
}: {
  items: readonly LabelledClip[];
  label: string;
  className?: string;
}) {
  return (
    <div className={`border-t border-line pt-6 print:hidden ${className}`}>
      <p className="text-[0.6875rem] uppercase tracking-[0.1em] text-muted">
        {label} · {items.length} {items.length === 1 ? "clip" : "clips"}
      </p>
      {/* ⚠ A GRID AT EVERY WIDTH, INCLUDING THE SMALLEST. This was a
          sideways scroller below `lg` first, on the reasoning that one
          swipeable strip beats a block of thumbnails. In the hand it
          read as a carousel: two and a bit clips visible, the other
          five behind a gesture nothing on the page advertised, on the
          screen where most of this site is actually read. Two up on a
          phone shows everything at a size worth tapping, and the column
          count climbs with the viewport until the whole set is one row.

          Keep it a grid. A scroller that hides five of seven clips is
          not a tidier strip, it is five clips nobody sees. */}
      <ul
        className={`mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-5 ${clipColumns(
          items.length,
        )}`}
      >
        {items.map((clip) => (
          <li key={clip.src} className="min-w-0">
            <div
              className="overflow-hidden rounded-xl border border-line bg-black"
              style={{ aspectRatio: `${clip.w} / ${clip.h}` }}
            >
              <video
                controls
                preload="none"
                playsInline
                poster={clip.poster}
                aria-label={`${clip.campaign} — ${clip.caption}`}
                className="h-full w-full"
              >
                <source src={clip.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <p className="mt-2.5 text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-accent-strong">
              {clip.campaign}
            </p>
            <p className="mt-1 text-[0.6875rem] leading-snug text-muted">
              {clip.caption}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
