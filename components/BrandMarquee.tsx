import { site } from "@/content/site";

export default function BrandMarquee() {
  // Track is duplicated so the CSS loop (-50%) is seamless.
  const items = [...site.brands, ...site.brands];

  return (
    <section aria-label="Brands we've worked with" className="border-y border-line py-10">
      <p className="mb-7 text-center text-xs font-semibold uppercase tracking-[0.25em] text-muted">
        Trusted by brands you know
      </p>
      <div className="marquee-mask overflow-hidden">
        <div className="marquee-track flex w-max items-center pr-10">
          {items.map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              className="font-display mr-16 whitespace-nowrap text-xl font-semibold text-foreground/80 transition-colors hover:text-accent md:mr-20 md:text-2xl"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
