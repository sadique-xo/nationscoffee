import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { verifyAdmin } from "@/lib/admin-auth";

const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;

/** Convert an IST date string (YYYY-MM-DD) to the start of that day in UTC ISO. */
function istDateToUTCStart(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const istMidnight = Date.UTC(y, m - 1, d, 0, 0, 0, 0);
  return new Date(istMidnight - IST_OFFSET_MS).toISOString();
}

/** Convert an IST date string (YYYY-MM-DD) to the end of that day in UTC ISO. */
function istDateToUTCEnd(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const istEnd = Date.UTC(y, m - 1, d, 23, 59, 59, 999);
  return new Date(istEnd - IST_OFFSET_MS).toISOString();
}

export async function GET(req: NextRequest) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "20", 10)));
  const status = searchParams.get("status") || "";
  const search = searchParams.get("search")?.trim() || "";
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";

  const offset = (page - 1) * limit;

  // Build query
  let query = supabaseAdmin
    .from("orders")
    .select("*, order_items(*)", { count: "exact" });

  // Filters
  if (status) {
    query = query.eq("status", status);
  }
  if (from) {
    query = query.gte("created_at", istDateToUTCStart(from));
  }
  if (to) {
    query = query.lte("created_at", istDateToUTCEnd(to));
  }
  if (search) {
    const isNumeric = /^\d+$/.test(search);
    if (isNumeric) {
      query = query.eq("order_number", parseInt(search, 10));
    } else {
      query = query.or(
        `customer_name.ilike.%${search}%,customer_phone.ilike.%${search}%`
      );
    }
  }

  // Sort and paginate
  query = query
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const total = count ?? 0;
  const totalPages = Math.ceil(total / limit);

  return NextResponse.json({
    orders: data ?? [],
    total,
    page,
    totalPages,
  });
}
