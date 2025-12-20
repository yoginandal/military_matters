"use client";

import { ArticleCard } from "./ArticleCard"; // Adjust path as needed
import { ProfileCard } from "./ProfileCard"; // Adjust path as needed
import { PopularPostsWidget } from "./PopularPostsWidget"; // Adjust path as needed

// Sample Data
const articles = [
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
  },
];

export function CommunityFeedSection() {
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
              {articles.map((post) => (
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
