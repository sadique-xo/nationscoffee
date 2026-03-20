"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/cart-context";
import { useCustomer } from "@/contexts/customer-context";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  ShoppingBag,
  UserCheck,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

type Step = "phone" | "details";

export default function CheckoutPage() {
  const cart = useCart();
  const customer = useCustomer();
  const router = useRouter();

  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [isReturning, setIsReturning] = useState(false);
  const [lookingUp, setLookingUp] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Pre-fill phone if customer is already in session
  useEffect(() => {
    if (customer.isLoggedIn) {
      setPhone(customer.phone);
      setName(customer.name);
      setIsReturning(true);
      setStep("details");
    }
  }, [customer.isLoggedIn, customer.phone, customer.name]);

  const isPhoneValid = /^[6-9]\d{9}$/.test(phone);
  const isValid = name.trim().length >= 2 && isPhoneValid;

  const handlePhoneLookup = useCallback(async () => {
    if (!isPhoneValid) return;

    setLookingUp(true);
    try {
      const res = await fetch(`/api/customer/lookup?phone=${phone}`);
      const data = await res.json();

      if (data.found) {
        setName(data.customer.name);
        setIsReturning(true);
        toast.success(`Welcome back, ${data.customer.name}!`);
      } else {
        setIsReturning(false);
        setName("");
      }
      setStep("details");
    } catch {
      setStep("details");
    } finally {
      setLookingUp(false);
    }
  }, [phone, isPhoneValid]);

  async function handlePlaceOrder() {
    if (!isValid || cart.items.length === 0) return;

    setSubmitting(true);
    try {
      // 1. Upsert customer
      const { data: cust, error: customerError } = await supabase
        .from("customers")
        .upsert({ name: name.trim(), phone }, { onConflict: "phone" })
        .select("id")
        .single();

      if (customerError) throw customerError;

      // 2. Create order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          customer_id: cust.id,
          customer_name: name.trim(),
          customer_phone: phone,
          total_amount: cart.total,
          notes: notes.trim() || null,
        })
        .select("id")
        .single();

      if (orderError) throw orderError;

      // 3. Create order items
      const orderItems = cart.items.map((item) => ({
        order_id: order.id,
        menu_item_id: item.menu_item_id,
        item_name: item.name,
        quantity: item.quantity,
        unit_price: item.price,
        subtotal: item.price * item.quantity,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // 4. Save customer session & active order
      customer.setCustomer(phone, name.trim());
      customer.addActiveOrder(order.id);

      // 5. Mark order placed (prevents empty cart flash), redirect, then clear
      setOrderPlaced(true);
      router.push(`/order/${order.id}`);
      cart.clearCart();
    } catch (error) {
      console.error("Order failed:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (cart.items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-brew-warm-white flex flex-col items-center justify-center px-4 text-center">
        <ShoppingBag className="w-16 h-16 text-brew-text-muted/40 mb-4" />
        <h1 className="font-heading text-xl text-brew-text mb-2">
          Your cart is empty
        </h1>
        <p className="text-brew-text-muted mb-6">
          Add some items from the menu first!
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

  // Order was placed - show loading while redirecting
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-brew-warm-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brew-green" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brew-warm-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-brew-border">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          {step === "details" && !customer.isLoggedIn ? (
            <button
              onClick={() => setStep("phone")}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-brew-cream transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-brew-text" />
            </button>
          ) : (
            <Link
              href="/order"
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-brew-cream transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-brew-text" />
            </Link>
          )}
          <h1 className="font-heading text-lg text-brew-text">Checkout</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Order summary */}
        <section className="bg-white rounded-2xl border border-brew-border/50 p-5">
          <h2 className="font-semibold text-brew-text mb-4">Order Summary</h2>
          <div className="space-y-3">
            {cart.items.map((item) => (
              <div
                key={item.menu_item_id}
                className="flex items-center justify-between text-sm"
              >
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
                  <span className="text-brew-text">
                    {item.name} × {item.quantity}
                  </span>
                </div>
                <span className="font-medium text-brew-text">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <div className="flex items-center justify-between">
            <span className="font-semibold text-brew-text">Total</span>
            <span className="text-xl font-bold text-brew-text">
              ₹{cart.total}
            </span>
          </div>
        </section>

        {/* Step 1: Phone number */}
        {step === "phone" && (
          <section className="bg-white rounded-2xl border border-brew-border/50 p-5">
            <h2 className="font-semibold text-brew-text mb-1">
              Enter your phone number
            </h2>
            <p className="text-xs text-brew-text-muted mb-4">
              We&apos;ll check if you&apos;ve ordered before to speed things up
            </p>
            <div className="space-y-4">
              <div>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={phone}
                  autoFocus
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                    setPhone(val);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && isPhoneValid) handlePhoneLookup();
                  }}
                  className="h-12 rounded-xl border-brew-border text-base"
                />
                {phone.length > 0 && phone.length < 10 && (
                  <p className="text-xs text-red-500 mt-1">
                    Enter a valid 10-digit number
                  </p>
                )}
              </div>
              <Button
                className="w-full bg-brew-green hover:bg-brew-green-dark text-white h-12 rounded-xl text-base font-semibold"
                disabled={!isPhoneValid || lookingUp}
                onClick={handlePhoneLookup}
              >
                {lookingUp ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Checking...
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </section>
        )}

        {/* Step 2: Name + Notes */}
        {step === "details" && (
          <>
            <section className="bg-white rounded-2xl border border-brew-border/50 p-5">
              {isReturning ? (
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-brew-green/10 flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-brew-green" />
                  </div>
                  <div>
                    <p className="font-semibold text-brew-text text-sm">
                      Welcome back!
                    </p>
                    <p className="text-xs text-brew-text-muted">
                      {phone}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <UserPlus className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-brew-text text-sm">
                      First time? Welcome!
                    </p>
                    <p className="text-xs text-brew-text-muted">
                      {phone}
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-brew-text-muted mb-1.5 block"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={name}
                    autoFocus={!isReturning}
                    onChange={(e) => setName(e.target.value)}
                    className="h-11 rounded-xl border-brew-border"
                  />
                </div>
                <div>
                  <label
                    htmlFor="notes"
                    className="text-sm font-medium text-brew-text-muted mb-1.5 block"
                  >
                    Special Instructions{" "}
                    <span className="text-brew-text-muted/60">(optional)</span>
                  </label>
                  <Textarea
                    id="notes"
                    placeholder="Any special requests? e.g. Extra spicy, no onions..."
                    value={notes}
                    autoFocus={isReturning}
                    onChange={(e) => setNotes(e.target.value)}
                    className="rounded-xl border-brew-border resize-none"
                    rows={3}
                  />
                </div>
              </div>
            </section>

            {/* Place order */}
            <Button
              className="w-full bg-brew-green hover:bg-brew-green-dark text-white h-14 rounded-2xl text-base font-semibold shadow-lg disabled:opacity-50"
              disabled={!isValid || submitting}
              onClick={handlePlaceOrder}
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Placing Order...
                </>
              ) : (
                <>Place Order &bull; ₹{cart.total}</>
              )}
            </Button>

            <p className="text-center text-xs text-brew-text-muted pb-8">
              By placing this order, you agree to pay at the counter.
            </p>
          </>
        )}
      </main>
    </div>
  );
}
