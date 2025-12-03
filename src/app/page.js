import { HeroSection } from "./Home/Hero";
import { DomainsSection } from "./Home/domains-section";
import { LatestBriefingsSection } from "./Home/LatestBriefingsSection";
import { BlogFeedSection } from "./Home/BlogFeedSection";
import { MagazineSection } from "./Home/MagazineSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <DomainsSection />
      <LatestBriefingsSection />
      <MagazineSection />
      <BlogFeedSection />
    </div>
  );
}
