import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { verifyAdmin } from "@/lib/admin-auth";
import { toISTDateKey, getISTHour, istDaysAgoStartUTC, istTodayKey } from "@/lib/ist";

export async function GET(req: NextRequest) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const days = parseInt(searchParams.get("days") || "7", 10);

  const todayKey = istTodayKey();
  const startISO = istDaysAgoStartUTC(days - 1);

  // Fetch all orders in range
  const { data: orders, error } = await supabaseAdmin
    .from("orders")
    .select("*, order_items(*)")
    .gte("created_at", startISO)
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const allOrders = orders ?? [];
  const validOrders = allOrders.filter(
    (o: { status: string }) => o.status !== "cancelled"
  );

  // ─── Period summary stats ──────────────────────────────────
  const totalOrders = validOrders.length;
  const totalRevenue = validOrders.reduce(
    (sum: number, o: { total_amount: number }) => sum + o.total_amount,
    0
  );
  const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;
  const uniquePhones = new Set(
    validOrders.map((o: { customer_phone: string }) => o.customer_phone)
  );
  const totalCustomers = uniquePhones.size;

  // ─── Today's insights ─────────────────────────────────────
  const todayOrders = validOrders.filter(
    (o: { created_at: string }) => toISTDateKey(new Date(o.created_at)) === todayKey
  );
  const todayOrderCount = todayOrders.length;
  const todayRevenue = todayOrders.reduce(
    (sum: number, o: { total_amount: number }) => sum + o.total_amount,
    0
  );
  const todayAvg = todayOrderCount > 0 ? Math.round(todayRevenue / todayOrderCount) : 0;
  const todayCustomers = new Set(
    todayOrders.map((o: { customer_phone: string }) => o.customer_phone)
  ).size;

  // Today's cancelled & active
  const todayAllOrders = allOrders.filter(
    (o: { created_at: string }) => toISTDateKey(new Date(o.created_at)) === todayKey
  );
  const todayCancelled = todayAllOrders.filter(
    (o: { status: string }) => o.status === "cancelled"
  ).length;
  const todayActive = todayAllOrders.filter(
    (o: { status: string }) => ["received", "preparing", "ready"].includes(o.status)
  ).length;

  // ─── Orders per day (IST) ─────────────────────────────────
  const ordersPerDay: Record<string, { date: string; orders: number; revenue: number }> = {};
  // Build date keys for each day in range using IST
  const nowIST = new Date(Date.now() + 5.5 * 60 * 60 * 1000);
  for (let d = 0; d < days; d++) {
    const date = new Date(Date.UTC(
      nowIST.getUTCFullYear(),
      nowIST.getUTCMonth(),
      nowIST.getUTCDate() - (days - 1) + d
    ));
    const key = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}-${String(date.getUTCDate()).padStart(2, "0")}`;
    ordersPerDay[key] = { date: key, orders: 0, revenue: 0 };
  }

  for (const order of validOrders) {
    const key = toISTDateKey(new Date(order.created_at));
    if (ordersPerDay[key]) {
      ordersPerDay[key].orders += 1;
      ordersPerDay[key].revenue += order.total_amount;
    }
  }

  const dailyData = Object.values(ordersPerDay);

  // ─── Top selling items ───────────────────────────────────
  const itemCounts: Record<string, { name: string; quantity: number; revenue: number }> = {};
  for (const order of validOrders) {
    for (const item of order.order_items) {
      if (!itemCounts[item.item_name]) {
        itemCounts[item.item_name] = { name: item.item_name, quantity: 0, revenue: 0 };
      }
      itemCounts[item.item_name].quantity += item.quantity;
      itemCounts[item.item_name].revenue += item.subtotal;
    }
  }
  const topItems = Object.values(itemCounts)
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  // ─── Orders by hour (IST) ─────────────────────────────────
  const hourlyData: { hour: string; orders: number }[] = [];
  const hourCounts = new Array(24).fill(0);
  for (const order of validOrders) {
    const hour = getISTHour(new Date(order.created_at));
    hourCounts[hour]++;
  }
  for (let h = 0; h < 24; h++) {
    hourlyData.push({
      hour: `${h.toString().padStart(2, "0")}:00`,
      orders: hourCounts[h],
    });
  }

  return NextResponse.json({
    summary: { totalOrders, totalRevenue, avgOrderValue, totalCustomers },
    today: {
      orders: todayOrderCount,
      revenue: todayRevenue,
      avgOrderValue: todayAvg,
      customers: todayCustomers,
      active: todayActive,
      cancelled: todayCancelled,
    },
    dailyData,
    topItems,
    hourlyData,
  });
}
