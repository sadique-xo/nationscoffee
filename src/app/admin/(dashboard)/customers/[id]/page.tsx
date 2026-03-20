"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import type { Customer, OrderWithItems, OrderStatus } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Phone,
  Loader2,
  Clock,
  ChefHat,
  CheckCircle2,
  Package,
  XCircle,
  Printer,
  Calendar,
} from "lucide-react";

const statusConfig: Record<
  OrderStatus,
  { label: string; color: string; icon: React.ReactNode }
> = {
  received: { label: "Received", color: "bg-blue-100 text-blue-700", icon: <Clock className="w-3.5 h-3.5" /> },
  preparing: { label: "Preparing", color: "bg-amber-100 text-amber-700", icon: <ChefHat className="w-3.5 h-3.5" /> },
  ready: { label: "Ready", color: "bg-green-100 text-green-700", icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
  picked_up: { label: "Picked Up", color: "bg-gray-100 text-gray-600", icon: <Package className="w-3.5 h-3.5" /> },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-700", icon: <XCircle className="w-3.5 h-3.5" /> },
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatTime(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function CustomerDetailPage() {
  const params = useParams();
  const customerId = params.id as string;

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/admin/customers/${customerId}`);
        const data = await res.json();
        if (data.customer) setCustomer(data.customer);
        if (data.orders) setOrders(data.orders);
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [customerId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-brew-green" />
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <p className="text-brew-text-muted mb-4">Customer not found</p>
        <Link href="/admin/customers">
          <Button variant="outline" className="border-brew-border">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Customers
          </Button>
        </Link>
      </div>
    );
  }

  const validOrders = orders.filter((o) => o.status !== "cancelled");
  const totalSpent = validOrders.reduce((s, o) => s + o.total_amount, 0);
  const avgOrder = validOrders.length > 0 ? Math.round(totalSpent / validOrders.length) : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 space-y-4">
      {/* Back button */}
      <Link
        href="/admin/customers"
        className="inline-flex items-center gap-1.5 text-sm text-brew-text-muted hover:text-brew-text transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Customers
      </Link>

      {/* Customer header */}
      <div className="bg-white rounded-2xl border border-brew-border/50 p-5">
        <h1 className="font-heading text-xl text-brew-text mb-1">
          {customer.name}
        </h1>
        <a
          href={`tel:${customer.phone}`}
          className="flex items-center gap-1.5 text-sm text-brew-green hover:underline mb-3"
        >
          <Phone className="w-3.5 h-3.5" />
          {customer.phone}
        </a>
        <div className="flex items-center gap-1.5 text-xs text-brew-text-muted">
          <Calendar className="w-3.5 h-3.5" />
          Member since {formatDate(customer.created_at)}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-xl border border-brew-border/50 p-4 text-center">
          <p className="text-2xl font-bold text-brew-text">{orders.length}</p>
          <p className="text-xs text-brew-text-muted">Total Orders</p>
        </div>
        <div className="bg-white rounded-xl border border-brew-border/50 p-4 text-center">
          <p className="text-2xl font-bold text-brew-text">₹{totalSpent}</p>
          <p className="text-xs text-brew-text-muted">Total Spent</p>
        </div>
        <div className="bg-white rounded-xl border border-brew-border/50 p-4 text-center">
          <p className="text-2xl font-bold text-brew-green">₹{avgOrder}</p>
          <p className="text-xs text-brew-text-muted">Avg Order</p>
        </div>
      </div>

      {/* Order history */}
      <h2 className="font-heading text-base text-brew-text">Order History</h2>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="w-12 h-12 text-brew-text-muted/30 mx-auto mb-3" />
          <p className="text-brew-text-muted text-sm">No orders yet</p>
        </div>
      ) : (
        <div className="space-y-3 pb-8">
          {orders.map((order) => {
            const config = statusConfig[order.status];
            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-brew-border/50 p-4 shadow-sm"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-heading text-sm text-brew-text">
                      #{String(order.order_number).padStart(3, "0")}
                    </span>
                    <Badge className={`${config.color} text-xs font-medium gap-1`}>
                      {config.icon}
                      {config.label}
                    </Badge>
                  </div>
                  <span className="text-xs text-brew-text-muted">
                    {formatDate(order.created_at)} {formatTime(order.created_at)}
                  </span>
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

                {/* Print button */}
                <div className="flex justify-end">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-brew-border text-brew-text-muted hover:text-brew-text rounded-lg h-8 text-xs"
                    onClick={() =>
                      window.open(`/admin/receipt/${order.id}`, "_blank")
                    }
                  >
                    <Printer className="w-3.5 h-3.5 mr-1" />
                    Receipt
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
