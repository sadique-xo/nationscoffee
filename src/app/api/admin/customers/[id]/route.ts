import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { verifyAdmin } from "@/lib/admin-auth";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  // Fetch customer
  const { data: customer, error: custErr } = await supabaseAdmin
    .from("customers")
    .select("*")
    .eq("id", id)
    .single();

  if (custErr) {
    return NextResponse.json({ error: custErr.message }, { status: 404 });
  }

  // Fetch all orders for this customer with items
  const { data: orders, error: ordErr } = await supabaseAdmin
    .from("orders")
    .select("*, order_items(*)")
    .eq("customer_id", id)
    .order("created_at", { ascending: false });

  if (ordErr) {
    return NextResponse.json({ error: ordErr.message }, { status: 500 });
  }

  return NextResponse.json({ customer, orders: orders ?? [] });
}
