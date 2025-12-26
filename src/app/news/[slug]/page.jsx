// app/news/[slug]/page.jsx
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { getPostBySlug, getCategories } from "@/lib/wp";

// Helper to extract category name
async function getCategoryName(categoryId) {
  try {
    const categories = await getCategories();
    const category = categories.find((cat) => cat.id === categoryId);
    return category?.name || "Briefing";
  } catch {
    return "Briefing";
  }
}

export default async function PostPage({ params }) {
  // In Next.js 16, params is a Promise and must be awaited
  const resolvedParams = await params;

  // Handle both array and string slug formats (Next.js 13+ compatibility)
  const rawSlug = Array.isArray(resolvedParams?.slug)
    ? resolvedParams.slug[0]
    : resolvedParams?.slug;
  const slug = String(rawSlug || "").trim();

  if (!slug) {
    notFound();
  }

  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const title = post.title?.rendered || "Untitled";
  const content = post.content?.rendered || "";
  const date = new Date(post.date);
  const formattedDate = date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;
  const categoryId = post.categories?.[0];
  const categoryName = categoryId
    ? await getCategoryName(categoryId)
    : "Briefing";

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900">
      {/* WordPress-style Simple Layout */}
      <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Title - WordPress Style */}
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-4">
            {title}
          </h1>
        </header>

        {/* Hero Image - WordPress Style */}
        {image && (
          <figure className="mb-8">
            <div className="relative w-full">
              <Image
                src={image}
                alt={title}
                width={1200}
                height={675}
                className="w-full h-auto rounded-lg"
                priority
              />
            </div>
          </figure>
        )}

        {/* All Content After Image - WordPress Exact Styling */}
        <div
          className="wp-content text-base sm:text-lg leading-relaxed text-slate-700 dark:text-slate-300
          [&_h2]:text-2xl [&_h2]:sm:text-3xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:dark:text-white [&_h2]:mt-10 [&_h2]:mb-6 [&_h2]:leading-tight
          [&_h3]:text-xl [&_h3]:sm:text-2xl [&_h3]:font-semibold [&_h3]:text-slate-900 [&_h3]:dark:text-white [&_h3]:mt-8 [&_h3]:mb-4
          [&_h4]:text-lg [&_h4]:sm:text-xl [&_h4]:font-semibold [&_h4]:text-slate-900 [&_h4]:dark:text-white [&_h4]:mt-6 [&_h4]:mb-3
          [&_p]:mb-6 [&_p]:leading-relaxed
          [&_strong]:font-semibold [&_strong]:text-slate-900 [&_strong]:dark:text-white
          [&_ul]:mb-6 [&_ul]:pl-6 [&_ul]:list-disc [&_ul]:space-y-3
          [&_ol]:mb-6 [&_ol]:pl-6 [&_ol]:list-decimal [&_ol]:space-y-3
          [&_li]:mb-2 [&_li]:leading-relaxed [&_li]:pl-2
          [&_li_strong]:font-semibold [&_li_strong]:text-slate-900 [&_li_strong]:dark:text-white
          [&_a]:text-orange-600 [&_a]:dark:text-orange-400 [&_a]:underline [&_a]:hover:no-underline
          [&_img]:rounded-lg [&_img]:my-6 [&_img]:w-full [&_img]:h-auto
          [&_blockquote]:border-l-4 [&_blockquote]:border-orange-500 [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:my-6 [&_blockquote]:text-slate-600 [&_blockquote]:dark:text-slate-400
          [&_code]:bg-slate-100 [&_code]:dark:bg-slate-800 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono
          [&_pre]:bg-slate-900 [&_pre]:dark:bg-slate-950 [&_pre]:text-slate-100 [&_pre]:rounded-lg [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:my-6
          [&_hr]:border-slate-200 [&_hr]:dark:border-slate-700 [&_hr]:my-8"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* Meta Footer */}
        <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formattedDate}</span>
              </div>
              <span className="h-1 w-1 rounded-full bg-slate-400 dark:bg-slate-600" />
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>5 min read</span>
              </div>
            </div>
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 transition-colors font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to briefings
            </Link>
          </div>
        </footer>
      </article>
    </main>
  );
}
