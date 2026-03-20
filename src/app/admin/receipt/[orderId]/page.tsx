"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import type { OrderWithItems } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Loader2, Printer, X } from "lucide-react";

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

export default function ReceiptPage() {
  const params = useParams();
  const orderId = params.orderId as string;
  const [order, setOrder] = useState<OrderWithItems | null>(null);
  const [loading, setLoading] = useState(true);
  const hasPrinted = useRef(false);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const res = await fetch(`/api/admin/orders/${orderId}`);
        const data = await res.json();
        if (data.order) setOrder(data.order);
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [orderId]);

  // Auto-print on load
  useEffect(() => {
    if (order && !hasPrinted.current) {
      hasPrinted.current = true;
      setTimeout(() => window.print(), 500);
    }
  }, [order]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Order not found</p>
      </div>
    );
  }

  return (
    <>
      {/* Print styles */}
      <style>{`
        @media print {
          @page {
            margin: 10mm;
            size: 80mm auto;
          }
          .no-print {
            display: none !important;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>

      {/* Screen-only action bar */}
      <div className="no-print sticky top-0 bg-white border-b px-4 py-3 flex items-center justify-between z-10">
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.close()}
          className="rounded-lg"
        >
          <X className="w-4 h-4 mr-1" />
          Close
        </Button>
        <Button
          size="sm"
          onClick={() => window.print()}
          className="bg-gray-900 hover:bg-gray-800 text-white rounded-lg"
        >
          <Printer className="w-4 h-4 mr-1" />
          Print
        </Button>
      </div>

      {/* Receipt content */}
      <div className="max-w-[320px] mx-auto px-4 py-6 font-mono text-sm">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-lg font-bold">Brew Truck</h1>
          <p className="text-xs text-gray-500">Fresh brews on wheels</p>
        </div>

        <div className="border-t border-dashed border-gray-300 my-3" />

        {/* Order info */}
        <div className="flex justify-between text-xs mb-1">
          <span>Order #</span>
          <span className="font-bold">
            {String(order.order_number).padStart(3, "0")}
          </span>
        </div>
        <div className="flex justify-between text-xs mb-1">
          <span>Date</span>
          <span>{formatDate(order.created_at)}</span>
        </div>
        <div className="flex justify-between text-xs mb-1">
          <span>Time</span>
          <span>{formatTime(order.created_at)}</span>
        </div>

        <div className="border-t border-dashed border-gray-300 my-3" />

        {/* Customer */}
        <div className="text-xs mb-1">
          <span className="text-gray-500">Customer:</span>{" "}
          {order.customer_name}
        </div>
        <div className="text-xs mb-1">
          <span className="text-gray-500">Phone:</span>{" "}
          {order.customer_phone}
        </div>

        <div className="border-t border-dashed border-gray-300 my-3" />

        {/* Items */}
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-1 font-semibold">Item</th>
              <th className="text-center py-1 font-semibold w-10">Qty</th>
              <th className="text-right py-1 font-semibold">Amt</th>
            </tr>
          </thead>
          <tbody>
            {order.order_items.map((item) => (
              <tr key={item.id}>
                <td className="py-1">{item.item_name}</td>
                <td className="text-center py-1">{item.quantity}</td>
                <td className="text-right py-1">₹{item.subtotal}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="border-t border-dashed border-gray-300 my-3" />

        {/* Total */}
        <div className="flex justify-between font-bold text-base">
          <span>TOTAL</span>
          <span>₹{order.total_amount}</span>
        </div>

        {/* Notes */}
        {order.notes && (
          <>
            <div className="border-t border-dashed border-gray-300 my-3" />
            <div className="text-xs">
              <span className="text-gray-500">Note:</span> {order.notes}
            </div>
          </>
        )}

        <div className="border-t border-dashed border-gray-300 my-3" />

        {/* Footer */}
        <div className="text-center text-xs text-gray-500">
          <p className="font-semibold text-gray-700 mb-1">
            Thank you for visiting Brew Truck!
          </p>
          <p>See you again soon</p>
        </div>
      </div>
    </>
  );
}
