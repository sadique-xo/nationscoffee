import { CartProvider } from "@/contexts/cart-context";
import { CustomerProvider } from "@/contexts/customer-context";
import { OrderShell } from "@/components/order/order-shell";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "Order • Brew Truck",
  description:
    "Browse our full menu and place your order. Brew Truck, Ranchi.",
  openGraph: {
    title: "Order from Brew Truck",
    description: "Browse 50+ items and order directly from Ranchi's favourite food truck.",
  },
};

export default function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CustomerProvider>
      <CartProvider>
        <OrderShell>{children}</OrderShell>
        <Toaster position="top-center" richColors />
      </CartProvider>
    </CustomerProvider>
  );
}
