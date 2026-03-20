import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "Admin • Brew Truck",
  description: "Brew Truck admin dashboard",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Toaster position="top-center" richColors />
    </>
  );
}
