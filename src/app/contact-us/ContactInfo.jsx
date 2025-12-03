"use client";

import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
} from "lucide-react";
import Link from "next/link";

const contactMethods = [
  {
    icon: MapPin,
    label: "Address",
    value: "New Delhi, India",
    description: "Defense Headquarters",
    href: "#location",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@militarymatters.com",
    description: "General inquiries",
    href: "mailto:info@militarymatters.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 XXX XXX XXXX",
    description: "Available 24/7",
    href: "tel:+91XXXXXXXXXX",
  },
  {
    icon: Clock,
    label: "Office Hours",
    value: "Mon - Fri: 9:00 AM - 6:00 PM",
    description: "IST (Indian Standard Time)",
    href: null,
  },
];

const socialLinks = [
  { icon: Twitter, label: "Twitter / X", href: "#twitter" },
  { icon: Instagram, label: "Instagram", href: "#instagram" },
  { icon: Facebook, label: "Facebook", href: "#facebook" },
  { icon: Linkedin, label: "LinkedIn", href: "#linkedin" },
  { icon: Youtube, label: "YouTube", href: "#youtube" },
];

export function ContactInfo() {
  return (
    <section className="relative py-16 border-b border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact Methods Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            const Content = method.href ? Link : "div";
            const contentProps = method.href
              ? { href: method.href, className: "block" }
              : {};

            return (
              <Content key={index} {...contentProps}>
                <div className="group relative h-full bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-orange-500/20 rounded-xl p-6 transition-all duration-300 backdrop-blur-sm cursor-pointer">
                  {/* Icon */}
                  <div className="mb-4">
                    <div className="inline-flex p-3 bg-white/5 rounded-lg border border-white/5 group-hover:bg-orange-500/10 group-hover:border-orange-500/20 transition-colors">
                      <Icon className="w-6 h-6 text-slate-400 group-hover:text-orange-400 transition-colors" />
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">
                      {method.label}
                    </p>
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-orange-500 transition-colors">
                      {method.value}
                    </h3>
                    <p className="text-sm text-slate-500">{method.description}</p>
                  </div>

                  {/* Hover Indicator */}
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-orange-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top rounded-l-xl" />
                </div>
              </Content>
            );
          })}
        </div>

        {/* Social Media Section */}
        <div className="bg-neutral-900/50 border border-white/5 rounded-xl p-8 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                Follow Our Updates
              </h3>
              <p className="text-slate-400 text-sm">
                Stay connected with us on social media for the latest defense
                news and analysis.
              </p>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="group p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-orange-500/10 hover:border-orange-500/20 text-slate-400 hover:text-orange-400 transition-all duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

