import { HeroSection } from "./Home/Hero";
// import { DomainsSection } from "./Home/domains-section";
import { LatestBriefingsSection } from "./Home/LatestBriefingsSection";
import { BlogFeedSection } from "./Home/BlogFeedSection";
import { TrendingNowSection } from "./Home/TrendingNowSection";
import { CommunityFeedSection } from "./Home/CommunityFeedSection/CommunityFeedSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      {/* <DomainsSection /> */}
      <LatestBriefingsSection />
      <TrendingNowSection />
      <CommunityFeedSection />
      <BlogFeedSection />
    </div>
  );
}
