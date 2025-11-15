"use client";

const logo = "/logo ssim.png";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
const aicteapprovals = "/pdfs/footer/SSIM-AICTE-EOA-1992-2023.pdf";
// import { Input } from "@/components/ui/input";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const footerSections = [
    {
      label: "Useful Links",
      items: [
        { name: "About Us", path: "/about/vision-mission" },
        { name: "Rankings & Awards", path: "/about/accreditations-rankings" },
        { name: "Accreditations", path: "/accreditations" },
        { name: "Events", path: "/students-life/life-at-ssim" },
        { name: "Media", path: "/students-life/news-announcements" },
        { name: "Blog", path: "/blog" },
        // { name: "Careers", path: "/careers" },
        {
          name: "AICTE Feedback",
          path: "https://www.aicte-india.org/feedback/",
        },
        { name: "AICTE Approvals", path: aicteapprovals },
      ],
    },
    {
      label: "Programs Offered",
      items: [
        { name: "PGDM", path: "/programs/pgdm-triple-specialisation" },
        { name: "PGDM - BIFS", path: "/programs/pgdm-bifs" },
        { name: "PGDM - BA", path: "/programs/pgdm-ba" },
        { name: "FPM", path: "/programs/fpm-efpm" },
        { name: "EFPM", path: "/programs/fpm-efpm" },
      ],
    },
    {
      label: "Committees",
      items: [
        {
          name: "Grievance Redressal Mechanism",
          path: "/grievance-redressal-mechanism",
        },
        { name: "Internal Complaints Committee", path: "/internal-complaints" },
      ],
    },
    {
      label: "S P Sampathys Siva Sivani Educational Society",
      items: [
        { name: "Siva Sivani Institute of Management", path: "/" },
        { name: "Siva Sivani Degree College", path: "https://ssdc.ac.in" },
        { name: "Siva Sivani Junior College", path: "https://ssjc.ac.in" },
        {
          name: "Siva Sivani High School",
          path: "https://www.spsschool.ac.in",
        },
      ],
    },
  ];

  return (
    <footer className="relative bg-gradient-to-r from-blue-200 via-blue-50 to-blue-200 pt-16 pb-10 px-4 md:px-6 lg:px-8 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, black 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-12">
          {/* Logo and Social Section */}
          <div className="lg:col-span-3 space-y-8">
            <div className="space-y-6">
              <Link
                href="/"
                className="flex items-center gap-3 group"
                onClick={scrollToTop}
              >
                <img
                  src={logo || "/placeholder.svg"}
                  alt="SSIM Logo"
                  className="h-14 sm:h-[72px] cursor-pointer w-auto transition-transform group-hover:scale-105"
                />
              </Link>
              <div className="flex gap-3">
                {[
                  {
                    icon: Facebook,
                    bgColor: "bg-blue-600",
                    label: "Facebook",
                    href: "https://www.facebook.com/SivaSivaniInstituteofManagementHyderabad/",
                  },
                  {
                    icon: Instagram,
                    bgColor: "bg-pink-600",
                    label: "Instagram",
                    href: "https://www.instagram.com/ssim_b_school/?hl=en",
                  },
                  {
                    icon: Twitter,
                    bgColor: "bg-sky-500",
                    label: "Twitter",
                    href: "https://x.com/SSIMHyderabad",
                  },
                  {
                    icon: Linkedin,
                    bgColor: "bg-blue-700",
                    label: "LinkedIn",
                    href: "https://www.linkedin.com/school/siva-sivani-institute-of-management/",
                  },
                  {
                    icon: Youtube,
                    bgColor: "bg-red-600",
                    label: "YouTube",
                    href: "https://www.youtube.com/@sivasivaniinstituteofmanag3545",
                  },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="icon"
                      className={`rounded-full transition-all hover:scale-110 text-white ${social.bgColor} hover:opacity-90`}
                      aria-label={social.label}
                    >
                      <social.icon className="h-5 w-5" />
                    </Button>
                  </a>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-sm text-black font-medium mb-3">
                24/7 Women Helpline Number
              </p>
              <a href="tel:+919133305062">
                <Button className="gap-2 bg-mainBlue text-white rounded-full hover:bg-mainBlue/80 hover:text-primary-foreground transition-colors">
                  <Phone className="h-4 w-4" />
                  91333 05062
                </Button>
              </a>
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-4 gap-8">
            {footerSections.map((section) => (
              <div key={section.label} className="space-y-6">
                <h3 className="text-lg font-semibold text-mainBlue tracking-wide">
                  {section.label}
                </h3>
                <ul className="space-y-3 text-base">
                  {section.items.map((item) => (
                    <li key={item.name}>
                      {item.path.startsWith("https:") ||
                      item.path === aicteapprovals ? (
                        <a
                          href={item.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-1 text-[#293794] hover:text-primary transition-colors duration-200"
                        >
                          {item.name}
                        </a>
                      ) : (
                        <Link
                          href={item.path}
                          onClick={scrollToTop}
                          className="group inline-flex items-center gap-1 text-[#293794] hover:text-primary transition-colors duration-200"
                        >
                          {item.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        {/* <div className="mt-12 p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-blue-100 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8">
              <h3 className="text-xl font-semibold text-mainBlue mb-2">Stay Updated with SSIM</h3>
              <p className="text-[#293794]/80">
              Stay updated with our latest news and events
              </p>
            </div>
            <div className="lg:col-span-4">
              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 border-blue-200 focus:border-mainBlue focus:ring-mainBlue"
                  required
                />
                <Button type="submit" className="bg-mainBlue hover:bg-mainBlue/90 text-white font-medium">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div> */}

        <Separator className="my-12 bg-[#293794]" />

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-base text-muted-foreground">
          <p className="text-mainBlue">
            Copyright © SSIM {new Date().getFullYear()}
          </p>
          {/* <div className="flex gap-6">
            <Link
              href="/privacy-policy"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="hover:text-primary text-mainBlue transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="hover:text-primary text-mainBlue transition-colors"
            >
              Terms of Service
            </Link>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
