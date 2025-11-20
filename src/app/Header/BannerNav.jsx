import Image from "next/image";
import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import Drawer from "./Drawer";

export default function BannerNav() {
  return (
    <nav className="w-full py-3 px-4 sm:px-6" aria-label="Main navigation">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <Link
          href="/"
          className="group focus:outline-none focus:ring-4 focus:ring-amber-400/50 focus:ring-offset-4 focus:ring-offset-slate-900 rounded-lg"
          aria-label="Military Matters 24/7 - Home"
        >
          <Image
            src="/logo.png"
            alt="Military Matters 24/7"
            width={88}
            height={88}
            className="h-20 sm:h-22 w-auto object-contain transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_theme('colors.white/0.2')]"
            priority
            quality={100}
          />
        </Link>

        {/* Contact Info + Drawer */}
        <div className="flex items-center gap-6 text-white">
          {/* Contact Links */}
          <div className="hidden lg:flex items-center space-x-6 font-semibold">
            <a
              href="#location"
              className="flex items-center gap-2.5 text-slate-100 hover:text-white transition-colors duration-300 group"
            >
              <MapPin
                size={20}
                className="text-amber-400/80 group-hover:text-amber-400 transition-colors"
                aria-hidden="true"
              />
              <span>New Delhi, India</span>
            </a>
            <a
              href="mailto:info@militarymatters.com"
              className="flex items-center gap-2.5 text-slate-100 hover:text-white transition-colors duration-300 group"
            >
              <Mail
                size={20}
                className="text-amber-400/80 group-hover:text-amber-400 transition-colors"
                aria-hidden="true"
              />
              <span>info@militarymatters.com</span>
            </a>
          </div>
          <Drawer />
        </div>
      </div>
    </nav>
  );
}
