"use client";

import BlurFade from "@/components/magicui/blur-fade";
import NumberTicker from "@/components/magicui/number-ticker";
import CoffeeCup from "@/components/illustrations/coffee-cup";

const stats = [
  { value: 50, prefix: "", suffix: "+", label: "Items on Our Menu" },
  { value: 20, prefix: "₹", suffix: "", label: "Our Famous Gur Tea" },
  { value: 5, prefix: "", suffix: "★", label: "Rated on Google" },
];

export default function About() {
  return (
    <section id="about" className="relative py-20 sm:py-28 bg-brew-warm-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Illustration */}
          <BlurFade delay={0.1}>
            <div className="flex justify-center">
              <CoffeeCup className="w-48 sm:w-64 lg:w-72" />
            </div>
          </BlurFade>

          {/* Text content */}
          <div>
            <BlurFade delay={0.2}>
              <p className="font-accent text-lg text-brew-orange mb-2">
                Our story
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brew-green-dark mb-6">
                More Than Just a Truck
              </h2>
            </BlurFade>

            <BlurFade delay={0.4}>
              <p className="text-brew-text-muted text-base sm:text-lg leading-relaxed mb-8">
                What started as a passion for great coffee and honest food, Brew Truck
                has become Ranchi&apos;s go-to spot for quick bites, epic brews, and good times.
                From our signature Gur Tea at ₹20 to loaded Korean Fried Chicken, we believe
                great food doesn&apos;t need a fancy address • just a great recipe and a lot of love.
              </p>
            </BlurFade>

            {/* Stats */}
            <BlurFade delay={0.6}>
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center p-4 rounded-xl bg-brew-cream border border-brew-border"
                  >
                    <div className="font-subheading text-2xl sm:text-3xl font-bold text-brew-green-dark">
                      <NumberTicker
                        value={stat.value}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                      />
                    </div>
                    <p className="text-xs sm:text-sm text-brew-text-muted mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  );
}
