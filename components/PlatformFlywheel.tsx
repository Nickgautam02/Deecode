"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

/* Heptagon with straight edges and small rounded corners: stacking
   slightly-rotated copies makes the lines braid and pinch at the
   vertices, like a spirograph wireframe. */
function roundedPolygonPath(
  cx: number,
  cy: number,
  r: number,
  sides: number,
  cornerR: number,
) {
  const pts = Array.from({ length: sides }, (_, i) => {
    const a = ((-90 + (360 / sides) * i) * Math.PI) / 180;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  });
  const toward = (from: number[], to: number[], dist: number) => {
    const dx = to[0] - from[0];
    const dy = to[1] - from[1];
    const len = Math.hypot(dx, dy);
    return [from[0] + (dx / len) * dist, from[1] + (dy / len) * dist];
  };
  let d = "";
  for (let i = 0; i < sides; i++) {
    const prev = pts[(i - 1 + sides) % sides];
    const next = pts[(i + 1) % sides];
    const inPt = toward(pts[i], prev, cornerR);
    const outPt = toward(pts[i], next, cornerR);
    d += i === 0 ? `M ${inPt.join(" ")}` : ` L ${inPt.join(" ")}`;
    d += ` Q ${pts[i].join(" ")} ${outPt.join(" ")}`;
  }
  return d + " Z";
}

const WHEEL_PATH = roundedPolygonPath(200, 200, 152, 7, 16);
const RING_COUNT = 11;
// Wide spread makes the copies fan apart mid-edge and knot at the
// corners — the braided look of the reference. Must stay below the
// 51.4° vertex gap or the heptagon silhouette washes out.
const RING_SPREAD = 40;
// Each copy also shrinks slightly, which spaces the lines evenly
// instead of letting them bunch into a rope.
const RING_SHRINK = 0.016;

const ICON_PATHS: Record<string, string> = {
  instagram:
    "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.35 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.35-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.35-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.35 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.88 5.88 0 0 0-2.13 1.38A5.88 5.88 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.8.72 1.47 1.38 2.13a5.88 5.88 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.88 5.88 0 0 0 2.13-1.38 5.88 5.88 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.88 5.88 0 0 0-1.38-2.13A5.88 5.88 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z",
  youtube:
    "M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z",
  x: "M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.41z",
  linkedin:
    "M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z",
  tiktok:
    "M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
  facebook:
    "M24 12.07C24 5.44 18.63.07 12 .07S0 5.44 0 12.07c0 5.99 4.39 10.95 10.13 11.85v-8.38H7.08v-3.47h3.05V9.43c0-3.01 1.79-4.67 4.53-4.67 1.31 0 2.69.23 2.69.23v2.96h-1.51c-1.49 0-1.96.92-1.96 1.87v2.25h3.33l-.53 3.47h-2.8v8.38C19.61 23.02 24 18.06 24 12.07z",
  reddit:
    "M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.74c.69 0 1.25.56 1.25 1.25a1.25 1.25 0 0 1-2.5.06l-2.6-.55-.8 3.75c1.83.07 3.48.63 4.68 1.49.3-.31.73-.49 1.2-.49.97 0 1.76.79 1.76 1.75 0 .72-.44 1.33-1.01 1.61.03.17.04.35.04.52 0 2.7-3.13 4.87-7 4.87-3.88 0-7-2.17-7-4.87 0-.18.01-.37.04-.53A1.75 1.75 0 0 1 4.03 12c0-.97.79-1.75 1.75-1.75.46 0 .9.2 1.21.49 1.2-.88 2.88-1.43 4.74-1.49l.89-4.18a.34.34 0 0 1 .14-.2.35.35 0 0 1 .24-.04l2.9.62c.2-.42.63-.71 1.11-.71zM9.25 12c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25S9.94 12 9.25 12zm5.5 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25S15.44 12 14.75 12zm-5.47 3.99a.33.33 0 0 0-.23.1.33.33 0 0 0 0 .46c.84.84 2.49.91 2.96.91.48 0 2.11-.06 2.96-.91a.36.36 0 0 0 .03-.46.33.33 0 0 0-.46 0c-.55.53-1.69.73-2.51.73-.83 0-1.98-.2-2.51-.73a.33.33 0 0 0-.24-.1z",
};

/* One node per platform, spaced around the wheel. `tile` is the chip
   background; `glyph` the icon color. */
const NODES = [
  { platform: "Instagram", format: "Reels & Carousels", icon: "instagram", tile: "linear-gradient(45deg,#f9ce34,#ee2a7b,#6228d7)", glyph: "#ffffff" },
  { platform: "YouTube", format: "Shorts & Videos", icon: "youtube", tile: "#ffffff", glyph: "#ff0000" },
  { platform: "TikTok", format: "Videos", icon: "tiktok", tile: "#1c1c1e", glyph: "#ffffff" },
  { platform: "Reddit", format: "Threads", icon: "reddit", tile: "#ff4500", glyph: "#ffffff" },
  { platform: "Facebook", format: "Reels & Posts", icon: "facebook", tile: "#1877f2", glyph: "#ffffff" },
  { platform: "X / Twitter", format: "Posts", icon: "x", tile: "#1c1c1e", glyph: "#ffffff" },
  { platform: "LinkedIn", format: "Posts & Carousels", icon: "linkedin", tile: "#0a66c2", glyph: "#ffffff" },
];

export default function PlatformFlywheel() {
  const wheelRef = useRef<HTMLDivElement>(null);
  const [chipsVisible, setChipsVisible] = useState(false);

  useEffect(() => {
    const wheel = wheelRef.current;
    if (!wheel) return;

    // Stagger the platform chips in when the wheel scrolls into view,
    // and hide them again when it scrolls out — the reveal replays on
    // every pass, in both directions.
    const observer = new IntersectionObserver(
      ([entry]) => setChipsVisible(entry.isIntersecting),
      { threshold: 0.4 },
    );
    observer.observe(wheel);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="platforms" className="scroll-mt-20 overflow-hidden bg-card/40 py-10 md:py-16">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          kicker="Content flywheel"
          title={
            <>
              One idea.
              <br />
              <span className="text-accent">Every feed.</span>
              <br />
              Every format.
            </>
          }
          sub="We build bulletproof content flywheels for brands and creators — high-volume content engineered to grow on every platform at once."
        />

        <Reveal>
          <div
            ref={wheelRef}
            className="flywheel relative mx-auto flex h-[320px] w-[320px] max-w-full items-center justify-center md:h-[640px] md:w-[640px]"
          >
            {/* spirograph wireframe */}
            <svg
              viewBox="0 0 400 400"
              className="flywheel-wheel absolute h-[280px] w-[280px] md:h-[540px] md:w-[540px]"
              aria-hidden
            >
              <defs>
                <linearGradient id="fw-rainbow" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#b8cc4e" />
                  <stop offset="28%" stopColor="#7fbf9e" />
                  <stop offset="50%" stopColor="#7f9fe8" />
                  <stop offset="70%" stopColor="#9a6fd8" />
                  <stop offset="87%" stopColor="#d1417f" />
                  <stop offset="100%" stopColor="#b01555" />
                </linearGradient>
              </defs>
              {Array.from({ length: RING_COUNT }, (_, i) => (
                <path
                  key={i}
                  d={WHEEL_PATH}
                  fill="none"
                  stroke="url(#fw-rainbow)"
                  strokeWidth="1"
                  opacity="0.95"
                  transform={`rotate(${(RING_SPREAD / RING_COUNT) * i} 200 200) translate(200 200) scale(${1 - RING_SHRINK * i}) translate(-200 -200)`}
                />
              ))}
            </svg>

            {/* centre label */}
            <p className="relative z-10 text-center font-sans text-2xl font-medium leading-snug md:text-4xl">
              Content
              <br />
              Flywheel
            </p>

            {/* platform chips at the wheel's vertices */}
            {NODES.map((node, i) => {
              const angle = -90 + (360 / NODES.length) * i;
              const onLeft = Math.cos((angle * Math.PI) / 180) < -0.2;
              // enter first-to-last; exit cascades in reverse — same rhythm
              const delay = chipsVisible
                ? `${150 + i * 120}ms`
                : `${(NODES.length - 1 - i) * 120}ms`;
              return (
                <div
                  key={node.platform}
                  className={`flywheel-item absolute left-1/2 top-1/2 z-10 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    chipsVisible ? "opacity-100" : "opacity-0"
                  }`}
                  style={
                    {
                      "--angle": `${angle}deg`,
                      transitionDelay: delay,
                    } as React.CSSProperties
                  }
                >
                  <div
                    className={`relative -translate-x-1/2 -translate-y-1/2 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      chipsVisible ? "scale-100" : "scale-0"
                    }`}
                    style={{ transitionDelay: delay }}
                  >
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-2xl shadow-lg transition-transform duration-300 hover:scale-110 md:h-14 md:w-14"
                      style={{ background: node.tile }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill={node.glyph}
                        className="h-5 w-5 md:h-7 md:w-7"
                        aria-hidden
                      >
                        <path d={ICON_PATHS[node.icon]} />
                      </svg>
                    </span>
                    <span
                      className={`absolute top-1/2 hidden w-max -translate-y-1/2 leading-tight md:block ${
                        onLeft ? "right-full mr-3 text-right" : "left-full ml-3"
                      }`}
                    >
                      <span className="block text-[15px] font-bold">{node.platform}</span>
                      <span className="block text-xs text-muted">{node.format}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
