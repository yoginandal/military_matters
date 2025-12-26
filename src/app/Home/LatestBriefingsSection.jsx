"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Clock, ChevronRight, Target } from "lucide-react";

// Fallback hardcoded briefings (used when there aren't enough WordPress posts)
const fallbackBriefings = [
  {
    id: 1001,
    slug: null,
    title: "Strategic Defense Initiative: Next-Gen Missile Defense Systems",
    category: "Latest Briefing",
    date: "28 Sep, 2025",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop",
    excerpt: "Analysis of emerging missile defense technologies and their strategic implications for global security architecture.",
  },
  {
    id: 1002,
    slug: null,
    title: "Cybersecurity Threats in Critical Infrastructure",
    category: "Latest Briefing",
    date: "27 Sep, 2025",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
    excerpt: "Comprehensive assessment of cyber vulnerabilities in national infrastructure and recommended countermeasures.",
  },
  {
    id: 1003,
    slug: null,
    title: "Arctic Operations: New Frontiers in Military Strategy",
    category: "Latest Briefing",
    date: "26 Sep, 2025",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1000&auto=format&fit=crop",
    excerpt: "Examining the strategic importance of Arctic regions and evolving military capabilities in extreme environments.",
  },
  {
    id: 1004,
    slug: null,
    title: "AI Integration in Modern Warfare",
    category: "Latest Briefing",
    date: "25 Sep, 2025",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000&auto=format&fit=crop",
    excerpt: "Exploring artificial intelligence applications in defense systems and ethical considerations for autonomous weapons.",
  },
  {
    id: 1005,
    slug: null,
    title: "Naval Power Projection in the Indo-Pacific",
    category: "Latest Briefing",
    date: "24 Sep, 2025",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=1000&auto=format&fit=crop",
    excerpt: "Strategic analysis of naval capabilities and maritime security dynamics across the Indo-Pacific region.",
  },
  {
    id: 1006,
    slug: null,
    title: "Space-Based Defense Systems: The New Frontier",
    category: "Latest Briefing",
    date: "23 Sep, 2025",
    image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?q=80&w=1000&auto=format&fit=crop",
    excerpt: "Review of space defense initiatives and the militarization of orbital domains in contemporary geopolitics.",
  },
];

// Map WP post -> blog card
function mapPostToBlog(post) {
  const title = post?.title?.rendered || "Untitled";
  const excerptText = post?.excerpt?.rendered?.replace(/<[^>]+>/g, "") || ""; // strip HTML

  const dateObj = new Date(post.date);
  const date = dateObj.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const image =
    post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "/fallback-image.jpg";

  return {
    id: post.id,
    slug: post.slug, // Extract slug from WordPress post
    title,
    category: "Latest Briefing",
    date,
    image,
    excerpt: excerptText,
  };
}

export function LatestBriefingsSection({ posts = [] }) {
  // Map WordPress posts to blog format
  const dynamicBlogs = useMemo(() => {
    return posts.map(mapPostToBlog);
  }, [posts]);

  // Merge dynamic posts with fallback briefings
  // Priority: Dynamic posts first, then fill remaining slots with fallback
  const blogs = useMemo(() => {
    const maxBlogs = 6;
    const dynamicCount = dynamicBlogs.length;
    const fallbackCount = Math.max(0, maxBlogs - dynamicCount);
    
    return [
      ...dynamicBlogs.slice(0, maxBlogs),
      ...fallbackBriefings.slice(0, fallbackCount),
    ];
  }, [dynamicBlogs]);

  const [activeId, setActiveId] = useState(
    blogs.length > 0 ? blogs[0].id : null
  );

  const activeBlog = blogs.find((b) => b.id === activeId) || blogs[0] || null;

  const leftSideBlogs = blogs.slice(0, 3);
  const rightSideBlogs = blogs.slice(3, 6);

  if (!activeBlog) {
    return null; // nothing to show yet
  }

  return (
    <section className="relative overflow-hidden border-t border-slate-200 bg-white py-14 lg:pt-12 lg:pb-28 dark:border-white/5 dark:bg-neutral-950">
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-white to-slate-50 dark:from-neutral-950 dark:to-neutral-950" />

      <div
        className="
          pointer-events-none absolute inset-0 z-0
          bg-[linear-gradient(rgba(0,0,0,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.025)_1px,transparent_1px)]
          dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]
          bg-[size:80px_80px]
        "
      />

      <div className="pointer-events-none absolute top-1/2 left-0 z-0 h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-blue-600/8 blur-3xl dark:bg-blue-600/5" />

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <span className="font-mono text-sm tracking-widest uppercase text-orange-600 dark:text-orange-400">
              // Intel Feed
            </span>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
              Latest Briefings
            </h2>
          </div>

          <Link
            href="/news"
            className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors dark:text-slate-400 dark:hover:text-white"
          >
            View All Archives <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* 3-Column Layout */}
        <div className="grid gap-6 lg:grid-cols-12 lg:h-[600px]">
          {/* Left Tabs */}
          <div className="flex h-full flex-col gap-4 lg:col-span-3">
            {leftSideBlogs.map((blog) => (
              <SideTab
                key={blog.id}
                blog={blog}
                isActive={activeId === blog.id}
                onClick={() => setActiveId(blog.id)}
              />
            ))}
          </div>

          {/* Center Active Panel */}
          <div className="h-full min-h-[420px] lg:col-span-6">
            <div className="group relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-white/10 dark:bg-neutral-900/60">
              {/* Background media layer */}
              <div
                key={activeBlog.id}
                className="absolute inset-0 animate-in fade-in duration-700"
              >
                <div className="absolute inset-0">
                  <img
                    src={activeBlog.image}
                    alt={activeBlog.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent dark:from-black dark:via-neutral-950/60" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 z-10 flex flex-col items-start justify-end p-6 md:p-8">
                <div
                  key={activeBlog.id + "-text"}
                  className="animate-in slide-in-from-bottom-4 duration-500"
                >
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange-600 px-3 py-1 text-xs font-bold text-white dark:bg-orange-500">
                    {activeBlog.category}
                  </div>

                  <h3 className="mb-4 text-3xl font-bold leading-tight text-white md:text-4xl">
                    {activeBlog.title}
                  </h3>

                  <p className="mb-7 max-w-2xl line-clamp-3 text-lg text-slate-200">
                    {activeBlog.excerpt}
                  </p>

                  {activeBlog.slug ? (
                    <Link
                      href={`/news/${activeBlog.slug}`}
                      className="inline-flex items-center gap-3 rounded-lg bg-white px-6 py-3 font-bold text-slate-900 transition-all duration-300 hover:bg-orange-600 hover:text-white dark:bg-white dark:text-neutral-900"
                    >
                      Read Full Briefing
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  ) : (
                    <div className="inline-flex items-center gap-3 rounded-lg bg-white px-6 py-3 font-bold text-slate-900 dark:bg-white dark:text-neutral-900 opacity-75 cursor-not-allowed">
                      Read Full Briefing
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  )}
                </div>
              </div>

              <div className="absolute right-4 top-4 z-10">
                <Target className="h-6 w-6 text-slate-500/50 dark:text-white/20" />
              </div>
            </div>
          </div>

          {/* Right Tabs */}
          <div className="flex h-full flex-col gap-4 lg:col-span-3">
            {rightSideBlogs.map((blog) => (
              <SideTab
                key={blog.id}
                blog={blog}
                isActive={activeId === blog.id}
                onClick={() => setActiveId(blog.id)}
              />
            ))}
          </div>
        </div>

        {/* Mobile Footer Link */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/news"
            className="flex items-center justify-center gap-2 text-sm font-medium text-orange-600 dark:text-orange-400"
          >
            View All Archives <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function SideTab({ blog, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={[
        "relative flex-1 w-full overflow-hidden rounded-xl border text-left transition-all duration-300",
        "flex flex-col group",
        isActive
          ? "border-orange-500/50 bg-white shadow-[0_0_20px_rgba(249,115,22,0.12)] dark:bg-neutral-900 dark:border-orange-500/40"
          : "border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 dark:border-white/10 dark:bg-neutral-900/40 dark:hover:bg-neutral-900/70 dark:hover:border-white/15",
      ].join(" ")}
    >
      <div className="relative mb-3 h-28 w-full overflow-hidden rounded-lg bg-slate-200 dark:bg-neutral-800">
        <img
          src={blog.image}
          alt={blog.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {isActive && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500" />
      )}

      <div className="mb-2 flex items-start justify-between px-5">
        <span
          className={[
            "text-xs font-mono uppercase tracking-wider",
            isActive
              ? "text-orange-600 dark:text-orange-400"
              : "text-slate-600 dark:text-slate-400",
          ].join(" ")}
        >
          {blog.category}
        </span>

        <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
          <Clock className="h-3 w-3" />
          {blog.date}
        </div>
      </div>

      <div className="px-5 pb-5 pt-1">
        <h4
          className={[
            "line-clamp-2 text-sm font-semibold leading-snug transition-colors",
            isActive
              ? "text-slate-900 dark:text-white"
              : "text-slate-700 group-hover:text-slate-900 dark:text-slate-300 dark:group-hover:text-white",
          ].join(" ")}
        >
          {blog.title}
        </h4>
      </div>

      <div
        className={[
          "absolute right-3 bottom-3 transition-all duration-300",
          isActive
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0",
        ].join(" ")}
      >
        <ChevronRight className="h-4 w-4 text-orange-500" />
      </div>
    </button>
  );
}
