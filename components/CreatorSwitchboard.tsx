"use client";

import { useCallback, useEffect, useRef } from "react";

export type WireFace = {
  name: string;
  image: string;
  meta: string;
};

/* The one claim this page is built to make — that brands and creators meet
   here — drawn rather than asserted. Brand chips and creator faces are real
   DOM nodes; the canvas only joins their measured positions, so the wiring
   stays correct through reflow, font loading and window resize.

   Below `md` the two columns stack, where connector lines would be
   meaningless, so the canvas is hidden and never drawn. */
const MOBILE_BREAKPOINT = 768;

export default function CreatorSwitchboard({
  brands,
  faces,
  caption,
}: {
  brands: readonly string[];
  faces: readonly WireFace[];
  caption: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  const draw = useCallback(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const hub = hubRef.current;
    if (!wrap || !canvas || !hub) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = wrap.clientWidth;
    const h = wrap.clientHeight;
    if (!w || !h || window.innerWidth < MOBILE_BREAKPOINT) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const base = wrap.getBoundingClientRect();
    const hr = hub.getBoundingClientRect();
    const hubY = hr.top + hr.height / 2 - base.top;
    const hubLeft = { x: hr.left - base.left, y: hubY };
    const hubRight = { x: hr.right - base.left, y: hubY };

    // Read the accent straight off the theme so the wiring follows any
    // change to --accent in app/globals.css.
    const accent =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim() || "#877bf2";

    ctx.lineWidth = 1;
    ctx.lineCap = "round";
    ctx.strokeStyle = accent;

    const anchors = (col: HTMLDivElement | null, edge: "right" | "left") =>
      col
        ? Array.from(col.querySelectorAll<HTMLElement>("[data-node]")).map(
            (node) => {
              const r = node.getBoundingClientRect();
              return {
                x: (edge === "right" ? r.right : r.left) - base.left,
                y: r.top + r.height / 2 - base.top,
              };
            },
          )
        : [];

    type Pt = { x: number; y: number };
    const lerp = (a: Pt, b: Pt, t: number): Pt => ({
      x: a.x + (b.x - a.x) * t,
      y: a.y + (b.y - a.y) * t,
    });

    /* Draws the first `t` of the connector. The partial curve is produced by
       splitting the bezier with de Casteljau rather than by pulling its end
       point back along a straight line — moving the end while keeping the
       original control points bends the curve into a shape it never has at
       rest, which reads as broken wiring on any frame before the last. */
    const curve = (from: Pt, to: Pt, t: number) => {
      const bend = (to.x - from.x) * 0.55;
      const p0 = from;
      const p1 = { x: from.x + bend, y: from.y };
      const p2 = { x: to.x - bend, y: to.y };
      const p3 = to;

      const a = lerp(p0, p1, t);
      const b = lerp(p1, p2, t);
      const c = lerp(p2, p3, t);
      const d = lerp(a, b, t);
      const e = lerp(b, c, t);
      const end = lerp(d, e, t);

      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.bezierCurveTo(a.x, a.y, d.x, d.y, end.x, end.y);
      ctx.stroke();
    };

    const p = progressRef.current;

    // Brands wire in first, faces follow — the direction the business runs in.
    ctx.globalAlpha = 0.45;
    anchors(leftRef.current, "right").forEach((a, i) => {
      const t = Math.max(0, Math.min(1, p * 2 - i * 0.06));
      if (t > 0) curve({ x: a.x + 6, y: a.y }, hubLeft, t);
    });

    ctx.globalAlpha = 0.6;
    anchors(rightRef.current, "left").forEach((a, i) => {
      const t = Math.max(0, Math.min(1, (p - 0.35) * 2.4 - i * 0.05));
      if (t > 0) curve(hubRight, { x: a.x - 6, y: a.y }, t);
    });

    ctx.globalAlpha = 1;
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    let frame = 0;

    if (reduced) {
      progressRef.current = 1;
      draw();
    } else {
      const tick = () => {
        progressRef.current = Math.min(1, progressRef.current + 0.022);
        draw();
        if (progressRef.current < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }

    const observer = new ResizeObserver(() => draw());
    observer.observe(wrap);

    // Web fonts land after first paint and shift the chips, so re-measure.
    if (document.fonts?.ready) void document.fonts.ready.then(() => draw());

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [draw]);

  return (
    <div className="mt-12 md:mt-16">
      <div
        ref={wrapRef}
        className="relative grid items-center justify-items-center gap-6 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-8 lg:gap-14"
      >
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
        />

        {/* Brands */}
        <div
          ref={leftRef}
          className="relative z-10 flex flex-wrap justify-center gap-2.5 md:flex-col md:items-start md:gap-2.5"
        >
          {brands.map((brand) => (
            <span
              key={brand}
              data-node
              className="whitespace-nowrap rounded-full border border-line bg-card px-3.5 py-1.5 text-xs uppercase tracking-wider"
            >
              {brand}
            </span>
          ))}
        </div>

        {/* Hub */}
        <div
          ref={hubRef}
          className="relative z-10 grid aspect-square w-28 place-items-center rounded-full border border-accent bg-card p-2 text-center md:w-24 lg:w-[7.5rem]"
          style={{
            boxShadow:
              "0 0 0 6px color-mix(in srgb, var(--accent) 14%, transparent)",
          }}
        >
          <div>
            <p className="font-display text-[0.8125rem] font-extrabold uppercase leading-tight tracking-widest">
              Deecode
            </p>
            <p className="mt-0.5 text-[0.5625rem] uppercase tracking-[0.12em] text-muted">
              600+ creators
            </p>
          </div>
        </div>

        {/* Creators */}
        <div
          ref={rightRef}
          className="relative z-10 flex flex-wrap justify-center gap-2.5 md:flex-col md:items-end md:gap-2.5"
        >
          {faces.map((face) => (
            <div
              key={face.name}
              data-node
              className="flex flex-row-reverse items-center gap-3 rounded-full border border-line bg-card py-1.5 pl-4 pr-1.5"
            >
              <img
                src={face.image}
                alt={face.name}
                width={38}
                height={38}
                loading="lazy"
                className="h-[38px] w-[38px] rounded-full object-cover"
              />
              <div className="text-right leading-tight">
                <p className="font-display whitespace-nowrap text-[0.8125rem] font-semibold">
                  {face.name}
                </p>
                <p className="text-[0.625rem] uppercase tracking-[0.08em] text-muted">
                  {face.meta}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-7 text-center text-[0.6875rem] uppercase tracking-[0.1em] text-muted">
        {caption}
      </p>
    </div>
  );
}
