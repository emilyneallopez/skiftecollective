"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function OnboardingPage() {
  const router = useRouter();
  const supabase = createClient();
  const [displayName, setDisplayName] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("profiles").upsert({
          user_id: user.id,
          display_name: displayName || user.email?.split("@")[0],
          location: neighborhood || null,
          bio: bio.trim() || null,
          updated_at: new Date().toISOString(),
        }, { onConflict: "user_id" });
      }
    } catch (_) {
      // continue anyway
    } finally {
      setLoading(false);
      router.push("/browse");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF5EF] flex flex-col items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/skifte-icon.png" alt="Skifte Collective" className="h-16 w-16 rounded-2xl object-contain mx-auto mb-6" />
          <h1 className="font-heading text-3xl text-[#C96A3A] leading-tight mb-2">
            Tell us about yourself 🌿
          </h1>
          <p className="text-[#3B1F0E]/60 font-body text-base leading-relaxed">
            Tell us a little about yourself so other moms nearby can find you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-body text-sm font-semibold text-[#3B1F0E]/70 mb-2">
              What should we call you?
            </label>
            <input
              type="text"
              placeholder="Sarah, mama bear, whatever feels right"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-[#E5D5BD] rounded-2xl font-body text-sm text-[#3B1F0E] placeholder:text-[#3B1F0E]/30 focus:outline-none focus:ring-2 focus:ring-[#C96A3A]/30 focus:border-[#C96A3A]/40 transition-all"
            />
          </div>

          <div>
            <label className="block font-body text-sm font-semibold text-[#3B1F0E]/70 mb-2">
              What neighborhood are you in?
            </label>
            <input
              type="text"
              placeholder="e.g. Park Slope, Brooklyn or Wicker Park, Chicago"
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-[#E5D5BD] rounded-2xl font-body text-sm text-[#3B1F0E] placeholder:text-[#3B1F0E]/30 focus:outline-none focus:ring-2 focus:ring-[#C96A3A]/30 focus:border-[#C96A3A]/40 transition-all"
            />
            <p className="text-[11px] font-body text-[#3B1F0E]/40 mt-1.5 ml-1">
              This helps moms nearby find you. Only your neighborhood name is shown — never your address.
            </p>
          </div>

          {/* Bio */}
          <div>
            <label className="block font-body text-sm font-semibold text-[#3B1F0E]/70 mb-2">
              Bio (optional)
            </label>
            <textarea
              placeholder="A little about you and your family"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 bg-white border border-[#E5D5BD] rounded-2xl font-body text-sm text-[#3B1F0E] placeholder:text-[#3B1F0E]/30 focus:outline-none focus:ring-2 focus:ring-[#C96A3A]/30 focus:border-[#C96A3A]/40 transition-all resize-none"
            />
          </div>

          <div className="pt-2 space-y-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-[#C96A3A] hover:bg-[#A85530] text-white rounded-full font-heading text-base font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              {loading ? "One sec..." : <>Let&apos;s go! <ArrowRight className="h-4 w-4" /></>}
            </button>
            <button
              type="button"
              onClick={() => router.push("/browse")}
              className="w-full text-center text-sm font-body text-[#3B1F0E]/40 hover:text-[#3B1F0E]/70 transition-colors"
            >
              Skip for now →
            </button>
          </div>
        </form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-xs font-body text-[#3B1F0E]/30 mt-8"
        >
          🌿 A safe, real community for families everywhere
        </motion.p>
      </motion.div>
    </div>
  );
}
