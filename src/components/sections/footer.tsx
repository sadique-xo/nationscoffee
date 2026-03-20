import { Instagram, MapPin, Heart } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { businessInfo } from "@/data/menu-data";

export default function Footer() {
  return (
    <footer className="bg-brew-green-dark text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center">
          {/* Brand */}
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-2">
            {businessInfo.name}
          </h2>
          <p className="font-accent text-xl text-brew-green-light mb-8">
            {businessInfo.tagline}
          </p>

          {/* Social links */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <a
              href={businessInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Follow us on Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href={businessInfo.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Find us on Google Maps"
            >
              <MapPin className="h-5 w-5" />
            </a>
          </div>

          <Separator className="bg-white/20 mb-6" />

          {/* Copyright */}
          <div className="space-y-2">
            <p className="text-sm text-white/60">
              &copy; {new Date().getFullYear()} {businessInfo.name}. All rights reserved.
            </p>
            <p className="text-xs text-white/40 flex items-center justify-center gap-1">
              Built with <Heart className="h-3 w-3 fill-brew-orange text-brew-orange" /> by{" "}
              <a
                href="https://www.sadique.co"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white underline underline-offset-2 transition-colors"
              >
                Sadique
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
