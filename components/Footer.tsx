import { site } from "@/content/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-card/40">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-display text-2xl font-bold">
              {site.name}
              <span className="text-accent">.</span>
            </p>
            <p className="mt-3 max-w-sm text-sm text-muted">{site.tagline}</p>
            <div className="mt-6 flex gap-4">
              {Object.entries(site.socials).map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm capitalize text-muted transition-colors hover:text-accent"
                >
                  {label}
                </a>
              ))}
              <a
                href={`mailto:${site.email}`}
                className="text-sm capitalize text-muted transition-colors hover:text-accent"
              >
                Mail
              </a>
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Explore
            </p>
            <ul className="space-y-2.5 text-sm">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-muted transition-colors hover:text-foreground">
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contact" className="text-muted transition-colors hover:text-foreground">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Get in touch
            </p>
            <ul className="space-y-2.5 text-sm text-muted">
              <li>
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-foreground">
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-foreground"
                >
                  {site.phone}
                </a>
              </li>
              <li>{site.address}</li>
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t border-line pt-6 text-xs text-muted">
          © {year} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
