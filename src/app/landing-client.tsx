"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, FadeInOnScroll } from "@/components/motion/fade-in";
import { StaggerOnScroll, StaggerItem } from "@/components/motion/stagger-children";
import { mockItems } from "@/lib/data/mock/items";
import { mockProfiles } from "@/lib/data/mock/profiles";
import { ItemCard } from "@/components/item-card";

const featuredItems = mockItems.slice(0, 6).map((item) => ({
  ...item,
  user: mockProfiles.find((p) => p.id === item.user_id),
}));

const steps = [
  { title: "Share what you've outgrown", description: "Snap a photo. Add details. Post in seconds." },
  { title: "Find something you love", description: "Find something you love. Offer something you have." },
  { title: "Meet up and exchange", description: "Meet nearby. Exchange. Feel good about it." },
];

export function LandingPageClient() {
  return (
    <div className="min-h-screen bg-[#FAF5EF]">

      {/* Hero */}
      <section className="relative overflow-hidden pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-6 md:pt-12">

          {/* Nav */}
          <div className="flex items-center justify-between mb-10 md:mb-16">
            <Link href="/">
              <Image src="/skifte-logo.png" alt="Skifte Collective" width={140} height={48} className="h-12 w-auto object-contain" />
            </Link>
            <div className="flex items-center gap-2">
              <Link href="/auth">
                <Button variant="ghost" className="text-sm font-body text-[#C96A3A]/80 hover:text-[#C96A3A] rounded-full">Sign In</Button>
              </Link>
              <Link href="/auth?tab=signup">
                <Button className="bg-[#C96A3A] hover:bg-[#A85530] text-[#FEFCFA] rounded-full px-5 text-sm font-heading">Join Free</Button>
              </Link>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left */}
            <FadeIn direction="none" duration={0.7}>
              <div>
                <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl leading-[1.1] text-[#3B1F0E] mb-4">
                  Swap the things they outgrew.
                </h1>
                <p className="font-body text-lg text-[#3B1F0E]/70 max-w-md mb-2 leading-relaxed">
                  The neighborhood network for modern motherhood.
                </p>
                <p className="font-body text-base text-[#3B1F0E]/55 max-w-md mb-8 leading-relaxed">
                  Swap baby clothes, toys, and gear with moms nearby while building real community in your neighborhood.
                </p>
                <div className="flex flex-wrap gap-3 mb-6">
                  <Link href="/auth?tab=signup">
                    <Button size="lg" className="bg-[#C96A3A] hover:bg-[#A85530] text-[#FEFCFA] rounded-full px-7 text-base font-heading gap-2">
                      Join the neighborhood <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/auth">
                    <Button size="lg" variant="outline" className="rounded-full px-7 text-base font-body border-[#C96A3A]/30 text-[#C96A3A] hover:bg-[#C96A3A]/5">
                      Sign in
                    </Button>
                  </Link>
                </div>

                {/* Floating trust pills */}
                <div className="flex gap-3 flex-wrap">
                  <motion.span
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="inline-flex items-center px-4 py-2 rounded-full bg-[#C96A3A]/10 text-[#C96A3A] text-sm font-body font-semibold border border-[#C96A3A]/20"
                  >
                    Free to join
                  </motion.span>
                  <motion.span
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
                    className="inline-flex items-center px-4 py-2 rounded-full bg-[#3A6349]/10 text-[#3A6349] text-sm font-body font-semibold border border-[#3A6349]/20"
                  >
                    2,400+ moms
                  </motion.span>
                </div>
              </div>
            </FadeIn>

            {/* Right -- 2x2 photo grid with offset */}
            <FadeIn delay={0.25} direction="none" duration={0.7}>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-3">
                  <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} className="rounded-2xl overflow-hidden aspect-square shadow-md">
                    <Image src="/linen-bloomers.jpg" alt="Linen bloomers" width={300} height={300} className="w-full h-full object-cover" />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} className="rounded-2xl overflow-hidden aspect-square shadow-md">
                    <Image src="/wooden-toy.jpg" alt="Wooden toy" width={300} height={300} className="w-full h-full object-cover" />
                  </motion.div>
                </div>
                <div className="space-y-3 mt-8">
                  <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} className="rounded-2xl overflow-hidden aspect-square shadow-md">
                    <Image src="/onesie-bundle.jpg" alt="Onesie bundle" width={300} height={300} className="w-full h-full object-cover" />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} className="rounded-2xl overflow-hidden aspect-square shadow-md">
                    <Image src="/board-books.jpg" alt="Board books" width={300} height={300} className="w-full h-full object-cover" />
                  </motion.div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Items swapped badge BELOW the grid */}
          <FadeIn delay={0.5} direction="none">
            <div className="mt-8 flex justify-center">
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex items-center gap-2 bg-[#FEFCFA] rounded-2xl shadow-md px-5 py-3 border border-[#E5D5BD]"
              >
                <span className="text-sm font-body font-semibold text-[#3A6349]">1,247 items swapped so far</span>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-[#FEFCFA] py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <FadeInOnScroll>
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl text-[#3B1F0E] mb-3">How it works</h2>
              <p className="font-body text-[#3B1F0E]/50 max-w-sm mx-auto">Three steps. Zero waste. All the good vibes.</p>
            </div>
          </FadeInOnScroll>
          <StaggerOnScroll className="grid md:grid-cols-3 gap-6">
            {steps.map((step, i) => {
              const rotations = [-1, 0, 1];
              return (
                <StaggerItem key={i}>
                  <motion.div
                    whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(0,0,0,0.08)" }}
                    style={{ rotate: rotations[i] }}
                    className="bg-[#FAF5EF] rounded-2xl p-7 text-center border border-[#E5D5BD] shadow-sm"
                  >
                    <p className="text-[11px] font-heading tracking-widest uppercase text-[#C96A3A] mb-2">Step {i + 1}</p>
                    <h3 className="font-heading text-lg mb-2 text-[#3B1F0E]">{step.title}</h3>
                    <p className="text-sm font-body text-[#3B1F0E]/50 leading-relaxed">{step.description}</p>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerOnScroll>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-16 md:py-24 bg-[#FAF5EF]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <FadeInOnScroll>
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="font-heading text-3xl text-[#3B1F0E] mb-1">Fresh Swaps Near You</h2>
                <p className="font-body text-[#3B1F0E]/50">See what&apos;s swapping in your neighborhood.</p>
              </div>
              <Link href="/auth">
                <Button variant="ghost" className="text-[#C96A3A] gap-1 font-body rounded-full">
                  View all <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </FadeInOnScroll>
          <StaggerOnScroll className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {featuredItems.map((item) => (
              <StaggerItem key={item.id}>
                <ItemCard item={item} />
              </StaggerItem>
            ))}
          </StaggerOnScroll>
        </div>
      </section>

      {/* Circles */}
      <section className="bg-[#C96A3A] py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <FadeInOnScroll>
            <h2 className="font-heading text-3xl md:text-5xl text-[#FEFCFA] mb-4">Find your people.</h2>
            <p className="font-body text-[#FEFCFA]/75 text-lg max-w-md mx-auto mb-10">
              Join neighborhood circles and meet moms near you.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {["Local Moms", "Organic & Eco", "New Mom Support", "Toy Swappers"].map((c) => (
                <span key={c} className="inline-flex items-center px-5 py-2.5 rounded-full bg-[#FEFCFA]/20 text-[#FEFCFA] text-sm font-body font-semibold">
                  {c}
                </span>
              ))}
            </div>
            <Link href="/auth?tab=signup">
              <Button size="lg" className="bg-[#F5C842] hover:bg-yellow-400 text-[#3B1F0E] rounded-full px-8 font-heading text-base">
                Explore circles
              </Button>
            </Link>
          </FadeInOnScroll>
        </div>
      </section>

      {/* First Year Map */}
      <section className="bg-[#F5C842] py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <FadeInOnScroll>
            <h2 className="font-heading text-3xl md:text-5xl text-[#3B1F0E] mb-4">Know what to swap, when.</h2>
            <p className="font-body text-[#3B1F0E]/70 text-lg max-w-md mx-auto mb-10">
              Our First Year Map tells you exactly what to let go of — and what to hold onto — at every stage.
            </p>
            <Link href="/auth?tab=signup">
              <Button size="lg" className="bg-[#3A6349] hover:bg-[#2E4F3A] text-[#FEFCFA] rounded-full px-8 font-heading text-base gap-2">
                Open the map <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#FAF5EF] border-t border-[#E5D5BD]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
              <Link href="/">
                <Image src="/skifte-logo.png" alt="Skifte Collective" width={120} height={48} className="h-16 w-auto object-contain" />
              </Link>
              <p className="mt-2 font-body text-sm text-[#3B1F0E]/50">The neighborhood network for modern motherhood.</p>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-2 md:justify-end">
              <Link href="/browse" className="font-body text-sm text-[#3B1F0E]/60 hover:text-[#C96A3A] transition-colors">Browse</Link>
              <Link href="/circles" className="font-body text-sm text-[#3B1F0E]/60 hover:text-[#C96A3A] transition-colors">Circles</Link>
              <Link href="/first-year" className="font-body text-sm text-[#3B1F0E]/60 hover:text-[#C96A3A] transition-colors">First Year Map</Link>
              <Link href="/trust" className="font-body text-sm text-[#3B1F0E]/60 hover:text-[#C96A3A] transition-colors">Trust & Safety</Link>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-[#E5D5BD]">
            <p className="font-body text-xs text-[#3B1F0E]/40 italic">
              Made with love for moms everywhere.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
