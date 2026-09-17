"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ArrowUp } from "lucide-react";

const DEFAULT_LINKS = [
  { label: "Features", href: "/#features" },
  { label: "Mobile App", href: "/#mobile-app" },
  { label: "Hardware", href: "/#iot-device" },
  { label: "Schedule", href: "/#booking" },
  { label: "Download", href: "/#download" },
  { label: "Documentation", href: "/documentation" },
];

/** Section IDs for scroll-spy (must match hash links above) */
const SECTION_IDS = ["features", "mobile-app", "iot-device", "booking", "download"];

export default function FloatingNav({ data }: { data?: any }) {
  const nav = data?.floatingNav;
  const links = data?.navigationLinks?.length ? data.navigationLinks : DEFAULT_LINKS;
  const [scrolled, setScrolled] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
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

  // Scroll detection (nav + back-to-top)
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowTopBtn(window.scrollY > 500);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: IntersectionObserver for homepage sections
  useEffect(() => {
    if (pathname !== "/") return;
    const observers: IntersectionObserver[] = [];
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [pathname]);

  // Close drawer on Escape key + focus trap
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      // Focus trap
      if (e.key === "Tab" && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
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
      // On homepage, use scroll-spy for hash links
      if (pathname === "/" && href.startsWith("/#") && activeSection) {
        const hash = href.split("#")[1];
        return hash === activeSection;
      }
      if (href === "/") return pathname === "/";
      if (href.startsWith("/#")) return false;
      return pathname.startsWith(href.split("#")[0]);
    },
    [pathname, activeSection]
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

  // Nav is transparent only when: config allows it AND not scrolled AND drawer is closed
  const isTransparent = transparentUntilScroll && !scrolled && !open;

  return (
    <>
      {/* Skip to content */}
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
        className={`fixed top-0 inset-x-0 z-50 border-b transition-all duration-300 ease-out ${
          isTransparent
            ? "bg-transparent border-transparent"
            : `bg-navigation ${useBackdrop ? "backdrop-blur-xl" : ""} border-default shadow-sm`
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link
              href={logoHref}
              className="text-xl font-bold tracking-tight text-green-600 dark:text-green-400 hover:opacity-80 transition-opacity"
            >
              {logoText}
            </Link>

            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Desktop navigation">
              {links.map((link: any) => {
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
                    className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      active
                        ? "text-green-600 dark:text-green-400"
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId={reducedMotion ? undefined : "nav-underline"}
                        data-testid="active-underline"
                        className="absolute bottom-0 inset-x-3 h-0.5 rounded-full bg-green-600 dark:bg-green-400"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop right side */}
            <div className="hidden md:flex items-center gap-3">
              {showThemeToggle && <ThemeToggle />}
              {ctaButtons.map((btn: any) => (
                <Link
                  key={btn.href + btn.text}
                  href={btn.href}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    btn.variant === "outline"
                      ? "border border-green-600 dark:border-green-400 text-green-600 dark:text-green-400 hover:bg-green-600/10 dark:hover:bg-green-400/10"
                      : "bg-green-600 text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                  }`}
                >
                  {btn.text}
                </Link>
              ))}
            </div>

            {/* Mobile controls */}
            <div className="flex items-center gap-2 md:hidden">
              {showThemeToggle && <ThemeToggle />}
              <button
                ref={toggleRef}
                data-testid="menu-toggle"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                aria-label={open ? "Close menu" : "Open menu"}
                className="relative w-10 h-10 flex items-center justify-center rounded-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
              >
                <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
                <div className="w-5 h-4 flex flex-col justify-between" aria-hidden="true">
                  <span
                    className={`block h-0.5 w-5 bg-current rounded-full transition-transform duration-300 origin-center ${
                      open ? "translate-y-[7px] rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-5 bg-current rounded-full transition-opacity duration-300 ${
                      open ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-5 bg-current rounded-full transition-transform duration-300 origin-center ${
                      open ? "-translate-y-[7px] -rotate-45" : ""
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Scroll progress indicator */}
        {showScrollProgress && (
          <motion.div
            data-testid="scroll-progress"
            className="absolute bottom-0 left-0 right-0 h-0.5 origin-left bg-green-600 dark:bg-green-400"
            style={{ scaleX }}
          />
        )}
      </header>

      {/* Mobile navigation drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              data-testid="drawer-backdrop"
              initial={reducedMotion ? undefined : { opacity: 0 }}
              animate={reducedMotion ? undefined : { opacity: 1 }}
              exit={reducedMotion ? undefined : { opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40 md:hidden"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              ref={drawerRef}
              data-testid="mobile-drawer"
              initial={reducedMotion ? undefined : { opacity: 0, y: -8 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="fixed top-16 inset-x-0 z-50 border-t border-default bg-navigation backdrop-blur-xl shadow-lg md:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
                <div className="flex flex-col gap-1">
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
                        className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                          active
                            ? "text-green-600 dark:text-green-400 bg-gray-100 dark:bg-gray-800"
                            : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 flex flex-col gap-2">
                  {ctaButtons.map((btn: any) => (
                    <Link
                      key={btn.href + btn.text}
                      href={btn.href}
                      onClick={() => setOpen(false)}
                      className="block text-center px-4 py-3 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 transition-colors"
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

      {/* Back-to-top button */}
      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            data-testid="back-to-top"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" })}
            className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 transition-colors flex items-center justify-center focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
