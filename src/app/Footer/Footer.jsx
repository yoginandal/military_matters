"use client";

import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/components/Logo";

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
    <footer className="relative overflow-hidden border-t border-slate-200 dark:border-neutral-800 background-gradient-white dark:bg-neutral-900">
      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-8 text-slate-900 dark:text-white sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-y-12 gap-x-10 md:grid-cols-2 lg:grid-cols-12 pb-12">
          {/* Logo + mission + social */}
          <div className="space-y-8 lg:col-span-4">
            <button
              type="button"
              onClick={scrollToTop}
              className="group inline-flex items-center gap-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-orange-400/60 focus:ring-offset-4 focus:ring-offset-neutral-900"
            >
              <Logo variant="default" asLink={false} />
            </button>

            <p className="max-w-md text-base leading-relaxed text-slate-600 dark:text-slate-300">
              Indian defence news, strategy and veteran perspectives — focused
              on clarity, capability and the realities of modern warfare.
            </p>

            <div className="flex flex-wrap items-center gap-2">
              {[
                { icon: Twitter, label: "Twitter / X", href: "#" },
                { icon: Instagram, label: "Instagram", href: "#" },
                { icon: Facebook, label: "Facebook", href: "#" },
                { icon: Linkedin, label: "LinkedIn", href: "#" },
                { icon: Youtube, label: "YouTube", href: "#" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-900"
                >
                  <Button
                    size="icon"
                    variant="ghost"
                    className="rounded-full bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white transition-all hover:scale-110 hover:bg-orange-500 hover:text-white"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </Button>
                </a>
              ))}
            </div>
          </div>

          {/* Link sections */}
          <div className="grid grid-cols-2 gap-8 md:col-span-1 md:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
            {footerSections.map((section) => (
              <div key={section.label} className="space-y-5">
                <h3 className="text-base font-bold uppercase tracking-wider text-orange-500 dark:text-orange-400">
                  {section.label}
                </h3>
                <ul className="space-y-3 text-base">
                  {section.items.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.path}
                        className="inline-block text-slate-600 dark:text-slate-300 transition-colors hover:text-slate-900 dark:hover:text-white hover:underline decoration-orange-500 dark:decoration-orange-400 underline-offset-4"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Separator */}
        <div className="pt-8 pb-6">
          <Separator className="h-px w-full bg-slate-200 dark:bg-white/10" />
        </div>

        {/* Copyright */}
        <div className="flex flex-col items-center justify-between gap-4 pt-2 text-sm text-slate-500 dark:text-slate-400 sm:flex-row">
          <p className="font-semibold text-slate-700 dark:text-slate-200">
            © {new Date().getFullYear()} Military Matters 24/7. All rights
            reserved.
          </p>
          <p className="text-center sm:text-right">
            Built for clear briefings, not noise. Hosted in India.
          </p>
        </div>
      </div>
    </footer>
  );
}
