import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileNav } from "@/components/layout/mobile-nav";
import { PwaControls } from "@/components/pwa-controls";
import { StoreHydration } from "@/components/shop/store-hydration";
import "@/styles/globals.css";
import "@/styles/storefront.css";

const inter = localFont({ src: "../fonts/inter-latin.woff2", variable: "--font-inter", display: "swap", weight: "100 900" });
const playfair = localFont({ src: "../fonts/playfair-latin.woff2", variable: "--font-playfair", display: "swap", weight: "400 900" });

export const metadata: Metadata = {
  applicationName: "Deoluxe",
  title: { default: "Deoluxe — Wear the statement", template: "%s | Deoluxe" },
  description: "Nigerian luxury with a streetwear edge. Discover statement caps, graphic tees and signature Deoluxe sets.",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "Deoluxe" },
  icons: { icon: "/icons/icon-192.png", apple: "/icons/apple-touch-icon.png" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: "#650a09", width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
    <body><a href="#main" className="skip-link">Skip to content</a><StoreHydration /><Header /><main id="main">{children}</main><Footer /><MobileNav /><PwaControls /></body>
  </html>;
}
