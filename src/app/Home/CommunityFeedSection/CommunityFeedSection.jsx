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
    image: "/satellite-hack.jpg",
    likes: 42,
    views: "856",
    color: "bg-blue-500",
  },
  {
    id: 2,
    category: "FIELD OPS",
    date: "SEP 27, 2025",
    title: "Next-Gen Night Vision: Beyond Thermal Imaging",
    image: "/night-vision.jpg",
    likes: 128,
    views: "1.2k",
    color: "bg-emerald-500",
  },
  {
    id: 3,
    category: "STRATEGY",
    date: "SEP 26, 2025",
    title: "The Geopolitics of Arctic Trade Routes",
    image: "/arctic.jpg",
    likes: 67,
    views: "543",
    color: "bg-purple-500",
  },
  {
    id: 4,
    category: "WEAPONRY",
    date: "SEP 25, 2025",
    title: "Railgun Prototypes: Sea Trials Update",
    image: "/railgun.jpg",
    likes: 215,
    views: "2.1k",
    color: "bg-rose-500",
  },
];

export function CommunityFeedSection() {
  return (
    <section className="py-24 bg-[#0a0a0a] border-t border-white/5 font-sans">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header (Optional) */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white">Community Intel</h2>
          <div className="h-1 w-12 bg-orange-500 rounded-full mt-2" />
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* --- LEFT CONTENT: Main Feed (8 cols) --- */}
          <div className="lg:col-span-8">
            <div className="grid md:grid-cols-2 gap-6">
              {articles.map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          </div>

          {/* --- RIGHT SIDEBAR: Widgets (4 cols) --- */}
          <div className="lg:col-span-4 space-y-8">
            <ProfileCard />
            <PopularPostsWidget />
          </div>
        </div>
      </div>
    </section>
  );
}
