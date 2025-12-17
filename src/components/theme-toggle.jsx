"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle({ className = "" }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => mounted && setTheme(isDark ? "light" : "dark")}
      className={
        "inline-flex items-center justify-center rounded-lg border border-slate-300 dark:border-white/20 bg-slate-100 dark:bg-white/10 p-2.5 text-slate-900 dark:text-white transition-all hover:bg-slate-200 dark:hover:bg-white/20 " +
        className
      }
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {!mounted ? (
        <Sun className="h-5 w-5" />
      ) : isDark ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}

