import { HeroSection } from "./Home/Hero";
import { LatestBriefingsSection } from "./Home/LatestBriefingsSection";
import { BlogFeedSection } from "./Home/BlogFeedSection";
import { TrendingNowSection } from "./Home/TrendingNowSection";
import { CommunityFeedSection } from "./Home/CommunityFeedSection/CommunityFeedSection";

import { getAllPosts, getCategories, getTags, findIdBySlug } from "@/lib/wp";

export default async function Home() {
  const [posts, categories, tags] = await Promise.all([
    getAllPosts(),
    getCategories(),
    getTags(),
  ]);

  // sort newest first
  const sorted = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));

  // you already built these earlier:
  const trendingTagId = findIdBySlug(tags, "trending");
  const latestTagId = findIdBySlug(tags, "latest");
  const intelTagId = findIdBySlug(tags, "intel");
  const heroTagId = findIdBySlug(tags, "hero");

  const heroPosts = heroTagId
    ? sorted.filter((p) => p.tags.includes(heroTagId)).slice(0, 4)
    : [];

  const trendingPosts = trendingTagId
    ? sorted.filter((p) => p.tags.includes(trendingTagId)).slice(0, 6)
    : sorted.slice(0, 6);

  const latestBriefingsPosts = latestTagId
    ? sorted.filter((p) => p.tags.includes(latestTagId)).slice(0, 6)
    : sorted.slice(0, 6);

  const intelPosts = intelTagId
    ? sorted.filter((p) => p.tags.includes(intelTagId))
    : [];

  return (
    <div>
      <HeroSection posts={heroPosts} categories={categories} />
      <LatestBriefingsSection posts={latestBriefingsPosts} />
      <TrendingNowSection posts={trendingPosts} />
      <CommunityFeedSection posts={intelPosts} categories={categories} />
      <BlogFeedSection posts={sorted} categories={categories} />
    </div>
  );
}
