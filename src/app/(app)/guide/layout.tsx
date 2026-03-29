import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Baby Stage Guide | Skifte Collective",
};

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return children;
}
