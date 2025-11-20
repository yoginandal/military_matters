import Link from "next/link";
import Image from "next/image";
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/data/blogPosts";

const BlogBanner = ({ title, categoryId }) => {
  const categoryLabel =
    BLOG_CATEGORIES.find((c) => c.id === categoryId)?.label ?? "Briefing";

  return (
    <section className="relative w-full overflow-hidden bg-orange-500">
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center justify-center gap-4 px-6 py-12 text-center sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/90">
          {categoryLabel}
        </p>
        <h1 className="text-3xl font-extrabold tracking-wide text-white sm:text-4xl md:text-5xl">
          {title}
        </h1>
      </div>
    </section>
  );
};

const BlogPostPage = ({ params }) => {
  const rawSlug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;
  let post =
    BLOG_POSTS.find(
      (p) => p.slug.toLowerCase() === String(rawSlug || "").toLowerCase()
    ) || BLOG_POSTS[0];

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <BlogBanner title={post.title} categoryId={post.category} />

      <article className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Meta */}
        <header className="mb-6 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-600">
          <div className="flex flex-wrap items-center gap-3">
            <span>{new Date(post.date).toLocaleDateString("en-IN")}</span>
            <span className="h-1 w-1 rounded-full bg-gray-400" />
            <span>{post.readTime}</span>
          </div>
          <Link
            href="/news"
            className="font-semibold uppercase tracking-wide text-orange-500 hover:text-orange-600"
          >
            ← Back to all briefings
          </Link>
        </header>

        {/* Hero image */}
        <div className="mb-8 overflow-hidden rounded-2xl border border-orange-200 shadow-md">
          <div className="relative aspect-video w-full">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 768px, 100vw"
              priority
              unoptimized
            />
          </div>
        </div>

        {/* Tags */}
        <div className="mb-6 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-orange-500 bg-orange-100 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-orange-600"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Body – real briefing for first post, template for others */}
        {post.slug === "brahmos-next-gen-strike-power" ? (
          <div className="prose max-w-none prose-p:text-gray-700 prose-headings:text-gray-900 prose-strong:text-gray-900 prose-a:text-orange-500 prose-a:no-underline hover:prose-a:text-orange-600">
            <p>
              India’s BrahMos cruise missile has become one of the most
              recognisable symbols of New Delhi’s precision–strike capability.
              Developed jointly with Russia and continually upgraded by DRDO and
              the armed forces, it gives Indian commanders the ability to hit
              high–value targets at long range with very little warning time for
              the adversary.
            </p>

            <h2>Why BrahMos Matters Now</h2>
            <p>
              In any future high–tempo crisis, the side that can strike first –
              and accurately – will shape the escalation ladder. BrahMos, with
              its supersonic speed, sea–skimming profile and precision guidance,
              is designed exactly for that role. Deployed on land along
              sensitive sectors, at sea on frontline destroyers and frigates,
              and from the air on upgraded Su-30 MKI aircraft, it gives India a
              rare tri–service stand‑off strike option.
            </p>

            <h2>From Block‑I to Next Generation</h2>
            <p>
              The original land–attack versions were optimised for fixed targets
              such as command centres, air bases and logistics hubs. The current
              upgrade path focuses on extended range (beyond 400 km), improved
              seeker resilience against jamming, and lighter air–launched
              variants that can be integrated on more platforms. Parallel work
              on a next‑generation BrahMos with higher speeds and smarter
              seekers is intended to keep the missile credible against layered
              air defences.
            </p>

            <h2>Deterrence Along Contested Borders</h2>
            <p>
              For India’s northern and eastern borders, BrahMos batteries
              provide the ability to hold critical infrastructure at risk
              without crossing the Line of Actual Control. That complicates an
              adversary’s planning: any massing of forces, forward bases or key
              logistics nodes can be targeted early in a conflict. The
              psychological effect of a high‑speed, precision strike weapon also
              contributes to deterrence, even before the first shot is fired.
            </p>

            <h2>Export Potential and Strategic Signalling</h2>
            <p>
              The Philippines contract marked the first major export of the
              BrahMos system and signalled New Delhi’s intent to be a serious
              defence exporter in the Indo‑Pacific. Future sales to friendly
              countries will not only strengthen their coastal defence but also
              deepen India’s network of military partnerships – an important
              counterweight to expanding Chinese maritime power.
            </p>

            <h2>What to Watch Next</h2>
            <p>
              In the coming years, key signposts to track will be: new range and
              seeker upgrades entering service; progress on lighter variants for
              additional aircraft and possibly submarines; and follow‑on export
              contracts in Southeast Asia and beyond. Together, these will
              determine how central BrahMos remains to India’s precision‑strike
              doctrine in the 2030s.
            </p>
          </div>
        ) : (
          <div className="prose max-w-none prose-p:text-gray-700 prose-headings:text-gray-900 prose-strong:text-gray-900 prose-a:text-orange-500 prose-a:no-underline hover:prose-a:text-orange-600">
            <p>
              This is a briefing template for <strong>{post.title}</strong>. In
              the live version, this section will be populated from your CMS or
              database. The structure below is designed for clear, analytical
              storytelling with a defence and strategic affairs focus.
            </p>

            <h2>Situation Overview</h2>
            <p>
              Provide a crisp summary of what is happening, why it matters, and
              who the key actors are. For military and strategic audiences,
              focus on capabilities, geography, timelines, and intent rather
              than generic news copy.
            </p>

            <h2>Order of Battle & Capabilities</h2>
            <p>
              Break down platforms, systems, and units involved – ranges,
              payloads, basing, supporting assets, and integration with other
              domains (air/sea/cyber/space). Use this section to anchor the
              reader in hard military facts.
            </p>

            <h2>Implications for India</h2>
            <p>
              Analyse how the development impacts Indian interests, posture, or
              doctrine. Consider regional balances, escalation ladders, and how
              new capabilities affect deterrence and crisis stability.
            </p>

            <h2>What to Watch Next</h2>
            <p>
              Close with 3–5 key signposts: upcoming trials, deployments, policy
              decisions, or technology milestones that will determine how the
              story evolves over the next 6–18 months.
            </p>
          </div>
        )}
      </article>
    </main>
  );
};

export default BlogPostPage;
