"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Menu, X, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LandingPageData } from "@/lib/sanity";

const DEFAULT_LINKS = [
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/documentation", label: "Docs" },
  { href: "/schedule", label: "Schedule" },
  { href: "/support", label: "Support" },
];

const SECTION_IDS = ["features", "how-it-works", "schedule", "support"];

export default function Navigation({ data }: { data?: LandingPageData | null } = {}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const pathname = usePathname();

  // Smart hide: hide on scroll down, show on scroll up
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setIsScrolled(currentScrollY > 10);
          setIsHidden(currentScrollY > lastScrollY && currentScrollY > 80);
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracking via Intersection Observer
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
        { rootMargin: "-40% 0px -50% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [pathname]);

  const handleSmoothScroll = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
      if (pathname === "/") {
        e.preventDefault();
        const element = document.querySelector(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          setIsMenuOpen(false);
        }
      }
    },
    [pathname]
  );

  const isActive = (href: string) => {
    if (href.startsWith("/#")) {
      return activeSection === href.substring(2);
    }
    return pathname === href;
  };

  const navLinks = data?.navigationLinks ?? DEFAULT_LINKS;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "glass-nav shadow-sm"
          : "bg-transparent",
        isHidden && !isMenuOpen ? "-translate-y-full" : "translate-y-0"
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 dark:from-green-400 dark:to-emerald-300 bg-clip-text text-transparent">
              {data?.navigationBrand ?? "MASH"}
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) =>
                  link.href.startsWith("/#")
                    ? handleSmoothScroll(e, link.href.substring(1))
                    : undefined
                }
                className={cn(
                  "relative px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  isActive(link.href)
                    ? "text-green-600 dark:text-green-400"
                    : "text-secondary hover:text-primary"
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-green-500" />
                )}
              </Link>
            ))}
            <div className="ml-2 flex items-center gap-2">
              <ThemeToggle />
              <Link
                href="/download"
                className="inline-flex items-center gap-1.5 bg-gradient-to-r from-green-500 to-emerald-400 hover:from-green-600 hover:to-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <Download className="w-3.5 h-3.5" />
                Download
              </Link>
            </div>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center md:hidden gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-secondary hover:text-primary hover:bg-white/10 transition-colors"
              aria-expanded={isMenuOpen}
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu with slide animation */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="glass-nav border-t border-white/10 dark:border-white/5 px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => {
                if (link.href.startsWith("/#")) {
                  handleSmoothScroll(e, link.href.substring(1));
                }
                setIsMenuOpen(false);
              }}
              className={cn(
                "block px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                isActive(link.href)
                  ? "text-green-600 dark:text-green-400 bg-green-500/10"
                  : "text-secondary hover:text-primary hover:bg-white/5"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/download"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center justify-center gap-1.5 mx-3 my-2 bg-gradient-to-r from-green-500 to-emerald-400 text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-md"
          >
            <Download className="w-3.5 h-3.5" />
            Download
          </Link>
        </div>
      </div>
    </nav>
  );
}
