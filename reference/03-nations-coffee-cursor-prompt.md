# Nations Coffee — Cursor Implementation Prompt

> Attach these files as context when pasting this prompt:
> - `01-nations-coffee-menu.md` (real menu, 45 items)
> - `02-nations-coffee-design.md` (brand & design)
> - `nations-coffee-project-brief.md` (business details)

---

## Overview

This repo is cloned from a Brew Truck food truck template. The ENTIRE menu is wrong (it's Brew Truck's menu). Business details are partially updated but have remnants. We need a complete content replacement with Nations Coffee's REAL data while keeping the Supabase ordering system fully functional.

Nations Coffee is a small specialty coffee house in Ranchi with 45 menu items, 9 categories, price range ₹60–250. Predominantly vegetarian (only 1 non-veg item). Known for specialty coffee, artisanal cakes, matcha, and tiramisu.

---

## PHASE 1: Replace the entire menu (`src/data/menu-data.ts`)

### 1.1 Replace `fullMenu` array completely

Delete ALL existing categories and items. Replace with exactly this (transcribed from actual wall menu):

```ts
export const fullMenu: FullMenuCategory[] = [
  {
    category: "Hot Coffee",
    items: [
      { name: "Cappuccino", price: "₹100" },
      { name: "Flat White", price: "₹90" },
      { name: "Latte", price: "₹110" },
      { name: "Spanish Latte", price: "₹150" },
      { name: "Matcha Latte", price: "₹150" },
      { name: "Espresso", price: "₹80" },
      { name: "Americano", price: "₹80" },
    ],
  },
  {
    category: "Frappe",
    items: [
      { name: "Coffee Frappe", price: "₹130" },
      { name: "Mocha Frappe", price: "₹130" },
      { name: "Caramel Frappe", price: "₹150" },
      { name: "Matcha Frappe", price: "₹150" },
    ],
  },
  {
    category: "Iced Coffee",
    items: [
      { name: "Iced Latte", price: "₹130" },
      { name: "Iced Spanish Latte", price: "₹130" },
      { name: "Iced Americano", price: "₹100" },
    ],
  },
  {
    category: "Hot Tea",
    items: [
      { name: "Green Tea", price: "₹60" },
      { name: "Honey Ginger Lemon Tea", price: "₹70" },
      { name: "Hibiscus Tea", price: "₹90" },
      { name: "Butterfly Pea Flower Tea", price: "₹90" },
      { name: "Earl Grey", price: "₹90" },
      { name: "Chamomile", price: "₹90" },
    ],
  },
  {
    category: "Iced Tea",
    items: [
      { name: "Peach Ice Tea", price: "₹130" },
      { name: "Blueberry Ice Tea", price: "₹120" },
      { name: "Raspberry Ice Tea", price: "₹120" },
      { name: "Strawberry Ice Tea", price: "₹120" },
      { name: "Lemon and Mint Ice Tea", price: "₹130" },
    ],
  },
  {
    category: "Mocktail",
    items: [
      { name: "Fresh Lemon and Mint", price: "₹130" },
      { name: "Mojito", price: "₹130" },
      { name: "Passion Fruit Mojito", price: "₹140" },
      { name: "Peach Mojito", price: "₹140" },
      { name: "Blueberry Mojito", price: "₹140" },
      { name: "Raspberry Mojito", price: "₹140" },
      { name: "Strawberry Mojito", price: "₹140" },
    ],
  },
  {
    category: "Sandwiches",
    items: [
      { name: "Tex-Mex Chicken", price: "₹150" },
      { name: "Herb and Cheese (Veg)", price: "₹120" },
      { name: "Cheesy Veg", price: "₹130" },
    ],
  },
  {
    category: "Pastries & Cakes",
    items: [
      { name: "Carrot Cake", price: "₹120" },
      { name: "Banana Bread", price: "₹90" },
      { name: "Butter Pound Cake", price: "₹100" },
      { name: "Mocha Cupcakes", price: "₹100" },
      { name: "Blueberry Lemon Zest", price: "₹100" },
      { name: "Donut", price: "₹120" },
      { name: "Cinnamon Roll", price: "₹120" },
    ],
  },
  {
    category: "Cheesecake & Desserts",
    items: [
      { name: "Blueberry Cheesecake", price: "₹180" },
      { name: "Biscoff", price: "₹250" },
      { name: "Tiramisu", price: "₹180" },
    ],
  },
];
```

### 1.2 Replace `menuItems` (featured items for homepage cards)

Pick 8 signature items that represent the brand. Use appropriate `iconName` values that exist in the components, or create generic ones:

```ts
export const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Matcha Frappe",
    price: "₹150",
    tag: "Bestseller",
    tagEmoji: "🔥",
    category: "drinks",
    description: "Smooth, refreshing, totally addictive",
    iconName: "iced-coffee",
  },
  {
    id: 2,
    name: "Spanish Latte",
    price: "₹150",
    tag: "Signature",
    tagEmoji: "✨",
    category: "drinks",
    description: "Rich condensed milk meets bold espresso",
    iconName: "hot-coffee",
  },
  {
    id: 3,
    name: "Tiramisu",
    price: "₹180",
    tag: "Must Try",
    category: "desserts",
    description: "Best tiramisu in Ranchi — hard to find elsewhere",
    iconName: "cheesecake",
  },
  {
    id: 4,
    name: "Butter Pound Cake",
    price: "₹100",
    tag: "Signature",
    tagEmoji: "💛",
    category: "desserts",
    description: "Fresh, buttery, pairs perfectly with coffee",
    iconName: "brownie",
  },
  {
    id: 5,
    name: "Cappuccino",
    price: "₹100",
    tag: "Classic",
    category: "drinks",
    description: "Perfectly pulled, rich and smooth",
    iconName: "hot-coffee",
  },
  {
    id: 6,
    name: "Biscoff",
    price: "₹250",
    tag: "Premium",
    tagEmoji: "👑",
    category: "desserts",
    description: "Indulgent Biscoff cheesecake, our most luxurious dessert",
    iconName: "cheesecake",
  },
  {
    id: 7,
    name: "Passion Fruit Mojito",
    price: "₹140",
    tag: "Refreshing",
    category: "drinks",
    description: "Tropical, tangy, perfect for Ranchi summers",
    iconName: "boba-tea",
  },
  {
    id: 8,
    name: "Carrot Cake",
    price: "₹120",
    tag: "Popular",
    category: "desserts",
    description: "Moist, spiced, a crowd favourite",
    iconName: "brownie",
  },
];
```

### 1.3 Replace `reviews` array

```ts
export const reviews: Review[] = [
  {
    id: 1,
    name: "Ariz Iqbal",
    source: "Google",
    stars: 5,
    quote:
      "A small, cosy cafe near Siromtoli. Great variety of coffee and delicious cakes. Staff is welcoming, prices are reasonable. Perfect for a calm hangout or quiet coffee break.",
    isLocalGuide: true,
  },
  {
    id: 2,
    name: "Swastika",
    source: "Google",
    stars: 5,
    quote:
      "I am in love with this place — small, cozy and beautiful. Seating capacity is not more than 25. Coffee was awesome, freshly brewed and perfectly made!",
    isLocalGuide: true,
  },
  {
    id: 3,
    name: "Mr Rk",
    source: "Google",
    stars: 5,
    quote:
      "My new comfort cafe! The vibe is calm, cozy, and super aesthetically done. Staff is polite and warm. The Matcha Frappe is smooth, refreshing, and totally addictive!",
    isLocalGuide: true,
  },
  {
    id: 4,
    name: "Deepak",
    source: "Google",
    stars: 5,
    quote:
      "Perfect place & food, good hygiene, pretty staffs and nice service.",
  },
  {
    id: 5,
    name: "Ananya",
    source: "Google",
    stars: 5,
    quote:
      "Very humble staff and very tasty coffee with soothing environment.",
  },
  {
    id: 6,
    name: "Rahul",
    source: "Google",
    stars: 5,
    quote:
      "The ambiance, place and vibe is so peaceful that you can sit for hours. Best coffee in town!",
  },
];
```

### 1.4 Replace `vibeCards`

```ts
export const vibeCards: VibeCard[] = [
  { id: 1, emoji: "☕", title: "Specialty Brews", description: "Pour-over, espresso, matcha & more" },
  { id: 2, emoji: "🍰", title: "Baked Fresh", description: "Cakes, brownies & cinnamon rolls" },
  { id: 3, emoji: "🧁", title: "Cheesecake Corner", description: "Biscoff, blueberry & tiramisu" },
  { id: 4, emoji: "🪴", title: "Cozy Nook", description: "Soft lights, warm wood, 25 seats" },
  { id: 5, emoji: "🍹", title: "Mocktail Bar", description: "7 mojito flavours to choose from" },
  { id: 6, emoji: "🍵", title: "Tea Garden", description: "Hibiscus, butterfly pea & chamomile" },
  { id: 7, emoji: "✨", title: "Aesthetic Vibes", description: "Every corner is Instagram-worthy" },
  { id: 8, emoji: "🙏", title: "Faith & Peace", description: "Brewed with faith, hope & love" },
];
```

### 1.5 Replace `businessInfo`

```ts
export const businessInfo = {
  name: "Nations Coffee",
  tagline: "Faith. Hope. Love. Peace.",
  subtitle: "Ranchi's cozy specialty coffee house",
  address: "Club Rd, Sirom Toli, New Garden, Kanka, Ranchi, Jharkhand 834001",
  secondaryAddress: "Siromtoli Chowk, Kanke Road, Ranchi",
  weeklyHours: [
    { day: "Sunday", hours: "8 am – 10 pm" },
    { day: "Monday", hours: "8 am – 10 pm" },
    { day: "Tuesday", hours: "8 am – 10 pm" },
    { day: "Wednesday", hours: "8 am – 10 pm" },
    { day: "Thursday", hours: "8 am – 10 pm" },
    { day: "Friday", hours: "8 am – 10 pm" },
    { day: "Saturday", hours: "8 am – 10 pm" },
  ],
  hoursNote: "Hours may vary • follow us on Instagram for updates!",
  googleMapsLink: "https://maps.app.goo.gl/GmtgAWNR31L9mBRh7",
  googleMapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3662.5!2d85.3317238!3d23.3541796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e100034a6fcf%3A0x38f2a3d38f5c17e7!2sNations%20Coffee!5e0!3m2!1sen!2sin!4v1",
  instagram: "https://www.instagram.com/nationscoffeein/",
  instagramHandle: "@nationscoffeein",
  phone: "", // TODO: get from client
  whatsapp: "", // TODO: get from client
  services: ["Dine-in", "Takeaway"],
  goodFor: ["Solo work sessions", "Friend hangouts", "Couples", "Quiet coffee breaks"],
  googleRating: "4.5",
  googleReviewCount: "163",
  pricePerPerson: "₹1–200",
  coordinates: { lat: 23.3542, lng: 85.3317 },
  blessingQuote: "May the Lord bless you and keep you; may the Lord make his face shine upon you and be gracious to you; may the Lord turn his face towards you and give you peace.",
};
```

---

## PHASE 2: Update color theme (`src/app/globals.css`)

Update the `brew-*` color tokens to match the actual Nations Coffee brand:

```css
/* Nations Coffee theme */
--color-brew-green: #8BA62B;
--color-brew-green-dark: #6B8A1F;
--color-brew-green-light: #A8C256;
--color-brew-cream: #F5F0E8;
--color-brew-orange: #6B4226;
--color-brew-orange-light: #8B5E3C;
--color-brew-warm-white: #FAFAF5;
--color-brew-border: #E8E2D6;
--color-brew-text: #1A1A1A;
--color-brew-text-muted: #5A5A5A;
```

Also update the `:root` shadcn mapped colors:
```css
--primary: #8BA62B;
--accent: #6B4226;
--ring: #8BA62B;
--chart-1: #8BA62B;
--chart-2: #6B4226;
--chart-3: #6B8A1F;
--chart-4: #A8C256;
--chart-5: #8B5E3C;
```

---

## PHASE 3: Update metadata & layout (`src/app/layout.tsx`)

```ts
export const metadata: Metadata = {
  title: "Nations Coffee • Faith. Hope. Love. Peace.",
  description:
    "Nations Coffee, Ranchi — specialty coffee, fresh cakes, artisanal teas & good vibes. 4.5★ rated, 45 menu items. Dine-in at New Garden & Siromtoli.",
  keywords: [
    "Nations Coffee",
    "Nations Coffee Ranchi",
    "coffee Ranchi",
    "cafe Ranchi",
    "specialty coffee",
    "matcha frappe Ranchi",
    "tiramisu Ranchi",
    "cheesecake Ranchi",
    "Siromtoli cafe",
    "best cafe Ranchi",
  ],
  icons: {
    icon: "/nations-coffee-logo.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Nations Coffee • Faith. Hope. Love. Peace.",
    description: "Ranchi's cozy specialty coffee house — freshly brewed coffee, cakes & good vibes.",
    type: "website",
  },
};
```

---

## PHASE 4: Component content fixes

### 4.1 Global find-and-replace

Search ALL files in `src/` for these strings and replace:
- "Brew Truck" / "BrewTruck" / "brewtruck" → "Nations Coffee"
- "food truck" (in user-facing copy) → "café" or "coffee house"
- "truck" (in descriptions, alt text, ARIA labels) → "café"
- "Dangratoli" / "Pantaloons" / "Eastern Mall" / "Barhi Toli" → remove
- "Drive-through" / "Kerbside Pickup" → remove from services
- "street food" (in descriptions/copy) → "specialty coffee & bakes"
- "Korean" / "Burger" / "Pizza" / "Boba" / "Waffle" references in copy → remove

### 4.2 Hero section (`src/components/sections/hero.tsx`)
- Headline: "Nations Coffee" prominently
- Subline: "A Specialty Coffee House" or "Faith. Hope. Love. Peace."
- Description: "Specialty coffee, artisanal cakes & teas in Ranchi's coziest café"
- CTAs: "View Menu" + "Find Us"

### 4.3 About section (`src/components/sections/about.tsx`)
Update copy to reflect:
- Small, intimate 25-seat specialty coffee house
- Two outlets: New Garden (primary) + Siromtoli (original)
- Known for: matcha frappe, tiramisu, butter pound cake, specialty teas
- 4.5★ on Google with 163 reviews
- Faith-inspired ("Faith. Hope. Love. Peace.")
- No alcohol, family-friendly, predominantly vegetarian

### 4.4 Location section (`src/components/sections/location.tsx`)
Show BOTH outlets:
- **New Garden:** Club Rd, Sirom Toli, New Garden, Kanka, Ranchi 834001
- **Siromtoli:** Siromtoli Chowk, Kanke Road, Ranchi
- Hours: 8 AM – 10 PM daily
- Free parking (confirmed by Google reviews)
- Google Maps embed + "Get Directions" link

### 4.5 Footer (`src/components/sections/footer.tsx`)
- Nations Coffee branding
- Instagram: @nationscoffeein
- Both addresses
- "Built by sadique.co" credit → https://sadique.co (**MANDATORY**)
- Optional: blessing quote in small text

### 4.6 WhatsApp button (`src/components/shared/whatsapp-button.tsx`)
- If `businessInfo.whatsapp` exists → use `wa.me/` link
- Fallback → Instagram link
- Add TODO comment for client phone number

---

## PHASE 5: Supabase — Re-seed menu

### 5.1 Update `scripts/seed-menu.ts`

The seed script imports `fullMenu` from `menu-data.ts` — since we replaced the entire array, the seed will automatically use the new Nations Coffee menu.

Update the `isVeg()` function since there's only 1 non-veg item:

```ts
function isVeg(name: string): boolean {
  const nonVegKeywords = ["chicken", "tex-mex"];
  const lower = name.toLowerCase();
  return !nonVegKeywords.some((kw) => lower.includes(kw));
}
```

### 5.2 Add clear-and-reseed to seed script

Add this at the top of the `seed()` function:

```ts
// Clear existing menu items
const { error: deleteError } = await supabase
  .from("menu_items")
  .delete()
  .neq("id", "00000000-0000-0000-0000-000000000000");
if (deleteError) {
  console.error("Error clearing menu:", deleteError.message);
  process.exit(1);
}
console.log("Cleared existing menu items.");
```

### 5.3 Run seed
```bash
npx tsx scripts/seed-menu.ts
```

### 5.4 Verify settings
Ensure `settings` table has `orders_enabled = 'true'`.

---

## PHASE 6: Final checks

### 6.1 Build
```bash
npm run build
```

### 6.2 Grep for remnants
```bash
grep -ri "brew truck\|brewtruck\|food truck\|dangratoli\|pantaloons\|eastern mall\|barhi toli\|korean fried\|boba tea\|waffle\|pizza.*₹" src/ --include="*.ts" --include="*.tsx"
```
Should return ZERO results.

### 6.3 Verify all pages
- `/` → Homepage renders with Nations Coffee content
- `/order/[id]` → Order flow works with new menu from Supabase
- Admin dashboard → Login + order management functional

### 6.4 Public assets
- `public/nations-coffee-logo.png` → verify it exists (use NC monogram)
- `public/foods/` → images may be from Brew Truck. For demo, they can stay as placeholders. Note which ones need replacing.

---

## IMPORTANT RULES
- DO NOT rename `brew-*` CSS custom property NAMES — only change their VALUES
- DO NOT alter the Supabase schema or migration files
- DO NOT remove the `sadique.co` footer credit
- DO NOT add any Brew Truck menu items back
- The fullMenu array above is the COMPLETE menu — 45 items, 9 categories. Do not add or estimate items.
- If unsure about phone/WhatsApp number → leave empty with TODO
