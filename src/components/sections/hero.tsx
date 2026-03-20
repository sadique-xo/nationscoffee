"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import SparklesText from "@/components/magicui/sparkles-text";
import SplitText from "@/components/shared/split-text";
import BlurFade from "@/components/magicui/blur-fade";
import WavyDivider from "@/components/illustrations/wavy-divider";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background - cropped portrait art on mobile, full hero on md+ */}
      <Image
        src="/hero-bg-mobile.png"
        alt="Nations Coffee - entrance and café exterior"
        fill
        sizes="100vw"
        className="object-cover object-center md:hidden"
        priority
        quality={90}
      />
      <Image
        src="/hero-bg.png"
        alt="Nations Coffee storefront with Warli tribal art"
        fill
        sizes="100vw"
        className="hidden md:block object-cover object-center"
        priority
        quality={90}
      />

      {/* Overlay - uniform tint + stronger gradient at bottom for text */}
      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24 pt-40">
        <div className="max-w-2xl">
          <BlurFade delay={0.1}>
            <p className="font-accent text-lg sm:text-xl text-brew-green-light mb-2">
              A Specialty Coffee House
            </p>
          </BlurFade>

          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4">
            <SparklesText text="Nations Coffee" className="text-white" />
          </h1>

          <div className="font-subheading text-2xl sm:text-3xl lg:text-4xl font-semibold text-brew-cream mb-6">
            <SplitText text="Faith. Hope. Love. Peace." />
          </div>

          <BlurFade delay={0.8}>
            <p className="text-white/80 text-base sm:text-lg max-w-md mb-8">
              Specialty coffee, artisanal cakes & teas in Ranchi&apos;s coziest café. Come in, slow down, savour every sip.
            </p>
          </BlurFade>

          <BlurFade delay={1}>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#menu">
                <Button size="lg" className="bg-brew-green hover:bg-brew-green-dark text-white text-base px-8 rounded-full shadow-lg">
                  View Menu
                </Button>
              </a>
              <a href="#location">
                <Button
                  size="lg"
                  variant="ghost"
                  className="border border-white/60 text-white hover:bg-white/20 hover:text-white text-base px-8 rounded-full backdrop-blur-sm"
                >
                  Find Us
                </Button>
              </a>
            </div>
          </BlurFade>
        </div>
      </div>

      {/* Wavy divider at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <WavyDivider fill="#F5F0E8" />
      </div>
    </section>
  );
}
