import { site } from "@/content/site";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 bg-card/40 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              About us
            </p>
            <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
              {site.about.heading}
            </h2>
            <p className="mt-6 text-lg text-muted">{site.about.body}</p>
          </Reveal>

          <div className="space-y-5">
            {site.about.pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 100}>
                <div className="rounded-2xl border border-line bg-background p-6">
                  <h3 className="font-display text-xl font-bold text-accent">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-muted">{pillar.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
