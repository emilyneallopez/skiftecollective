"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ItemCard } from "@/components/item-card";
import { FadeIn, FadeInOnScroll } from "@/components/motion/fade-in";
import { StaggerOnScroll, StaggerItem } from "@/components/motion/stagger-children";
import { SiteFooter } from "@/components/layout/site-footer";
import { mockItems } from "@/lib/data/mock/items";
import { mockProfiles } from "@/lib/data/mock/profiles";

const featuredItems = mockItems.slice(0, 6).map((item) => ({
  ...item,
  user: mockProfiles.find((p) => p.id === item.user_id),
}));

const steps = [
  {
    emoji: "📸",
    step: "List",
    title: "Share what they outgrew",
    description: "Snap a photo. Add details. Post in seconds.",
  },
  {
    emoji: "💛",
    step: "Match",
    title: "Find something you love",
    description: "Find something you love. Offer something you have.",
  },
  {
    emoji: "🤝",
    step: "Swap",
    title: "Meet up and exchange",
    description: "Meet nearby. Exchange. Feel good about it.",
  },
];

export function LandingPageClient() {
  return (
    <div className="min-h-screen bg-warm-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-cream bg-dots pb-20 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-16">
          {/* Top nav bar */}
          <div className="flex items-center justify-between mb-12 md:mb-16">
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" alt="Skifte Collective" width={180} height={72} className="h-14 w-auto object-contain" />
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/auth">
                <Button variant="ghost" className="text-sm text-terracotta/80 hover:text-terracotta font-medium">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth?tab=signup">
                <Button className="bg-terracotta hover:bg-terracotta-600 text-white rounded-full px-6 text-sm font-medium">
                  Join Free
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeIn direction="none" duration={0.8}>
              <div className="relative">
                {/* Big logo above headline */}
                <div className="mb-6">
                  <Image src="/logo.png" alt="Skifte Collective" width={400} height={160} className="h-24 md:h-32 w-auto object-contain" />
                </div>
                <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] text-ink mb-6">
                  Swap the{" "}
                  <span className="text-terracotta">things</span> they{" "}
                  <span className="text-forest">outgrew.</span>
                </h1>
                <p className="text-lg md:text-xl text-ink/60 max-w-lg mb-8 leading-relaxed">
                  A community for Brooklyn moms to swap, share, and simplify.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/auth?tab=signup">
                    <Button
                      size="lg"
                      className="bg-terracotta hover:bg-terracotta-600 text-white rounded-full px-8 text-base gap-2 font-medium"
                    >
                      Join the collective
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/auth">
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-full px-8 text-base border-ink/20 hover:bg-cream-200 font-medium"
                    >
                      Sign in
                    </Button>
                  </Link>
                </div>

                {/* Floating badges */}
                <div className="flex gap-3 mt-8">
                  <motion.span
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="inline-flex items-center px-4 py-2 rounded-full bg-terracotta text-white text-sm font-medium"
                  >
                    🌿 Free to join
                  </motion.span>
                  <motion.span
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="inline-flex items-center px-4 py-2 rounded-full bg-sky text-white text-sm font-medium"
                  >
                    ✨ 2,400+ moms
                  </motion.span>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.3} direction="none" duration={0.8}>
              <div className="relative">
                <div className="bg-sunshine rounded-3xl aspect-[4/3] flex items-center justify-center">
                  <p className="font-heading text-2xl md:text-3xl font-bold text-ink/80 text-center px-8">
                    Real swaps,<br />real moms
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Wavy SVG divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
            <path d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0V40Z" fill="#FEFCFA" />
          </svg>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-warm-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInOnScroll>
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink mb-4">
                How it works
              </h2>
              <p className="text-ink/60 max-w-md mx-auto">
                Three steps. Zero waste. All the good vibes.
              </p>
            </div>
          </FadeInOnScroll>

          <StaggerOnScroll className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-2xl p-8 text-center border border-cream-200"
                >
                  <span className="text-4xl mb-4 block">{step.emoji}</span>
                  <p className="text-xs font-semibold tracking-widest uppercase text-terracotta mb-2">
                    Step {i + 1}
                  </p>
                  <h3 className="font-heading text-xl font-bold mb-3 text-ink">{step.title}</h3>
                  <p className="text-sm text-ink/60 leading-relaxed">{step.description}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerOnScroll>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-20 md:py-28 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInOnScroll>
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink mb-2">
                  Fresh Swaps Near You
                </h2>
                <p className="text-ink/60">See what&apos;s swapping in your neighborhood.</p>
              </div>
              <Link href="/browse">
                <Button variant="ghost" className="text-terracotta hover:text-terracotta-600 gap-1">
                  View all <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </FadeInOnScroll>

          <StaggerOnScroll className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredItems.map((item) => (
              <StaggerItem key={item.id}>
                <ItemCard item={item} />
              </StaggerItem>
            ))}
          </StaggerOnScroll>
        </div>
      </section>

      {/* Community Circles Teaser */}
      <section className="bg-terracotta py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInOnScroll>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4">
              Find your people.
            </h2>
            <p className="text-white/70 text-lg max-w-lg mx-auto mb-10">
              Join neighborhood circles and meet moms near you.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {["🌳 Park Slope Moms", "🌉 DUMBO Families", "🏡 Brooklyn Heights Parents"].map((circle) => (
                <span key={circle} className="inline-flex items-center px-5 py-2.5 rounded-full bg-white/15 text-white text-sm font-medium">
                  {circle}
                </span>
              ))}
            </div>
            <Link href="/circles">
              <Button size="lg" className="bg-sunshine hover:bg-yellow-400 text-ink rounded-full px-8 text-base font-semibold">
                Explore circles
              </Button>
            </Link>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Baby Stage Guide Teaser */}
      <section className="bg-sunshine py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInOnScroll>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-ink mb-4">
              Know what to swap, when.
            </h2>
            <p className="text-ink/70 text-lg max-w-lg mx-auto mb-10">
              Our Baby Stage Guide tells you exactly what to let go of — and what to hold onto — at every age.
            </p>
            <Link href="/guide">
              <Button size="lg" className="bg-forest hover:bg-forest-600 text-white rounded-full px-8 text-base font-semibold gap-2">
                Open the guide <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </FadeInOnScroll>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
