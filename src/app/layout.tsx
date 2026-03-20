import type { Metadata } from "next";
import { Montserrat, DM_Sans, Caveat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
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
    icon: "/NationsLogositeicon.png",
    apple: "/NC Logo.png",
  },
  openGraph: {
    title: "Nations Coffee • Faith. Hope. Love. Peace.",
    description: "Ranchi's cozy specialty coffee house — freshly brewed coffee, cakes & good vibes.",
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
      className={`${montserrat.variable} ${dmSans.variable} ${caveat.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
