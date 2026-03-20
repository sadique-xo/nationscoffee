"use client";

import { useState, useEffect, useCallback } from "react";
import { useCustomer } from "@/contexts/customer-context";
import { useCart } from "@/contexts/cart-context";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Clock,
  ChefHat,
  PartyPopper,
  CheckCircle2,
  XCircle,
  Phone,
  Loader2,
  RotateCcw,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import type { OrderStatus } from "@/types/database";

interface OrderItemData {
  id: string;
  item_name: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

interface OrderData {
  id: string;
  order_number: number;
  customer_name: string;
  status: OrderStatus;
  total_amount: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
  order_items: OrderItemData[];
}

const statusConfig: Record<
  OrderStatus,
  { label: string; icon: React.ReactNode; color: string }
> = {
  received: {
    label: "Received",
    icon: <Clock className="w-3.5 h-3.5" />,
    color: "bg-blue-100 text-blue-700",
  },
  preparing: {
    label: "Preparing",
    icon: <ChefHat className="w-3.5 h-3.5" />,
    color: "bg-amber-100 text-amber-700",
  },
  ready: {
    label: "Ready!",
    icon: <PartyPopper className="w-3.5 h-3.5" />,
    color: "bg-green-100 text-green-700",
  },
  picked_up: {
    label: "Picked Up",
    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
    color: "bg-gray-100 text-gray-700",
  },
  cancelled: {
    label: "Cancelled",
    icon: <XCircle className="w-3.5 h-3.5" />,
    color: "bg-red-100 text-red-700",
  },
};

function formatTime(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (d.toDateString() === today.toDateString()) return "Today";
  if (d.toDateString() === yesterday.toDateString()) return "Yesterday";

  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}

export default function OrdersPage() {
  const customer = useCustomer();
  const cart = useCart();
  const [phone, setPhone] = useState("");
  const [activeOrders, setActiveOrders] = useState<OrderData[]>([]);
  const [pastOrders, setPastOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  const fetchOrders = useCallback(async (phoneNum: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/customer/orders?phone=${phoneNum}`);
      const data = await res.json();
      if (data.active) setActiveOrders(data.active);
      if (data.past) setPastOrders(data.past);
      setFetched(true);
    } catch {
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-fetch if customer is already in session
  useEffect(() => {
    if (customer.isLoggedIn && !fetched) {
      setPhone(customer.phone);
      fetchOrders(customer.phone);
    }
  }, [customer.isLoggedIn, customer.phone, fetched, fetchOrders]);

  // Subscribe to realtime updates for active orders
  useEffect(() => {
    if (activeOrders.length === 0) return;

    const channel = supabase
      .channel("customer-orders")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "orders",
        },
        (payload) => {
          const updated = payload.new as OrderData;
          // Check if this order belongs to our active orders
          setActiveOrders((prev) => {
            const idx = prev.findIndex((o) => o.id === updated.id);
            if (idx === -1) return prev;

            // If order is now completed/cancelled, move to past
            if (
              updated.status === "picked_up" ||
              updated.status === "cancelled"
            ) {
              const order = { ...prev[idx], ...updated };
              setPastOrders((past) => [order, ...past]);
              // Remove from active orders in customer context
              customer.removeActiveOrder(updated.id);
              return prev.filter((o) => o.id !== updated.id);
            }

            return prev.map((o) =>
              o.id === updated.id ? { ...o, ...updated } : o
            );
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeOrders.length, customer]);

  function handlePhoneSubmit() {
    const trimmed = phone.replace(/\D/g, "");
    if (!/^[6-9]\d{9}$/.test(trimmed)) return;
    customer.setCustomer(trimmed, customer.name);
    fetchOrders(trimmed);
  }

  function handleReorder(order: OrderData) {
    for (const item of order.order_items) {
      cart.addItem({
        menu_item_id: item.id,
        name: item.item_name,
        price: item.unit_price,
        image_url: null,
        is_veg: false,
      });
    }
    toast.success("Items added to cart!");
  }

  // Not logged in — show phone input
  if (!customer.isLoggedIn && !fetched) {
    return (
      <div className="min-h-screen bg-brew-warm-white">
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-brew-border">
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/order" className="flex items-center gap-2">
              <span className="font-heading text-lg text-brew-text">
                Nations Coffee
              </span>
            </Link>
            <span className="text-sm text-brew-text-muted font-medium">
              Orders
            </span>
          </div>
        </header>

        <div className="max-w-2xl mx-auto px-4 pt-16 pb-24">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-brew-green/10 flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-brew-green" />
            </div>
            <h1 className="font-heading text-xl text-brew-text mb-2">
              Track Your Orders
            </h1>
            <p className="text-sm text-brew-text-muted">
              Enter your phone number to see your order history
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-brew-border/50 p-5 space-y-4">
            <Input
              type="tel"
              placeholder="10-digit mobile number"
              value={phone}
              autoFocus
              onChange={(e) => {
                setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handlePhoneSubmit();
              }}
              className="h-12 rounded-xl border-brew-border text-base"
            />
            <Button
              className="w-full bg-brew-green hover:bg-brew-green-dark text-white h-12 rounded-xl text-base font-semibold"
              disabled={!/^[6-9]\d{9}$/.test(phone) || loading}
              onClick={handlePhoneSubmit}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Looking up...
                </>
              ) : (
                <>
                  View My Orders
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brew-warm-white">
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-brew-border">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/order" className="flex items-center gap-2">
            <span className="font-heading text-lg text-brew-text">
              Nations Coffee
            </span>
          </Link>
          <span className="text-sm text-brew-text-muted font-medium">
            Orders
          </span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 pb-24 space-y-6">
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-brew-green" />
          </div>
        )}

        {!loading && activeOrders.length === 0 && pastOrders.length === 0 && (
          <div className="text-center py-12">
            <CheckCircle2 className="w-12 h-12 text-brew-text-muted/30 mx-auto mb-3" />
            <p className="text-brew-text-muted text-sm">
              No orders found for this number
            </p>
            <Link href="/order">
              <Button
                variant="outline"
                className="mt-4 border-brew-green text-brew-green"
              >
                Browse Menu
              </Button>
            </Link>
          </div>
        )}

        {/* Active Orders */}
        {activeOrders.length > 0 && (
          <section>
            <h2 className="font-heading text-base text-brew-text mb-3">
              Active Orders
            </h2>
            <div className="space-y-3">
              {activeOrders.map((order) => (
                <Link
                  key={order.id}
                  href={`/order/${order.id}`}
                  className="block"
                >
                  <div className="bg-white rounded-2xl border border-brew-green/30 p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold text-brew-text text-sm">
                        Order #{String(order.order_number).padStart(3, "0")}
                      </span>
                      <Badge
                        className={`${statusConfig[order.status].color} text-xs font-medium gap-1`}
                      >
                        {statusConfig[order.status].icon}
                        {statusConfig[order.status].label}
                      </Badge>
                    </div>
                    <div className="space-y-1 mb-3">
                      {order.order_items.map((item) => (
                        <p
                          key={item.id}
                          className="text-xs text-brew-text-muted"
                        >
                          {item.item_name} × {item.quantity}
                        </p>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-brew-text-muted">
                        {formatTime(order.created_at)}
                      </span>
                      <span className="font-semibold text-sm text-brew-text">
                        ₹{order.total_amount}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Past Orders */}
        {pastOrders.length > 0 && (
          <section>
            <h2 className="font-heading text-base text-brew-text mb-3">
              Past Orders
            </h2>
            <div className="space-y-3">
              {pastOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl border border-brew-border/50 p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-brew-text text-sm">
                        #{String(order.order_number).padStart(3, "0")}
                      </span>
                      <span className="text-xs text-brew-text-muted">
                        {formatDate(order.created_at)}
                      </span>
                    </div>
                    <Badge
                      className={`${statusConfig[order.status].color} text-xs font-medium gap-1`}
                    >
                      {statusConfig[order.status].icon}
                      {statusConfig[order.status].label}
                    </Badge>
                  </div>
                  <div className="space-y-1 mb-3">
                    {order.order_items.map((item) => (
                      <p
                        key={item.id}
                        className="text-xs text-brew-text-muted"
                      >
                        {item.item_name} × {item.quantity}
                      </p>
                    ))}
                  </div>
                  <Separator className="my-3" />
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-brew-text">
                      ₹{order.total_amount}
                    </span>
                    {order.status === "picked_up" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-brew-green text-brew-green hover:bg-brew-green hover:text-white text-xs h-8"
                        onClick={(e) => {
                          e.preventDefault();
                          handleReorder(order);
                        }}
                      >
                        <RotateCcw className="w-3 h-3 mr-1" />
                        Reorder
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
