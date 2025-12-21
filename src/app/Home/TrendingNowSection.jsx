"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Flame } from "lucide-react";

// Map WP post -> card data
function mapPostToCard(post) {
  const title = post?.title?.rendered || "Untitled";

  const date = new Date(post.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const image =
    post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "/fallback-image.jpg";

  return {
    id: post.id,
    slug: post.slug,
    category: "Trending",
    title,
    author: "MilitaryMatters247",
    date,
    image,
  };
}

// Desktop accordion card
function DesktopAccordionCard({ item, index, activeIndex, setActiveIndex }) {
  const active = index === activeIndex;

  return (
    <Link
      href={`/news/${item.slug}`}
      onMouseEnter={() => setActiveIndex(index)}
      onFocus={() => setActiveIndex(index)}
      className={[
        "group relative h-[420px] overflow-hidden rounded-2xl border",
        "border-slate-200 bg-slate-200 shadow-xl shadow-black/5",
        "dark:border-white/10 dark:bg-neutral-900",
        "transition-[flex] duration-700 ease-[cubic-bezier(.5,.85,.25,1.15)]",
        active ? "flex-[3]" : "flex-[1]",
        "focus:outline-none focus:ring-4 focus:ring-orange-400/30",
      ].join(" ")}
      aria-label={item.title}
    >
      {/* Image */}
      <div className="absolute inset-0">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(min-width: 1024px) 900px, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105 group-focus-within:scale-105"
          priority={index === 0}
        />
      </div>

      {/* Darken on hover */}
      <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-700 group-hover:bg-black/25 group-focus-within:bg-black/25" />

      {/* Content */}
      <div
        className={[
          "absolute inset-0 z-10 flex flex-col justify-end p-6 text-white",
          active
            ? "opacity-100 translate-y-0 transition-all duration-500 delay-300"
            : "opacity-0 translate-y-3 transition-all duration-150 delay-0 pointer-events-none",
        ].join(" ")}
      >
        <div className="flex flex-col gap-4">
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-black/55 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-orange-500" />
            {item.category}
          </div>

          <div>
            <h3 className="text-2xl font-extrabold leading-snug">
              {item.title}
            </h3>

            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/85">
              <span className="font-semibold">{item.author}</span>
              <span className="opacity-60">|</span>
              <span className="opacity-90">{item.date}</span>
            </div>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-extrabold text-slate-900 transition-colors group-hover:bg-orange-600 group-hover:text-white group-focus-within:bg-orange-600 group-focus-within:text-white">
            Read now <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}

// Main section
export function TrendingNowSection({ posts = [] }) {
  const items = useMemo(
    () => (posts || []).map(mapPostToCard).slice(0, 6),
    [posts]
  );
  const [activeIndex, setActiveIndex] = useState(0);

  if (!items.length) return null;

  return (
    <section className="relative overflow-hidden border-t border-slate-200 bg-transparent py-14 dark:border-white/5">
      <div className="pointer-events-none absolute -top-24 right-0 z-0 h-[520px] w-[520px] rounded-full bg-orange-500/10 blur-3xl dark:bg-orange-500/5" />

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-extrabold tracking-widest text-slate-900 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-white">
              <Flame className="h-4 w-4 text-orange-500" />
              TRENDING NOW
            </div>

            <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
              Top reads in focus
            </h2>

            <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
              Hover (desktop) or tap (mobile) to reveal details and open the
              post.
            </p>
          </div>

          <Link
            href="/news"
            className="hidden md:inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
          >
            View all <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Desktop accordion */}
        <div className="hidden lg:block">
          <div className="flex gap-3">
            {items.map((item, index) => (
              <DesktopAccordionCard
                key={item.id}
                item={item}
                index={index}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
            ))}
          </div>
        </div>

        {/* Mobile: stacked */}
        <div className="grid gap-6 lg:hidden">
          {items.map((item, index) => (
            <Link
              key={item.id}
              href={`/news/${item.slug}`}
              className="group block"
            >
              <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-black/5 dark:border-white/10 dark:bg-neutral-900">
                <div className="relative h-60 bg-slate-200 dark:bg-neutral-800 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                  <div className="absolute left-4 top-4 inline-flex items-center rounded-full bg-black/55 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white backdrop-blur">
                    {item.category}
                  </div>
                </div>

                <div className="border-t border-slate-200 p-5 dark:border-white/10">
                  <div className="opacity-0 translate-y-1 transition-all duration-700 group-hover:opacity-100 group-hover:translate-y-0">
                    <h3 className="text-lg font-extrabold leading-snug text-slate-900 transition-colors group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-400">
                      {item.title}
                    </h3>

                    <div className="mt-3 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                      <span className="font-medium">{item.author}</span>
                      <span className="opacity-70">{item.date}</span>
                    </div>

                    <div className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-slate-900 dark:text-white">
                      Read now{" "}
                      <ArrowUpRight className="h-4 w-4 text-orange-500" />
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}

          <Link
            href="/news"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
          >
            View all trending <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
