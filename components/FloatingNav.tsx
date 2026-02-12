"use client";

import { useEffect, useState } from "react";

export default function FloatingNav({ data }: { data?: any }) {
  const nav = data?.floatingNav;
  const links = data?.navigationLinks ?? [];
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const enabled = nav?.enabled ?? true;
  const transparentUntilScroll = nav?.transparentUntilScroll ?? true;
  const useBackdrop = nav?.backdrop ?? true;

  if (!enabled) return null;

  return (
    <header
      data-testid="floating-nav"
      className={`fixed left-0 right-0 top-4 z-50 mx-auto max-w-7xl px-4 sm:px-6 transition-all duration-300 ${
        transparentUntilScroll && !scrolled ? "bg-transparent" : "bg-[color:var(--color-background-card)]"
      } ${useBackdrop && (transparentUntilScroll && !scrolled ? "" : "backdrop-blur-sm/10")} rounded-md shadow-sm`}
      style={{ marginLeft: "auto", marginRight: "auto" }}
    >
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center gap-4">
          <a href={nav?.logoHref ?? '/'} className="font-semibold text-lg text-[color:var(--color-textPrimary)]">
            {nav?.logoText ?? data?.brandPalette?.brandName ?? 'MASH'}
          </a>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((l: any) => (
            <a key={l.href + l.label} href={l.href} className="text-sm text-[color:var(--color-textSecondary)] hover:text-[color:var(--color-textPrimary)]">
              {l.label}
            </a>
          ))}
          {nav?.ctaButtons?.map((b: any) => (
            <a key={b.href + b.text} href={b.href} className={`px-3 py-2 rounded ${b.variant === 'outline' ? 'border' : 'bg-[color:var(--color-primary)] text-white'}`}>
              {b.text}
            </a>
          ))}
        </nav>

        <div className="md:hidden">
          <button aria-label="menu" data-testid="menu-toggle" onClick={() => setOpen(!open)} className="p-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div data-testid="mobile-drawer" className="md:hidden mt-2 pb-4">
          <div className="flex flex-col gap-3">
            {links.map((l: any) => (
              <a key={l.href + l.label} href={l.href} onClick={() => setOpen(false)} className="px-2 py-2 rounded text-[color:var(--color-textPrimary)]">
                {l.label}
              </a>
            ))}
            {nav?.ctaButtons?.map((b: any) => (
              <a key={b.href + b.text} href={b.href} onClick={() => setOpen(false)} className="px-3 py-2 rounded bg-[color:var(--color-primary)] text-white">
                {b.text}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
