import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Skifte Collective — The Neighborhood Network for Modern Motherhood",
  description:
    "A community-driven platform for moms to swap, gift, and share baby clothes, toys, and essentials. Because everything good deserves a second life.",
  openGraph: {
    title: "Skifte Collective",
    description: "The Neighborhood Network for Modern Motherhood",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(playfair.variable, inter.variable)}>
      <body className="antialiased font-body bg-warm-white text-ink">
        {children}
      </body>
    </html>
  );
}
