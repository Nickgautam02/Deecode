"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "bg-background/85 backdrop-blur-md border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="font-display text-xl font-bold tracking-tight">
          {site.name}
          <span className="text-accent">.</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-background transition-transform hover:scale-105"
          >
            Let&apos;s Talk
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-0.5 w-6 bg-foreground transition-transform ${open ? "translate-y-1 rotate-45" : ""}`}
          />
          <span
            className={`h-0.5 w-6 bg-foreground transition-transform ${open ? "-translate-y-1 -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {open && (
        <div className="border-t border-line px-5 pb-6 pt-2 md:hidden">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-lg text-muted transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-3 inline-block rounded-full bg-accent px-6 py-2.5 font-semibold text-background"
          >
            Let&apos;s Talk
          </a>
        </div>
      )}
    </header>
  );
}
