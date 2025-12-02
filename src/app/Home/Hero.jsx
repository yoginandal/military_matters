import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative bg-neutral-900 overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Orange glow accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 py-24 lg:py-36">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              <span className="text-sm text-slate-300 font-medium">
                Breaking Defence Updates
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 text-white tracking-tight">
              Indian Defence News,{" "}
              <span className="text-orange-400">Strategy</span> & Veteran
              Stories
            </h1>

            <p className="text-lg text-slate-400 mb-10 leading-relaxed max-w-xl">
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
                className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white px-7 py-3.5 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              >
                <Play className="w-4 h-4" />
                Watch Overview
              </Link>
            </div>

            {/* Stats Row */}
            <div className="flex gap-10 mt-14 pt-10 border-t border-white/10">
              <div>
                <div className="text-4xl font-bold text-white">500+</div>
                <div className="text-sm text-slate-500 mt-1">
                  Articles Published
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white">50K+</div>
                <div className="text-sm text-slate-500 mt-1">
                  Monthly Readers
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-400">24/7</div>
                <div className="text-sm text-slate-500 mt-1">
                  Defence Coverage
                </div>
              </div>
            </div>
          </div>

          {/* Featured Image with Card Overlay */}
          <div className="relative">
            {/* Main Image Card */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm p-2">
              <div className="aspect-[4/3] rounded-xl overflow-hidden">
                <img
                  src="/indian-military-fighter-jet-modern-defence.jpg"
                  alt="Indian Military Defence"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Floating Card - Dark themed */}
            <div className="absolute -bottom-6 -left-6 bg-neutral-800 border border-white/10 rounded-xl p-5 shadow-2xl max-w-xs hidden lg:block">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-orange-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">
                    Latest Analysis
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    New strategic briefing on Indo-Pacific security
                  </p>
                </div>
              </div>
            </div>

            {/* Top right badge */}
            <div className="absolute -top-3 -right-3 bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg hidden lg:block">
              LIVE
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
