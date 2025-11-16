"use client";

import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";

const logo = "/logo.png";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const footerSections = [
    {
      label: "Platform",
      items: [
        { name: "Home", path: "/" },
        { name: "Blog & Briefings", path: "/news" },
        { name: "About", path: "/about" },
        { name: "Contact HQ", path: "/contact-us" },
      ],
    },
    {
      label: "Domains",
      items: [
        { name: "Missiles & Artillery", path: "/news?tab=missiles" },
        { name: "Air Power", path: "/news?tab=air-force" },
        { name: "Sea Power", path: "/news?tab=navy" },
        { name: "Land Forces", path: "/news?tab=army" },
        { name: "Cyber & EW", path: "/news?tab=electronic-warfare" },
      ],
    },
    {
      label: "The Wire Room",
      items: [
        { name: "Editorial Policy", path: "/editorial-policy" },
        { name: "Research Approach", path: "/methodology" },
        { name: "Submit a Tip", path: "/contact-us#tips" },
      ],
    },
    {
      label: "Legal",
      items: [
        { name: "Privacy Policy", path: "/privacy-policy" },
        { name: "Terms of Use", path: "/terms" },
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-military-brown/40">
      {/* Camo background image - same as header */}
      <div
        className="pointer-events-none absolute inset-0 bg-[url('/header_bg.jpg')] bg-cover bg-center"
        aria-hidden="true"
      />

      {/* Dark overlay for readability - same as header */}
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/70 via-black/80 to-black/90"
        aria-hidden="true"
      />

      {/* Footer content */}
      <div className="relative mx-auto max-w-7xl px-4 pt-12 pb-8 text-military-khaki sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-y-12 gap-x-10 md:grid-cols-2 lg:grid-cols-12 pb-8">
          {/* Logo + mission + social */}
          <div className="space-y-6 lg:col-span-4">
            <button
              type="button"
              onClick={scrollToTop}
              className="group inline-flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-military-khaki focus:ring-offset-2 focus:ring-offset-black rounded"
            >
              <Image
                src={logo}
                alt="Military Matters 24/7"
                width={56}
                height={56}
                className="h-12 w-auto cursor-pointer transition-transform group-hover:scale-105 sm:h-14"
                priority
              />
              <span className="text-left text-xs font-semibold uppercase tracking-[0.22em] text-military-khaki">
                Military Matters 24/7
              </span>
            </button>

            <p className="max-w-md text-sm leading-relaxed text-military-khaki/90">
              Indian defence news, strategy and veteran perspectives — focused
              on clarity, capability and the realities of modern warfare.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              {[
                {
                  icon: Twitter,
                  label: "Twitter / X",
                  href: "#",
                },
                {
                  icon: Instagram,
                  label: "Instagram",
                  href: "#",
                },
                {
                  icon: Facebook,
                  label: "Facebook",
                  href: "#",
                },
                {
                  icon: Linkedin,
                  label: "LinkedIn",
                  href: "#",
                },
                {
                  icon: Youtube,
                  label: "YouTube",
                  href: "#",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus:outline-none focus:ring-2 focus:ring-military-khaki focus:ring-offset-2 focus:ring-offset-black rounded-full"
                >
                  <Button
                    size="icon"
                    variant="ghost"
                    className="rounded-full border border-white/10 bg-white/10 backdrop-blur-sm text-military-khaki hover:bg-white/20 hover:text-white hover:border-white/20 transition-all hover:scale-110"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4" />
                  </Button>
                </a>
              ))}
            </div>
          </div>

          {/* Link sections */}
          <div className="grid grid-cols-1 gap-8 md:col-span-1 md:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
            {footerSections.map((section) => (
              <div key={section.label} className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-military-khaki">
                  {section.label}
                </h3>
                <ul className="space-y-3 text-sm">
                  {section.items.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.path}
                        onClick={scrollToTop}
                        className="group inline-flex items-center gap-2 text-military-khaki/80 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-military-khaki focus:ring-offset-2 focus:ring-offset-black rounded px-1 -mx-1"
                      >
                        <span>{item.name}</span>
                        <span className="h-px w-0 bg-military-khaki transition-all group-hover:w-6" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Separator - prominent divider before copyright */}
        <div className="pt-8 pb-6">
          <Separator className="h-px w-full bg-military-brown/70" />
        </div>

        {/* Copyright section */}
        <div className="flex flex-col items-center justify-between gap-4 pt-2 pb-4 text-xs text-military-khaki/80 sm:flex-row">
          <p className="font-medium text-military-khaki">
            © {new Date().getFullYear()} Military Matters 24/7. All rights
            reserved.
          </p>
          <p className="text-center text-military-khaki/70 sm:text-right">
            Built for clear briefings, not noise. Hosted in India, focused on
            Indian defence.
          </p>
        </div>
      </div>
    </footer>
  );
}
