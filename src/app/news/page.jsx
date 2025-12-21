// app/news/page.jsx
import NewsPageClient from "./NewsPageClient";
import { getAllPosts, getCategories } from "@/lib/wp";

export default async function NewsPage() {
  const [posts, categories] = await Promise.all([
    getAllPosts(),
    getCategories(),
  ]);

  // sort newest first
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return <NewsPageClient posts={sortedPosts} categories={categories} />;
}
