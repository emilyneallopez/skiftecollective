import type { Metadata } from "next";
import { FunBackground } from "@/components/fun-background";
import { Baloo_2, Nunito, Quicksand } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const baloo2 = Baloo_2({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
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
    <html lang="en" className={cn(baloo2.variable, nunito.variable, quicksand.variable)}>
      <body className="antialiased bg-background text-foreground font-body">
        <FunBackground />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
