import { site } from "@/content/site";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const AVATAR_GRADIENTS = [
  "from-lime-400/80 to-emerald-600/80",
  "from-fuchsia-400/80 to-purple-700/80",
  "from-amber-300/80 to-orange-600/80",
  "from-sky-400/80 to-indigo-600/80",
];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
}

export default function Creators() {
  return (
    <section id="creators" className="scroll-mt-20 py-10 md:py-16">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          kicker="Creator roster"
          title={
            <>
              Our Top Creators.
              <br />
              <span className="text-accent">Every niche that matters.</span>
            </>
          }
          sub="A hand-picked roster across tech, fashion, comedy, fitness, finance and more — matched to your brand by data, not guesswork."
        />

        <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
          {site.creators.map((creator, i) => (
            <Reveal key={creator.name} delay={(i % 3) * 80} className="h-full">
              <article className="group card-hover flex h-full flex-col items-center rounded-2xl border border-line bg-card p-5 text-center">
                {creator.image ? (
                  <img
                    src={creator.image}
                    alt={creator.name}
                    width={100}
                    height={100}
                    loading="lazy"
                    className="mx-auto h-20 w-20 rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div
                    className={`font-display mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br text-2xl font-bold text-background transition-transform duration-300 group-hover:scale-110 ${AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length]}`}
                  >
                    {initials(creator.name)}
                  </div>
                )}
                <h3 className="font-display mt-4 font-bold">{creator.name}</h3>
                <p className="mt-1 text-xs text-muted">{creator.niche}</p>
                <p className="mt-auto pt-3 text-sm">
                  <span className="font-semibold text-accent">{creator.followers}</span>{" "}
                  <span className="text-muted">on {creator.platform}</span>
                </p>
                <p className="mt-1 text-xs text-muted">📍 {creator.location}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <a
            href="#contact"
            className="inline-block rounded-full border border-line px-7 py-3 font-semibold transition-colors hover:border-accent hover:text-accent"
          >
            Work with our creators →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
