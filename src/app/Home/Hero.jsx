"use client";

import Link from "next/link";
import { ArrowRight, Play, ShieldAlert } from "lucide-react";
import { useState, useEffect } from "react";

// 1. Define your slider data here
const heroSlides = [
  {
    id: 1,
    src: "/indian-military-fighter-jet-modern-defence.jpg", // Replace with real paths
    alt: "Indian Air Force Fighter Jets",
    badge: "Air Superiority",
  },
  {
    id: 2,
    src: "/indian-navy-ship-patrol.jpg",
    alt: "Indian Navy Maritime Operations",
    badge: "Naval Power",
  },
  {
    id: 3,
    src: "/indian-army-tank-desert.jpg",
    alt: "Indian Army Armored Units",
    badge: "Land Warfare",
  },
  {
    id: 4,
    src: "/drdo-missile-launch.jpg",
    alt: "Strategic Missile Systems",
    badge: "Strategic Assets",
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // 2. Auto-slider logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000); // Changes every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-white dark:bg-neutral-900 overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Orange glow accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 py-24 lg:py-36">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT SIDE: Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                Breaking Defence Updates
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 text-slate-900 dark:text-white tracking-tight">
              Indian Defence News,{" "}
              <span className="text-orange-500 dark:text-orange-400">Strategy</span> & Veteran
              Stories
            </h1>

            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-xl">
              Focused on clarity, capability and the realities of modern
              warfare. Your trusted source for comprehensive defence analysis
              and veteran perspectives.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/news"
                className="inline-flex items-center gap-2 bg-orange-500 text-white px-7 py-3.5 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 shadow-lg shadow-orange-500/25"
              >
                Explore Briefings
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white px-7 py-3.5 rounded-lg font-semibold hover:bg-slate-200 dark:hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              >
                <Play className="w-4 h-4" />
                Watch Overview
              </Link>
            </div>

            {/* Stats Row */}
            <div className="flex gap-10 mt-14 pt-10 border-t border-slate-200 dark:border-white/10">
              <div>
                <div className="text-4xl font-bold text-slate-900 dark:text-white">500+</div>
                <div className="text-sm text-slate-600 dark:text-slate-500 mt-1">
                  Articles Published
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-slate-900 dark:text-white">50K+</div>
                <div className="text-sm text-slate-600 dark:text-slate-500 mt-1">
                  Monthly Readers
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-500 dark:text-orange-400">24/7</div>
                <div className="text-sm text-slate-600 dark:text-slate-500 mt-1">
                  Defence Coverage
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Slider */}
          <div className="relative">
            {/* Main Image Card Frame */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-white/5 backdrop-blur-sm p-2">
              {/* 3. Slider Container */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-200 dark:bg-neutral-800">
                {heroSlides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      index === currentSlide
                        ? "opacity-100 z-10"
                        : "opacity-0 z-0"
                    }`}
                  >
                    <img
                      src={slide.src}
                      alt={slide.alt}
                      className="w-full h-full object-cover"
                    />
                    {/* Gradient Overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Internal Image Badge */}
                    <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 rounded text-xs text-white font-mono uppercase tracking-wider">
                      {slide.badge}
                    </div>
                  </div>
                ))}
              </div>

              {/* 4. Slider Indicators (Tactical Dashes) */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "w-8 bg-orange-500"
                        : "w-2 bg-slate-400 dark:bg-white/30 hover:bg-slate-500 dark:hover:bg-white/50"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Floating Card - Fixed on top of slider */}
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-neutral-800 border border-slate-300 dark:border-white/10 rounded-xl p-5 shadow-2xl max-w-xs hidden lg:block z-30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ShieldAlert className="w-6 h-6 text-orange-500 dark:text-orange-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white text-sm">
                    Latest Analysis
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    New strategic briefing on Indo-Pacific security
                    architecture.
                  </p>
                </div>
              </div>
            </div>

            {/* Top right badge */}
            <div className="absolute -top-3 -right-3 bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg hidden lg:block z-30">
              LIVE
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
