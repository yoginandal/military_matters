"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Menu, ChevronDown, ChevronRight } from "lucide-react";
import { navlinks } from "@/data/navData";

const Drawer = () => {
  const CollapsibleNavItem = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger
          className="flex items-center justify-between w-full py-2 px-4 font-semibold text-military-khaki tracking-wider hover:bg-military-army-green/30 hover:text-white rounded transition-colors focus:outline-none focus:ring-2 focus:ring-military-army-green focus:ring-offset-2 border-l-2 border-transparent hover:border-military-army-green"
          aria-expanded={isOpen}
          aria-label={`Toggle ${item.name} menu`}
        >
          <span>{item.name}</span>
          {isOpen ? (
            <ChevronDown
              className="h-4 w-4 text-military-forest-green"
              aria-hidden="true"
            />
          ) : (
            <ChevronRight
              className="h-4 w-4 text-military-forest-green"
              aria-hidden="true"
            />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ul
            className="pl-4 space-y-1 border-l border-military-brown/30 ml-2"
            role="list"
          >
            {item.dropdown?.map((subItem, subIndex) => (
              <li key={subItem.path || subIndex} role="listitem">
                {subItem.subDropdown ? (
                  <CollapsibleNavItem
                    item={{ name: subItem.name, dropdown: subItem.subDropdown }}
                  />
                ) : (
                  <SheetClose asChild>
                    <Link
                      href={subItem.path}
                      className="block py-2 px-4 w-full text-sm text-military-khaki/80 hover:text-white hover:bg-military-army-green/30 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-military-army-green focus:ring-offset-2 border-l-2 border-transparent hover:border-military-forest-green"
                    >
                      {subItem.name}
                    </Link>
                  </SheetClose>
                )}
              </li>
            ))}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    );
  };

  return (
    <Sheet>
      <SheetTrigger
        className="flex items-center gap-1 bg-military-charcoal-light hover:bg-military-blue rounded-md p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-military-army-green focus:ring-offset-2 border border-military-brown/50"
        aria-label="Open navigation menu"
      >
        <Menu className="w-6 h-6 text-military-khaki" aria-hidden="true" />
      </SheetTrigger>
      <SheetContent className="bg-linear-to-b from-military-charcoal to-military-charcoal-light overflow-auto border-l border-military-brown">
        <SheetHeader className="pb-4 border-b border-military-brown/50">
          <div className="flex items-center gap-3 mb-3">
            <Image
              src="/logo.png"
              alt="Military Matters 24/7"
              width={100}
              height={100}
              className="h-24 w-auto object-contain"
              priority
            />
            <SheetTitle className="text-military-khaki text-lg sm:text-2xl font-bold text-left">
              Military Matters 24/7
            </SheetTitle>
          </div>
          <SheetDescription
            as="div"
            className="text-military-khaki/90 text-left pt-4"
          >
            <nav aria-label="Main navigation">
              <ul className="space-y-1" role="list">
                {navlinks.map((item) => (
                  <li key={item.path || item.name} role="listitem">
                    {item.dropdown ? (
                      <CollapsibleNavItem item={item} />
                    ) : (
                      <SheetClose asChild>
                        <Link
                          href={item.path}
                          className="block py-2 px-4 w-full font-semibold text-military-khaki tracking-wider hover:text-white hover:bg-military-army-green/30 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-military-army-green focus:ring-offset-2 border-l-2 border-transparent hover:border-military-army-green"
                        >
                          {item.name}
                        </Link>
                      </SheetClose>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Drawer;
