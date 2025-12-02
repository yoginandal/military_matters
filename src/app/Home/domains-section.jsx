import Link from "next/link";
import {
  Rocket,
  Plane,
  Ship,
  Users,
  Shield,
  ArrowUpRight,
  Activity,
} from "lucide-react";

const domains = [
  {
    name: "Missiles & Artillery",
    id: "01",
    description:
      "Ballistic systems, precision strikes, and long-range fire capabilities.",
    icon: Rocket,
    href: "/missiles-artillery",
    count: 45,
  },
  {
    name: "Air Power",
    id: "02",
    description:
      "Next-gen fighters, UAV integration, and aerial dominance strategies.",
    icon: Plane,
    href: "/air-power",
    count: 78,
  },
  {
    name: "Sea Power",
    id: "03",
    description: "Subsurface warfare, carrier groups, and maritime security.",
    icon: Ship,
    href: "/sea-power",
    count: 56,
  },
  {
    name: "Land Forces",
    id: "04",
    description:
      "Armored mobility, infantry modernization, and tactical operations.",
    icon: Users,
    href: "/land-forces",
    count: 62,
  },
  {
    name: "Cyber & EW",
    id: "05",
    description:
      "Electronic countermeasures, spectrum dominance, and info-sec.",
    icon: Shield,
    href: "/cyber-ew",
    count: 34,
  },
];

export function DomainsSection() {
  return (
    <section className="py-24 bg-[#0a0a0a] relative overflow-hidden border-t border-white/5">
      {/* Background: Deep Void with Dot Matrix (Distinct from Grid) */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03]" />

      {/* Ambient Lighting - Asymmetrical "War Room" Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/4" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header - Cleaner Layout */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl relative">
            {/* Decorator Line */}
            <div className="absolute -left-6 top-2 bottom-2 w-1 bg-gradient-to-b from-orange-500 to-transparent rounded-full hidden md:block" />

            <span className="text-orange-500 text-xs font-mono font-bold uppercase tracking-widest mb-2 block">
              // Strategic Coverage
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Operational Domains
            </h2>
          </div>
          <div className="md:text-right max-w-xs">
            <p className="text-slate-400 text-sm leading-relaxed">
              Intelligence breakdown across the five pillars of modern defense
              technology.
            </p>
          </div>
        </div>

        {/* Domains Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {domains.map((domain) => {
            const Icon = domain.icon;
            return (
              <Link
                key={domain.name}
                href={`/news?tab=${domain.href.split("/").pop()}`}
                className="group relative h-full"
              >
                {/* Card Background: Glass Monolith style */}
                <div className="absolute inset-0 bg-white/[0.02] group-hover:bg-white/[0.04] border border-white/5 group-hover:border-orange-500/20 rounded-sm transition-all duration-500 backdrop-blur-sm" />

                {/* Active State: Orange Line Reveal */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-orange-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />

                {/* Content Container */}
                <div className="relative p-8 flex flex-col h-full z-10">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-8">
                    <div className="p-3 bg-white/5 rounded-sm border border-white/5 group-hover:bg-orange-500/10 group-hover:border-orange-500/20 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-slate-400 group-hover:text-orange-400 transition-colors" />
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-slate-700 group-hover:text-orange-500 transition-colors duration-300" />
                  </div>

                  {/* Text Content */}
                  <div className="mb-8 flex-grow">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-mono text-slate-600 group-hover:text-orange-500/70">
                        0{domain.id}
                      </span>
                      <h3 className="text-xl font-bold text-white group-hover:text-orange-500 transition-colors">
                        {domain.name}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed group-hover:text-slate-400 transition-colors border-l border-white/5 pl-4">
                      {domain.description}
                    </p>
                  </div>

                  {/* Footer Stats */}
                  <div className="flex items-center gap-2 pt-6 border-t border-white/5 group-hover:border-white/10">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 group-hover:bg-emerald-500 group-hover:shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all" />
                    <span className="text-xs font-mono text-slate-500 group-hover:text-white transition-colors">
                      {domain.count} Active Reports
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
