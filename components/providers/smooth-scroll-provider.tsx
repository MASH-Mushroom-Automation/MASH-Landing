"use client";

import { useEffect } from "react";

/**
 * SmoothScrollProvider sets up CSS-based smooth scrolling.
 * Uses CSS scroll-behavior rather than JS hijacking for accessibility.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Check for reduced motion preference and disable smooth scroll if needed
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateScrollBehavior = () => {
      document.documentElement.style.scrollBehavior = mediaQuery.matches
        ? "auto"
        : "smooth";
    };

    updateScrollBehavior();
    mediaQuery.addEventListener("change", updateScrollBehavior);

    return () => {
      mediaQuery.removeEventListener("change", updateScrollBehavior);
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return <>{children}</>;
}
