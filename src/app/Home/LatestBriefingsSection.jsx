"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, ChevronRight, Target } from "lucide-react";

// Mock Data: 6 Latest Blogs (all with Unsplash images)
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

export function LatestBriefingsSection() {
  const [activeId, setActiveId] = useState(blogs[0].id);

  const activeBlog = blogs.find((b) => b.id === activeId) || blogs[0];
  const leftSideBlogs = blogs.slice(0, 3);
  const rightSideBlogs = blogs.slice(3, 6);

  return (
    <section className="relative overflow-hidden border-t border-slate-200 bg-white py-14 lg:pt-12 lg:pb-28 dark:border-white/5 dark:bg-neutral-950">
      {/* Clean background for readability */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-white to-slate-50 dark:from-neutral-950 dark:to-neutral-950" />

      {/* Ultra-subtle grid */}
      <div
        className="
          pointer-events-none absolute inset-0 z-0
          bg-[linear-gradient(rgba(0,0,0,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.025)_1px,transparent_1px)]
          dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]
          bg-[size:80px_80px]
        "
      />

      {/* Left glow */}
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

                {/* Overlay gradient */}
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

                  <Link
                    href={`/news/${activeBlog.id}`}
                    className="inline-flex items-center gap-3 rounded-lg bg-white px-6 py-3 font-bold text-slate-900 transition-all duration-300 hover:bg-orange-600 hover:text-white dark:bg-white dark:text-neutral-900"
                  >
                    Read Full Briefing
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>

              {/* Decorative icon */}
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
      {/* Thumbnail image (same image as hero) */}
      <div className="relative mb-3 h-28 w-full overflow-hidden rounded-lg bg-slate-200 dark:bg-neutral-800">
        <img
          src={blog.image}
          alt={blog.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Active indicator */}
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
