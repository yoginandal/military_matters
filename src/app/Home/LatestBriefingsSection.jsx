"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, ChevronRight, Target } from "lucide-react";

// Mock Data: 6 Latest Blogs
const blogs = [
  {
    id: 1,
    title: "Agni-V Test Firing: Strategic Implications",
    category: "Missile Tech",
    date: "2 Hours Ago",
    image: "/missile-launch.jpg", // Replace with real image
    excerpt:
      "Analysis of the latest MIRV technology demonstration and what it means for regional deterrence stability.",
  },
  {
    id: 2,
    title: "Indian Navy's New Carrier Battle Group",
    category: "Naval Power",
    date: "5 Hours Ago",
    image: "/carrier.jpg",
    excerpt:
      "INS Vikrant leads the largest naval exercise in the Arabian Sea with dual-carrier operations.",
  },
  {
    id: 3,
    title: "LCA Tejas Mk2: Production Timeline Update",
    category: "Air Force",
    date: "1 Day Ago",
    image: "/tejas-jet.jpg",
    excerpt:
      "HAL confirms the rollout schedule for the new medium-weight fighter jet prototype.",
  },
  {
    id: 4,
    title: "Border Infrastructure Push in Ladakh",
    category: "Land Forces",
    date: "1 Day Ago",
    image: "/ladakh-road.jpg",
    excerpt:
      "BRO completes strategic tunnel providing all-weather connectivity to forward areas.",
  },
  {
    id: 5,
    title: "Cyber Warfare Command Structure",
    category: "Cyber & EW",
    date: "2 Days Ago",
    image: "/cyber-ops.jpg",
    excerpt:
      "New organizational changes announced to bolster defense against state-sponsored cyber attacks.",
  },
  {
    id: 6,
    title: "Indigenous Drone Swarm Capabilities",
    category: "Future Tech",
    date: "3 Days Ago",
    image: "/drones.jpg",
    excerpt:
      "Private sector collaboration yields first successful test of autonomous swarming munition systems.",
  },
];

export function LatestBriefingsSection() {
  // Default to the first blog active
  const [activeId, setActiveId] = useState(blogs[0].id);

  // Find the currently active blog object
  const activeBlog = blogs.find((b) => b.id === activeId) || blogs[0];

  // Split data for Left and Right columns
  const leftSideBlogs = blogs.slice(0, 3);
  const rightSideBlogs = blogs.slice(3, 6);

  return (
    <section className="relative bg-white dark:bg-neutral-900 py-20 lg:py-28 overflow-hidden border-t border-slate-200 dark:border-white/5">
      {/* --- Background Elements (Same as Hero) --- */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      {/* Blue glow on left to differentiate slightly from hero */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-orange-500 font-mono text-sm tracking-widest uppercase">
              // Intel Feed
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mt-2">
              Latest Briefings
            </h2>
          </div>
          <Link
            href="/news"
            className="hidden md:flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-sm font-medium"
          >
            View All Archives <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* --- The 3-Column Layout --- */}
        <div className="grid lg:grid-cols-12 gap-6 lg:h-[600px]">
          {/* 1. LEFT COLUMN (Tabs 1-3) */}
          <div className="lg:col-span-3 flex flex-col gap-4 h-full">
            {leftSideBlogs.map((blog) => (
              <SideTab
                key={blog.id}
                blog={blog}
                isActive={activeId === blog.id}
                onClick={() => setActiveId(blog.id)}
              />
            ))}
          </div>

          {/* 2. CENTER COLUMN (Active Main View) */}
          <div className="lg:col-span-6 h-full min-h-[400px]">
            <div className="relative h-full rounded-2xl overflow-hidden border border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-neutral-800/50 backdrop-blur-sm group">
              {/* Background Image with Fade Transition key */}
              <div
                key={activeBlog.id}
                className="absolute inset-0 animate-in fade-in duration-700"
              >
                {/* Placeholder for image - using gray div if no image provided */}
                <div className="absolute inset-0 bg-slate-200 dark:bg-neutral-800" />
                {/* <img src={activeBlog.image} alt={activeBlog.title} className="w-full h-full object-cover opacity-60" /> */}

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 dark:from-neutral-950 via-slate-800/60 dark:via-neutral-900/60 to-transparent" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end items-start z-10">
                {/* Animated Key for text refresh */}
                <div
                  key={activeBlog.id + "text"}
                  className="animate-in slide-in-from-bottom-4 duration-500"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full mb-4">
                    {activeBlog.category}
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                    {activeBlog.title}
                  </h3>

                  <p className="text-slate-200 dark:text-slate-300 text-lg mb-8 line-clamp-3 max-w-2xl">
                    {activeBlog.excerpt}
                  </p>

                  <Link
                    href={`/news/${activeBlog.id}`}
                    className="inline-flex items-center gap-3 px-6 py-3 bg-white dark:bg-white text-slate-900 dark:text-neutral-900 rounded-lg font-bold hover:bg-orange-500 hover:text-white transition-all duration-300"
                  >
                    Read Full Briefing
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>

              {/* Decorative top-right corner */}
              <div className="absolute top-4 right-4">
                <Target className="w-6 h-6 text-slate-400 dark:text-white/20" />
              </div>
            </div>
          </div>

          {/* 3. RIGHT COLUMN (Tabs 4-6) */}
          <div className="lg:col-span-3 flex flex-col gap-4 h-full">
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

        {/* Mobile Only Footer Link */}
        <div className="mt-8 md:hidden text-center">
          <Link
            href="/news"
            className="text-orange-500 font-medium text-sm flex items-center justify-center gap-2"
          >
            View All Archives <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// --- Sub Component for the Side Tabs ---
function SideTab({ blog, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 w-full text-left p-5 rounded-xl border transition-all duration-300 group relative overflow-hidden flex flex-col justify-center
        ${
          isActive
            ? "bg-slate-100 dark:bg-neutral-800 border-orange-500/50 shadow-[0_0_20px_rgba(249,115,22,0.1)]"
            : "bg-slate-50 dark:bg-neutral-800/30 border-slate-300 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-neutral-800 hover:border-slate-400 dark:hover:border-white/10"
        }
      `}
    >
      {/* Active Indicator Line */}
      {isActive && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500" />
      )}

      <div className="flex justify-between items-start mb-2">
        <span
          className={`text-xs font-mono uppercase tracking-wider ${
            isActive ? "text-orange-500 dark:text-orange-400" : "text-slate-500 dark:text-slate-500"
          }`}
        >
          {blog.category}
        </span>
        <div className="flex items-center gap-1 text-slate-600 dark:text-slate-600 text-xs">
          <Clock className="w-3 h-3" />
          {blog.date}
        </div>
      </div>

      <h4
        className={`font-semibold text-sm leading-snug line-clamp-2 ${
          isActive ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200"
        }`}
      >
        {blog.title}
      </h4>

      {/* Hover Arrow */}
      <div
        className={`absolute right-3 bottom-3 transition-all duration-300 ${
          isActive
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
        }`}
      >
        <ChevronRight className="w-4 h-4 text-orange-500" />
      </div>
    </button>
  );
}
