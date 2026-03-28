import BottomNav from "@/components/layout/bottom-nav";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 max-w-lg mx-auto w-full pb-20">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
