/**
 * Seed script: inserts menu items from menu-data.ts into Supabase.
 *
 * Usage:
 *   npx tsx scripts/seed-menu.ts
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local
 */

import { createClient } from "@supabase/supabase-js";
import { fullMenu } from "../src/data/menu-data";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY"
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

function parsePrice(priceStr: string): number {
  return parseInt(priceStr.replace("₹", "").split("/")[0], 10);
}

function isVeg(name: string): boolean {
  const nonVegKeywords = [
    "chicken",
    "peri peri fried",
    "nugget",
    "popcorn",
    "wings",
    "junglee",
  ];
  const lower = name.toLowerCase();
  return !nonVegKeywords.some((kw) => lower.includes(kw));
}

async function seed() {
  console.log("Seeding menu items...\n");

  let sortOrder = 0;
  const rows = fullMenu.flatMap((category) =>
    category.items.map((item) => ({
      name: item.name,
      price: parsePrice(item.price),
      category: category.category,
      is_veg: isVeg(item.name),
      sort_order: sortOrder++,
      is_available: true,
    }))
  );

  const { data, error } = await supabase.from("menu_items").insert(rows).select("id, name");

  if (error) {
    console.error("Error seeding:", error.message);
    process.exit(1);
  }

  console.log(`Inserted ${data.length} menu items.`);
  process.exit(0);
}

seed();
