"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Facebook, Youtube, Twitter, Linkedin } from "lucide-react";

const TopBar = () => {
  const [iconsLoaded, setIconsLoaded] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    // Animate icons one by one with a delay
    const timers = [0, 1, 2, 3, 4].map((index) =>
      setTimeout(() => {
        setIconsLoaded((prev) => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      }, index * 150)
    );

    // Cleanup timeouts on component unmount
    return () => timers.forEach(clearTimeout);
  }, []);

  const socialIcons = [
    {
      icon: Instagram,
      url: "#instagram",
      label: "Follow us on Instagram",
    },
    {
      icon: Linkedin,
      url: "#linkedin",
      label: "Follow us on LinkedIn",
    },
    {
      icon: Youtube,
      url: "#youtube",
      label: "Follow us on YouTube",
    },
    {
      icon: Facebook,
      url: "#facebook",
      label: "Follow us on Facebook",
    },
    {
      icon: Twitter,
      url: "#twitter",
      label: "Follow us on Twitter",
    },
  ];

  return (
    <aside
      className="hidden w-full px-5 sm:px-8 py-3 md:block border-b border-white/10"
      aria-label="Top bar with social links and announcements"
    >
      <div className="flex flex-wrap items-center justify-between mx-auto text-xs sm:text-sm text-military-khaki px-16">
        {/* Social Links */}
        <nav aria-label="Social media links">
          <div className="flex items-center gap-4">
            <span className="font-medium sr-only md:not-sr-only">
              Follow us
            </span>
            <div className="flex gap-3" role="list">
              {socialIcons.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.a
                    key={index}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="text-white/90 hover:text-military-khaki bg-white/10 hover:bg-white/20 border border-white/10 rounded-full p-2 transition-all duration-300 ease-in-out hover:rotate-12 hover:scale-110 shadow-lg shadow-black/40 focus:outline-none focus:ring-2 focus:ring-military-khaki/80 focus:ring-offset-2 focus:ring-offset-black"
                    initial={{ y: -50, opacity: 0 }}
                    animate={
                      iconsLoaded[index]
                        ? { y: 0, opacity: 1 }
                        : { y: -50, opacity: 0 }
                    }
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.1,
                    }}
                    role="listitem"
                  >
                    <IconComponent className="w-4 h-4" aria-hidden="true" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Marquee Announcement */}
        <div
          className="text-military-khaki justify-center items-center bg-black/30 backdrop-blur-md px-4 py-2 gap-2 rounded-full border border-white/10 shadow-lg shadow-black/50 flex max-w-xl overflow-hidden"
          role="region"
          aria-live="polite"
          aria-label="Announcement"
        >
          <div
            className="h-2 w-2 bg-military-red rounded-full animate-ping shrink-0 shadow-sm shadow-military-red/60"
            aria-hidden="true"
          ></div>
          <div className="flex-1 overflow-hidden relative">
            <div className="animate-scroll whitespace-nowrap font-semibold tracking-wide">
              Military Matters 24/7 · Indian defence news, strategy & veteran
              stories &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Military
              Matters 24/7 · Indian defence news, strategy & veteran stories
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <nav aria-label="Quick actions">
          <div className="flex flex-wrap items-center gap-4 text-military-khaki">
            <Link
              href="/contact-us"
              className="px-4 py-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wide text-black bg-military-khaki hover:bg-white rounded-lg transition-all duration-300 shadow-md shadow-black/40 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-military-khaki focus:ring-offset-2 focus:ring-offset-black"
              aria-label="Contact us"
            >
              Contact HQ
            </Link>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default TopBar;
