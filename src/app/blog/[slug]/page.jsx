import Link from "next/link";
import Image from "next/image";
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/data/blogPosts";

const BlogBanner = ({ title, categoryId }) => {
  const categoryLabel =
    BLOG_CATEGORIES.find((c) => c.id === categoryId)?.label ?? "Briefing";

  return (
    <section className="relative w-full border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center justify-center gap-4 px-6 py-10 text-center sm:py-14">
        <p className="inline-flex items-center rounded-full bg-orange-500 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-white">
          {categoryLabel}
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
          {title}
        </h1>
        <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-300">
          In‑depth briefing on platforms, doctrine and the balances that shape
          India&apos;s security environment.
        </p>
      </div>
    </section>
  );
};

const BlogPostPage = ({ params }) => {
  const rawSlug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;
  const post =
    BLOG_POSTS.find(
      (p) => p.slug.toLowerCase() === String(rawSlug || "").toLowerCase()
    ) || BLOG_POSTS[0];

  const categoryLabel =
    BLOG_CATEGORIES.find((c) => c.id === post.category)?.label ?? "Briefing";

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 pb-10">
      <BlogBanner title={post.title} categoryId={post.category} />

      <article className="mx-auto mt-8 w-full max-w-4xl rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/60 px-4 py-8 shadow-lg dark:shadow-[0_18px_60px_rgba(0,0,0,0.65)] backdrop-blur sm:px-6 lg:px-8">
        {/* Meta + back link */}
        <header className="mb-8 flex flex-col gap-4 border-b border-slate-200 dark:border-slate-800 pb-6 text-xs text-slate-600 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <span>{new Date(post.date).toLocaleDateString("en-IN")}</span>
            <span className="h-1 w-1 rounded-full bg-slate-400 dark:bg-slate-600" />
            <span>{post.readTime}</span>
            <span className="h-1 w-1 rounded-full bg-slate-400 dark:bg-slate-600" />
            <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-700 dark:text-slate-200">
              {categoryLabel}
            </span>
          </div>
          <Link
            href="/news"
            className="inline-flex items-center justify-center gap-1 rounded-full border border-orange-500 bg-orange-500 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-white transition-colors hover:border-orange-400 hover:bg-orange-400"
          >
            <span>← Back to all briefings</span>
          </Link>
        </header>

        {/* Hero image */}
        <section className="mb-10">
          <div className="overflow-hidden rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 shadow-lg">
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
        </section>

        {/* Tags */}
        <section className="mb-8">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-600 dark:text-slate-400">
            Key themes
          </h2>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-orange-500 bg-orange-500 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-white"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* Body intro */}
        <section className="mb-8 space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-600 dark:text-slate-400">
            Briefing overview
          </h2>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            This briefing is structured for quick situational awareness first,
            followed by deeper analysis on capabilities, deterrence and what to
            watch next.
          </p>
        </section>

        {/* Body content – NO prose, manual Tailwind */}
        <section className="space-y-10">
          {post.slug === "brahmos-next-gen-strike-power" ? (
            <>
              <p className="text-sm md:text-base leading-relaxed text-slate-700 dark:text-slate-200">
                India's BrahMos cruise missile has become one of the most
                recognisable symbols of New Delhi's precision–strike capability.
                Developed jointly with Russia and continually upgraded by DRDO
                and the armed forces, it gives Indian commanders the ability to
                hit high–value targets at long range with very little warning
                time for the adversary.
              </p>

              <div className="space-y-3">
                <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white">
                  Why BrahMos Matters Now
                </h2>
                <p className="text-sm md:text-base leading-relaxed text-slate-700 dark:text-slate-200">
                  In any future high–tempo crisis, the side that can strike
                  first – and accurately – will shape the escalation ladder.
                  BrahMos, with its supersonic speed, sea–skimming profile and
                  precision guidance, is designed exactly for that role.
                  Deployed on land along sensitive sectors, at sea on frontline
                  destroyers and frigates, and from the air on upgraded Su-30
                  MKI aircraft, it gives India a rare tri–service stand‑off
                  strike option.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white">
                  From Block‑I to Next Generation
                </h2>
                <p className="text-sm md:text-base leading-relaxed text-slate-700 dark:text-slate-200">
                  The original land–attack versions were optimised for fixed
                  targets such as command centres, air bases and logistics hubs.
                  The current upgrade path focuses on extended range (beyond 400
                  km), improved seeker resilience against jamming, and lighter
                  air–launched variants that can be integrated on more
                  platforms. Parallel work on a next‑generation BrahMos with
                  higher speeds and smarter seekers is intended to keep the
                  missile credible against layered air defences.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white">
                  Deterrence Along Contested Borders
                </h2>
                <p className="text-sm md:text-base leading-relaxed text-slate-700 dark:text-slate-200">
                  For India’s northern and eastern borders, BrahMos batteries
                  provide the ability to hold critical infrastructure at risk
                  without crossing the Line of Actual Control. That complicates
                  an adversary’s planning: any massing of forces, forward bases
                  or key logistics nodes can be targeted early in a conflict.
                  The psychological effect of a high‑speed, precision strike
                  weapon also contributes to deterrence, even before the first
                  shot is fired.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white">
                  Export Potential and Strategic Signalling
                </h2>
                <p className="text-sm md:text-base leading-relaxed text-slate-700 dark:text-slate-200">
                  The Philippines contract marked the first major export of the
                  BrahMos system and signalled New Delhi’s intent to be a
                  serious defence exporter in the Indo‑Pacific. Future sales to
                  friendly countries will not only strengthen their coastal
                  defence but also deepen India’s network of military
                  partnerships – an important counterweight to expanding Chinese
                  maritime power.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl md:text-3xl font-semibold text-white">
                  What to Watch Next
                </h2>
                <p className="text-sm md:text-base leading-relaxed text-slate-200">
                  In the coming years, key signposts to track will be: new range
                  and seeker upgrades entering service; progress on lighter
                  variants for additional aircraft and possibly submarines; and
                  follow‑on export contracts in Southeast Asia and beyond.
                  Together, these will determine how central BrahMos remains to
                  India’s precision‑strike doctrine in the 2030s.
                </p>
              </div>
            </>
          ) : (
            <>
              <p className="text-sm md:text-base leading-relaxed text-slate-700 dark:text-slate-200">
                This is a briefing template for{" "}
                <span className="font-semibold text-slate-900 dark:text-white">
                  {post.title}
                </span>
                . In the live version, this section will be populated from your
                CMS or database. The structure below is designed for clear,
                analytical storytelling with a defence and strategic affairs
                focus.
              </p>

              <div className="space-y-3">
                <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white">
                  Situation Overview
                </h2>
                <p className="text-sm md:text-base leading-relaxed text-slate-700 dark:text-slate-200">
                  Provide a crisp summary of what is happening, why it matters,
                  and who the key actors are. For military and strategic
                  audiences, focus on capabilities, geography, timelines, and
                  intent rather than generic news copy.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white">
                  Order of Battle &amp; Capabilities
                </h2>
                <p className="text-sm md:text-base leading-relaxed text-slate-700 dark:text-slate-200">
                  Break down platforms, systems, and units involved – ranges,
                  payloads, basing, supporting assets, and integration with
                  other domains (air/sea/cyber/space). Use this section to
                  anchor the reader in hard military facts.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white">
                  Implications for India
                </h2>
                <p className="text-sm md:text-base leading-relaxed text-slate-700 dark:text-slate-200">
                  Analyse how the development impacts Indian interests, posture,
                  or doctrine. Consider regional balances, escalation ladders,
                  and how new capabilities affect deterrence and crisis
                  stability.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white">
                  What to Watch Next
                </h2>
                <p className="text-sm md:text-base leading-relaxed text-slate-700 dark:text-slate-200">
                  Close with 3–5 key signposts: upcoming trials, deployments,
                  policy decisions, or technology milestones that will determine
                  how the story evolves over the next 6–18 months.
                </p>
              </div>
            </>
          )}
        </section>
      </article>
    </main>
  );
};

export default BlogPostPage;
