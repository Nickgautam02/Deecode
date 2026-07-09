import Reveal from "./Reveal";

export default function SectionHeading({
  kicker,
  title,
  sub,
}: {
  kicker: string;
  title: string;
  sub?: string;
}) {
  return (
    <Reveal className="mb-14">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
        {kicker}
      </p>
      <h2 className="font-display max-w-2xl text-4xl font-bold tracking-tight md:text-5xl">
        {title}
      </h2>
      {sub && <p className="mt-4 max-w-xl text-muted">{sub}</p>}
    </Reveal>
  );
}
