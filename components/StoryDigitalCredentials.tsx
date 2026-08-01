import CreatorSwitchboard, { type WireFace } from "./CreatorSwitchboard";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { site, type Creator } from "@/content/site";
import {
  storyDigital as sd,
  usRoster,
  widerRoster,
  wireRoster,
} from "@/content/story-digital";

/* Credentials one-pager written for a single recipient. Deliberately not
   wired into site.nav — it is reached by the link we send, not by browsing.

   Shares the site's tokens and components (Reveal, SectionHeading, the
   .card-hover treatment) so it reads as part of deecodemediahouse.com
   rather than as a one-off microsite. */

// Six of each keeps the two switchboard columns visually balanced.
// `wireRoster` mixes the markets — see content/story-digital.ts.
const WIRE_BRANDS = sd.supply.domestic.brands.slice(0, 6);
const WIRE_FACES: WireFace[] = wireRoster.map((c) => ({
  name: c.name,
  image: c.image,
  followers: c.followers,
  meta: `${c.niche.split(" & ")[0]} · ${c.location}`,
}));

function Rule() {
  return <div className="h-px flex-1 bg-line" />;
}

// Matches the fallback treatment on the homepage roster.
const INITIAL_GRADIENTS = [
  "from-fuchsia-400/80 to-purple-700/80",
  "from-sky-400/80 to-indigo-600/80",
  "from-lime-400/80 to-emerald-600/80",
  "from-amber-300/80 to-orange-600/80",
];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/** Photo where we have one, initials where we do not. */
function Avatar({
  creator,
  size,
  index,
}: {
  creator: Creator;
  size: number;
  index: number;
}) {
  if (creator.image) {
    return (
      <img
        src={creator.image}
        alt={creator.name}
        width={size}
        height={size}
        loading="lazy"
        className="shrink-0 rounded-full object-cover"
        style={{ height: size, width: size }}
      />
    );
  }
  return (
    <div
      aria-hidden="true"
      className={`font-display flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-bold text-background ${
        INITIAL_GRADIENTS[index % INITIAL_GRADIENTS.length]
      }`}
      style={{ height: size, width: size, fontSize: Math.round(size * 0.34) }}
    >
      {initials(creator.name)}
    </div>
  );
}


export default function StoryDigitalCredentials() {
  const intl = sd.supply.international;

  return (
    <main className="bg-background text-foreground">
      {/* ── Masthead ── */}
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-baseline justify-between gap-x-6 gap-y-2 px-5 py-4">
          <p className="font-display text-sm font-extrabold uppercase tracking-[0.12em]">
            Deecode <span className="text-accent">Media House</span>
          </p>
          <p className="text-[0.6875rem] uppercase tracking-[0.15em] text-muted">
            Credentials <span className="text-accent">/</span> prepared for{" "}
            {sd.recipient}
          </p>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="border-b border-line/60">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <Reveal>
            <p className="text-[0.6875rem] uppercase tracking-[0.15em] text-muted">
              {sd.kicker} <span className="text-accent">·</span> {sd.prepared}
            </p>
            <h1 className="font-display mt-5 max-w-[22ch] text-4xl font-extrabold leading-[0.98] tracking-tight sm:text-5xl md:text-6xl">
              {sd.headline.lead}{" "}
              <span className="text-accent">{sd.headline.accent}</span>.
            </h1>
            <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-muted">
              {sd.lede}
            </p>
          </Reveal>

          <CreatorSwitchboard
            brands={WIRE_BRANDS}
            faces={WIRE_FACES}
            caption={sd.wireCaption}
            hub={sd.wireHub}
          />
        </div>
      </section>

      {/* ── 01 Roster ── */}
      <section className="border-b border-line/60">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <SectionHeading
            kicker={sd.roster.kicker}
            title={sd.roster.title}
            sub={sd.roster.sub}
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {usRoster.map((c, i) => (
              <Reveal key={c.name} delay={(i % 3) * 80} className="h-full">
                <article className="card-hover flex h-full flex-col gap-4 rounded-2xl border border-line bg-card p-5">
                  <span className="self-start rounded-full bg-accent/15 px-2.5 py-1 text-[0.625rem] uppercase tracking-[0.11em] text-accent">
                    {c.location === "USA" ? "United States" : c.location}
                  </span>
                  <div className="flex items-center gap-3.5">
                    <Avatar creator={c} size={52} index={i} />
                    <div className="min-w-0">
                      <h3 className="font-display font-bold tracking-tight">
                        {c.name}
                      </h3>
                      <p className="text-sm text-muted">{c.niche}</p>
                    </div>
                  </div>
                  <dl className="grid gap-1.5 border-t border-line pt-4 text-[0.6875rem] uppercase tracking-[0.07em]">
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="text-muted">Platform</dt>
                      <dd>{c.platform}</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="text-muted">Following</dt>
                      <dd className="tabular-nums text-accent">{c.followers}</dd>
                    </div>
                    {/* No niche row — it already sits under the name, and the
                        figures we could add here are not ones we hold. */}
                  </dl>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-14 mb-5 flex items-baseline gap-4">
              <p className="whitespace-nowrap text-[0.6875rem] uppercase tracking-[0.15em] text-muted">
                {sd.roster.widerLabel}
              </p>
              <Rule />
            </div>

            <div className="grid gap-x-10 sm:grid-cols-2">
              {widerRoster.map((c, i) => (
                <div
                  key={c.name}
                  className="flex items-center gap-3.5 border-b border-line/60 py-3"
                >
                  <Avatar creator={c} size={34} index={i} />
                  <div className="min-w-0 leading-tight">
                    <p className="font-display text-[0.9375rem] font-semibold">
                      {c.name}
                    </p>
                    <p className="truncate text-sm text-muted">
                      {c.niche} · {c.platform} · {c.location}
                    </p>
                  </div>
                  <span className="ml-auto whitespace-nowrap text-sm tabular-nums text-muted">
                    {c.followers}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

        </div>
      </section>

      {/* ── 02 Coverage ── */}
      <section className="border-b border-line/60">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <SectionHeading
            kicker={sd.coverage.kicker}
            title={sd.coverage.title}
          />
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {sd.coverage.groups.map((group, i) => (
              <Reveal key={group.label} delay={i * 80}>
                <p className="mb-4 border-b border-line pb-3 text-[0.6875rem] uppercase tracking-[0.15em] text-muted">
                  {group.label}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-line bg-card px-2.5 py-1.5 text-sm"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03 Placements ── */}
      <section className="border-b border-line/60">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <SectionHeading
            kicker={sd.supply.kicker}
            title={sd.supply.title}
            sub={sd.supply.sub}
          />
          <div className="grid gap-4 lg:grid-cols-2">
            <Reveal className="h-full">
              <article className="flex h-full flex-col gap-4 rounded-2xl border border-line bg-card p-6">
                <h3 className="font-display flex items-center gap-2.5 font-bold">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {sd.supply.domestic.label}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {sd.supply.domestic.brands.map((brand) => (
                    <li
                      key={brand}
                      className="rounded-lg border border-line px-2.5 py-1.5 text-sm"
                    >
                      {brand}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>

            <Reveal delay={80} className="h-full">
              <article className="flex h-full flex-col gap-4 rounded-2xl border border-line bg-card p-6">
                <h3 className="font-display flex items-center gap-2.5 font-bold">
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: "var(--accent-2)" }}
                  />
                  {intl.label}
                </h3>
                {intl.brands.length > 0 ? (
                  <ul className="flex flex-wrap gap-2">
                    {intl.brands.map((brand) => (
                      <li
                        key={brand}
                        className="rounded-lg border border-line px-2.5 py-1.5 text-sm"
                      >
                        {brand}
                      </li>
                    ))}
                  </ul>
                ) : (
                  /* Unmissable on purpose: this page must not go out claiming
                     international work with nothing behind it. */
                  <p
                    className="self-start rounded-lg border border-dashed px-3 py-2 text-sm"
                    style={{
                      color: "var(--accent-2)",
                      borderColor: "var(--accent-2)",
                    }}
                  >
                    [ BRAND NAMES — fill in content/story-digital.ts before
                    sending ]
                  </p>
                )}
                <p className="max-w-[46ch] text-muted">{intl.note}</p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Footer. Carries the contact routes now that the closing CTA
             block is gone, so the page still ends somewhere useful. ── */}
      <footer className="border-t border-line/60">
        <div className="mx-auto flex max-w-6xl flex-wrap items-baseline justify-between gap-x-8 gap-y-4 px-5 py-10">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a
              href={`mailto:${site.email}`}
              className="border-b border-line pb-0.5 transition-colors hover:border-accent hover:text-accent"
            >
              {site.email}
            </a>
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="border-b border-line pb-0.5 transition-colors hover:border-accent hover:text-accent"
            >
              {site.phone}
            </a>
            <a
              href={`https://${site.domain}`}
              target="_blank"
              rel="noopener"
              className="border-b border-line pb-0.5 transition-colors hover:border-accent hover:text-accent"
            >
              {site.domain}
            </a>
          </div>
          <p className="text-[0.6875rem] uppercase tracking-[0.1em] text-muted">
            {site.name} · {site.tagline} · Confidential
          </p>
        </div>
      </footer>
    </main>
  );
}
