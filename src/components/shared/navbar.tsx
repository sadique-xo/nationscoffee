"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Find Us", href: "#location" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500">
      <nav
        className={`flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? "mt-3 mx-4 max-w-4xl w-full rounded-full bg-white/80 backdrop-blur-xl shadow-lg shadow-black/5 border border-brew-border/50 px-4 py-2"
            : "mt-0 mx-auto max-w-7xl w-full px-4 py-3 sm:px-6 lg:px-8"
        }`}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 shrink-0">
          <Image
            src="/Brew_logo.png"
            alt="Brew Truck"
            width={120}
            height={48}
            className={`transition-all duration-500 ${scrolled ? "h-8 w-auto" : "h-10 w-auto"}`}
            priority
          />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`px-3.5 py-1.5 text-sm font-medium text-brew-text-muted hover:text-brew-green-dark transition-all duration-200 rounded-full hover:bg-brew-green/10 ${
                scrolled ? "text-xs" : ""
              }`}
            >
              {link.label}
            </a>
          ))}
          <a href="/order">
            <Button
              size="sm"
              className={`ml-2 rounded-full bg-brew-green hover:bg-brew-green-dark text-white transition-all duration-200 ${
                scrolled ? "h-8 text-xs px-4" : ""
              }`}
            >
              Order Now
            </Button>
          </a>
        </div>

        {/* Mobile menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="md:hidden inline-flex items-center justify-center rounded-full p-2 text-brew-text-muted hover:bg-brew-green/10 transition-all duration-200">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] bg-brew-warm-white">
            <div className="flex flex-col gap-1 mt-8">
              <div className="px-4 mb-4">
                <Image
                  src="/Brew_logo.png"
                  alt="Brew Truck"
                  width={120}
                  height={48}
                  className="h-12 w-auto"
                />
              </div>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 text-base font-medium text-brew-text-muted hover:text-brew-green hover:bg-brew-green/10 rounded-full transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
              <a href="/order" onClick={() => setOpen(false)} className="mt-4 px-4">
                <Button className="w-full rounded-full bg-brew-green hover:bg-brew-green-dark text-white transition-all duration-200">
                  Order Now
                </Button>
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
