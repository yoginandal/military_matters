"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BLOG_CATEGORIES, BLOG_POSTS } from "@/data/blogPosts";
import { motion } from "framer-motion";

// --- BANNER COMPONENT ---
const BlogBanner = () => {
  return (
    <section className="w-full overflow-hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-4 px-6 py-16 text-center sm:py-20">
        <p className="font-semibold uppercase tracking-widest text-orange-500 dark:text-orange-600">
          Intelligence Briefings
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl">
          Defence & Strategic Affairs
        </h1>
        <p className="max-w-3xl text-lg text-slate-600 dark:text-slate-400">
          Curated analysis on India&apos;s military modernisation, air and sea
          power, frontier deployments, and the technologies shaping
          tomorrow&apos;s battlespace.
        </p>
      </div>
    </section>
  );
};

// --- HELPER FUNCTIONS ---
const categoryIdForTab = (tabValue) => (tabValue === "all" ? "all" : tabValue);
const normalize = (value) =>
  String(value || "")
    .toLowerCase()
    .replace(/\s+/g, "-");
const filterPostsForCategory = (categoryId) => {
  if (categoryId === "all") return BLOG_POSTS;
  const normalizedCategory = normalize(categoryId);
  return BLOG_POSTS.filter((post) => {
    if (normalize(post.category) === normalizedCategory) return true;
    const tagSlugs = (post.tags || []).map(normalize);
    return tagSlugs.includes(normalizedCategory);
  });
};

// --- MAIN CONTENT with RECTANGULAR TABS & ALIGNED CARDS ---
function NewsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabFromQuery = searchParams.get("tab");
  const isValidTab = BLOG_CATEGORIES.some((cat) => cat.id === tabFromQuery);
  const initialTab = isValidTab ? tabFromQuery : "all";
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const handleTabChange = (value) => {
    setActiveTab(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete("tab");
    } else {
      params.set("tab", value);
    }
    const search = params.toString();
    router.push(search ? `/news?${search}` : "/news", { scroll: false });
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <div className="flex justify-center">
          <TabsList className="relative flex w-full max-w-max items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 p-1">
            {BLOG_CATEGORIES.map((cat) => (
              <TabsTrigger
                key={cat.id}
                value={cat.id}
                className="relative flex-1 whitespace-nowrap rounded-md px-4 py-2 text-sm font-bold text-slate-700 dark:text-slate-300 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                {activeTab === cat.id && (
                  <motion.span
                    layoutId="bubble"
                    className="absolute inset-0 z-10 bg-linear-to-r from-orange-500 to-orange-600 shadow-md"
                    style={{ borderRadius: "0.375rem" }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-20">{cat.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {BLOG_CATEGORIES.map((cat) => {
          const posts = filterPostsForCategory(cat.id);
          return (
            <TabsContent key={cat.id} value={cat.id} className="mt-12">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <article
                    key={post.slug}
                    className="group relative flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-900/40"
                  >
                    {/* Fixed image container: no overlay, aligned height */}
                    <div className="relative w-full aspect-video bg-gray-500">
                      {post.imageUrl && (
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="absolute h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      )}
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="absolute inset-0"
                      aria-label={post.title}
                    />

                    <div className="relative z-10 flex flex-1 flex-col justify-between p-6">
                      <header className="space-y-3">
                        <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                          <span className="inline-flex items-center rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                            {cat.label}
                          </span>
                          <span className="h-1 w-1 rounded-full bg-slate-400 dark:bg-slate-500" />
                          <span>{post.readTime}</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                          {post.title}
                        </h3>
                        <p className="text-slate-700 dark:text-slate-100/90">{post.excerpt}</p>
                      </header>
                      <footer className="mt-6">
                        <span className="text-sm font-bold text-orange-500 dark:text-orange-400 transition-all group-hover:underline">
                          Read Briefing →
                        </span>
                      </footer>
                    </div>
                  </article>
                ))}

                {posts.length === 0 && (
                  <div className="col-span-full rounded-xl border border-dashed border-orange-300 dark:border-orange-600 bg-orange-50 dark:bg-orange-950/20 py-16 text-center text-orange-700 dark:text-orange-400">
                    No briefings in this domain yet. New analyses will be
                    deployed soon.
                  </div>
                )}
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </section>
  );
}

// --- FINAL PAGE ASSEMBLY ---
export default function NewsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <BlogBanner />
      <Suspense
        fallback={
          <div className="flex justify-center items-center py-24 text-slate-600 dark:text-slate-500">
            Loading Briefings...
          </div>
        }
      >
        <NewsContent />
      </Suspense>
    </main>
  );
}
