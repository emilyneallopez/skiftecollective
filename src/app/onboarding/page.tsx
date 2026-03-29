"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const ease = [0.22, 1, 0.36, 1] as const;

export default function OnboardingPage() {
  const router = useRouter();
  const supabase = createClient();
  const [displayName, setDisplayName] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [children, setChildren] = useState<string[]>([]);
  const [customAge, setCustomAge] = useState("");
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
          updated_at: new Date().toISOString(),
        }, { onConflict: "user_id" });
      }
    } catch {
      // continue anyway
    } finally {
      setLoading(false);
      router.push("/home");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF5EF] flex flex-col items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/skifte-logo.png" alt="Skifte Collective" className="h-16 w-auto object-contain mx-auto mb-6" />

          <h1 className="font-heading text-3xl text-[#C96A3A] leading-tight mb-2">
            We&apos;re so glad you&apos;re here.
          </h1>
          <p className="text-[#3B1F0E]/60 font-body text-base leading-relaxed">
            Tell us a little about yourself so other moms nearby can find you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease }}
          >
            <label className="block font-body text-sm font-semibold text-[#3B1F0E]/70 mb-2">
              What should we call you?
            </label>
            <input
              type="text"
              placeholder="Sarah, mama bear, whatever feels right"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-4 py-3 bg-[#FEFCFA] border border-[#E5D5BD] rounded-2xl font-body text-sm text-[#3B1F0E] placeholder:text-[#3B1F0E]/30 focus:outline-none focus:ring-2 focus:ring-[#C96A3A]/30 focus:border-[#C96A3A]/40 transition-all"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease }}
          >
            <label className="block font-body text-sm font-semibold text-[#3B1F0E]/70 mb-2">
              What neighborhood are you in?
            </label>
            <input
              type="text"
              placeholder="e.g. Park Slope, Brooklyn or Wicker Park, Chicago"
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              className="w-full px-4 py-3 bg-[#FEFCFA] border border-[#E5D5BD] rounded-2xl font-body text-sm text-[#3B1F0E] placeholder:text-[#3B1F0E]/30 focus:outline-none focus:ring-2 focus:ring-[#C96A3A]/30 focus:border-[#C96A3A]/40 transition-all"
            />
            <p className="text-[11px] font-body text-[#3B1F0E]/40 mt-1.5 ml-1">
              Only your neighborhood name is shown — never your address.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease }}
            className="pt-2 space-y-3"
          >
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full h-12 bg-[#C96A3A] text-[#FEFCFA] rounded-full font-heading text-base flex items-center justify-center gap-2"
            >
              {loading ? "One sec..." : <>Join the neighborhood <ArrowRight className="h-4 w-4" /></>}
            </motion.button>
            <button
              type="button"
              onClick={() => router.push("/home")}
              className="w-full text-center text-sm font-body text-[#3B1F0E]/40 hover:text-[#3B1F0E]/70 transition-colors"
            >
              Skip for now
            </button>
          </motion.div>
        </form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-xs font-body text-[#3B1F0E]/30 mt-8"
        >
          A safe, real community for families everywhere
        </motion.p>
      </motion.div>
    </div>
  );
}
