"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UtensilsCrossed, ShoppingCart, ClipboardList } from "lucide-react";
import { useCart } from "@/contexts/cart-context";

const navItems = [
  { href: "/order", label: "Menu", icon: UtensilsCrossed },
  { href: "/order/cart", label: "Cart", icon: ShoppingCart },
  { href: "/order/orders", label: "Orders", icon: ClipboardList },
] as const;

export function BottomNav() {
  const pathname = usePathname();
  const cart = useCart();

  // Hide on checkout page only
  if (pathname.startsWith("/order/checkout")) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-brew-border safe-area-bottom">
      <div className="max-w-2xl mx-auto flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive =
            item.href === "/order"
              ? pathname === "/order"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-0.5 w-full h-full transition-colors relative ${
                isActive
                  ? "text-brew-green"
                  : "text-brew-text-muted hover:text-brew-text"
              }`}
            >
              <div className="relative">
                <item.icon className="w-5 h-5" />
                {item.label === "Cart" && cart.itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-[18px] h-[18px] rounded-full bg-brew-green text-white text-[10px] font-bold flex items-center justify-center px-1">
                    {cart.itemCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
      {/* Safe area spacer for iOS */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
