"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <button
        className="p-2 rounded-lg text-secondary hover:bg-white/10 transition-colors"
        aria-label="Toggle theme"
        aria-hidden="true"
        disabled
      >
        <Sun className="h-4.5 w-4.5" />
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      className={cn(
        "p-2 rounded-lg transition-colors",
        "text-secondary hover:text-primary",
        "hover:bg-white/10"
      )}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun className="h-4.5 w-4.5" />
      ) : (
        <Moon className="h-4.5 w-4.5" />
      )}
    </button>
  );
}
