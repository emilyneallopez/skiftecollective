"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const stages = [
  {
    emoji: "🐣",
    range: "0–3 months",
    name: "Newborn",
    bg: "#FEF3C7",
    border: "#F59E0B",
    accent: "#D97706",
    get: ["Onesies (lots of them)", "Swaddles", "Bassinet or co-sleeper", "Bouncer or swing", "Nursing pillow"],
    swap: ["Newborn clothes (they'll outgrow them in weeks)", "The bouncer they hate", "Duplicate gear from the shower"],
    tip: "Newborn sizing is basically a suggestion. Buy a few and borrow the rest — other moms have bins of this stuff waiting for a good home.",
  },
  {
    emoji: "🌱",
    range: "3–6 months",
    name: "Early Baby",
    bg: "#D1FAE5",
    border: "#7A9E8A",
    accent: "#7A9E8A",
    get: ["Activity gym", "Soft rattles and sensory toys", "3-6M and 6M clothes", "Baby carrier"],
    swap: ["Swaddles they've outgrown", "Newborn gear", "That bouncer they finally outgrew"],
    tip: "You'll be amazed how fast they outgrow 3-6M. List it the moment it stops fitting — another mom nearby is probably looking for exactly this.",
  },
  {
    emoji: "🪑",
    range: "6–9 months",
    name: "Sitter",
    bg: "#FEE2E2",
    border: "#C96A3A",
    accent: "#C96A3A",
    get: ["High chair", "Soft blocks and stacking toys", "Sippy cups to try", "9M clothes"],
    swap: ["The activity gym (they're over it)", "Smaller clothes", "Baby carrier if they want to face out now"],
    tip: "Solid foods mean you need a high chair NOW and a lot of bibs. The good news: high chairs last forever and swap beautifully.",
  },
  {
    emoji: "🐛",
    range: "9–12 months",
    name: "Crawler",
    bg: "#EDE9FE",
    border: "#8B5CF6",
    accent: "#7C3AED",
    get: ["Baby gates (more than you think)", "Push walker", "Floor puzzles", "12M clothes and shoes"],
    swap: ["Sitting toys they've moved past", "The bouncer (finally)", "Clothes they haven't worn"],
    tip: "Crawling means EVERYTHING is on the floor. This is the stage where Skifte really pays off — list fast, grab what you need.",
  },
  {
    emoji: "👣",
    range: "12–18 months",
    name: "Walker",
    bg: "#DBEAFE",
    border: "#3B82F6",
    accent: "#2563EB",
    get: ["Real shoes (soft sole first)", "Ride-on toys", "Outdoor gear", "18M clothes"],
    swap: ["Pre-walking shoes", "Baby gear they've grown out of", "Duplicate toys"],
    tip: "First shoes are a huge milestone — and they'll outgrow them in 6 weeks. Skifte was made for this.",
  },
  {
    emoji: "🌟",
    range: "18 months+",
    name: "Toddler",
    bg: "#FCE7F3",
    border: "#EC4899",
    accent: "#DB2777",
    get: ["Books (so many books)", "Imaginative play sets", "Art supplies", "2T clothes and up"],
    swap: ["Baby gear (all of it)", "Clothes every 3-4 months", "Toys they've aged out of"],
    tip: "Toddlers have opinions. They'll love something for two weeks and ignore it forever. Swap fast, swap often.",
  },
];

export default function FirstYearPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="pb-24">
      {/* Colorful header */}
      <div className="bg-[#F5C842] px-4 pt-10 pb-8">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-heading text-3xl text-[#5C3D2E] mb-2"
        >
          The First Year Map
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="font-body text-sm text-[#5C3D2E]/70 leading-relaxed"
        >
          A gentle guide to what you&apos;ll need, when to swap, and how to make the most of every stage.
        </motion.p>
      </div>

      <div className="px-4 pt-4 space-y-3">
        {stages.map((stage, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            style={{ backgroundColor: stage.bg, borderColor: stage.border }}
            className="rounded-2xl border-2 overflow-hidden"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center gap-4 p-4 text-left"
            >
              <span className="text-3xl">{stage.emoji}</span>
              <div className="flex-1">
                <p className="font-heading text-lg" style={{ color: stage.accent }}>{stage.name}</p>
                <p className="font-body text-xs" style={{ color: stage.accent + "99" }}>{stage.range}</p>
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
                  <div className="px-4 pb-5 space-y-4 border-t-2" style={{ borderColor: stage.border + "40" }}>
                    <div className="pt-4">
                      <p className="font-heading text-sm mb-2" style={{ color: stage.accent }}>What to get</p>
                      <ul className="space-y-1.5">
                        {stage.get.map((item, j) => (
                          <li key={j} className="font-body text-sm flex items-start gap-2" style={{ color: stage.accent }}>
                            <span className="mt-0.5">•</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-heading text-sm mb-2 text-[#C96A3A]">What to swap now</p>
                      <ul className="space-y-1.5">
                        {stage.swap.map((item, j) => (
                          <li key={j} className="font-body text-sm flex items-start gap-2 text-[#C96A3A]">
                            <span className="mt-0.5">→</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-white/60 rounded-xl p-4">
                      <p className="font-heading text-xs mb-1" style={{ color: stage.accent }}>Skifte tip</p>
                      <p className="font-body text-sm leading-relaxed italic" style={{ color: stage.accent }}>{stage.tip}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <p className="font-body text-xs text-center text-[#8B6E5A]/50 mt-6 px-4">
        Every baby is different. This is a guide, not a rulebook.
      </p>
    </div>
  );
}
