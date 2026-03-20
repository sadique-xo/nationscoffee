"use client";

import { Card, CardContent } from "@/components/ui/card";
import BlurFade from "@/components/magicui/blur-fade";
import Marquee from "@/components/magicui/marquee";
import { vibeCards } from "@/data/menu-data";

const firstRow = vibeCards.slice(0, 4);
const secondRow = vibeCards.slice(4);

function VibeCard({ emoji, title, description }: { emoji: string; title: string; description: string }) {
  return (
    <Card className="w-[200px] sm:w-[240px] shrink-0 border-brew-border hover:border-brew-green/30 transition-colors bg-white">
      <CardContent className="p-5 text-center">
        <div className="text-4xl mb-3">{emoji}</div>
        <h3 className="font-subheading font-semibold text-brew-text text-sm mb-1">
          {title}
        </h3>
        <p className="text-brew-text-muted text-xs">{description}</p>
        <p className="text-[10px] text-brew-border mt-3 font-accent">
          Your photo here
        </p>
      </CardContent>
    </Card>
  );
}

export default function Gallery() {
  return (
    <section id="gallery" className="relative py-20 sm:py-28 bg-brew-warm-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-6">
        <BlurFade>
          <div className="text-center">
            <p className="font-accent text-lg text-brew-orange mb-2">
              see what we&apos;re about
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brew-green-dark">
              The Vibe
            </h2>
          </div>
        </BlurFade>
      </div>

      {/* First row - scrolls left */}
      <Marquee speed={35} className="mb-4">
        {firstRow.map((card) => (
          <VibeCard key={card.id} {...card} />
        ))}
      </Marquee>

      {/* Second row - scrolls right */}
      <Marquee speed={30} reverse>
        {secondRow.map((card) => (
          <VibeCard key={card.id} {...card} />
        ))}
      </Marquee>
    </section>
  );
}
