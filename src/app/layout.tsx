import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cuistudio - All Your Recipes in One Place",
  description:
    "Turn TikToks, screenshots, and scattered links into your personal cookbook. AI-powered recipe extraction from any source.",
  keywords: [
    "recipe app",
    "recipe organizer",
    "TikTok recipes",
    "recipe extraction",
    "cookbook app",
    "AI recipe",
  ],
  authors: [{ name: "Cuistudio" }],
  openGraph: {
    title: "Cuistudio - All Your Recipes in One Place",
    description:
      "Turn TikToks, screenshots, and scattered links into your personal cookbook.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cuistudio - All Your Recipes in One Place",
    description:
      "Turn TikToks, screenshots, and scattered links into your personal cookbook.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased bg-surface text-text-body`}
      >
        {children}
      </body>
    </html>
  );
}
