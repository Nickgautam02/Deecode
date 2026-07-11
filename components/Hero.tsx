import { site } from "@/content/site";
import CountUp from "./CountUp";
import Reveal from "./Reveal";

/** Renders the headline, painting the [bracketed] segment in the accent color. */
function Headline({ text }: { text: string }) {
  const match = text.match(/^([\s\S]*)\[(.+)\]([\s\S]*)$/);
  if (!match) return <>{text}</>;
  const [, before, highlighted, after] = match;
  return (
    <>
      {before}
      <span className="text-accent">{highlighted}</span>
      {after}
    </>
  );
}

export default function Hero() {
  return (
    <section id="top" className="hero-glow relative overflow-hidden pb-20 pt-36 md:pt-44">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <p className="mb-5 inline-block rounded-full border border-line px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted">
            {site.hero.kicker}
          </p>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="font-display max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl whitespace-pre-line">
            <Headline text={site.hero.headline} />
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-6 max-w-xl text-lg text-muted">{site.hero.sub}</p>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={site.hero.primaryCta.href}
              className="rounded-full bg-accent px-7 py-3.5 font-semibold text-background transition-transform hover:scale-105"
            >
              {site.hero.primaryCta.label}
            </a>
            <a
              href={site.hero.secondaryCta.href}
              className="rounded-full border border-line px-7 py-3.5 font-semibold transition-colors hover:border-accent hover:text-accent"
            >
              {site.hero.secondaryCta.label}
            </a>
          </div>
        </Reveal>

        <Reveal delay={400}>
          <dl className="mt-20 grid grid-cols-2 gap-8 border-t border-line pt-10 md:grid-cols-4">
            {site.stats.map((stat) => (
              <div key={stat.label}>
                <dd className="font-display text-4xl font-bold text-accent md:text-5xl">
                  <CountUp
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals ?? 0}
                  />
                </dd>
                <dt className="mt-2 text-sm text-muted">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
