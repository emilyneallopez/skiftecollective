import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "List an Item | Skifte Collective",
};

export default function ListLayout({ children }: { children: React.ReactNode }) {
  return children;
}
