import { site } from "@/content/site";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function CaseStudies() {
  return (
    <section id="work" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          kicker="Case studies"
          title="Campaigns that moved the numbers."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {site.caseStudies.map((study, i) => (
            <Reveal key={study.brand} delay={i * 120}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-card p-8 transition-colors hover:border-accent/60 md:p-10">
                <p className="text-xs uppercase tracking-[0.2em] text-muted">
                  {study.category}
                </p>
                <h3 className="font-display mt-4 text-2xl font-bold leading-snug md:text-3xl">
                  {study.title}
                </h3>
                <p className="mt-4 flex-1 text-muted">{study.description}</p>

                <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6">
                  {study.metrics.map((metric) => (
                    <div key={metric.label}>
                      <dd className="font-display text-2xl font-bold text-accent md:text-3xl">
                        {metric.value}
                      </dd>
                      <dt className="mt-1 text-xs text-muted">{metric.label}</dt>
                    </div>
                  ))}
                </dl>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
