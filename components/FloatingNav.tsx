"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const DEFAULT_LINKS = [
  { label: "Features", href: "/#features" },
  { label: "Demo", href: "/#demo" },
  { label: "Documentation", href: "/documentation" },
  { label: "Download", href: "/#download" },
  { label: "Contact", href: "/#booking" },
];

export default function FloatingNav({ data }: { data?: any }) {
  const nav = data?.floatingNav;
  const links = data?.navigationLinks?.length ? data.navigationLinks : DEFAULT_LINKS;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Check reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on Escape key
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleSmoothScroll = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      const hashPart = href.includes("#") ? href.split("#")[1] : null;
      if (hashPart && pathname === "/") {
        e.preventDefault();
        const el = document.getElementById(hashPart);
        if (el) {
          el.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
        }
        setOpen(false);
      }
    },
    [pathname, reducedMotion]
  );

  const isActive = useCallback(
    (href: string) => {
      if (href === "/") return pathname === "/";
      if (href.startsWith("/#")) return pathname === "/";
      return pathname.startsWith(href.split("#")[0]);
    },
    [pathname]
  );

  const enabled = nav?.enabled ?? true;
  const transparentUntilScroll = nav?.transparentUntilScroll ?? true;
  const useBackdrop = nav?.backdrop ?? true;
  const showScrollProgress = nav?.showScrollProgress ?? true;
  const showThemeToggle = nav?.showThemeToggle ?? true;
  const logoText = nav?.logoText ?? data?.brandPalette?.brandName ?? "MASH";
  const logoHref = nav?.logoHref ?? "/";
  const ctaButtons = nav?.ctaButtons ?? [
    { text: "Download App", href: "/download", variant: "default" },
  ];

  if (!enabled) return null;

  const isTransparent = transparentUntilScroll && !scrolled;

  return (
    <>
      {/* Skip to content link */}
      <a
        href="#main-content"
        data-testid="skip-to-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-green-600 focus:text-white focus:outline-none"
      >
        Skip to content
      </a>

      <header
        data-testid="floating-nav"
        role="navigation"
        aria-label="Main navigation"
        className={[
          "fixed left-0 right-0 top-3 z-50 mx-4 sm:mx-6",
          "transition-all duration-300 ease-in-out",
          isTransparent
            ? "bg-transparent border border-transparent shadow-none"
            : "bg-[color:var(--color-background-navigation)] border border-[color:var(--color-border)] shadow-md",
          useBackdrop && !isTransparent ? "backdrop-blur-md" : "",
          scrolled ? "rounded-2xl" : "rounded-2xl",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link
              href={logoHref}
              className="text-xl font-bold text-green-600 dark:text-green-400 hover:opacity-80 transition-opacity"
            >
              {logoText}
            </Link>

            {/* Desktop nav links */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Desktop navigation">
              {links.map((link: any, i: number) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href + link.label}
                    href={link.href}
                    onClick={(e) =>
                      link.href.includes("#")
                        ? handleSmoothScroll(e, link.href)
                        : undefined
                    }
                    aria-current={active ? "page" : undefined}
                    className={[
                      "relative px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                      active
                        ? "text-green-600 dark:text-green-400"
                        : "text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)]",
                    ].join(" ")}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId={reducedMotion ? undefined : "nav-underline"}
                        data-testid="active-underline"
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-green-600 dark:bg-green-400 rounded-full"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop right side: theme toggle + CTA */}
            <div className="hidden md:flex items-center gap-3">
              {showThemeToggle && <ThemeToggle />}
              {ctaButtons.map((btn: any) => (
                <Link
                  key={btn.href + btn.text}
                  href={btn.href}
                  className={[
                    "px-4 py-2 text-sm font-medium rounded-full transition-colors",
                    btn.variant === "outline"
                      ? "border border-green-600 dark:border-green-400 text-green-600 dark:text-green-400 hover:bg-green-600 hover:text-white dark:hover:bg-green-400 dark:hover:text-gray-900"
                      : "bg-green-600 text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600",
                  ].join(" ")}
                >
                  {btn.text}
                </Link>
              ))}
            </div>

            {/* Mobile: theme toggle + hamburger */}
            <div className="flex items-center gap-2 md:hidden">
              {showThemeToggle && <ThemeToggle />}
              <button
                ref={toggleRef}
                data-testid="menu-toggle"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                aria-label={open ? "Close menu" : "Open menu"}
                className="relative w-10 h-10 flex items-center justify-center rounded-lg text-[color:var(--color-text-primary)] hover:bg-[color:var(--color-surface-hover)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
              >
                <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
                <div className="w-5 h-4 flex flex-col justify-between" aria-hidden="true">
                  <span
                    className={[
                      "block h-0.5 w-5 bg-current rounded-full transition-transform duration-300 origin-center",
                      open ? "translate-y-[7px] rotate-45" : "",
                    ].join(" ")}
                  />
                  <span
                    className={[
                      "block h-0.5 w-5 bg-current rounded-full transition-opacity duration-300",
                      open ? "opacity-0" : "opacity-100",
                    ].join(" ")}
                  />
                  <span
                    className={[
                      "block h-0.5 w-5 bg-current rounded-full transition-transform duration-300 origin-center",
                      open ? "-translate-y-[7px] -rotate-45" : "",
                    ].join(" ")}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Scroll progress bar */}
        {showScrollProgress && (
          <motion.div
            data-testid="scroll-progress"
            className="absolute bottom-0 left-0 right-0 h-0.5 origin-left bg-green-600 dark:bg-green-400"
            style={{ scaleX }}
          />
        )}
      </header>

      {/* Mobile drawer overlay */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              data-testid="drawer-backdrop"
              initial={reducedMotion ? undefined : { opacity: 0 }}
              animate={reducedMotion ? undefined : { opacity: 1 }}
              exit={reducedMotion ? undefined : { opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            {/* Drawer */}
            <motion.div
              ref={drawerRef}
              data-testid="mobile-drawer"
              initial={reducedMotion ? undefined : { opacity: 0, y: -16 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -16 }}
              transition={{ duration: 0.2 }}
              className="fixed top-20 left-4 right-4 z-50 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-background)] shadow-xl md:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
            >
              <div className="flex flex-col p-4 gap-1">
                {links.map((link: any) => {
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.href + link.label}
                      href={link.href}
                      onClick={(e) => {
                        if (link.href.includes("#")) {
                          handleSmoothScroll(e, link.href);
                        }
                        setOpen(false);
                      }}
                      aria-current={active ? "page" : undefined}
                      className={[
                        "block px-4 py-3 rounded-lg text-base font-medium transition-colors",
                        active
                          ? "text-green-600 dark:text-green-400 bg-[color:var(--color-surface)]"
                          : "text-[color:var(--color-text-primary)] hover:bg-[color:var(--color-surface-hover)]",
                      ].join(" ")}
                    >
                      {link.label}
                    </Link>
                  );
                })}//
                <div className="mt-3 pt-3 border-t border-[color:var(--color-border)] flex flex-col gap-2">
                  {ctaButtons.map((btn: any) => (
                    <Link
                      key={btn.href + btn.text}
                      href={btn.href}
                      onClick={() => setOpen(false)}
                      className="block text-center px-4 py-3 rounded-full bg-green-600 text-white font-medium hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 transition-colors"
                    >
                      {btn.text}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
