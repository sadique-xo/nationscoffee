"use client";

import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Loader2, ShoppingBag, Shield } from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [ordersEnabled, setOrdersEnabled] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch settings
  useEffect(() => {
    async function fetchSettings() {
      const res = await fetch("/api/admin/settings");
      if (res.ok) {
        const data = await res.json();
        setOrdersEnabled(data.orders_enabled !== "false");
      }
      setLoading(false);
    }
    fetchSettings();
  }, []);

  async function toggleOrders(enabled: boolean) {
    setOrdersEnabled(enabled);
    setSaving(true);

    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: "orders_enabled", value: String(enabled) }),
    });

    if (res.ok) {
      toast.success(enabled ? "Orders are now open!" : "Orders are now paused");
    } else {
      setOrdersEnabled(!enabled); // revert
      toast.error("Failed to update setting");
    }
    setSaving(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-brew-green" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 space-y-6">
      <div>
        <h1 className="font-heading text-xl text-brew-text">Settings</h1>
        <p className="text-xs text-brew-text-muted mt-0.5">
          Manage your Brew Truck configuration
        </p>
      </div>

      {/* Order accepting toggle */}
      <div className="bg-white rounded-2xl border border-brew-border/50 p-5">
        <div className="flex items-start gap-4">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              ordersEnabled
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-500"
            }`}
          >
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-brew-text text-sm">
                  Accept Orders
                </h3>
                <p className="text-xs text-brew-text-muted mt-0.5">
                  {ordersEnabled
                    ? "Customers can place orders right now"
                    : "Ordering is paused — customers will see a \"closed\" message"}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {saving && (
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-brew-text-muted" />
                )}
                <Switch
                  checked={ordersEnabled}
                  onCheckedChange={toggleOrders}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Status indicator */}
        <div
          className={`mt-4 rounded-xl px-4 py-3 ${
            ordersEnabled ? "bg-green-50" : "bg-red-50"
          }`}
        >
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                ordersEnabled ? "bg-green-500 animate-pulse" : "bg-red-500"
              }`}
            />
            <span
              className={`text-sm font-medium ${
                ordersEnabled ? "text-green-700" : "text-red-700"
              }`}
            >
              {ordersEnabled ? "Orders Open" : "Orders Closed"}
            </span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Admin password info */}
      <div className="bg-white rounded-2xl border border-brew-border/50 p-5">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-blue-100 text-blue-600">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-brew-text text-sm">
              Admin Access
            </h3>
            <p className="text-xs text-brew-text-muted mt-0.5">
              Dashboard is protected by password. To change the admin password,
              update the <code className="bg-brew-cream px-1 py-0.5 rounded text-[10px]">ADMIN_PASSWORD</code> environment variable in your deployment settings.
            </p>
          </div>
        </div>
      </div>

      {/* App info */}
      <div className="text-center pb-8">
        <p className="text-xs text-brew-text-muted">
          Brew Truck • Built by{" "}
          <span className="font-medium">sadique.co</span>
        </p>
      </div>
    </div>
  );
}
