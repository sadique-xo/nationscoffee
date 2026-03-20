"use client";

import { useState, useEffect, useCallback } from "react";
import type { OrderWithItems, OrderStatus } from "@/types/database";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Loader2,
  Package,
  Clock,
  ChefHat,
  CheckCircle2,
  XCircle,
  Printer,
  Phone,
} from "lucide-react";

type FilterStatus = "" | OrderStatus;

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

const filterTabs: { key: FilterStatus; label: string }[] = [
  { key: "", label: "All" },
  { key: "received", label: "Received" },
  { key: "preparing", label: "Preparing" },
  { key: "ready", label: "Ready" },
  { key: "picked_up", label: "Done" },
  { key: "cancelled", label: "Cancelled" },
];

function formatDateTime(dateStr: string): string {
  const d = new Date(dateStr);
  return (
    d.toLocaleDateString("en-IN", { day: "numeric", month: "short" }) +
    " " +
    d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
  );
}

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<FilterStatus>("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("page", String(page));
      params.set("limit", "20");
      if (status) params.set("status", status);
      if (search.trim()) params.set("search", search.trim());
      if (dateFrom) params.set("from", dateFrom);
      if (dateTo) params.set("to", dateTo);

      const res = await fetch(`/api/admin/order-history?${params}`);
      const data = await res.json();
      setOrders(data.orders ?? []);
      setTotal(data.total ?? 0);
      setTotalPages(data.totalPages ?? 1);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, [page, status, search, dateFrom, dateTo]);

  useEffect(() => {
    const timer = setTimeout(fetchOrders, 300);
    return () => clearTimeout(timer);
  }, [fetchOrders]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [status, search, dateFrom, dateTo]);

  const limit = 20;
  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 space-y-4">
      <h1 className="font-heading text-lg text-brew-text">Order History</h1>

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

      {/* Date range */}
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="text-[10px] text-brew-text-muted font-medium mb-1 block">
            From
          </label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="w-full h-9 px-3 rounded-xl border border-brew-border bg-white text-sm text-brew-text"
          />
        </div>
        <div className="flex-1">
          <label className="text-[10px] text-brew-text-muted font-medium mb-1 block">
            To
          </label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="w-full h-9 px-3 rounded-xl border border-brew-border bg-white text-sm text-brew-text"
          />
        </div>
        {(dateFrom || dateTo) && (
          <button
            onClick={() => {
              setDateFrom("");
              setDateTo("");
            }}
            className="self-end h-9 px-3 text-xs text-red-500 hover:text-red-700"
          >
            Clear
          </button>
        )}
      </div>

      {/* Status filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {filterTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setStatus(tab.key)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              status === tab.key
                ? "bg-brew-green text-white"
                : "bg-brew-cream text-brew-text-muted hover:bg-brew-border"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Results summary */}
      {!loading && total > 0 && (
        <p className="text-xs text-brew-text-muted">
          Showing {startItem}–{endItem} of {total} orders
        </p>
      )}

      {/* Orders list */}
      {loading && orders.length === 0 ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-brew-green" />
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-16">
          <Package className="w-12 h-12 text-brew-text-muted/30 mx-auto mb-3" />
          <p className="text-brew-text-muted text-sm">No orders found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => {
            const config = statusConfig[order.status];
            const isExpanded = expandedId === order.id;

            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-brew-border/50 shadow-sm overflow-hidden"
              >
                {/* Collapsed row */}
                <button
                  onClick={() =>
                    setExpandedId(isExpanded ? null : order.id)
                  }
                  className="w-full p-4 flex items-center gap-3 text-left"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-heading text-sm text-brew-text">
                        #{String(order.order_number).padStart(3, "0")}
                      </span>
                      <Badge className={`${config.color} text-xs font-medium gap-1`}>
                        {config.icon}
                        {config.label}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-brew-text-muted">
                      <span>{order.customer_name}</span>
                      <span>₹{order.total_amount}</span>
                      <span>{formatDateTime(order.created_at)}</span>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-brew-text-muted shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-brew-text-muted shrink-0" />
                  )}
                </button>

                {/* Expanded detail */}
                {isExpanded && (
                  <div className="px-4 pb-4 space-y-3 border-t border-brew-border/30 pt-3">
                    {/* Customer info */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-brew-text">
                        {order.customer_name}
                      </span>
                      <a
                        href={`tel:${order.customer_phone}`}
                        className="flex items-center gap-1 text-xs text-brew-green hover:underline"
                      >
                        <Phone className="w-3 h-3" />
                        {order.customer_phone}
                      </a>
                    </div>

                    {/* Items */}
                    <div className="bg-brew-cream/50 rounded-xl p-3">
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
                      <div className="bg-amber-50 rounded-lg p-2">
                        <p className="text-xs text-amber-800">
                          <span className="font-medium">Note:</span>{" "}
                          {order.notes}
                        </p>
                      </div>
                    )}

                    {/* Timestamps + print */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-brew-text-muted">
                        Created: {formatDateTime(order.created_at)}
                        {order.updated_at !== order.created_at && (
                          <> · Updated: {formatDateTime(order.updated_at)}</>
                        )}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-brew-border text-brew-text-muted hover:text-brew-text rounded-lg h-8 text-xs"
                        onClick={() =>
                          window.open(
                            `/admin/receipt/${order.id}`,
                            "_blank"
                          )
                        }
                      >
                        <Printer className="w-3.5 h-3.5 mr-1" />
                        Receipt
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2 pb-8">
          <Button
            size="sm"
            variant="outline"
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className="border-brew-border rounded-lg h-9"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>
          <span className="text-xs text-brew-text-muted">
            Page {page} of {totalPages}
          </span>
          <Button
            size="sm"
            variant="outline"
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
            className="border-brew-border rounded-lg h-9"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
}
