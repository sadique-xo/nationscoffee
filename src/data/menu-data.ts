// ============================================
// Nations Coffee • All site content & data
// ============================================

export interface MenuItem {
  id: number;
  name: string;
  price: string;
  tag: string;
  tagEmoji?: string;
  category: "food" | "drinks" | "desserts";
  description: string;
  iconName: string;
}

export interface FullMenuItem {
  name: string;
  price: string;
}

export interface FullMenuCategory {
  category: string;
  items: FullMenuItem[];
}

export interface Review {
  id: number;
  name: string;
  source: string;
  stars: number;
  quote: string;
  isLocalGuide?: boolean;
}

export interface VibeCard {
  id: number;
  emoji: string;
  title: string;
  description: string;
}

// ---- Featured Menu Items (for Menu section cards) ----
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

// ---- Full Menu (all 45 items, 9 categories) ----
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

// ---- Google Reviews ----
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

// ---- Gallery Vibe Cards ----
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

// ---- Business Info ----
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
