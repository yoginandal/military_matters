"use client";

import { ThumbsUp, Eye, Share2 } from "lucide-react";
import Image from "next/image";

export function ArticleCard({ post }) {
  return (
    <div className="group bg-white dark:bg-neutral-900 border-2 border-slate-300 dark:border-white/10 rounded-2xl p-4 flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#f97316] hover:border-orange-500 h-full">
      {/* Image Area */}
      <div className="aspect-[4/3] bg-slate-200 dark:bg-neutral-800 rounded-xl border border-slate-300 dark:border-white/5 overflow-hidden mb-5 relative">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
        />

        {/* Optional color overlay */}
        <div
          className={`absolute inset-0 opacity-20 ${
            post.color || "bg-slate-700"
          }`}
        />

        {/* Category Tag */}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-black/80 border border-white/10 rounded-md text-[10px] font-bold text-white tracking-wider uppercase">
            {post.category}
          </span>
        </div>
      </div>

      {/* Text Content */}
      <div className="mb-4 flex-grow">
        <p className="text-xs text-slate-600 dark:text-slate-500 font-mono mb-2 uppercase">
          {post.category} — {post.date}
        </p>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight group-hover:text-orange-500 transition-colors line-clamp-2">
          {post.title}
        </h3>
      </div>

      {/* Footer Actions */}
      <div className="mt-auto flex items-center justify-between gap-2 pt-4 border-t border-slate-200 dark:border-white/5">
        <div className="flex gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-xs text-slate-700 dark:text-slate-300 font-medium group-hover:border-orange-500/30 transition-colors">
            <ThumbsUp className="w-3 h-3" /> {post.likes}
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-xs text-slate-700 dark:text-slate-300 font-medium group-hover:border-orange-500/30 transition-colors">
            <Eye className="w-3 h-3" /> {post.views}
          </div>
        </div>
        <button className="p-2 rounded-full border border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-white/5 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-colors">
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
