"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Menu, ChevronRight } from "lucide-react";
import { navlinks } from "@/data/navData";
import { Logo } from "@/components/Logo";

// This is a new, self-contained component for the collapsible items.
const CollapsibleNavItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="group flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-lg font-bold text-slate-700 dark:text-slate-200 transition-all hover:bg-slate-100 dark:hover:bg-white/5">
        <span>{item.name}</span>
        <ChevronRight
          className={`h-6 w-6 text-orange-500 dark:text-amber-400 transition-transform duration-200 ${
            isOpen ? "rotate-90" : ""
          }`}
          aria-hidden="true"
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ul
          className="mt-2 space-y-1 border-l-2 border-slate-300 dark:border-slate-700 pl-6"
          role="list"
        >
          {item.dropdown?.map((subItem) => (
            <li key={subItem.path || subItem.name} role="listitem">
              <SheetClose asChild>
                <Link
                  href={subItem.path}
                  className="block rounded-md px-4 py-2.5 text-base text-slate-600 dark:text-slate-300 transition-all hover:bg-slate-100 dark:hover:bg-white/5 hover:text-orange-500 dark:hover:text-amber-400"
                >
                  {subItem.name}
                </Link>
              </SheetClose>
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
};

const Drawer = () => {
  return (
    <Sheet>
      <SheetTrigger
        aria-label="Open navigation menu"
        className="group flex items-center gap-1 rounded-lg border border-slate-300 dark:border-white/20 bg-slate-100 dark:bg-white/10 p-2.5 text-slate-900 dark:text-white transition-all hover:bg-slate-200 dark:hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-orange-400 dark:focus:ring-amber-400"
      >
        <Menu className="h-7 w-7" aria-hidden="true" />
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col overflow-y-auto border-l-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 bg-[url('/noise.png')] text-slate-900 dark:text-white sm:w-96">
        <SheetHeader className="border-b border-slate-200 dark:border-white/10 pb-4">
          <div className="mb-4">
            <Logo variant="large" asLink={false} />
          </div>
        </SheetHeader>
        <div className="flex-1 py-6">
          <nav aria-label="Main navigation">
            <ul className="space-y-2" role="list">
              {navlinks.map((item) => (
                <li key={item.path || item.name} role="listitem">
                  {item.dropdown ? (
                    <CollapsibleNavItem item={item} />
                  ) : (
                    <SheetClose asChild>
                      <Link
                        href={item.path}
                        className="group flex w-full items-center rounded-lg px-4 py-3 text-left text-lg font-bold text-slate-700 dark:text-slate-200 transition-all hover:bg-slate-100 dark:hover:bg-white/5 border-l-4 border-transparent hover:border-orange-500 dark:hover:border-amber-400"
                      >
                        {item.name}
                      </Link>
                    </SheetClose>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Drawer;
