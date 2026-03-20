import { CartProvider } from "@/contexts/cart-context";
import { CustomerProvider } from "@/contexts/customer-context";
import { OrderShell } from "@/components/order/order-shell";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "Order • Nations Coffee",
  description:
    "Browse our full menu and place your order. Nations Coffee, Ranchi.",
  openGraph: {
    title: "Order from Nations Coffee",
    description: "Browse 45 items and order directly from Nations Coffee in Ranchi.",
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
