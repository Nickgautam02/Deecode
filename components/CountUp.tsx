"use client";

import { useLayoutEffect, useRef } from "react";

export default function CountUp({
  value,
  suffix = "",
  decimals = 0,
  duration = 1600,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  // The server-rendered HTML carries the real figure — it is what crawlers
  // and no-JS readers get, and it used to say "0+" for every stat. The
  // count-up then runs on the text node directly rather than through state:
  // it drops to 0 before first paint (every caller sits inside a <Reveal>,
  // still at opacity 0 by then, so the final number never flashes).
  useLayoutEffect(() => {
    const text = ref.current?.firstChild;
    if (!text) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const format = (n: number) => `${n.toFixed(decimals)}${suffix}`;
    text.nodeValue = format(0);

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          text.nodeValue = format(value * eased);
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(ref.current!);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      text.nodeValue = format(value);
    };
  }, [value, suffix, decimals, duration]);

  return <span ref={ref}>{`${value.toFixed(decimals)}${suffix}`}</span>;
}
