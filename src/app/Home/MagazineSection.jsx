"use client";

import Link from "next/link";
import { ArrowUpRight, Share2, Bookmark, ScanLine } from "lucide-react";

// Mock Data (Same as before for consistency)
const featuredPost = {
  id: 1,
  category: "Strategic Tech",
  title: "The Dawn of Autonomous Wingmen",
  excerpt:
    "As sixth-generation fighter programs accelerate, the focus shifts to AI-driven loyal wingmen drones capable of executing complex tactical maneuvers without human intervention.",
  author: "Air Marshal V.K. Bhatia",
  date: "Sep 16, 2025",
  image: "/drone-wingman.jpg",
  tags: ["#Aviation", "#FutureWarfare"],
};

const smallPosts = [
  {
    id: 2,
    category: "Cyber",
    title: "Quantum Encryption Races",
    author: "Dr. S. Gupta",
    date: "Sep 15",
    image: "/quantum.jpg",
    tags: ["#Tech"],
  },
  {
    id: 3,
    category: "Naval",
    title: "Nuclear Submarine Fleet",
    author: "Capt. R. Sharma",
    date: "Sep 14",
    image: "/submarine.jpg",
    tags: ["#Navy"],
  },
  {
    id: 4,
    category: "Space",
    title: "Anti-Satellite Systems",
    author: "Def. Analyst",
    date: "Sep 13",
    image: "/satellite.jpg",
    tags: ["#Space"],
  },
  {
    id: 5,
    category: "Infantry",
    title: "Exoskeleton Trials",
    author: "Maj. K. Singh",
    date: "Sep 12",
    image: "/exoskeleton.jpg",
    tags: ["#Army"],
  },
  {
    id: 6,
    category: "Policy",
    title: "Indo-Pacific Strategy",
    author: "Amb. L. Rao",
    date: "Sep 11",
    image: "/policy.jpg",
    tags: ["#Geopolitics"],
  },
  {
    id: 7,
    category: "R&D",
    title: "Hypersonic Glide Vehicles",
    author: "DRDO Watch",
    date: "Sep 10",
    image: "/hypersonic.jpg",
    tags: ["#Missiles"],
  },
];

export function MagazineSection() {
  return (
    <section className="py-24 bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-neutral-900/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 mb-12 flex items-end justify-between">
        <div>
          <h2 className="text-4xl font-bold text-white tracking-tight flex items-center gap-3">
            <ScanLine className="w-8 h-8 text-orange-500" />
            Strategic Front
          </h2>
          <p className="text-slate-500 mt-2 text-sm font-mono tracking-wide">
            // INTELLIGENCE BRIEFINGS AND ANALYSIS
          </p>
        </div>
        <div className="hidden md:flex items-center gap-2 text-xs font-bold text-orange-500 uppercase tracking-widest">
          Live Feed{" "}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* --- LEFT COLUMN: Featured Post (Spans 7 cols) --- */}
          <div className="lg:col-span-7 group cursor-pointer h-full flex flex-col">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 shadow-2xl h-full">
              {/* Image Container - Full Height on Desktop? No, let's make it 60% height */}
              <div className="relative aspect-video lg:aspect-auto lg:h-[400px] overflow-hidden">
                <div className="absolute inset-0 bg-neutral-800 group-hover:scale-105 transition-transform duration-700" />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90" />

                <div className="absolute top-6 left-6 flex gap-2">
                  <span className="px-3 py-1 bg-orange-600 text-white text-xs font-bold rounded uppercase tracking-wider shadow-lg shadow-orange-900/20">
                    {featuredPost.category}
                  </span>
                </div>
              </div>

              {/* Content Overlay / Bottom Section */}
              <div className="p-6 md:p-10 flex flex-col flex-grow relative z-10 -mt-20">
                <div className="flex items-center gap-3 text-orange-400 text-xs font-mono mb-3">
                  <span>{featuredPost.date}</span>
                  <span className="w-1 h-1 bg-orange-500 rounded-full" />
                  <span>{featuredPost.tags.join("  ")}</span>
                </div>

                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight group-hover:text-orange-500 transition-colors">
                  {featuredPost.title}
                </h3>

                <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-2xl border-l-2 border-orange-500/30 pl-4">
                  {featuredPost.excerpt}
                </p>

                <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-neutral-800 border border-white/10 flex items-center justify-center text-slate-400 font-bold text-xs">
                      VB
                    </div>
                    <div>
                      <div className="text-white text-sm font-bold">
                        {featuredPost.author}
                      </div>
                      <div className="text-slate-500 text-xs uppercase tracking-wider">
                        Strategic Analyst
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button className="p-2 rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
                      <Bookmark className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: Grid of 6 (Spans 5 cols) --- */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 content-start">
            {smallPosts.map((post) => (
              <div
                key={post.id}
                className="group relative bg-neutral-900/50 border border-white/5 hover:border-orange-500/30 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-900/5 flex flex-col"
              >
                {/* Card Header: Image & Badge */}
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-800">
                  <div className="absolute inset-0 bg-neutral-800 group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-0.5 bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white uppercase tracking-wider rounded">
                      {post.category}
                    </span>
                  </div>
                  {/* Hover Action */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-orange-500 p-1.5 rounded-full text-white shadow-lg">
                      <ArrowUpRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow">
                  <h4 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-orange-500 transition-colors line-clamp-2">
                    {post.title}
                  </h4>

                  <div className="mt-auto pt-3 flex items-center justify-between border-t border-white/5 text-xs text-slate-500">
                    <span className="font-medium text-slate-400">
                      {post.author}
                    </span>
                    <span className="font-mono text-[10px] bg-white/5 px-1.5 py-0.5 rounded text-slate-400">
                      {post.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
