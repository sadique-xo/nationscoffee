import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET(req: NextRequest) {
  const phone = req.nextUrl.searchParams.get("phone");

  if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
    return NextResponse.json(
      { error: "Valid 10-digit phone required" },
      { status: 400 }
    );
  }

  // Fetch orders with their items
  const { data: orders, error } = await supabaseAdmin
    .from("orders")
    .select(`
      id,
      order_number,
      customer_name,
      status,
      total_amount,
      notes,
      created_at,
      updated_at,
      order_items (
        id,
        item_name,
        quantity,
        unit_price,
        subtotal
      )
    `)
    .eq("customer_phone", phone)
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }

  // Split into active and past orders
  const activeStatuses = ["received", "preparing", "ready"];
  const active = orders.filter((o) => activeStatuses.includes(o.status));
  const past = orders.filter((o) => !activeStatuses.includes(o.status));

  return NextResponse.json({ active, past });
}
