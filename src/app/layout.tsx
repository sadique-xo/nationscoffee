import type { Metadata } from "next";
import { Audiowide, Inter, DM_Sans, Caveat } from "next/font/google";
import "./globals.css";

const audiowide = Audiowide({
  variable: "--font-audiowide",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Brew Truck • Sip | Bite | Repeat",
  description:
    "Ranchi's favourite food truck • coffee, bites & good vibes. 50+ menu items, amazing coffee, and street food that hits different.",
  keywords: ["Brew Truck", "Ranchi", "food truck", "cafe", "coffee", "street food"],
  icons: {
    icon: "/Brew_logo.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Brew Truck • Sip | Bite | Repeat",
    description: "Ranchi's favourite food truck • coffee, bites & good vibes.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${audiowide.variable} ${inter.variable} ${dmSans.variable} ${caveat.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
