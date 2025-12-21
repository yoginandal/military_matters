"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Mail } from "lucide-react";
import Drawer from "./Drawer";
import { ThemeToggle } from "@/components/theme-toggle";
import { SpaceIcon } from "lucide-react";

export default function BannerNav() {
  return (
    <nav
      className="w-full background-gradient-white py-3 px-4 sm:px-6"
      aria-label="Main navigation"
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="group rounded-lg focus:outline-none focus:ring-4 focus:ring-orange-400/60 focus:ring-offset-4 focus:ring-offset-white dark:focus:ring-offset-neutral-900"
          aria-label="Military Matters 24/7 - Home"
        >
          <div>
            {/* <Image
              src="/logo.png"
              alt="Military Matters 24/7"
              width={88}
              height={88}
              className="h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
              priority
              quality={100}
            /> */}
            <span className="flex items-center gap-2.5 text-slate-700 dark:text-slate-100 hover:text-slate-900 dark:hover:text-white transition-colors duration-300 group">
              Military Matters
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-6 text-slate-900 dark:text-white">
          <div className="hidden lg:flex items-center space-x-6 font-semibold">
            <a
              href="#location"
              className="flex items-center gap-2.5 text-slate-700 dark:text-slate-100 hover:text-slate-900 dark:hover:text-white transition-colors duration-300 group"
            >
              <MapPin
                size={20}
                className="text-orange-500 group-hover:text-orange-400 transition-colors"
                aria-hidden="true"
              />
              <span>New Delhi, India</span>
            </a>
            <a
              href="mailto:info@militarymatters.com"
              className="flex items-center gap-2.5 text-slate-700 dark:text-slate-100 hover:text-slate-900 dark:hover:text-white transition-colors duration-300 group"
            >
              <Mail
                size={20}
                className="text-orange-500 group-hover:text-orange-400 transition-colors"
                aria-hidden="true"
              />
              <span>info@militarymatters.com</span>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Drawer />
          </div>
        </div>
      </div>
    </nav>
  );
}
