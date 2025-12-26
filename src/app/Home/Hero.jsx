"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldAlert } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import LightRays from "@/components/backgrounds/LightRays";

// Helper to format date relative to now
function formatRelativeDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins} Minutes Ago`;
  if (diffHours < 24) return `${diffHours} Hours Ago`;
  if (diffDays === 1) return "1 Day Ago";
  if (diffDays < 7) return `${diffDays} Days Ago`;
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

// Fallback hardcoded hero slides (used when there aren't enough WordPress posts)
const fallbackHeroSlides = [
  {
    id: 3001,
    slug: null,
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop",
    alt: "Strategic Defense Initiative: Next-Gen Missile Defense Systems",
    badge: "Defense",
    excerpt:
      "Analysis of emerging missile defense technologies and their strategic implications for global security architecture.",
    date: "2 Hours Ago",
  },
  {
    id: 3002,
    slug: null,
    src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
    alt: "Cybersecurity Threats in Critical Infrastructure",
    badge: "Cyber Intel",
    excerpt:
      "Comprehensive assessment of cyber vulnerabilities in national infrastructure and recommended countermeasures.",
    date: "5 Hours Ago",
  },
  {
    id: 3003,
    slug: null,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1000&auto=format&fit=crop",
    alt: "Arctic Operations: New Frontiers in Military Strategy",
    badge: "Strategy",
    excerpt:
      "Examining the strategic importance of Arctic regions and evolving military capabilities in extreme environments.",
    date: "1 Day Ago",
  },
  {
    id: 3004,
    slug: null,
    src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000&auto=format&fit=crop",
    alt: "AI Integration in Modern Warfare",
    badge: "Technology",
    excerpt:
      "Exploring artificial intelligence applications in defense systems and ethical considerations for autonomous weapons.",
    date: "2 Days Ago",
  },
];

// Map WordPress post to hero slide format
function mapPostToHeroSlide(post, categoriesById) {
  const title = post?.title?.rendered || "Untitled";
  const excerpt = post?.excerpt?.rendered?.replace(/<[^>]+>/g, "") || "";
  const image =
    post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "/fallback-image.jpg";
  const categoryId = post.categories?.[0];
  const category = categoryId ? categoriesById[categoryId] : null;
  const categoryName = category?.name || "Briefing";

  return {
    id: post.id,
    slug: post.slug,
    src: image,
    alt: title,
    badge: categoryName,
    excerpt: excerpt,
    date: formatRelativeDate(post.date),
  };
}

export function HeroSection({ posts = [], categories = [] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  // Watch <html class="dark"> changes (Tailwind class strategy)
  useEffect(() => {
    const root = document.documentElement;
    const apply = () => setIsDark(root.classList.contains("dark"));
    apply();

    const obs = new MutationObserver(apply);
    obs.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  // Prefer-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(!!mq.matches);
    apply();

    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  const raysColor = useMemo(() => (isDark ? "#ffffff" : "#1a1a1a"), [isDark]);
  const saturation = useMemo(() => (isDark ? 1.0 : 0.12), [isDark]);

  // Map categories by ID for quick lookup
  const categoriesById = useMemo(() => {
    const map = {};
    categories.forEach((cat) => {
      map[cat.id] = cat;
    });
    return map;
  }, [categories]);

  // Map WordPress posts to hero slide format
  const dynamicHeroSlides = useMemo(() => {
    if (!posts || posts.length === 0) return [];
    return posts.map((post) => mapPostToHeroSlide(post, categoriesById));
  }, [posts, categoriesById]);

  // Merge dynamic posts with fallback hero slides
  // Priority: Dynamic posts first, then fill remaining slots with fallback
  const heroSlides = useMemo(() => {
    const maxSlides = 4;
    const dynamicCount = dynamicHeroSlides.length;
    const fallbackCount = Math.max(0, maxSlides - dynamicCount);

    return [
      ...dynamicHeroSlides.slice(0, maxSlides),
      ...fallbackHeroSlides.slice(0, fallbackCount),
    ];
  }, [dynamicHeroSlides]);

  // Update currentSlide when slides change
  useEffect(() => {
    if (heroSlides.length > 0 && currentSlide >= heroSlides.length) {
      setCurrentSlide(0);
    }
  }, [heroSlides.length, currentSlide]);

  // Auto slider (disabled for reduced-motion users)
  useEffect(() => {
    if (reduceMotion || heroSlides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reduceMotion, heroSlides.length]);

  const active = heroSlides.length > 0 ? heroSlides[currentSlide] : null;

  // Don't render if no posts
  if (!active || heroSlides.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden background-gradient-white dark:bg-neutral-950">
      {/* Background: disable heavy WebGL when user prefers reduced motion */}
      {!reduceMotion && (
        <div className="pointer-events-none absolute inset-0 z-0">
          <LightRays
            raysColor={raysColor}
            saturation={saturation}
            raysSpeed={1}
            lightSpread={1.15}
            rayLength={2}
            fadeDistance={1.1}
            followMouse
            mouseInfluence={0.06}
            noiseAmount={0.02}
            distortion={0.08}
            className="opacity-70 dark:opacity-100"
          />
        </div>
      )}

      {/* Soft fallback background when reduced motion is on */}
      {reduceMotion && (
        <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900" />
      )}

      {/* Accent glow */}
      <div className="pointer-events-none absolute -top-24 right-0 z-0 h-[520px] w-[520px] rounded-full bg-orange-500/10 blur-3xl dark:bg-orange-500/5" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* LEFT: Copy + CTAs */}
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/70 px-4 py-2 backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
              <span className="h-2 w-2 rounded-full bg-orange-500" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Breaking defence updates
              </span>
            </div>

            <h1 className="mb-5 text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 dark:text-white md:text-5xl">
              Indian defence news,{" "}
              <span className="text-orange-600 dark:text-orange-400">
                strategy
              </span>{" "}
              & veteran stories
            </h1>

            <p className="mb-8 max-w-xl text-lg leading-relaxed text-slate-700 dark:text-slate-300">
              Clear, fast reporting with context—missiles, naval power, cyber,
              procurement, and ground reality.
            </p>

            <div className="flex flex-wrap items-center gap-5">
              <Link
                href="/news"
                className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-orange-500/25 transition-colors hover:bg-orange-700"
              >
                Read latest briefings
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/about"
                className="text-sm font-semibold text-slate-700 underline-offset-4 hover:underline dark:text-slate-200"
              >
                What is Military Matters?
              </Link>
            </div>

            <div className="mt-10 flex gap-10 border-t border-slate-200 pt-8 dark:border-white/10">
              <div>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">
                  {posts.length > 0 ? `${posts.length}+` : "500+"}
                </div>
                <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Articles
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">
                  50K+
                </div>
                <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Monthly readers
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                  24/7
                </div>
                <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Coverage
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Featured story from WordPress posts */}
          <div className="relative">
            {active.slug ? (
              <Link
                href={`/news/${active.slug}`}
                className="group block overflow-hidden rounded-2xl border border-slate-300 bg-white/60 shadow-xl shadow-black/5 backdrop-blur-sm transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/5"
              >
                {/* overflow-hidden here keeps zoom inside the card */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-200 dark:bg-neutral-800">
                  <Image
                    src={active.src}
                    alt={active.alt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 560px, 100vw"
                    className="object-cover transition-transform duration-400 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 rounded border border-white/10 bg-black/55 px-3 py-1 text-xs font-mono uppercase tracking-wider text-white backdrop-blur-md">
                    {active.badge}
                  </div>
                </div>

                <div className="border-t border-slate-200 p-5 dark:border-white/10">
                  {/* keyed wrapper adds a short fade so text + image feel in sync */}
                  <div
                    key={active.id}
                    className="animate-in fade-in-0 duration-300"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400">
                          Featured
                        </div>
                        <h3 className="mt-2 line-clamp-2 text-lg font-extrabold leading-snug text-slate-900 dark:text-white">
                          {active.alt}
                        </h3>
                        <p className="mt-2 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">
                          {active.excerpt ||
                            "Tap to read the full briefing with context and key takeaways."}
                        </p>
                      </div>

                      <div className="mt-1 hidden rounded-full bg-orange-600 p-2 text-white shadow-lg lg:block">
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>

                    {/* Pager */}
                    <div className="mt-5 flex items-center gap-2">
                      {heroSlides.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setCurrentSlide(i)}
                          className={`h-1.5 rounded-full transition-all ${
                            i === currentSlide
                              ? "w-8 bg-orange-600 dark:bg-orange-500"
                              : "w-2 bg-slate-300 hover:bg-slate-400 dark:bg-white/20 dark:hover:bg-white/35"
                          }`}
                          aria-label={`Show featured item ${i + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="group block overflow-hidden rounded-2xl border border-slate-300 bg-white/60 shadow-xl shadow-black/5 backdrop-blur-sm dark:border-white/10 dark:bg-white/5 opacity-75">
                {/* overflow-hidden here keeps zoom inside the card */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-200 dark:bg-neutral-800">
                  <Image
                    src={active.src}
                    alt={active.alt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 560px, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 rounded border border-white/10 bg-black/55 px-3 py-1 text-xs font-mono uppercase tracking-wider text-white backdrop-blur-md">
                    {active.badge}
                  </div>
                </div>

                <div className="border-t border-slate-200 p-5 dark:border-white/10">
                  <div
                    key={active.id}
                    className="animate-in fade-in-0 duration-300"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400">
                          Featured
                        </div>
                        <h3 className="mt-2 line-clamp-2 text-lg font-extrabold leading-snug text-slate-900 dark:text-white">
                          {active.alt}
                        </h3>
                        <p className="mt-2 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">
                          {active.excerpt ||
                            "Tap to read the full briefing with context and key takeaways."}
                        </p>
                      </div>

                      <div className="mt-1 hidden rounded-full bg-orange-600 p-2 text-white shadow-lg lg:block">
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>

                    {/* Pager */}
                    <div className="mt-5 flex items-center gap-2">
                      {heroSlides.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setCurrentSlide(i)}
                          className={`h-1.5 rounded-full transition-all ${
                            i === currentSlide
                              ? "w-8 bg-orange-600 dark:bg-orange-500"
                              : "w-2 bg-slate-300 hover:bg-slate-400 dark:bg-white/20 dark:hover:bg-white/35"
                          }`}
                          aria-label={`Show featured item ${i + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Small "latest analysis" card */}
            {heroSlides.length > 1 && heroSlides[1] && heroSlides[1].slug && (
              <Link
                href={`/news/${heroSlides[1].slug}`}
                className="absolute -bottom-6 -left-6 z-20 hidden max-w-xs rounded-xl border border-slate-300 bg-white p-5 shadow-2xl transition hover:shadow-3xl dark:border-white/10 dark:bg-neutral-900 lg:block"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-orange-500/10">
                    <ShieldAlert className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                      Latest analysis
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400 line-clamp-2">
                      {heroSlides[1].alt}
                    </p>
                  </div>
                </div>
              </Link>
            )}

            <div className="absolute -top-3 -right-3 z-20 hidden rounded-full bg-orange-600 px-3 py-1.5 text-xs font-bold text-white shadow-lg lg:block">
              LIVE
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
