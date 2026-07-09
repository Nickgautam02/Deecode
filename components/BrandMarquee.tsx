import { site } from "@/content/site";

export default function BrandMarquee() {
  // Track is duplicated so the CSS loop (-50%) is seamless.
  const items = [...site.brands, ...site.brands];

  return (
    <section aria-label="Brands we've worked with" className="border-y border-line py-8">
      <div className="overflow-hidden">
        <div className="marquee-track flex w-max items-center gap-16 pr-16">
          {items.map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              className="font-display whitespace-nowrap text-xl font-semibold text-muted/60"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
