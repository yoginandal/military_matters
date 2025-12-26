"use client";

import { useMemo } from "react";
import { ArticleCard } from "./ArticleCard";
import { ProfileCard } from "./ProfileCard";
import { PopularPostsWidget } from "./PopularPostsWidget";

// Fallback hardcoded articles (used when there aren't enough WordPress posts)
const fallbackArticles = [
  {
    id: 1,
    category: "CYBER INTEL",
    date: "SEP 28, 2025",
    title: "Zero-Day Vulnerabilities in Satellite Comms",
    image:
      "https://images.unsplash.com/photo-1653681963850-531767705d88?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    likes: 42,
    views: "856",
    color: "bg-blue-500",
    slug: null, // Not a real post
  },
  {
    id: 2,
    category: "FIELD OPS",
    date: "SEP 27, 2025",
    title: "Next-Gen Night Vision: Beyond Thermal Imaging",
    image:
      "https://images.unsplash.com/photo-1700774607136-7e730e9e5dd0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    likes: 128,
    views: "1.2k",
    color: "bg-emerald-500",
    slug: null,
  },
  {
    id: 3,
    category: "STRATEGY",
    date: "SEP 26, 2025",
    title: "The Geopolitics of Arctic Trade Routes",
    image:
      "https://images.unsplash.com/photo-1658268649730-7656d79144a7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8VGhlJTIwR2VvcG9saXRpY3MlMjBvZiUyMEFyY3RpYyUyMFRyYWRlJTIwUm91dGVzfGVufDB8fDB8fHwy",
    likes: 67,
    views: "543",
    color: "bg-purple-500",
    slug: null,
  },
  {
    id: 4,
    category: "WEAPONRY",
    date: "SEP 25, 2025",
    title: "Railgun Prototypes: Sea Trials Update",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/1/13/JGSDF_Railgun_02.png",
    likes: 215,
    views: "2.1k",
    color: "bg-rose-500",
    slug: null,
  },
];

// Map WordPress post to article format
function mapWpPostToArticle(post, categoriesById) {
  const title = post?.title?.rendered || "Untitled";
  const image =
    post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "/fallback-image.jpg";
  
  const categoryId = post.categories?.[0];
  const category = categoryId ? categoriesById[categoryId] : null;
  const categoryName = category?.name?.toUpperCase() || "INTEL";

  const date = new Date(post.date);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).toUpperCase();

  // Color mapping based on category slug or default
  const colorMap = {
    "cyber-intel": "bg-blue-500",
    "field-ops": "bg-emerald-500",
    strategy: "bg-purple-500",
    weaponry: "bg-rose-500",
  };
  const categorySlug = category?.slug || "";
  const color = colorMap[categorySlug] || "bg-orange-500";

  // Generate random likes/views for now (or you could add these as custom fields in WordPress)
  const likes = Math.floor(Math.random() * 200) + 20;
  const views = likes > 100 ? `${(likes * 8).toLocaleString()}` : `${likes * 10}`;

  return {
    id: post.id,
    slug: post.slug,
    category: categoryName,
    date: formattedDate,
    title,
    image,
    likes,
    views,
    color,
  };
}

export function CommunityFeedSection({ posts = [], categories = [] }) {
  // Map categories by ID for quick lookup
  const categoriesById = useMemo(() => {
    const map = {};
    categories.forEach((cat) => {
      map[cat.id] = cat;
    });
    return map;
  }, [categories]);

  // Map WordPress posts to article format
  const dynamicArticles = useMemo(() => {
    return posts.map((post) => mapWpPostToArticle(post, categoriesById));
  }, [posts, categoriesById]);

  // Merge dynamic posts with fallback articles
  // Priority: Dynamic posts first, then fill remaining slots with fallback
  const displayArticles = useMemo(() => {
    const maxArticles = 4;
    const dynamicCount = dynamicArticles.length;
    const fallbackCount = Math.max(0, maxArticles - dynamicCount);
    
    return [
      ...dynamicArticles.slice(0, maxArticles),
      ...fallbackArticles.slice(0, fallbackCount),
    ];
  }, [dynamicArticles]);
  return (
    <section className="relative overflow-hidden border-t border-slate-200 bg-white py-16 dark:border-white/5 dark:bg-[#0a0a0a] font-sans">
      {/* Subtle background to match other sections */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-white to-slate-50 dark:from-[#0a0a0a] dark:to-[#0a0a0a]" />
      <div className="pointer-events-none absolute -top-24 right-0 z-0 h-[520px] w-[520px] rounded-full bg-orange-500/10 blur-3xl dark:bg-orange-500/5" />
      <div className="pointer-events-none absolute -bottom-28 left-0 z-0 h-[520px] w-[520px] rounded-full bg-blue-600/10 blur-3xl dark:bg-blue-600/5" />

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            Community Intel
          </h2>
          <div className="mt-2 h-1 w-12 rounded-full bg-orange-500" />
          <p className="mt-3 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
            Signals, discussions, and fast-moving updates curated from the
            community layer.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-12">
          {/* LEFT CONTENT: Main Feed */}
          <div className="lg:col-span-8">
            <div className="grid gap-6 md:grid-cols-2">
              {displayArticles.map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          </div>

          {/* RIGHT SIDEBAR: Widgets */}
          <aside className="lg:col-span-4">
            <div className="space-y-8 lg:sticky lg:top-24">
              <ProfileCard />
              <PopularPostsWidget />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
