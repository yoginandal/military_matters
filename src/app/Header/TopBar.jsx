"use client";

import Link from "next/link";
import { Instagram, Facebook, Youtube, Twitter, Linkedin } from "lucide-react";

const TopBar = () => {
  const socialIcons = [
    { icon: Instagram, url: "#instagram", label: "Follow us on Instagram" },
    { icon: Linkedin, url: "#linkedin", label: "Follow us on LinkedIn" },
    { icon: Youtube, url: "#youtube", label: "Follow us on YouTube" },
    { icon: Facebook, url: "#facebook", label: "Follow us on Facebook" },
    { icon: Twitter, url: "#twitter", label: "Follow us on Twitter" },
  ];

  return (
    <aside
      className="hidden w-full px-5 sm:px-8 py-2 md:block border-b border-slate-200 dark:border-white/10"
      aria-label="Top bar"
    >
      <div className="flex flex-wrap items-center justify-between mx-auto text-sm text-white">
        {/* Social Links */}
        <nav aria-label="Social media links">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-slate-100">Follow:</span>
            <div className="flex gap-1" role="list">
              {socialIcons.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  role="listitem"
                  className="p-2 rounded-full text-slate-100 transition-all duration-300 hover:text-orange-500  hover:bg-slate-100 "
                >
                  <item.icon className="w-5 h-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </nav>

        {/* Marquee Announcement - CORRECTED */}
        <div
          className="flex-1 justify-center items-center flex max-w-lg overflow-hidden"
          role="region"
          aria-label="Announcement"
        >
          <div className="flex items-center gap-4 bg-slate-100 dark:bg-black/20 px-4 py-2 rounded-full border border-slate-300 dark:border-white/10 shadow-inner w-full">
            <div
              className="h-2.5 w-2.5 bg-orange-500 dark:bg-amber-400 rounded-full animate-pulse shadow-[0_0_8px_theme('colors.orange.500')] dark:shadow-[0_0_8px_theme('colors.amber.400')]"
              aria-hidden="true"
            ></div>
            <div className="overflow-hidden relative h-6 flex-1">
              {" "}
              {/* Increased height */}
              <div className="animate-scroll whitespace-nowrap font-bold tracking-wider text-slate-900 dark:text-white absolute inset-y-0 flex items-center">
                {/* Content is now restored */}
                Military Matters 24/7 · Indian defence news, strategy & veteran
                stories &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Military Matters 24/7 · Indian defence news, strategy & veteran
                stories
              </div>
            </div>
          </div>
        </div>

        {/* Contact Button */}
        <nav aria-label="Quick actions">
          <Link
            href="/contact-us"
            aria-label="Contact us"
            className="px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-slate-900 bg-gradient-to-r from-orange-400 to-orange-500 rounded-md shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-orange-400/50 focus:outline-none focus:ring-4 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900"
          >
            Contact HQ
          </Link>
        </nav>
      </div>
    </aside>
  );
};

export default TopBar;
