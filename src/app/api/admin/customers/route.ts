import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { verifyAdmin } from "@/lib/admin-auth";
import type { CustomerWithStats } from "@/types/database";

export async function GET(req: NextRequest) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search")?.trim() || "";

  // Fetch all customers
  let customerQuery = supabaseAdmin.from("customers").select("*");
  if (search) {
    customerQuery = customerQuery.or(
      `name.ilike.%${search}%,phone.ilike.%${search}%`
    );
  }
  const { data: customers, error: custErr } = await customerQuery.order("created_at", { ascending: false });

  if (custErr) {
    return NextResponse.json({ error: custErr.message }, { status: 500 });
  }

  // Fetch order aggregates (lightweight - only columns needed)
  const { data: orders, error: ordErr } = await supabaseAdmin
    .from("orders")
    .select("customer_id, total_amount, status, created_at");

  if (ordErr) {
    return NextResponse.json({ error: ordErr.message }, { status: 500 });
  }

  // Aggregate per customer
  const statsMap = new Map<
    string,
    { total_orders: number; total_spent: number; last_order_date: string | null }
  >();

  for (const order of orders ?? []) {
    const cid = order.customer_id;
    if (!cid) continue;

    let entry = statsMap.get(cid);
    if (!entry) {
      entry = { total_orders: 0, total_spent: 0, last_order_date: null };
      statsMap.set(cid, entry);
    }

    entry.total_orders += 1;
    if (order.status !== "cancelled") {
      entry.total_spent += order.total_amount;
    }
    if (!entry.last_order_date || order.created_at > entry.last_order_date) {
      entry.last_order_date = order.created_at;
    }
  }

  const result: CustomerWithStats[] = (customers ?? []).map((c) => {
    const stats = statsMap.get(c.id) || {
      total_orders: 0,
      total_spent: 0,
      last_order_date: null,
    };
    return { ...c, ...stats };
  });

  return NextResponse.json({ customers: result });
}
