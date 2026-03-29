"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Camera, Handshake, Baby } from "lucide-react";
import { ItemCard } from "@/components/item-card";
import { mockItems } from "@/lib/data/mock/items";
import { mockProfiles } from "@/lib/data/mock/profiles";
import { CATEGORIES } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const ease = [0.22, 1, 0.36, 1] as const;

const steps = [
  { icon: MapPin, title: "Join Your Neighborhood", desc: "Find moms nearby in the same season of life." },
  { icon: Camera, title: "Share What You've Outgrown", desc: "List baby clothes, toys, maternity, and gear." },
  { icon: Handshake, title: "Swap & Connect", desc: "Coordinate porch pickups or meet at local events." },
];

const sampleItems = mockItems.slice(0, 4).map((item) => ({
  ...item,
  user: mockProfiles.find((p) => p.id === item.user_id),
}));

export default function HomePage() {
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div className="px-4 pt-8 pb-4 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
      >
        {/* Logo — same size as auth page */}
        <div className="flex justify-center mb-4">
          <Image src="/skifte-logo.png" alt="Skifte Collective" width={280} height={112} className="h-24 w-auto object-contain" />
        </div>
        <p className="font-body text-base text-[#C96A3A] text-center mb-1">The neighborhood network for modern motherhood</p>
        <p className="font-body text-sm text-foreground/60 text-center leading-relaxed mb-4">
          Swap baby clothes, toys, and gear with moms nearby while building real community in your neighborhood.
        </p>

        <div className="flex gap-3 mt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push("/circles")}
            className="px-5 py-2.5 rounded-full bg-[#C96A3A] text-[#FEFCFA] text-sm font-heading hover:bg-[#A85530] transition-colors"
          >
            Join your neighborhood
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push("/browse")}
            className="px-5 py-2.5 rounded-full border border-[#C96A3A] text-[#C96A3A] text-sm font-heading hover:bg-[#C96A3A]/5 transition-colors"
          >
            Browse swaps
          </motion.button>
        </div>
      </motion.div>

      {/* How Skifte Works */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, ease }}
      >
        <h2 className="text-2xl font-heading text-[#7A9E8A] mb-4">How Skifte Works</h2>
        <div className="relative flex flex-col gap-0">
          {steps.map((step, i) => (
            <div key={step.title} className="flex items-start gap-4 relative">
              {i < steps.length - 1 && (
                <div className="absolute left-[19px] top-12 w-[2px] h-[calc(100%-16px)] bg-[#E5D5BD]" />
              )}
              <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 bg-[#7A9E8A]/15 border-[#7A9E8A]/30">
                <step.icon className="w-4 h-4 text-[#7A9E8A]" />
              </div>
              <div className="pb-6">
                <p className="text-[10px] uppercase tracking-widest text-[#5C3D2E]/40 font-body">Step {i + 1}</p>
                <h3 className="text-base font-heading text-[#5C3D2E] mt-0.5">{step.title}</h3>
                <p className="text-xs text-[#5C3D2E]/50 font-body mt-0.5 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* First Year Map CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, ease }}
        whileHover={{ y: -2 }}
        className="bg-gradient-to-r from-[#C96A3A]/10 to-[#7A9E8A]/10 rounded-2xl p-5 cursor-pointer hover:shadow-md transition-shadow border border-[#E5D5BD]"
        onClick={() => router.push("/first-year")}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#C96A3A]/10 flex items-center justify-center flex-shrink-0">
            <Baby className="w-6 h-6 text-[#C96A3A]" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-heading text-[#5C3D2E]">The First Year Map</h2>
            <p className="text-xs text-[#5C3D2E]/50 font-body mt-0.5 leading-relaxed">
              A gentle guide to what you&apos;ll need, when to swap, and how to make the most of every stage.
            </p>
          </div>
          <motion.div animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <ArrowRight className="w-4 h-4 text-[#C96A3A] flex-shrink-0" />
          </motion.div>
        </div>
      </motion.div>

      {/* Browse Categories */}
      <div>
        <h2 className="text-2xl font-heading text-[#7A9E8A] mb-3">Browse Categories</h2>
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat.value}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push(`/browse?category=${cat.value}`)}
              className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FEFCFA] border border-[#E5D5BD] text-sm font-heading text-[#5C3D2E] hover:border-[#C96A3A]/40 transition-colors"
            >
              {cat.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* New For You */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-2xl font-heading text-[#7A9E8A]">New For You</h2>
          <Link href="/browse" className="flex items-center gap-1 text-xs font-body text-[#C96A3A]">
            See all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 items-stretch">
          {sampleItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.05, ease }}
            >
              <ItemCard item={item} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Collective Impact */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-[#7A9E8A]/10 rounded-2xl p-5 text-center border border-[#E5D5BD]"
      >
        <Image src="/skifte-icon.png" alt="Skifte" width={48} height={48} className="w-12 h-12 mx-auto mb-2 object-contain rounded-2xl" />
        <h3 className="font-heading text-[#5C3D2E] text-2xl">Our Collective Impact</h3>
        <p className="text-3xl font-heading text-[#7A9E8A] mt-1">1,247 items</p>
        <p className="text-sm font-body text-[#5C3D2E]/60 mt-1">passed from one family to another</p>
      </motion.div>
    </div>
  );
}
