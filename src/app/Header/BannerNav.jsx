import Image from "next/image";
import Link from "next/link";
import { MapPin, Mail } from "lucide-react";
import Drawer from "./Drawer";

export default function BannerNav() {
  return (
    <nav
      className="w-full bg-neutral-900 py-3 px-4 sm:px-6"
      aria-label="Main navigation"
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="group rounded-lg focus:outline-none focus:ring-4 focus:ring-orange-400/60 focus:ring-offset-4 focus:ring-offset-neutral-900"
          aria-label="Military Matters 24/7 - Home"
        >
          <div className="rounded-lg bg-orange-500 p-1.5">
            <Image
              src="/logo.png"
              alt="Military Matters 24/7"
              width={88}
              height={88}
              className="h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
              priority
              quality={100}
            />
          </div>
        </Link>

        <div className="flex items-center gap-6 text-white">
          <div className="hidden lg:flex items-center space-x-6 font-semibold">
            <a
              href="#location"
              className="flex items-center gap-2.5 text-slate-100 hover:text-white transition-colors duration-300 group"
            >
              <MapPin
                size={20}
                className="text-orange-400 group-hover:text-orange-300 transition-colors"
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
                className="text-orange-400 group-hover:text-orange-300 transition-colors"
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
