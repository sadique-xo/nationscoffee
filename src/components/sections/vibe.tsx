"use client";

import Image from "next/image";
import BlurFade from "@/components/magicui/blur-fade";
import { vibeCards } from "@/data/menu-data";

export default function Vibe() {
  return (
    <section className="relative py-20 sm:py-28 bg-brew-cream overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text + vibe cards */}
          <div>
            <BlurFade delay={0.1}>
              <p className="font-accent text-lg text-brew-orange mb-2">
                The vibe
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brew-green-dark mb-4">
                Small Café, Big Heart
              </h2>
              <p className="text-brew-text-muted text-base sm:text-lg leading-relaxed mb-8">
                25 seats, warm wood, soft lights, and the aroma of freshly brewed specialty coffee.
                Every corner is designed for you to slow down and savour the moment.
              </p>
            </BlurFade>

            {/* Vibe cards grid */}
            <div className="grid grid-cols-2 gap-3">
              {vibeCards.map((card, i) => (
                <BlurFade key={card.id} delay={0.3 + i * 0.05}>
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/70 border border-brew-border/50 hover:bg-white hover:shadow-sm transition-all duration-200">
                    <span className="text-2xl shrink-0 mt-0.5">{card.emoji}</span>
                    <div>
                      <p className="font-subheading text-sm font-semibold text-brew-text leading-tight">
                        {card.title}
                      </p>
                      <p className="text-xs text-brew-text-muted mt-0.5 leading-snug">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>

          {/* Isometric café interior */}
          <BlurFade delay={0.2}>
            <div className="flex justify-center">
              <div className="relative w-full max-w-[400px] sm:max-w-[460px] lg:max-w-[500px] xl:max-w-[560px] mx-auto">
                <Image
                  src="/store-vibe.png"
                  alt="Nations Coffee - cozy 25-seat café interior"
                  width={720}
                  height={720}
                  className="w-full h-auto drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
