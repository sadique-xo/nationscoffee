import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "Admin • Nations Coffee",
  description: "Nations Coffee admin dashboard",
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
