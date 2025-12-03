"use client";

import { ArrowRight } from "lucide-react";

const popularPosts = [
  {
    id: 1,
    title: "Zero-Day Vulnerabilities in Satellite Comms",
    image: "/satellite-hack.jpg",
  },
  {
    id: 2,
    title: "5 Trends in Hypersonic Defense Systems",
    image: "/hypersonic.jpg",
  },
  {
    id: 3,
    title: "Why Autonomous Wingmen Are the Future",
    image: "/drone.jpg",
  },
  {
    id: 4,
    title: "The Shift to Cognitive Warfare Tactics",
    image: "/cognitive.jpg",
  },
];

export function PopularPostsWidget() {
  return (
    <div className="bg-neutral-900 border-2 border-white/10 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h4 className="font-bold text-white uppercase tracking-wider text-sm">
          Trending Intel
        </h4>
        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse shadow-[0_0_10px_#f97316]" />
      </div>

      <div className="space-y-4">
        {popularPosts.map((item) => (
          <div key={item.id} className="flex gap-4 group cursor-pointer">
            {/* Thumbnail */}
            <div className="w-16 h-16 bg-neutral-800 rounded-lg border border-white/10 overflow-hidden shrink-0 group-hover:border-orange-500/50 transition-colors relative">
              {/* <Image src={item.image} alt={item.title} fill className="object-cover" /> */}
            </div>

            {/* Title */}
            <div className="flex flex-col justify-center">
              <h5 className="text-sm font-bold text-slate-200 leading-tight group-hover:text-orange-500 transition-colors line-clamp-2">
                {item.title}
              </h5>
              <span className="text-[10px] text-slate-500 font-mono mt-1 block">
                READ IN 4 MIN
              </span>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-6 py-3 rounded-xl border border-white/10 bg-white/5 text-xs font-bold text-white uppercase tracking-widest hover:bg-orange-500 hover:border-orange-500 hover:text-black transition-colors flex items-center justify-center gap-2 group">
        View All Reports
        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
