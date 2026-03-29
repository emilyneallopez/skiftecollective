import type { Metadata } from "next";
import { FunBackground } from "@/components/fun-background";
import { Lilita_One, Gaegu } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const lilitaOne = Lilita_One({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400"],
  display: "swap",
});

const gaegu = Gaegu({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "700"],
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
    <html lang="en" className={cn(lilitaOne.variable, gaegu.variable)}>
      <body className="antialiased bg-background text-foreground font-body">
        <FunBackground />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
