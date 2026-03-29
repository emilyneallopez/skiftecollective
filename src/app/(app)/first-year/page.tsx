"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import Link from "next/link";

const stages = [
  {
    range: "0–3 months",
    name: "Newborn",
    bg: "#FAF5EF",
    border: "#C96A3A",
    accent: "#C96A3A",
    tag: "Swap fast",
    tagBg: "#C96A3A",
    get: ["Onesies in multiple sizes", "Swaddles", "Bassinet or co-sleeper", "Bouncer or swing", "Nursing pillow"],
    swap: ["Newborn clothes — they outgrow them in weeks", "The bouncer they hate", "Duplicate shower gifts"],
    tip: "Newborn sizing is basically a suggestion. Buy a few and borrow the rest — other moms have bins of this stuff waiting for a good home.",
  },
  {
    range: "3–6 months",
    name: "Early Baby",
    bg: "#F0F7F3",
    border: "#7A9E8A",
    accent: "#7A9E8A",
    tag: "Big growth spurt",
    tagBg: "#7A9E8A",
    get: ["Activity gym", "Soft rattles", "3-6M and 6M clothes", "Baby carrier"],
    swap: ["Swaddles they've outgrown", "Newborn gear", "The bouncer they finally outgrew"],
    tip: "You'll be amazed how fast they outgrow 3-6M. List it the moment it stops fitting — another mom nearby is probably looking for exactly this.",
  },
  {
    range: "6–9 months",
    name: "Sitter",
    bg: "#FEF9EF",
    border: "#F5C842",
    accent: "#D97706",
    tag: "Solids start",
    tagBg: "#F5C842",
    get: ["High chair", "Soft stacking toys", "Sippy cups to try", "9M clothes"],
    swap: ["The activity gym (they're over it)", "Smaller clothes", "Baby carrier if they want to face out now"],
    tip: "Solid foods mean you need a high chair NOW. The good news: high chairs last forever and swap beautifully.",
  },
  {
    range: "9–12 months",
    name: "Crawler",
    bg: "#FAF5EF",
    border: "#C96A3A",
    accent: "#C96A3A",
    tag: "Mobile!",
    tagBg: "#C96A3A",
    get: ["Baby gates", "Push walker", "Floor puzzles", "12M clothes and first shoes"],
    swap: ["Sitting toys they've moved past", "The bouncer (finally)", "Clothes they haven't worn"],
    tip: "Crawling means EVERYTHING is on the floor. This is the stage where Skifte really pays off — list fast, grab what you need.",
  },
  {
    range: "12–18 months",
    name: "Walker",
    bg: "#F0F7F3",
    border: "#7A9E8A",
    accent: "#7A9E8A",
    tag: "First shoes",
    tagBg: "#7A9E8A",
    get: ["Soft-sole shoes", "Ride-on toys", "Outdoor gear", "18M clothes"],
    swap: ["Pre-walking shoes", "Baby gear they've grown out of", "Duplicate toys"],
    tip: "First shoes are a huge milestone — and they'll outgrow them in 6 weeks. Skifte was made for this.",
  },
  {
    range: "18 months+",
    name: "Toddler",
    bg: "#FEF9EF",
    border: "#F5C842",
    accent: "#D97706",
    tag: "Opinions incoming",
    tagBg: "#F5C842",
    get: ["Books (so many books)", "Imaginative play sets", "Art supplies", "2T and up"],
    swap: ["All baby gear", "Clothes every 3-4 months", "Toys they've moved past"],
    tip: "Toddlers have opinions. They'll love something for two weeks and ignore it forever. Swap fast, swap often.",
  },
];

export default function FirstYearPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="bg-[#FAF5EF] px-4 pt-10 pb-6 border-b border-[#E5D5BD]">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-heading text-3xl text-[#C96A3A] mb-2"
        >
          The First Year Map
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="font-body text-sm text-[#8B6E5A] leading-relaxed"
        >
          A gentle guide to what you&apos;ll need, when to swap, and how to make the most of every stage.
        </motion.p>
      </div>

      <div className="px-4 pt-4 space-y-3">
        {stages.map((stage, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            style={{ backgroundColor: stage.bg, borderColor: stage.border }}
            className="rounded-2xl border overflow-hidden"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-4 py-4 text-left"
            >
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="font-heading text-lg" style={{ color: stage.accent }}>{stage.name}</p>
                  <span
                    className="text-[10px] font-body font-semibold px-2 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: stage.tagBg === "#F5C842" ? "#D97706" : stage.tagBg }}
                  >
                    {stage.tag}
                  </span>
                </div>
                <p className="font-body text-xs text-[#8B6E5A]">{stage.range}</p>
              </div>
              <motion.div
                animate={{ rotate: open === i ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="h-5 w-5" style={{ color: stage.accent }} />
              </motion.div>
            </button>

            <AnimatePresence>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-5 space-y-4 border-t" style={{ borderColor: stage.border + "30" }}>
                    <div className="pt-4">
                      <p className="font-heading text-sm text-[#7A9E8A] mb-2">What to get</p>
                      <ul className="space-y-1.5">
                        {stage.get.map((item, j) => (
                          <li key={j} className="font-body text-sm text-[#8B6E5A] flex items-start gap-2">
                            <span className="text-[#7A9E8A] mt-0.5 font-bold">+</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-heading text-sm text-[#C96A3A] mb-2">What to swap now</p>
                      <ul className="space-y-1.5">
                        {stage.swap.map((item, j) => (
                          <li key={j} className="font-body text-sm text-[#8B6E5A] flex items-start gap-2">
                            <ArrowRight className="w-3 h-3 text-[#C96A3A] mt-1 flex-shrink-0" /> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-white/70 rounded-xl p-4 border border-[#E5D5BD]">
                      <p className="font-heading text-xs text-[#C96A3A] mb-1">Skifte tip</p>
                      <p className="font-body text-sm text-[#8B6E5A] leading-relaxed italic">{stage.tip}</p>
                    </div>
                    <Link href="/browse">
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        className="w-full py-2.5 rounded-full text-sm font-heading text-white mt-1"
                        style={{ backgroundColor: stage.accent }}
                      >
                        Browse swaps for this stage
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <p className="font-body text-xs text-center text-[#8B6E5A]/40 mt-6 px-4 pb-4">
        Every baby is different. This is a guide, not a rulebook.
      </p>
    </div>
  );
}
