"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useCart } from "@/contexts/cart-context";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Loader2 } from "lucide-react";
import Link from "next/link";
import type { DbMenuItem } from "@/types/database";

interface MenuCategory {
  category: string;
  items: DbMenuItem[];
}

export default function OrderPage() {
  const [menuData, setMenuData] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [ordersEnabled, setOrdersEnabled] = useState(true);
  const [activeCategory, setActiveCategory] = useState("");
  const cart = useCart();

  // Refs for scroll-spy
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const isScrollingToRef = useRef(false);

  // Fetch menu items from Supabase
  useEffect(() => {
    async function fetchMenu() {
      const { data: settingsData } = await supabase
        .from("settings")
        .select("value")
        .eq("key", "orders_enabled")
        .single();

      if (settingsData?.value === "false") {
        setOrdersEnabled(false);
      }

      const { data, error } = await supabase
        .from("menu_items")
        .select("*")
        .eq("is_available", true)
        .order("sort_order", { ascending: true });

      if (error) {
        console.error("Failed to fetch menu:", error.message);
        setLoading(false);
        return;
      }

      const grouped = (data as DbMenuItem[]).reduce<Record<string, DbMenuItem[]>>(
        (acc, item) => {
          if (!acc[item.category]) acc[item.category] = [];
          acc[item.category].push(item);
          return acc;
        },
        {}
      );

      const categories = Object.entries(grouped).map(([category, items]) => ({
        category,
        items,
      }));

      setMenuData(categories);
      if (categories.length > 0) setActiveCategory(categories[0].category);
      setLoading(false);
    }

    fetchMenu();
  }, []);

  // Scroll-spy: observe each category section
  useEffect(() => {
    if (menuData.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingToRef.current) return;

        // Find the topmost visible section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          const cat = visible[0].target.getAttribute("data-category");
          if (cat) setActiveCategory(cat);
        }
      },
      {
        rootMargin: "-120px 0px -60% 0px",
        threshold: 0,
      }
    );

    sectionRefs.current.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [menuData]);

  // Scroll active tab into view when it changes
  useEffect(() => {
    const tabEl = tabRefs.current.get(activeCategory);
    if (tabEl && tabsContainerRef.current) {
      tabEl.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeCategory]);

  // Handle tab click: smooth scroll to section
  const handleTabClick = useCallback((category: string) => {
    setActiveCategory(category);
    const section = sectionRefs.current.get(category);
    if (!section) return;

    isScrollingToRef.current = true;

    const headerOffset = 120; // header + tabs height
    const top = section.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: "smooth" });

    // Re-enable scroll-spy after scroll settles
    setTimeout(() => {
      isScrollingToRef.current = false;
    }, 800);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-brew-warm-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brew-green" />
      </div>
    );
  }

  if (!ordersEnabled) {
    return (
      <div className="min-h-screen bg-brew-warm-white flex flex-col items-center justify-center px-4 text-center">
        <h1 className="font-heading text-2xl text-brew-text mb-2">
          We&apos;re Currently Closed
        </h1>
        <p className="text-brew-text-muted text-sm max-w-xs">
          Nations Coffee is not accepting orders right now. Please check back later!
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brew-warm-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-brew-border">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-heading text-lg text-brew-text">Nations Coffee</span>
          </Link>
          <span className="text-sm text-brew-text-muted font-medium">Menu</span>
        </div>
      </header>

      {/* Category tabs - horizontal scroll */}
      <div className="sticky top-[57px] z-30 bg-white/95 backdrop-blur-sm border-b border-brew-border">
        <div className="max-w-2xl mx-auto">
          <div
            ref={tabsContainerRef}
            className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-hide"
          >
            {menuData.map((cat) => (
              <button
                key={cat.category}
                ref={(el) => {
                  if (el) tabRefs.current.set(cat.category, el);
                }}
                onClick={() => handleTabClick(cat.category)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat.category
                    ? "bg-brew-green text-white"
                    : "bg-brew-cream text-brew-text-muted hover:bg-brew-border"
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu items - all categories always rendered */}
      <main className="max-w-2xl mx-auto px-4 py-6 pb-24">
        {menuData.map((category) => (
          <section
            key={category.category}
            data-category={category.category}
            ref={(el) => {
              if (el) sectionRefs.current.set(category.category, el);
            }}
            className="mb-8"
          >
            <h2 className="font-heading text-lg text-brew-text mb-4">
              {category.category}
            </h2>
            <div className="space-y-3">
              {category.items.map((item) => {
                const cartItem = cart.items.find(
                  (ci) => ci.menu_item_id === item.id
                );

                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4 bg-white rounded-xl p-4 border border-brew-border/50 shadow-sm"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`inline-flex items-center justify-center w-4 h-4 rounded-sm border ${
                            item.is_veg
                              ? "border-green-600"
                              : "border-red-600"
                          }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${
                              item.is_veg ? "bg-green-600" : "bg-red-600"
                            }`}
                          />
                        </span>
                        <h3 className="font-medium text-brew-text text-sm truncate">
                          {item.name}
                        </h3>
                      </div>
                      {item.description && (
                        <p className="text-xs text-brew-text-muted mb-1 line-clamp-1">
                          {item.description}
                        </p>
                      )}
                      <p className="text-sm font-semibold text-brew-text">
                        ₹{item.price}
                      </p>
                    </div>

                    <div className="shrink-0">
                      {cartItem ? (
                        <div className="flex items-center gap-2 bg-brew-green/10 rounded-lg px-1">
                          <button
                            onClick={() =>
                              cart.updateQuantity(item.id, cartItem.quantity - 1)
                            }
                            className="w-8 h-8 flex items-center justify-center text-brew-green hover:bg-brew-green/20 rounded-md transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-6 text-center font-semibold text-brew-green text-sm">
                            {cartItem.quantity}
                          </span>
                          <button
                            onClick={() =>
                              cart.updateQuantity(item.id, cartItem.quantity + 1)
                            }
                            className="w-8 h-8 flex items-center justify-center text-brew-green hover:bg-brew-green/20 rounded-md transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-brew-green text-brew-green hover:bg-brew-green hover:text-white"
                          onClick={() =>
                            cart.addItem({
                              menu_item_id: item.id,
                              name: item.name,
                              price: item.price,
                              image_url: item.image_url,
                              is_veg: item.is_veg,
                            })
                          }
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
