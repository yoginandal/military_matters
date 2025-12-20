"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldAlert } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import LightRays from "@/components/backgrounds/LightRays";

// Same blogs array you pasted
const blogs = [
  {
    id: 1,
    title: "Agni-V Test Firing: Strategic Implications",
    category: "Missile Tech",
    date: "2 Hours Ago",
    image:
      "https://images.unsplash.com/photo-1748653755322-30fe8248803c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    excerpt:
      "Analysis of the latest MIRV technology demonstration and what it means for regional deterrence stability.",
  },
  {
    id: 2,
    title: "Indian Navy's New Carrier Battle Group",
    category: "Naval Power",
    date: "5 Hours Ago",
    image:
      "https://images.unsplash.com/photo-1542876975-6334b6aeb70d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    excerpt:
      "INS Vikrant leads the largest naval exercise in the Arabian Sea with dual-carrier operations.",
  },
  {
    id: 3,
    title: "LCA Tejas Mk2: Production Timeline Update",
    category: "Air Force",
    date: "1 Day Ago",
    image:
      "https://images.unsplash.com/photo-1629793168399-1b028d0df502?q=80&w=1124&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    excerpt:
      "HAL confirms the rollout schedule for the new medium-weight fighter jet prototype.",
  },
  {
    id: 4,
    title: "Border Infrastructure Push in Ladakh",
    category: "Land Forces",
    date: "1 Day Ago",
    image:
      "https://images.unsplash.com/photo-1605588649874-94991ea8316f?q=80&w=1056&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    excerpt:
      "BRO completes strategic tunnel providing all-weather connectivity to forward areas.",
  },
  {
    id: 5,
    title: "Cyber Warfare Command Structure",
    category: "Cyber & EW",
    date: "2 Days Ago",
    image:
      "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=1600&q=80",
    excerpt:
      "New organizational changes announced to bolster defense against state-sponsored cyber attacks.",
  },
  {
    id: 6,
    title: "Indigenous Drone Swarm Capabilities",
    category: "Future Tech",
    date: "3 Days Ago",
    image:
      "https://plus.unsplash.com/premium_photo-1661875342092-33c91bdf33c1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    excerpt:
      "Private sector collaboration yields first successful test of autonomous swarming munition systems.",
  },
];

// Build heroSlides from blogs so same images are reused
const heroSlides = blogs.slice(0, 4).map((blog) => ({
  id: blog.id,
  src: blog.image,
  alt: blog.title,
  badge: blog.category,
}));

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  // Auto slider (disabled for reduced-motion users)
  useEffect(() => {
    if (reduceMotion) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reduceMotion]);

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

  const active = heroSlides[currentSlide];

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
                  500+
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

          {/* RIGHT: Featured story from heroSlides/blogs */}
          <div className="relative">
            <Link
              href={`/news/${active.id}`}
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
                        Tap to read the full briefing with context and key
                        takeaways.
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

            {/* Small “latest analysis” card */}
            <div className="absolute -bottom-6 -left-6 z-20 hidden max-w-xs rounded-xl border border-slate-300 bg-white p-5 shadow-2xl dark:border-white/10 dark:bg-neutral-900 lg:block">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-orange-500/10">
                  <ShieldAlert className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                    Latest analysis
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    New strategic briefing on Indo-Pacific security
                    architecture.
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -top-3 -right-3 z-20 hidden rounded-full bg-orange-600 px-3 py-1.5 text-xs font-bold text-white shadow-lg lg:block">
              LIVE
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
