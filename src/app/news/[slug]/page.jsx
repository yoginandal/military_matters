// app/news/[slug]/page.jsx
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/wp";

export default async function PostPage({ params }) {
  const { slug } = params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const title = post.title?.rendered || "Untitled";
  const content = post.content?.rendered || "";
  const date = new Date(post.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <article className="mx-auto max-w-3xl px-4 py-10 sm:py-16">
        <p className="mb-3 text-xs font-mono text-slate-500 dark:text-slate-400">
          {date}
        </p>

        <h1 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
          {title}
        </h1>

        {image && (
          <div className="mb-6 overflow-hidden rounded-xl border border-slate-200 dark:border-white/10">
            <img
              src={image}
              alt={title}
              className="h-auto w-full object-cover"
            />
          </div>
        )}

        <div
          className="prose prose-slate max-w-none dark:prose-invert prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>
    </main>
  );
}
