"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const stages = [
  {
    range: "0-3 months",
    name: "Newborn",
    get: ["Onesies (lots of them)", "Swaddles", "Bassinet or co-sleeper", "Bouncer or swing", "Nursing pillow"],
    swap: ["Newborn clothes (they'll outgrow them in weeks)", "The bouncer they hate", "Duplicate gear you got at the shower"],
    tip: "Newborn sizing is basically a suggestion. Buy a few and borrow the rest — other moms have bins of this stuff waiting for a good home.",
  },
  {
    range: "3-6 months",
    name: "Early Baby",
    get: ["Activity gym", "Soft rattles and sensory toys", "3-6M and 6M clothes (stock up)", "Baby carrier"],
    swap: ["Swaddles they've outgrown", "Newborn gear", "That bouncer they finally outgrew too"],
    tip: "You'll be amazed how fast they outgrow 3-6M. List it the moment it stops fitting — another mom nearby is probably looking for exactly this.",
  },
  {
    range: "6-9 months",
    name: "Sitter",
    get: ["High chair", "Soft blocks and stacking toys", "Sippy cups to try", "9M clothes"],
    swap: ["The activity gym (they're over it)", "Smaller clothes", "Baby carrier if they prefer riding facing out now"],
    tip: "Solid foods mean you need a high chair NOW and a lot of bibs. The good news: high chairs last forever and swap beautifully.",
  },
  {
    range: "9-12 months",
    name: "Crawler",
    get: ["Baby gates (more than you think)", "Push walker", "Floor puzzles", "12M clothes and shoes"],
    swap: ["Sitting toys they've moved past", "The bouncer (finally)", "Clothes they haven't worn"],
    tip: "Crawling means EVERYTHING is on the floor. This is the stage where Skifte really pays off — list fast, grab what you need.",
  },
  {
    range: "12-18 months",
    name: "Walker",
    get: ["Real shoes (soft sole first)", "Ride-on toys", "Outdoor gear", "18M clothes"],
    swap: ["Pre-walking shoes", "Baby gear they've grown out of", "Duplicate toys"],
    tip: "First shoes are a huge milestone — and they'll outgrow them in 6 weeks. Skifte was made for this. List them the moment they're too small.",
  },
  {
    range: "18 months+",
    name: "Toddler",
    get: ["Books (so many books)", "Imaginative play sets", "Art supplies", "2T clothes and up"],
    swap: ["Baby gear (all of it)", "Clothes every 3-4 months", "Toys they've aged out of"],
    tip: "Toddlers have opinions. They'll love something for two weeks and ignore it forever. Swap fast, swap often — and grab what other toddlers are done with.",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function FirstYearPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="px-4 pt-8 pb-24 max-w-lg mx-auto">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        className="mb-8 text-center"
      >
        <h1 className="font-heading text-3xl text-[#5C3D2E] mb-2">The First Year Map</h1>
        <p className="font-body text-sm text-[#5C3D2E]/60 leading-relaxed">
          A gentle guide to what you&apos;ll need, when to swap, and how to make the most of every stage. From someone who&apos;s been there.
        </p>
      </motion.div>

      {/* Stages */}
      <div className="space-y-3">
        {stages.map((stage, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.5, ease }}
            className="bg-[#FEFCFA] rounded-2xl border border-[#E5D5BD] overflow-hidden"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center gap-4 p-5 text-left"
            >
              <div className="flex-1">
                <p className="font-heading text-lg text-[#5C3D2E]">{stage.name}</p>
                <p className="font-body text-xs text-[#5C3D2E]/50">{stage.range}</p>
              </div>
              <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="h-5 w-5 text-[#C96A3A]/60" />
              </motion.div>
            </button>

            <AnimatePresence>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 space-y-4 border-t border-[#E5D5BD]">
                    <div className="pt-4">
                      <p className="font-heading text-sm text-[#7A9E8A] mb-2">What to get</p>
                      <ul className="space-y-1">
                        {stage.get.map((item, j) => (
                          <li key={j} className="font-body text-sm text-[#5C3D2E]/70 flex items-start gap-2">
                            <span className="text-[#7A9E8A] mt-0.5">&#x2022;</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-heading text-sm text-[#C96A3A] mb-2">What to swap now</p>
                      <ul className="space-y-1">
                        {stage.swap.map((item, j) => (
                          <li key={j} className="font-body text-sm text-[#5C3D2E]/70 flex items-start gap-2">
                            <span className="text-[#C96A3A] mt-0.5">&rarr;</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-[#FAF5EF] rounded-2xl p-4 border-l-4 border-[#C96A3A]">
                      <p className="font-heading text-xs text-[#C96A3A] mb-1">Skifte tip</p>
                      <p className="font-body text-sm text-[#5C3D2E]/70 leading-relaxed italic">{stage.tip}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center"
      >
        <p className="font-body text-sm text-[#5C3D2E]/40">
          Every baby is different. This is a guide, not a rulebook.
        </p>
      </motion.div>
    </div>
  );
}
