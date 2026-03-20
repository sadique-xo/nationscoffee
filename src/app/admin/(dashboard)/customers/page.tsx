"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import type { CustomerWithStats } from "@/types/database";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Users,
  Phone,
  ArrowUpDown,
  Loader2,
  ChevronRight,
} from "lucide-react";

type SortKey = "name" | "total_orders" | "total_spent" | "last_order_date";

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "Never";
  const d = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (d.toDateString() === today.toDateString()) return "Today";
  if (d.toDateString() === yesterday.toDateString()) return "Yesterday";

  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: d.getFullYear() !== today.getFullYear() ? "numeric" : undefined,
  });
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<CustomerWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("last_order_date");
  const [sortAsc, setSortAsc] = useState(false);

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search.trim()) params.set("search", search.trim());
      const res = await fetch(`/api/admin/customers?${params}`);
      const data = await res.json();
      if (data.customers) setCustomers(data.customers);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    const timer = setTimeout(fetchCustomers, 300);
    return () => clearTimeout(timer);
  }, [fetchCustomers]);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(key === "name");
    }
  }

  const sorted = [...customers].sort((a, b) => {
    let cmp = 0;
    switch (sortKey) {
      case "name":
        cmp = a.name.localeCompare(b.name);
        break;
      case "total_orders":
        cmp = a.total_orders - b.total_orders;
        break;
      case "total_spent":
        cmp = a.total_spent - b.total_spent;
        break;
      case "last_order_date":
        cmp =
          (a.last_order_date || "").localeCompare(b.last_order_date || "");
        break;
    }
    return sortAsc ? cmp : -cmp;
  });

  // Stats
  const totalCustomers = customers.length;
  const totalRevenue = customers.reduce((s, c) => s + c.total_spent, 0);
  const avgSpend =
    totalCustomers > 0 ? Math.round(totalRevenue / totalCustomers) : 0;

  const sortOptions: { key: SortKey; label: string }[] = [
    { key: "name", label: "Name" },
    { key: "total_orders", label: "Orders" },
    { key: "total_spent", label: "Spent" },
    { key: "last_order_date", label: "Last Active" },
  ];

  if (loading && customers.length === 0) {
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
          <p className="text-2xl font-bold text-brew-text">{totalCustomers}</p>
          <p className="text-xs text-brew-text-muted">Customers</p>
        </div>
        <div className="bg-white rounded-xl border border-brew-border/50 p-4 text-center">
          <p className="text-2xl font-bold text-brew-text">₹{totalRevenue}</p>
          <p className="text-xs text-brew-text-muted">Total Revenue</p>
        </div>
        <div className="bg-white rounded-xl border border-brew-border/50 p-4 text-center">
          <p className="text-2xl font-bold text-brew-green">₹{avgSpend}</p>
          <p className="text-xs text-brew-text-muted">Avg Spend</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brew-text-muted" />
        <Input
          placeholder="Search by name or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 h-10 rounded-xl border-brew-border bg-white"
        />
      </div>

      {/* Sort pills */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {sortOptions.map((opt) => (
          <button
            key={opt.key}
            onClick={() => handleSort(opt.key)}
            className={`shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              sortKey === opt.key
                ? "bg-brew-green text-white"
                : "bg-brew-cream text-brew-text-muted hover:bg-brew-border"
            }`}
          >
            {opt.label}
            {sortKey === opt.key && (
              <ArrowUpDown className="w-3 h-3" />
            )}
          </button>
        ))}
      </div>

      {/* Customer list */}
      {sorted.length === 0 ? (
        <div className="text-center py-16">
          <Users className="w-12 h-12 text-brew-text-muted/30 mx-auto mb-3" />
          <p className="text-brew-text-muted text-sm">No customers found</p>
        </div>
      ) : (
        <div className="space-y-3 pb-8">
          {sorted.map((customer) => (
            <Link
              key={customer.id}
              href={`/admin/customers/${customer.id}`}
              className="block"
            >
              <div className="bg-white rounded-2xl border border-brew-border/50 p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-heading text-base text-brew-text truncate">
                        {customer.name}
                      </span>
                    </div>
                    <a
                      href={`tel:${customer.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1 text-xs text-brew-green hover:underline mb-2"
                    >
                      <Phone className="w-3 h-3" />
                      {customer.phone}
                    </a>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-blue-100 text-blue-700 text-xs font-medium">
                        {customer.total_orders} orders
                      </Badge>
                      <Badge className="bg-green-100 text-green-700 text-xs font-medium">
                        ₹{customer.total_spent} spent
                      </Badge>
                      <span className="text-xs text-brew-text-muted">
                        {formatDate(customer.last_order_date)}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-brew-text-muted/50 shrink-0" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
