"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useAdmin } from "@/contexts/admin-context";
import type { Order, OrderItem, OrderStatus } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Search,
  Phone,
  Clock,
  ChefHat,
  CheckCircle2,
  Package,
  XCircle,
  ArrowRight,
  Loader2,
  Printer,
} from "lucide-react";
import { toast } from "sonner";

// ─── Types ───────────────────────────────────────────────────
interface OrderWithItems extends Order {
  order_items: OrderItem[];
}

type FilterStatus = "active" | "all" | OrderStatus;

// ─── Status helpers ──────────────────────────────────────────
const statusConfig: Record<OrderStatus, { label: string; color: string; icon: React.ReactNode }> = {
  received: { label: "Received", color: "bg-blue-100 text-blue-700", icon: <Clock className="w-3.5 h-3.5" /> },
  preparing: { label: "Preparing", color: "bg-amber-100 text-amber-700", icon: <ChefHat className="w-3.5 h-3.5" /> },
  ready: { label: "Ready", color: "bg-green-100 text-green-700", icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
  picked_up: { label: "Picked Up", color: "bg-gray-100 text-gray-600", icon: <Package className="w-3.5 h-3.5" /> },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-700", icon: <XCircle className="w-3.5 h-3.5" /> },
};

const nextStatus: Partial<Record<OrderStatus, OrderStatus>> = {
  received: "preparing",
  preparing: "ready",
  ready: "picked_up",
};

function timeSince(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes % 60}m ago`;
}

// ─── Sound notification ──────────────────────────────────────
function playNotificationSound() {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 800;
    osc.type = "sine";
    gain.gain.value = 0.3;
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    osc.stop(ctx.currentTime + 0.5);
    setTimeout(() => {
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.frequency.value = 1000;
      osc2.type = "sine";
      gain2.gain.value = 0.3;
      osc2.start();
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc2.stop(ctx.currentTime + 0.5);
    }, 200);
  } catch {
    // Audio not supported
  }
}

// ─── Main Component ──────────────────────────────────────────
export default function AdminOrdersPage() {
  const { soundEnabled } = useAdmin();
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterStatus>("active");
  const [search, setSearch] = useState("");
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);
  const orderIdsRef = useRef<Set<string>>(new Set());
  const initialLoadDone = useRef(false);

  // ─── Fetch today's orders ────────────────────────────────
  const fetchOrders = useCallback(async () => {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const { data, error } = await supabase
      .from("orders")
      .select("*, order_items(*)")
      .gte("created_at", todayStart.toISOString())
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to fetch orders:", error.message);
      setLoading(false);
      return;
    }

    const fetched = (data ?? []) as OrderWithItems[];
    setOrders(fetched);
    orderIdsRef.current = new Set(fetched.map((o) => o.id));
    initialLoadDone.current = true;
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // ─── Realtime subscription ───────────────────────────────
  useEffect(() => {
    const channel = supabase
      .channel("admin-orders")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        async (payload) => {
          const newOrder = payload.new as Order;

          const { data: items } = await supabase
            .from("order_items")
            .select("*")
            .eq("order_id", newOrder.id);

          const orderWithItems: OrderWithItems = {
            ...newOrder,
            order_items: (items ?? []) as OrderItem[],
          };

          setOrders((prev) => [orderWithItems, ...prev]);
          orderIdsRef.current.add(newOrder.id);

          if (initialLoadDone.current && soundEnabled) {
            playNotificationSound();
          }
          toast.success(`New order #${String(newOrder.order_number).padStart(3, "0")}!`);
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "orders" },
        (payload) => {
          const updated = payload.new as Order;
          setOrders((prev) =>
            prev.map((o) => (o.id === updated.id ? { ...o, ...updated } : o))
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [soundEnabled]);

  // ─── Update order status ─────────────────────────────────
  async function updateStatus(orderId: string, newStatus: OrderStatus) {
    setUpdatingOrderId(orderId);

    // Optimistic update — apply immediately so the UI feels instant
    const updatedAt = new Date().toISOString();
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, status: newStatus, updated_at: updatedAt } : o
      )
    );

    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus, updated_at: updatedAt })
      .eq("id", orderId);

    if (error) {
      // Rollback on failure — refetch to get the true state
      toast.error("Failed to update status");
      fetchOrders();
    }
    setUpdatingOrderId(null);
  }

  // ─── Filter & search orders ──────────────────────────────
  const filteredOrders = orders.filter((o) => {
    if (filter === "active") {
      if (!["received", "preparing", "ready"].includes(o.status)) return false;
    } else if (filter !== "all") {
      if (o.status !== filter) return false;
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      const orderNum = String(o.order_number).padStart(3, "0");
      return (
        orderNum.includes(q) ||
        o.customer_name.toLowerCase().includes(q) ||
        o.customer_phone.includes(q)
      );
    }

    return true;
  });

  // ─── Stats ───────────────────────────────────────────────
  const totalOrders = orders.length;
  const totalRevenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.total_amount, 0);
  const activeOrders = orders.filter((o) =>
    ["received", "preparing", "ready"].includes(o.status)
  ).length;

  // ─── Auto-refresh timeSince ──────────────────────────────
  const [, setTick] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 30000);
    return () => clearInterval(interval);
  }, []);

  // ─── Filter tabs ─────────────────────────────────────────
  const filterTabs: { key: FilterStatus; label: string }[] = [
    { key: "active", label: "Active" },
    { key: "all", label: "All" },
    { key: "received", label: "Received" },
    { key: "preparing", label: "Preparing" },
    { key: "ready", label: "Ready" },
    { key: "picked_up", label: "Done" },
    { key: "cancelled", label: "Cancelled" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-brew-green" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 space-y-4">
      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-xl border border-brew-border/50 p-4 text-center">
          <p className="text-2xl font-bold text-brew-text">{totalOrders}</p>
          <p className="text-xs text-brew-text-muted">Orders Today</p>
        </div>
        <div className="bg-white rounded-xl border border-brew-border/50 p-4 text-center">
          <p className="text-2xl font-bold text-brew-text">₹{totalRevenue}</p>
          <p className="text-xs text-brew-text-muted">Revenue</p>
        </div>
        <div className="bg-white rounded-xl border border-brew-border/50 p-4 text-center">
          <p className="text-2xl font-bold text-brew-green">{activeOrders}</p>
          <p className="text-xs text-brew-text-muted">Active</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brew-text-muted" />
        <Input
          placeholder="Search by order #, name, or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 h-10 rounded-xl border-brew-border bg-white"
        />
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {filterTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              filter === tab.key
                ? "bg-brew-green text-white"
                : "bg-brew-cream text-brew-text-muted hover:bg-brew-border"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orders list */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-16">
          <Package className="w-12 h-12 text-brew-text-muted/30 mx-auto mb-3" />
          <p className="text-brew-text-muted text-sm">No orders found</p>
        </div>
      ) : (
        <div className="space-y-3 pb-8">
          {filteredOrders.map((order) => {
            const config = statusConfig[order.status];
            const next = nextStatus[order.status];
            const isUpdating = updatingOrderId === order.id;

            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-brew-border/50 p-4 shadow-sm"
              >
                {/* Order header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-heading text-base text-brew-text">
                      #{String(order.order_number).padStart(3, "0")}
                    </span>
                    <Badge
                      className={`${config.color} text-xs font-medium gap-1`}
                    >
                      {config.icon}
                      {config.label}
                    </Badge>
                  </div>
                  <span className="text-xs text-brew-text-muted">
                    {timeSince(order.created_at)}
                  </span>
                </div>

                {/* Customer info */}
                <div className="flex items-center gap-3 mb-3">
                  <p className="text-sm font-medium text-brew-text">
                    {order.customer_name}
                  </p>
                  <a
                    href={`tel:${order.customer_phone}`}
                    className="flex items-center gap-1 text-xs text-brew-green hover:underline"
                  >
                    <Phone className="w-3 h-3" />
                    {order.customer_phone}
                  </a>
                </div>

                {/* Items */}
                <div className="bg-brew-cream/50 rounded-xl p-3 mb-3">
                  <div className="space-y-1">
                    {order.order_items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-brew-text">
                          {item.item_name} × {item.quantity}
                        </span>
                        <span className="text-brew-text-muted">
                          ₹{item.subtotal}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Separator className="my-2" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-brew-text">
                      Total
                    </span>
                    <span className="text-sm font-bold text-brew-text">
                      ₹{order.total_amount}
                    </span>
                  </div>
                </div>

                {/* Notes */}
                {order.notes && (
                  <div className="bg-amber-50 rounded-lg p-2 mb-3">
                    <p className="text-xs text-amber-800">
                      <span className="font-medium">Note:</span> {order.notes}
                    </p>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex items-center gap-2">
                  {order.status !== "picked_up" && order.status !== "cancelled" && (
                    <>
                      {next && (
                        <Button
                          size="sm"
                          className="flex-1 bg-brew-green hover:bg-brew-green-dark text-white rounded-lg h-9 text-sm font-medium"
                          onClick={() => updateStatus(order.id, next)}
                          disabled={isUpdating}
                        >
                          {isUpdating ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <>
                              {statusConfig[next].label}
                              <ArrowRight className="w-3.5 h-3.5 ml-1" />
                            </>
                          )}
                        </Button>
                      )}
                      <Dialog>
                        <DialogTrigger
                          render={
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-red-200 text-red-600 hover:bg-red-50 rounded-lg h-9 text-sm"
                            />
                          }
                        >
                          Cancel
                        </DialogTrigger>
                        <DialogContent>
                          <DialogTitle>Cancel Order</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to cancel order #
                            {String(order.order_number).padStart(3, "0")}? The
                            customer will see this update in real time.
                          </DialogDescription>
                          <div className="flex gap-2 justify-end mt-4">
                            <DialogClose
                              render={
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="rounded-lg"
                                />
                              }
                            >
                              Keep Order
                            </DialogClose>
                            <DialogClose
                              render={
                                <Button
                                  size="sm"
                                  className="bg-red-600 hover:bg-red-700 text-white rounded-lg"
                                  onClick={() =>
                                    updateStatus(order.id, "cancelled")
                                  }
                                />
                              }
                            >
                              Yes, Cancel
                            </DialogClose>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-brew-border text-brew-text-muted hover:text-brew-text rounded-lg h-9"
                    onClick={() =>
                      window.open(`/admin/receipt/${order.id}`, "_blank")
                    }
                  >
                    <Printer className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
