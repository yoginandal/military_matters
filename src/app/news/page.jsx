"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BLOG_CATEGORIES, BLOG_POSTS } from "@/data/blogPosts";

const BlogBanner = () => {
  return (
    <section className="relative w-full overflow-hidden border-b border-military-brown/40">
      <div className="absolute inset-0 bg-[url('/header_bg.jpg')] bg-cover bg-center opacity-60" />
      <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/90 to-black/95" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center justify-center gap-4 px-6 py-12 text-center sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-military-khaki/80">
          Intelligence Briefings
        </p>
        <h1 className="text-3xl font-extrabold tracking-wide text-military-khaki sm:text-4xl md:text-5xl">
          Defence & Strategic Affairs Blog
        </h1>
        <p className="max-w-2xl text-sm text-military-khaki/80 sm:text-base">
          Curated analysis on India&apos;s military modernisation, air and sea
          power, frontier deployments, and the technologies shaping
          tomorrow&apos;s battlespace.
        </p>
      </div>
    </section>
  );
};

const categoryIdForTab = (tabValue) => {
  if (tabValue === "all") return "all";
  return tabValue;
};

const normalize = (value) =>
  String(value || "")
    .toLowerCase()
    .replace(/\s+/g, "-");

const filterPostsForCategory = (categoryId) => {
  if (categoryId === "all") return BLOG_POSTS;

  const normalizedCategory = normalize(categoryId);

  return BLOG_POSTS.filter((post) => {
    // Match by explicit category field first
    if (normalize(post.category) === normalizedCategory) return true;

    // Fallback: match by tags (so "Air Force" tag matches "air-force" tab, etc.)
    const tagSlugs = (post.tags || []).map((tag) => normalize(tag));
    return tagSlugs.includes(normalizedCategory);
  });
};

function NewsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabFromQuery = searchParams.get("tab");
  const isValidTab = BLOG_CATEGORIES.some((cat) => cat.id === tabFromQuery);
  const initialTab = isValidTab ? tabFromQuery : "all";
  const [activeTab, setActiveTab] = useState(initialTab);

  // Keep active tab in sync with URL changes (e.g. clicking nav links)
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const handleTabChange = (value) => {
    setActiveTab(value);

    // Update URL ?tab=... when user clicks on tabs
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
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold tracking-wide text-military-khaki/90">
            Browse by domain
          </h2>
        </div>

        <div className="mt-4 w-full overflow-x-auto pb-2">
          <TabsList className="flex min-w-max gap-2 rounded-full border border-military-brown/40 bg-military-charcoal-light/60 px-3 py-2 text-[11px] sm:text-xs md:text-sm">
            {BLOG_CATEGORIES.map((cat) => (
              <TabsTrigger
                key={cat.id}
                value={cat.id}
                className="rounded-full border border-transparent px-3 py-1.5 font-medium text-military-khaki/80 transition-all data-[state=active]:border-military-khaki data-[state=active]:bg-military-army-green/40 data-[state=active]:text-white hover:bg-military-army-green/20"
              >
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {BLOG_CATEGORIES.map((cat) => {
          const categoryId = categoryIdForTab(cat.id);
          const posts = filterPostsForCategory(categoryId);

          return (
            <TabsContent key={cat.id} value={cat.id} className="mt-8">
              <div className="grid gap-6 md:gap-8">
                {posts.map((post) => (
                  <article
                    key={post.slug}
                    className="group overflow-hidden rounded-2xl border border-military-brown/50 bg-military-charcoal-light/80 shadow-lg shadow-black/40 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Image */}
                      <div className="relative w-full md:w-2/5">
                        <div className="aspect-video md:h-full md:min-h-[200px]">
                          <img
                            src={post.imageUrl}
                            alt={post.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-military-khaki">
                          {BLOG_CATEGORIES.find((c) => c.id === post.category)
                            ?.label ?? "Briefing"}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex flex-1 flex-col justify-between p-4 sm:p-6">
                        <header className="space-y-2">
                          <div className="flex flex-wrap items-center gap-3 text-xs text-military-khaki/70">
                            <span>
                              {new Date(post.date).toLocaleDateString(
                                "en-IN"
                              )}
                            </span>
                            <span className="h-1 w-1 rounded-full bg-military-khaki/60" />
                            <span>{post.readTime}</span>
                          </div>
                          <h3 className="text-lg font-semibold text-white sm:text-xl">
                            <Link
                              href={`/blog/${post.slug}`}
                              className="transition-colors hover:text-military-khaki"
                            >
                              {post.title}
                            </Link>
                          </h3>
                          <p className="text-sm text-military-khaki/80 sm:text-[0.95rem]">
                            {post.excerpt}
                          </p>
                        </header>

                        <footer className="mt-4 flex flex-wrap items-center justify-between gap-3">
                          <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full border border-military-army-green/50 bg-military-army-green/20 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-military-khaki"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <Link
                            href={`/blog/${post.slug}`}
                            className="text-xs font-semibold uppercase tracking-wide text-military-khaki hover:text-white"
                          >
                            Read briefing →
                          </Link>
                        </footer>
                      </div>
                    </div>
                  </article>
                ))}

                {posts.length === 0 && (
                  <div className="rounded-xl border border-military-brown/40 bg-military-charcoal-light/60 px-4 py-10 text-center text-sm text-military-khaki/80">
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

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-military-charcoal text-military-khaki">
      <BlogBanner />
      <Suspense
        fallback={
          <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center py-20">
              <div className="text-military-khaki/60">Loading...</div>
            </div>
          </section>
        }
      >
        <NewsContent />
      </Suspense>
    </main>
  );
}


