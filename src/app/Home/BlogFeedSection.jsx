"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Clock,
  ChevronRight,
  Rocket,
  Globe,
  Cpu,
  Anchor,
  Plane,
  Zap,
  Users,
  TrendingUp,
  Filter,
  Search,
} from "lucide-react";

// --- Constants ---
const POSTS_PER_PAGE_MOBILE = 5;

// map category slug -> icon
const categoryIcons = {
  all: Globe,
  missiles: Rocket,
  submarine: Anchor,
  "fighter-jet": Plane,
  drones: Zap,
  "electronic-warfare": Cpu,
  "air-force": Plane,
  navy: Anchor,
  army: Users,
  "conflict-strategic-affairs": Globe,
  trending: TrendingUp,
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
    .format(date)
    .toUpperCase();
};

// Map WP post -> internal post object
function mapWpPost(post, wpCategoriesById) {
  const title = post?.title?.rendered || "Untitled";
  const excerpt = post?.excerpt?.rendered?.replace(/<[^>]+>/g, "") || "";

  const catId = post.categories?.[0] || null;
  const wpCat = catId ? wpCategoriesById[catId] : null;

  const categorySlug = wpCat?.slug || "all";
  const categoryLabel = wpCat?.name || "General";

  const imageUrl =
    post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

  const tags = post?.tags && Array.isArray(post.tags) ? post.tags : [];

  return {
    id: post.id,
    slug: post.slug,
    title,
    excerpt,
    date: post.date,
    readTime: "5 min", // static for now
    category: categorySlug,
    categoryLabel,
    imageUrl,
    tags,
  };
}

export function BlogFeedSection({ posts = [], categories = [] }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  // Map categories by id
  const wpCategoriesById = useMemo(() => {
    const map = {};
    for (const c of categories) map[c.id] = c;
    return map;
  }, [categories]);

  // Convert WP posts to internal posts array
  const allPosts = useMemo(
    () => posts.map((p) => mapWpPost(p, wpCategoriesById)),
    [posts, wpCategoriesById]
  );

  // Build category filter list: "All" + categories that actually have posts
  const blogCategories = useMemo(() => {
    const usedSlugs = new Set(allPosts.map((p) => p.category));
    const list = [
      { id: "all", label: "All Briefings" },
      { id: "trending", label: "Trending" }, // virtual filter using tag, if you want later
    ];

    categories.forEach((cat) => {
      if (usedSlugs.has(cat.slug)) {
        list.push({ id: cat.slug, label: cat.name });
      }
    });

    return list;
  }, [allPosts, categories]);

  // Handle resize for mobile slice
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Filter logic
  const filteredPosts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return allPosts.filter((post) => {
      let matchesCategory = true;

      if (activeFilter === "trending") {
        // example: treat "trending" as those with tag name/slug "trending" later
        matchesCategory = post.tags && post.tags.length > 0;
      } else if (activeFilter !== "all") {
        matchesCategory = post.category === activeFilter;
      }

      if (!query) return matchesCategory;

      const matchesSearch =
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, searchQuery, allPosts]);

  const displayPosts = isMobile
    ? filteredPosts.slice(0, POSTS_PER_PAGE_MOBILE)
    : filteredPosts;

  return (
    <section className="relative background-gradient-white dark:bg-[#13171A] w-full border-t border-slate-200 dark:border-white/5">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#000000_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-20 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* LEFT SIDEBAR */}
          <div className="lg:col-span-3 sticky top-24 self-start">
            <div className="space-y-8">
              {/* Header & Search */}
              <div>
                <h3 className="text-slate-900 dark:text-white font-bold text-lg flex items-center gap-2 mb-6">
                  <Filter className="w-4 h-4 text-orange-500" />
                  Intel Filters
                </h3>

                <div className="relative mb-6 group">
                  <input
                    type="text"
                    placeholder="Search archives..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-neutral-900 border border-slate-300 dark:border-white/10 rounded-lg py-3 pl-10 pr-4 text-sm text-slate-900 dark:text-slate-300 placeholder:text-slate-500 dark:placeholder:text-slate-600 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 dark:text-slate-500 group-focus-within:text-orange-500 transition-colors" />
                </div>
              </div>

              {/* Categories Nav */}
              <nav className="flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 no-scrollbar">
                {blogCategories.map((cat) => {
                  const Icon = categoryIcons[cat.id] || Globe;
                  const isActive = activeFilter === cat.id;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveFilter(cat.id)}
                      className={`flex-shrink-0 lg:w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group relative overflow-hidden border lg:border-transparent
                        ${
                          isActive
                            ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20 border-orange-500"
                            : "bg-slate-100 dark:bg-neutral-900/50 lg:bg-transparent border-slate-300 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                        }
                      `}
                    >
                      <Icon
                        className={`w-4 h-4 ${
                          isActive
                            ? "text-white"
                            : "text-slate-500 dark:text-slate-500 group-hover:text-orange-500 dark:group-hover:text-orange-400"
                        }`}
                      />
                      <span className="whitespace-nowrap">{cat.label}</span>
                      {isActive && (
                        <ChevronRight className="w-4 h-4 ml-auto hidden lg:block" />
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Newsletter Widget */}
              <div className="hidden lg:block bg-slate-100 dark:bg-neutral-900/50 border border-slate-300 dark:border-white/5 rounded-xl p-5">
                <h4 className="text-slate-900 dark:text-white text-sm font-bold mb-2">
                  Daily Briefing
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-500 mb-4">
                  Get critical defense updates delivered to your secure inbox.
                </p>
                <button className="w-full py-2 bg-slate-200 dark:bg-white/5 hover:bg-slate-300 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 rounded text-xs font-semibold text-slate-900 dark:text-white transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Blog Feed */}
          <div className="lg:col-span-9 min-h-[50vh]">
            <div className="space-y-8">
              {/* Feed Header */}
              <div className="flex items-end justify-between pb-6 border-b border-slate-200 dark:border-white/5">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                  Latest Analysis
                </h2>
                <span className="text-xs font-mono text-slate-600 dark:text-slate-500 hidden sm:block">
                  SHOWING {displayPosts.length} OF {filteredPosts.length}{" "}
                  REPORTS
                </span>
              </div>

              {/* Posts */}
              <div className="flex flex-col gap-8">
                {displayPosts.length > 0 ? (
                  displayPosts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/news/${post.slug}`}
                      className="block group"
                    >
                      <article className="grid md:grid-cols-12 gap-6 items-start">
                        {/* Thumbnail */}
                        <div className="md:col-span-5 relative aspect-video rounded-xl overflow-hidden bg-slate-200 dark:bg-neutral-800 border border-slate-300 dark:border-white/10 shadow-2xl">
                          {post.imageUrl ? (
                            <Image
                              src={post.imageUrl}
                              alt={post.title}
                              fill
                              sizes="(min-width: 768px) 40vw, 100vw"
                              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center text-slate-600">
                              <Globe className="w-8 h-8 opacity-20" />
                            </div>
                          )}

                          <div className="absolute top-3 left-3">
                            <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded text-[10px] font-bold text-white uppercase tracking-wider shadow-lg">
                              {post.categoryLabel}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="md:col-span-7 flex flex-col h-full py-1">
                          <div className="flex items-center gap-3 mb-3 text-xs font-medium text-slate-600 dark:text-slate-500">
                            <span className="text-orange-500 font-mono tracking-tight">
                              {formatDate(post.date)}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-700" />
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-3 h-3" />{" "}
                              {post.readTime || "5 min"}
                            </span>
                          </div>

                          <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-orange-500 transition-colors leading-tight">
                            {post.title}
                          </h3>

                          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2 md:line-clamp-3">
                            {post.excerpt}
                          </p>

                          <div className="mt-auto flex items-center justify-between border-t border-slate-200 dark:border-white/5 pt-4">
                            <div className="text-xs text-slate-600 dark:text-slate-500">
                              By{" "}
                              <span className="text-slate-700 dark:text-slate-300 font-medium">
                                Defense Bureau
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white group-hover:text-orange-500 transition-colors uppercase tracking-wider">
                              Read Briefing <ArrowRight className="w-3 h-3" />
                            </div>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-24 border border-dashed border-slate-300 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-white/5">
                    <div className="w-16 h-16 bg-slate-200 dark:bg-neutral-800 rounded-full flex items-center justify-center mb-4">
                      <Search className="w-6 h-6 text-slate-500 dark:text-slate-500" />
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 text-lg font-medium mb-1">
                      No briefings found
                    </p>
                    <button
                      onClick={() => {
                        setActiveFilter("all");
                        setSearchQuery("");
                      }}
                      className="mt-6 text-orange-500 text-sm hover:underline"
                    >
                      Reset all filters
                    </button>
                  </div>
                )}
              </div>

              {displayPosts.length > 0 && (
                <div className="pt-12 flex justify-center">
                  <Link
                    href="/news"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-slate-100 dark:bg-neutral-900 border border-slate-300 dark:border-white/10 hover:border-orange-500/50 hover:text-orange-500 rounded-full text-sm font-semibold text-slate-700 dark:text-slate-300 transition-all duration-300 shadow-lg hover:shadow-orange-900/20"
                  >
                    View All Briefings <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
