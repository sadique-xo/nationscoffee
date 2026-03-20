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

  const { data: customer, error } = await supabaseAdmin
    .from("customers")
    .select("id, name, phone")
    .eq("phone", phone)
    .single();

  if (error || !customer) {
    return NextResponse.json({ found: false });
  }

  return NextResponse.json({ found: true, customer });
}
