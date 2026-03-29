import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Neighborhood Circles | Skifte Collective",
};

export default function CirclesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
