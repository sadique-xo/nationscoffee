"use client";

import BlurFade from "@/components/magicui/blur-fade";
import TribalDoodles from "@/components/illustrations/tribal-doodles";
import { fullMenu } from "@/data/menu-data";

const categoryEmojis: Record<string, string> = {
  "Hot Coffee": "☕",
  "Frappe": "🧊",
  "Iced Coffee": "🥤",
  "Hot Tea": "🍵",
  "Iced Tea": "🧋",
  "Mocktail": "🍹",
  "Sandwiches": "🥪",
  "Pastries & Cakes": "🍰",
  "Cheesecake & Desserts": "🧁",
};

export default function Gallery() {
  return (
    <section id="gallery" className="relative py-20 sm:py-28 bg-brew-warm-white overflow-hidden">
      <TribalDoodles variant="gallery" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <BlurFade>
          <div className="text-center mb-12">
            <p className="font-accent text-lg text-brew-orange mb-2">
              45 items, 9 categories
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brew-green-dark">
              Our Full Menu
            </h2>
          </div>
        </BlurFade>

        {/* Category grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {fullMenu.map((cat, i) => {
            const emoji = categoryEmojis[cat.category] || "☕";
            const priceNums = cat.items.map((item) =>
              parseInt(item.price.replace(/[^\d]/g, ""))
            );
            const minPrice = Math.min(...priceNums);
            const maxPrice = Math.max(...priceNums);

            return (
              <BlurFade key={cat.category} delay={0.05 * i}>
                <div className="group rounded-2xl border border-brew-border bg-white p-5 hover:border-brew-green/40 hover:shadow-md transition-all duration-300">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{emoji}</span>
                    <div>
                      <h3 className="font-subheading font-semibold text-brew-text text-base leading-tight">
                        {cat.category}
                      </h3>
                      <p className="text-xs text-brew-text-muted">
                        {cat.items.length} items · ₹{minPrice}–{maxPrice}
                      </p>
                    </div>
                  </div>

                  {/* Item list */}
                  <div className="space-y-1.5">
                    {cat.items.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-brew-text-muted truncate pr-3">
                          {item.name}
                        </span>
                        <span className="font-medium text-brew-green-dark shrink-0">
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </BlurFade>
            );
          })}
        </div>
      </div>
    </section>
  );
}
