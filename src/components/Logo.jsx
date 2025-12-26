"use client";

import Link from "next/link";

export function Logo({ 
  variant = "default", 
  className = "",
  asLink = true,
  href = "/"
}) {
  const logoContent = (
    <div className={`inline-flex items-center ${className}`}>
      <span
        className={`font-extrabold tracking-tight text-slate-900 dark:text-white ${
          variant === "large"
            ? "text-2xl sm:text-3xl"
            : variant === "small"
            ? "text-base"
            : "text-xl sm:text-2xl"
        }`}
      >
        <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-100 dark:to-white bg-clip-text text-transparent">
          MILITARY
        </span>
        <span className="ml-1.5 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 bg-clip-text text-transparent">
          MATTERS
        </span>
        <span className="ml-2 text-blue-600 dark:text-blue-400 font-extrabold">
          24/7
        </span>
      </span>
    </div>
  );

  if (asLink) {
    return (
      <Link
        href={href}
        className="group transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-400/60 focus:ring-offset-4 focus:ring-offset-white dark:focus:ring-offset-neutral-900 rounded-lg"
        aria-label="Military Matters 24/7 - Home"
      >
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}

