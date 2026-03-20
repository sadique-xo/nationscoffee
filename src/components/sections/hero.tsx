"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import SparklesText from "@/components/magicui/sparkles-text";
import SplitText from "@/components/shared/split-text";
import BlurFade from "@/components/magicui/blur-fade";
import FoodTruck from "@/components/illustrations/food-truck";
import FoodDoodles from "@/components/illustrations/food-doodles";
import WavyDivider from "@/components/illustrations/wavy-divider";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center bg-white overflow-hidden">
      <FoodDoodles variant="hero" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 pt-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <BlurFade delay={0.1}>
              <p className="font-accent text-lg sm:text-xl text-brew-orange mb-2">
                Ranchi&apos;s favourite food truck
              </p>
            </BlurFade>

            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-brew-green-dark mb-4">
              <SparklesText text="Brew Truck" />
            </h1>

            <div className="font-subheading text-2xl sm:text-3xl lg:text-4xl font-semibold text-brew-text mb-6">
              <SplitText text="Sip | Bite | Repeat" />
            </div>

            <BlurFade delay={0.8}>
              <p className="text-brew-text-muted text-base sm:text-lg max-w-md mx-auto lg:mx-0 mb-8">
                Coffee, bites & good vibes • from our truck to your soul. Come hungry, leave happy.
              </p>
            </BlurFade>

            <BlurFade delay={1}>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <a href="/order">
                  <Button size="lg" className="bg-brew-green hover:bg-brew-green-dark text-white text-base px-8 rounded-full shadow-lg">
                    Order Now
                  </Button>
                </a>
                <a href="#location">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-brew-green text-brew-green hover:bg-brew-green hover:text-white text-base px-8 rounded-full"
                  >
                    Find Us
                  </Button>
                </a>
              </div>
            </BlurFade>
          </div>

          {/* Food truck illustration */}
          <motion.div
            className="order-1 lg:order-2 flex justify-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <FoodTruck className="w-full max-w-md lg:max-w-lg" />
          </motion.div>
        </div>
      </div>

      {/* Wavy divider at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <WavyDivider fill="#FAFAF5" />
      </div>
    </section>
  );
}
