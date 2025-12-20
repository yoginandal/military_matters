"use client";

import { Twitter, Linkedin, Github, Mail } from "lucide-react";

export function ProfileCard() {
  return (
    <div className="bg-white dark:bg-neutral-900 border-2 border-slate-300 dark:border-white/10 rounded-2xl p-8 text-center relative shadow-[8px_8px_0px_0px_#f97316]">
      {/* Avatar with Ring */}
      <div className="w-24 h-24 mx-auto bg-slate-200 dark:bg-neutral-800 rounded-full border-2 border-slate-300 dark:border-white p-1 mb-4 relative group cursor-pointer">
        <div className="w-full h-full bg-slate-300 dark:bg-slate-700 rounded-full overflow-hidden relative">
          {/* <Image src="/avatar.jpg" alt="Profile" fill className="object-cover" /> */}
          <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-slate-600 dark:text-slate-500">
            PR
          </div>
        </div>
        {/* Online Status Dot */}
        <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-4 border-white dark:border-neutral-900 rounded-full" />
      </div>

      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
        Prabhat Ranjan
      </h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed px-2">
        Senior Defense Analyst specializing in asymmetric warfare and
        cyber-security doctrines.
      </p>

      {/* Social Buttons */}
      <div className="flex justify-center gap-3">
        {[Twitter, Linkedin, Github, Mail].map((Icon, i) => (
          <button
            key={i}
            className="w-10 h-10 rounded-full bg-orange-500 border-2 border-orange-600 flex items-center justify-center text-black hover:bg-white hover:border-white transition-colors font-bold transform hover:-translate-y-1 duration-200 shadow-lg"
          >
            <Icon className="w-5 h-5" />
          </button>
        ))}
      </div>
    </div>
  );
}
