import Image from "next/image";
import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import Drawer from "./Drawer";

export default function BannerNav() {
  return (
    <nav
      className="w-full py-3 px-4 text-sm border-b border-military-brown/40"
      aria-label="Main navigation"
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center focus:outline-none focus:ring-2 focus:ring-military-khaki focus:ring-offset-2 focus:ring-offset-black rounded"
            aria-label="Military Matters 24/7 - Home"
          >
            <Image
              src="/logo.png"
              alt="Military Matters 24/7 - Military News and Analysis"
              width={56}
              height={56}
              className="h-12 sm:h-14 w-auto object-contain transition-transform duration-300 hover:scale-105"
              priority
              quality={90}
            />
          </Link>
        </div>

        {/* Contact Info + Drawer */}
        <div className="flex items-center gap-8 text-military-khaki">
          {/* Contact Links - Hidden on Mobile */}
          <div className="hidden lg:flex items-center space-x-6">
            <a
              href="#location"
              className="flex items-center gap-2 hover:text-white transition-colors duration-300 group focus:outline-none focus:ring-2 focus:ring-military-khaki focus:ring-offset-2 focus:ring-offset-military-army-green rounded"
              aria-label="View location"
            >
              <MapPin
                size={16}
                className="text-military-red group-hover:text-military-red-dark"
                aria-hidden="true"
              />
              <span className="text-sm">New Delhi, India</span>
            </a>
            <a
              href="mailto:info@militarymatters.com"
              className="flex items-center gap-2 hover:text-white transition-colors duration-300 group focus:outline-none focus:ring-2 focus:ring-military-khaki focus:ring-offset-2 focus:ring-offset-military-army-green rounded"
              aria-label="Send email to info@militarymatters.com"
            >
              <Mail
                size={16}
                className="text-military-red group-hover:text-military-red-dark"
                aria-hidden="true"
              />
              <span className="text-sm">info@militarymatters.com</span>
            </a>
            <a
              href="tel:+97150XXXXXXX"
              className="flex items-center gap-2 hover:text-white transition-colors duration-300 group focus:outline-none focus:ring-2 focus:ring-military-khaki focus:ring-offset-2 focus:ring-offset-military-army-green rounded"
              aria-label="Call +971 50 XXX XXXX"
            >
              <Phone
                size={16}
                className="text-military-red group-hover:text-military-red-dark"
                aria-hidden="true"
              />
              <span className="text-sm">+971 50 XXX XXXX</span>
            </a>
          </div>

          {/* Mobile Drawer */}
          <Drawer />
        </div>
      </div>
    </nav>
  );
}
