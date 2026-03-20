"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useCustomer } from "@/contexts/customer-context";
import type { Order, OrderItem, OrderStatus } from "@/types/database";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle2,
  Clock,
  ChefHat,
  PartyPopper,
  XCircle,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface StatusStep {
  status: OrderStatus;
  label: string;
  icon: React.ReactNode;
}

const statusSteps: StatusStep[] = [
  { status: "received", label: "Order Received", icon: <Clock className="w-5 h-5" /> },
  { status: "preparing", label: "Preparing", icon: <ChefHat className="w-5 h-5" /> },
  { status: "ready", label: "Ready!", icon: <PartyPopper className="w-5 h-5" /> },
];

const statusOrder: OrderStatus[] = ["received", "preparing", "ready", "picked_up"];

function getStatusIndex(status: OrderStatus): number {
  return statusOrder.indexOf(status);
}

function getStatusColor(status: OrderStatus): string {
  switch (status) {
    case "received":
      return "bg-blue-100 text-blue-700";
    case "preparing":
      return "bg-amber-100 text-amber-700";
    case "ready":
      return "bg-green-100 text-green-700";
    case "picked_up":
      return "bg-gray-100 text-gray-700";
    case "cancelled":
      return "bg-red-100 text-red-700";
  }
}

function formatTime(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function OrderTrackingPage() {
  const params = useParams();
  const orderId = params.id as string;
  const customer = useCustomer();

  const [order, setOrder] = useState<Order | null>(null);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusChanged, setStatusChanged] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);

  // Fetch order + items
  useEffect(() => {
    async function fetchOrder() {
      const [orderRes, itemsRes] = await Promise.all([
        supabase.from("orders").select("*").eq("id", orderId).single(),
        supabase.from("order_items").select("*").eq("order_id", orderId),
      ]);

      if (orderRes.data) {
        const o = orderRes.data as Order;

        // Verify ownership: if a customer is logged in with a different phone,
        // deny access to this order
        if (customer.isLoggedIn && customer.phone !== o.customer_phone) {
          setUnauthorized(true);
          setLoading(false);
          return;
        }

        setOrder(o);
        // Track active order and save customer info
        if (!["picked_up", "cancelled"].includes(o.status)) {
          customer.addActiveOrder(orderId);
          if (o.customer_phone) {
            customer.setCustomer(o.customer_phone, o.customer_name);
          }
        } else {
          customer.removeActiveOrder(orderId);
        }
      }
      if (itemsRes.data) setItems(itemsRes.data as OrderItem[]);
      setLoading(false);
    }

    fetchOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  // Subscribe to realtime status changes
  useEffect(() => {
    const channel = supabase
      .channel(`order-${orderId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "orders",
          filter: `id=eq.${orderId}`,
        },
        (payload) => {
          const updated = payload.new as Partial<Order>;
          setOrder((prev) =>
            prev ? { ...prev, ...updated } : prev
          );
          setStatusChanged(true);
          setTimeout(() => setStatusChanged(false), 2000);

          // Clear from active orders when picked up or cancelled
          if (
            updated.status === "picked_up" ||
            updated.status === "cancelled"
          ) {
            customer.removeActiveOrder(orderId);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brew-warm-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brew-green" />
      </div>
    );
  }

  if (unauthorized) {
    return (
      <div className="min-h-screen bg-brew-warm-white flex flex-col items-center justify-center px-4 text-center pb-24">
        <XCircle className="w-16 h-16 text-red-400 mb-4" />
        <h1 className="font-heading text-xl text-brew-text mb-2">
          Access denied
        </h1>
        <p className="text-brew-text-muted mb-6">
          This order belongs to a different account.
        </p>
        <Link href="/order/orders">
          <Button className="bg-brew-green hover:bg-brew-green-dark text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            View My Orders
          </Button>
        </Link>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-brew-warm-white flex flex-col items-center justify-center px-4 text-center pb-24">
        <XCircle className="w-16 h-16 text-red-400 mb-4" />
        <h1 className="font-heading text-xl text-brew-text mb-2">
          Order not found
        </h1>
        <p className="text-brew-text-muted mb-6">
          This order doesn&apos;t exist or has been removed.
        </p>
        <Link href="/order">
          <Button className="bg-brew-green hover:bg-brew-green-dark text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Menu
          </Button>
        </Link>
      </div>
    );
  }

  const currentIndex = getStatusIndex(order.status);
  const isCancelled = order.status === "cancelled";
  const isReady = order.status === "ready";
  const isDone = order.status === "picked_up";

  return (
    <div className="min-h-screen bg-brew-warm-white">
      {/* Header */}
      <header className="bg-white border-b border-brew-border">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/order" className="flex items-center gap-2">
            <Image
              src="/Brew_logo.png"
              alt="Brew Truck"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="font-heading text-lg text-brew-text">Brew Truck</span>
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 pb-24 space-y-6">
        {/* Confirmation banner */}
        <div
          className={`rounded-2xl p-6 text-center transition-all duration-500 ${
            statusChanged ? "scale-[1.02]" : ""
          } ${
            isCancelled
              ? "bg-red-50 border border-red-200"
              : isReady
                ? "bg-green-50 border border-green-200"
                : "bg-brew-green/5 border border-brew-green/20"
          }`}
        >
          {isCancelled ? (
            <>
              <XCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
              <h1 className="font-heading text-xl text-red-700 mb-1">
                Order Cancelled
              </h1>
              <p className="text-red-600 text-sm">
                This order has been cancelled.
              </p>
            </>
          ) : isReady ? (
            <>
              <PartyPopper className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h1 className="font-heading text-xl text-green-700 mb-1">
                Your order is ready!
              </h1>
              <p className="text-green-600 text-sm">
                Please collect it from the counter.
              </p>
            </>
          ) : isDone ? (
            <>
              <CheckCircle2 className="w-12 h-12 text-brew-green mx-auto mb-3" />
              <h1 className="font-heading text-xl text-brew-text mb-1">
                Order Complete
              </h1>
              <p className="text-brew-text-muted text-sm">
                Thank you for ordering from Brew Truck!
              </p>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-12 h-12 text-brew-green mx-auto mb-3" />
              <h1 className="font-heading text-xl text-brew-text mb-1">
                Order #{String(order.order_number).padStart(3, "0")}
              </h1>
              <p className="text-brew-text-muted text-sm">
                Placed at {formatTime(order.created_at)} • We&apos;re on it!
              </p>
            </>
          )}
        </div>

        {/* Status tracker */}
        {!isCancelled && !isDone && (
          <section className="bg-white rounded-2xl border border-brew-border/50 p-5">
            <h2 className="font-semibold text-brew-text mb-5 text-sm">
              Order Status
            </h2>
            <div className="flex items-center justify-between relative">
              {/* Progress line */}
              <div className="absolute top-5 left-[10%] right-[10%] h-0.5 bg-gray-200">
                <div
                  className="h-full bg-brew-green transition-all duration-700"
                  style={{
                    width: `${Math.max(0, currentIndex) * 50}%`,
                  }}
                />
              </div>

              {statusSteps.map((step, i) => {
                const isActive = getStatusIndex(step.status) <= currentIndex;
                const isCurrent = step.status === order.status;

                return (
                  <div
                    key={step.status}
                    className="flex flex-col items-center gap-2 z-10"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                        isCurrent
                          ? "bg-brew-green text-white ring-4 ring-brew-green/20 scale-110"
                          : isActive
                            ? "bg-brew-green text-white"
                            : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {step.icon}
                    </div>
                    <span
                      className={`text-xs font-medium ${
                        isActive ? "text-brew-text" : "text-brew-text-muted"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Order details */}
        <section className="bg-white rounded-2xl border border-brew-border/50 p-5">
          <h2 className="font-semibold text-brew-text mb-4 text-sm">
            Order Details
          </h2>
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-brew-text">
                  {item.item_name} × {item.quantity}
                </span>
                <span className="font-medium text-brew-text">
                  ₹{item.subtotal}
                </span>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <div className="flex items-center justify-between">
            <span className="font-semibold text-brew-text">Total</span>
            <span className="text-xl font-bold text-brew-text">
              ₹{order.total_amount}
            </span>
          </div>
          {order.notes && (
            <div className="mt-4 p-3 bg-brew-cream rounded-xl">
              <p className="text-xs text-brew-text-muted font-medium mb-1">
                Special Instructions
              </p>
              <p className="text-sm text-brew-text">{order.notes}</p>
            </div>
          )}
        </section>

        {/* Back to menu */}
        <div className="text-center pb-8">
          <Link href="/order">
            <Button
              variant="outline"
              className="border-brew-border text-brew-text-muted hover:bg-brew-cream"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Order More
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
