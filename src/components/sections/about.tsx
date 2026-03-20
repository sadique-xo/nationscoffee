"use client";

import BlurFade from "@/components/magicui/blur-fade";
import NumberTicker from "@/components/magicui/number-ticker";
import CoffeeCup from "@/components/illustrations/coffee-cup";
import TribalDoodles from "@/components/illustrations/tribal-doodles";

const stats = [
  { value: 45, prefix: "", suffix: "", label: "Items on Our Menu" },
  { value: 60, prefix: "₹", suffix: "", label: "Starting From" },
  { value: 4, prefix: "", suffix: ".5★", label: "Avg. on Google" },
];

export default function About() {
  return (
    <section id="about" className="relative py-20 sm:py-28 bg-brew-warm-white">
      <TribalDoodles variant="about" />
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
                More Than Just Coffee
              </h2>
            </BlurFade>

            <BlurFade delay={0.4}>
              <p className="text-brew-text-muted text-base sm:text-lg leading-relaxed mb-8">
                Nations Coffee is a small, intimate 25-seat specialty coffee house in Ranchi,
                brewed with faith, hope and love. Known for our matcha frappe, tiramisu, butter
                pound cake, and artisanal teas - we&apos;re 4.5★ rated on Google with 163 reviews.
                Predominantly vegetarian, family-friendly, and a cozy nook for every kind of coffee lover.
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
