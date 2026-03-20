"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AdminProvider, useAdmin } from "@/contexts/admin-context";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  ClipboardList,
  UtensilsCrossed,
  BarChart3,
  Settings,
  Users,
  History,
  MoreHorizontal,
  Volume2,
  VolumeX,
  LogOut,
} from "lucide-react";

const allNavItems = [
  { href: "/admin/orders", label: "Orders", icon: ClipboardList },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/order-history", label: "History", icon: History },
  { href: "/admin/menu", label: "Menu", icon: UtensilsCrossed },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

// Mobile: show first 4 in bottom bar, rest in "More" sheet
const mobileNavItems = allNavItems.slice(0, 4);
const moreNavItems = allNavItems.slice(4);

function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { soundEnabled, setSoundEnabled } = useAdmin();
  const [moreOpen, setMoreOpen] = useState(false);

  const isMoreActive = moreNavItems.some((item) => pathname === item.href);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  }

  return (
    <div className="min-h-screen bg-brew-warm-white">
      {/* ─── Desktop Sidebar (md+) ─── */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-[200px] bg-white border-r border-brew-border flex-col z-40">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-brew-border/50">
          <Link href="/admin/orders" className="flex items-center gap-2.5">
            <span className="font-heading text-base text-brew-text">
              Nations Coffee
            </span>
          </Link>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {allNavItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-brew-green/10 text-brew-green border-l-2 border-brew-green"
                    : "text-brew-text-muted hover:bg-brew-cream hover:text-brew-text"
                }`}
              >
                <Icon className="w-4.5 h-4.5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="px-3 py-4 border-t border-brew-border/50 space-y-1">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-brew-text-muted hover:bg-brew-cream hover:text-brew-text transition-colors w-full"
          >
            {soundEnabled ? (
              <Volume2 className="w-4.5 h-4.5" />
            ) : (
              <VolumeX className="w-4.5 h-4.5 text-red-500" />
            )}
            {soundEnabled ? "Sound On" : "Sound Off"}
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-brew-text-muted hover:bg-red-50 hover:text-red-600 transition-colors w-full"
          >
            <LogOut className="w-4.5 h-4.5" />
            Logout
          </button>
        </div>
      </aside>

      {/* ─── Mobile Top Header ─── */}
      <header className="md:hidden sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-brew-border">
        <div className="px-4 py-3 flex items-center justify-between">
          <Link href="/admin/orders" className="flex items-center gap-2">
            <span className="font-heading text-base text-brew-text">
              Nations Coffee
            </span>
          </Link>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-brew-cream transition-colors"
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-brew-text-muted" />
              ) : (
                <VolumeX className="w-4 h-4 text-red-500" />
              )}
            </button>
            <button
              onClick={handleLogout}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-brew-cream transition-colors"
            >
              <LogOut className="w-4 h-4 text-brew-text-muted" />
            </button>
          </div>
        </div>
      </header>

      {/* ─── Main Content ─── */}
      <main className="md:ml-[200px] pb-[72px] md:pb-0">{children}</main>

      {/* ─── Mobile Bottom Nav ─── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-brew-border">
        <div className="flex items-center justify-around py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
          {mobileNavItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-0.5 px-4 py-1 rounded-lg transition-colors ${
                  isActive ? "text-brew-green" : "text-brew-text-muted"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : ""}`} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}

          {/* More button */}
          <Sheet open={moreOpen} onOpenChange={setMoreOpen}>
            <SheetTrigger
              render={
                <button
                  className={`flex flex-col items-center gap-0.5 px-4 py-1 rounded-lg transition-colors ${
                    isMoreActive ? "text-brew-green" : "text-brew-text-muted"
                  }`}
                />
              }
            >
              <MoreHorizontal className={`w-5 h-5 ${isMoreActive ? "stroke-[2.5]" : ""}`} />
              <span className="text-[10px] font-medium">More</span>
            </SheetTrigger>
            <SheetContent side="bottom" showCloseButton={false} className="rounded-t-2xl">
              <SheetTitle className="sr-only">More navigation</SheetTitle>
              <div className="w-10 h-1 rounded-full bg-brew-border mx-auto mb-4 mt-2" />
              <div className="space-y-1 px-2 pb-[calc(1rem+env(safe-area-inset-bottom))]">
                {moreNavItems.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <SheetClose key={item.href} render={<div />}>
                      <Link
                        href={item.href}
                        onClick={() => setMoreOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-brew-green/10 text-brew-green"
                            : "text-brew-text-muted hover:bg-brew-cream hover:text-brew-text"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {item.label}
                      </Link>
                    </SheetClose>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProvider>
      <DashboardShell>{children}</DashboardShell>
    </AdminProvider>
  );
}
