"use client";

export const dynamic = "force-dynamic";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function MyProfilePage() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        router.replace(`/profile/${user.id}`);
      } else {
        router.replace("/auth");
      }
    });
  }, [router, supabase]);

  return (
    <div className="min-h-screen bg-[#FAF5EF] flex items-center justify-center">
      <p className="font-body text-sm text-[#3B1F0E]/40">Loading your profile...</p>
    </div>
  );
}
