"use client";

import { useState, useEffect, useRef } from "react";
import BannerNav from "./BannerNav";
import TopBar from "./TopBar";

export default function Header({ className }) {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show when near top
      if (currentScrollY < 10) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      const delta = currentScrollY - lastScrollY.current;

      // Small threshold to avoid jitter
      if (Math.abs(delta) < 4) {
        return;
      }

      if (delta > 0 && currentScrollY > 80) {
        // Scrolling down
        setIsVisible(false);
      } else if (delta < 0) {
        // Scrolling up
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 font-sans transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${className}`}
    >
      {/* Camo background image */}
      <div
        className="pointer-events-none absolute inset-0 bg-[url('/header_bg.jpg')] bg-cover bg-center"
        aria-hidden="true"
      />

      {/* Dark overlay for readability */}
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/70 via-black/80 to-black/90"
        aria-hidden="true"
      />

      {/* Actual header content */}
      <div className="relative">
        <TopBar />
        <BannerNav />
      </div>
    </header>
  );
}
