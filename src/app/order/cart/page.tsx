"use client";

import { useCart } from "@/contexts/cart-context";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus, Minus, Trash2, ArrowRight, ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";
export default function CartPage() {
  const cart = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-brew-warm-white">
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-brew-border">
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
            <Link href="/order" className="flex items-center gap-2">
              <span className="font-heading text-lg text-brew-text">Nations Coffee</span>
            </Link>
          </div>
        </header>
        <div className="flex flex-col items-center justify-center px-4 text-center pt-24">
          <ShoppingBag className="w-16 h-16 text-brew-text-muted/40 mb-4" />
          <h1 className="font-heading text-xl text-brew-text mb-2">
            Your cart is empty
          </h1>
          <p className="text-brew-text-muted mb-6 text-sm">
            Add some items from the menu first!
          </p>
          <Link href="/order">
            <Button className="bg-brew-green hover:bg-brew-green-dark text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Browse Menu
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brew-warm-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-brew-border">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/order" className="flex items-center gap-2">
            <span className="font-heading text-lg text-brew-text">Nations Coffee</span>
          </Link>
          <span className="text-sm text-brew-text-muted font-medium">Cart</span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 pb-40 space-y-4">
        {cart.items.map((item) => (
          <div
            key={item.menu_item_id}
            className="bg-white rounded-xl border border-brew-border/50 p-4 flex items-center gap-3"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center justify-center w-3.5 h-3.5 rounded-sm border ${
                    item.is_veg ? "border-green-600" : "border-red-600"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      item.is_veg ? "bg-green-600" : "bg-red-600"
                    }`}
                  />
                </span>
                <p className="font-medium text-sm text-brew-text truncate">
                  {item.name}
                </p>
              </div>
              <p className="text-sm text-brew-text-muted mt-0.5">
                ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
              </p>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() =>
                  cart.updateQuantity(item.menu_item_id, item.quantity - 1)
                }
                className="w-8 h-8 flex items-center justify-center rounded-md border border-brew-border text-brew-text-muted hover:bg-brew-cream transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-6 text-center text-sm font-semibold">
                {item.quantity}
              </span>
              <button
                onClick={() =>
                  cart.updateQuantity(item.menu_item_id, item.quantity + 1)
                }
                className="w-8 h-8 flex items-center justify-center rounded-md border border-brew-border text-brew-text-muted hover:bg-brew-cream transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => cart.removeItem(item.menu_item_id)}
                className="w-8 h-8 flex items-center justify-center rounded-md text-red-500 hover:bg-red-50 transition-colors ml-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}

        {/* Total + Checkout */}
        <div className="bg-white rounded-2xl border border-brew-border/50 p-5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-brew-text-muted">
              {cart.itemCount} item{cart.itemCount > 1 ? "s" : ""}
            </span>
          </div>
          <Separator className="my-3" />
          <div className="flex items-center justify-between">
            <span className="font-semibold text-brew-text">Total</span>
            <span className="text-xl font-bold text-brew-text">
              ₹{cart.total}
            </span>
          </div>
        </div>

        <Link href="/order/checkout">
          <Button className="w-full bg-brew-green hover:bg-brew-green-dark text-white h-14 rounded-2xl text-base font-semibold shadow-lg">
            Proceed to Checkout
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>

        <div className="text-center">
          <Link href="/order">
            <Button
              variant="ghost"
              className="text-brew-text-muted text-sm"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add More Items
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
