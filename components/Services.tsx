import { site } from "@/content/site";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Services() {
  return (
    <section id="services" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          kicker="What we do"
          title="One Agency Infinite Reach."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {site.services.map((service, i) => (
            <Reveal key={service.title} delay={i * 100}>
              <article className="group h-full rounded-2xl border border-line bg-card p-8 transition-colors hover:border-accent/60">
                <span className="font-display text-sm font-bold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-3 text-2xl font-bold">{service.title}</h3>
                <p className="mt-3 text-muted">{service.description}</p>
                <ul className="mt-6 space-y-2.5">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
