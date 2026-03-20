// ============================================
// Brew Truck • All site content & data
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
    name: "Korean Fried Chicken",
    price: "₹199",
    tag: "Bestseller",
    tagEmoji: "🔥",
    category: "food",
    description: "Crispy, spicy, Korean-style • our #1 seller",
    iconName: "burger",
  },
  {
    id: 2,
    name: "Chicken Loaded Fries",
    price: "₹129",
    tag: "Must Try",
    category: "food",
    description: "Fries buried under cheesy, meaty goodness",
    iconName: "fries",
  },
  {
    id: 3,
    name: "Barbecue Chicken Pizza",
    price: "₹149",
    tag: "Popular",
    category: "food",
    description: "Wood-fired flavour, food truck style",
    iconName: "pizza",
  },
  {
    id: 4,
    name: "Iced Tiramisu Latte",
    price: "₹149/169",
    tag: "Signature",
    tagEmoji: "✨",
    category: "drinks",
    description: "Tiramisu meets espresso • dangerously good",
    iconName: "iced-coffee",
  },
  {
    id: 5,
    name: "Caramel Macchiato",
    price: "₹139",
    tag: "Bestseller",
    category: "drinks",
    description: "The classic. Rich caramel, smooth espresso",
    iconName: "hot-coffee",
  },
  {
    id: 6,
    name: "Classic Boba Tea",
    price: "₹99",
    tag: "Fun Pick",
    category: "drinks",
    description: "Chewy tapioca pearls, sweet milky tea",
    iconName: "boba-tea",
  },
  {
    id: 7,
    name: "Dubai Kunafa Cheesecake",
    price: "₹219",
    tag: "New",
    tagEmoji: "🆕",
    category: "desserts",
    description: "The viral sensation • crunchy, creamy, heavenly",
    iconName: "cheesecake",
  },
  {
    id: 8,
    name: "Nutty Nutella Brownie",
    price: "₹169",
    tag: "Indulgence",
    category: "desserts",
    description: "Fudgy brownie loaded with Nutella & nuts",
    iconName: "brownie",
  },
];

// ---- Full Menu (all 50+ items) ----
export const fullMenu: FullMenuCategory[] = [
  {
    category: "Burgers",
    items: [
      { name: "Classic Aloo Tikki Burger", price: "₹69" },
      { name: "Veggie Delight Burger", price: "₹79" },
      { name: "Paneer Makhni Burger", price: "₹119" },
      { name: "Chicken Zingy Burger", price: "₹129" },
      { name: "Cheese Chicken Burger", price: "₹119" },
    ],
  },
  {
    category: "Fried Chicken",
    items: [
      { name: "Crispy Fried Chicken", price: "₹149" },
      { name: "Peri Peri Fried Chicken Leg", price: "₹199" },
      { name: "Chicken Nuggets", price: "₹119" },
      { name: "Chicken Popcorn", price: "₹149" },
      { name: "Garlic Parmesan Wings", price: "₹159" },
    ],
  },
  {
    category: "Fries",
    items: [
      { name: "Classic French Fries", price: "₹59" },
      { name: "Peri Peri Fries", price: "₹69" },
      { name: "Veggie Loaded Fries", price: "₹99" },
      { name: "Chicken Loaded Fries", price: "₹129" },
      { name: "Chicken Loaded Nachos", price: "₹149" },
    ],
  },
  {
    category: "Korean Range",
    items: [
      { name: "Korean Paneer Burger", price: "₹149" },
      { name: "Korean Chicken Burger", price: "₹169" },
      { name: "Korean Fries", price: "₹99" },
      { name: "Korean Fried Chicken", price: "₹199" },
    ],
  },
  {
    category: "Pizza (8\")",
    items: [
      { name: "Margherita Pizza", price: "₹89" },
      { name: "Corn N Cheese Pizza", price: "₹99" },
      { name: "Tandoori Paneer Pizza", price: "₹139" },
      { name: "Farm House Pizza", price: "₹149" },
      { name: "Barbecue Chicken Pizza", price: "₹149" },
    ],
  },
  {
    category: "Sandwich",
    items: [
      { name: "Bombay Masala", price: "₹79" },
      { name: "Junglee Chicken", price: "₹99" },
      { name: "Corn N Cheese", price: "₹89" },
      { name: "Veggie Cheese Crunch", price: "₹89" },
    ],
  },
  {
    category: "Coffee • Hot Brew",
    items: [
      { name: "Cappuccino", price: "₹59" },
      { name: "Latte (Caramel/Hazelnut)", price: "₹119" },
      { name: "Mocha (White/Dark)", price: "₹119/129" },
      { name: "Caramel Macchiato", price: "₹139" },
      { name: "Matcha Latte", price: "₹119" },
    ],
  },
  {
    category: "Coffee • Cold Brew",
    items: [
      { name: "Iced Latte (Caramel/Hazelnut)", price: "₹119/149" },
      { name: "Iced Caramel Macchiato", price: "₹119/149" },
      { name: "Iced Tiramisu Latte", price: "₹149/169" },
      { name: "Blueberry Cheesecake Latte", price: "₹149/169" },
      { name: "Iced Strawberry Matcha", price: "₹99/129" },
      { name: "Ginger Rush", price: "₹89/119" },
    ],
  },
  {
    category: "Tea",
    items: [
      { name: "Special Gur Tea", price: "₹20" },
      { name: "Masala Gur Tea", price: "₹25" },
    ],
  },
  {
    category: "Mocktails & Shakes",
    items: [
      { name: "Orange Sunrise", price: "₹89/109" },
      { name: "Blue Lagoon", price: "₹69/99" },
      { name: "Mint Mojito", price: "₹69/99" },
      { name: "Berry Bomb", price: "₹99/129" },
      { name: "Kitkat Choco Shake", price: "₹89/109" },
      { name: "Oreo Shake", price: "₹79/99" },
    ],
  },
  {
    category: "Boba • Bubble Drinks",
    items: [
      { name: "Classic Boba Tea", price: "₹99" },
      { name: "Strawberry Milky Boba", price: "₹119" },
      { name: "Minty Boba Mojito", price: "₹109" },
      { name: "Iced Boba Latte", price: "₹129" },
      { name: "Berry Burst Lemonade", price: "₹139" },
    ],
  },
  {
    category: "Waffles",
    items: [
      { name: "White Choco Waffle", price: "₹99" },
      { name: "Triple Choco Waffle", price: "₹149" },
      { name: "Nutty Nutella Brownie", price: "₹169" },
      { name: "Mocha Melt Waffle", price: "₹149" },
    ],
  },
  {
    category: "Cheesecake",
    items: [
      { name: "Blue Berry Cheesecake", price: "₹159" },
      { name: "Biscoff Cheesecake", price: "₹199" },
      { name: "Dubai Kunafa Cheesecake", price: "₹219" },
      { name: "Oreo Crunch Cheesecake", price: "₹179" },
    ],
  },
  {
    category: "Brownies",
    items: [
      { name: "Classic Brownie", price: "₹80" },
      { name: "Lotus Biscoff Brownie", price: "₹99" },
      { name: "Kunafa Brownie", price: "₹126" },
      { name: "Brownie with Ice Cream", price: "₹109" },
    ],
  },
];

// ---- Google Reviews ----
export const reviews: Review[] = [
  {
    id: 1,
    name: "Kshitiz",
    source: "Google",
    stars: 5,
    quote:
      "Worth the hype!! Tasty food, awesome service, reasonable prices!! A must visit place",
  },
  {
    id: 2,
    name: "Ashish Barla",
    source: "Google",
    stars: 5,
    quote:
      "Amazing food, great service, and wonderful atmosphere • full 5 stars!",
  },
  {
    id: 3,
    name: "Priyansh Poddar",
    source: "Google",
    stars: 5,
    quote: "Nice & good. Excellent food, service, and atmosphere.",
  },
  {
    id: 4,
    name: "Deepali Roy",
    source: "Google",
    stars: 5,
    quote:
      "Quite good and flavourful taste... nice surroundings with friends to catch up",
  },
  {
    id: 5,
    name: "Shruti Kumari",
    source: "Google",
    stars: 4,
    quote: "Great food and service. A lovely spot to grab a bite in Ranchi.",
    isLocalGuide: true,
  },
  {
    id: 6,
    name: "POOJARY KITCHEN",
    source: "Google",
    stars: 5,
    quote: "Top notch food and service. Highly recommend!",
  },
];

// ---- Gallery Vibe Cards ----
export const vibeCards: VibeCard[] = [
  { id: 1, emoji: "🚚", title: "The Truck", description: "Where the magic happens" },
  { id: 2, emoji: "☕", title: "Fresh Brews", description: "Crafted with love, every cup" },
  { id: 3, emoji: "🍔", title: "Street Bites", description: "Bold flavours, zero pretence" },
  { id: 4, emoji: "📝", title: "Wall of Love", description: "Sticky notes from happy souls" },
  { id: 5, emoji: "🌿", title: "Open Air Vibes", description: "Fairy lights & good times" },
  { id: 6, emoji: "🧋", title: "Boba O'Clock", description: "It's always boba time" },
  { id: 7, emoji: "🍕", title: "Pizza Party", description: "Fresh from the truck window" },
  { id: 8, emoji: "👫", title: "Friends & Food", description: "Better together, always" },
];

// ---- Business Info ----
export const businessInfo = {
  name: "Brew Truck",
  tagline: "Sip | Bite | Repeat",
  subtitle: "Ranchi's favourite food truck • coffee, bites & good vibes",
  address:
    "Eastern Mall, Pantaloons, near Dangratoli Chowk, Ajit Enclave, New Barhi Toli, Ranchi, Jharkhand 834010",
  weeklyHours: [
    { day: "Sunday", hours: "10 am – 11 pm" },
    { day: "Monday", hours: "10 am – 10 pm" },
    { day: "Tuesday", hours: "10 am – 11 pm" },
    { day: "Wednesday", hours: "10 am – 11 pm" },
    { day: "Thursday", hours: "10 am – 11 pm" },
    { day: "Friday", hours: "10 am – 11 pm" },
    { day: "Saturday", hours: "10 am – 10:30 pm" },
  ],
  hoursNote: "Hours may vary • check our Instagram for daily updates!",
  googleMapsLink: "https://maps.app.goo.gl/MewRxeLJN4qABCNK7",
  googleMapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3662.5!2d85.33!3d23.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBrew+Truck!5e0!3m2!1sen!2sin!4v1",
  instagram: "https://www.instagram.com/brew_truck/",
  instagramHandle: "@brew_truck",
  services: [
    "Dine-in",
    "Takeaway",
    "Delivery",
    "Drive-through",
    "Kerbside Pickup",
  ],
  goodFor: ["Groups", "Kids", "Casual hangouts"],
};
