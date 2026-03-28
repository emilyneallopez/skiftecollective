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

/* Hand-drawn wobbly underline SVG */
function WobblyUnderline() {
  return (
    <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
      <path d="M2 8 Q50 2 100 7 Q150 3 198 8" stroke="#C96A3A" strokeWidth="3" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

/* Hand-drawn oval highlight SVG */
function HandDrawnCircle() {
  return (
    <svg className="absolute -inset-x-3 -inset-y-1 w-[calc(100%+24px)] h-[calc(100%+8px)]" viewBox="0 0 200 60" fill="none" preserveAspectRatio="none">
      <ellipse cx="100" cy="30" rx="92" ry="24" stroke="#3A6349" strokeWidth="2.5" strokeLinecap="round" fill="none" strokeDasharray="4 6" opacity="0.6"/>
    </svg>
  );
}

/* Hand-drawn arrow pointing down-right to CTA */
function HandDrawnArrow() {
  return (
    <svg className="w-16 h-12 text-terracotta -ml-2 -mb-2" viewBox="0 0 80 50" fill="none">
      <path d="M5 8 Q20 5 35 15 Q50 25 65 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M58 14 L66 21 L56 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

/* Hand-drawn underline for section headings */
function SectionUnderline({ color = "#FEFCFA" }: { color?: string }) {
  return (
    <svg className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-48" viewBox="0 0 200 12" fill="none">
      <path d="M5 7 Q40 2 100 8 Q160 3 195 7" stroke={color} strokeWidth="3" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

/* Paper texture CSS for cream sections */
const paperTexture = {
  backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='noise'><feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='300' height='300' filter='url(%23noise)' opacity='0.03'/></svg>")`,
};

export function LandingPageClient() {
  return (
    <div className="min-h-screen bg-warm-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-cream bg-dots pb-20 md:pb-32" style={paperTexture}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-16">
          {/* Top nav bar */}
          <div className="flex items-center justify-between mb-12 md:mb-16">
            <Link href="/" className="flex items-center">
              <Image src="/skifte-logo.png" alt="Skifte Collective" width={180} height={72} className="h-14 w-auto object-contain" />
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
                {/* Decorative scattered elements */}
                <span className="absolute -top-4 right-12 text-terracotta/30 text-2xl select-none" aria-hidden="true">✦</span>
                <span className="absolute top-16 -right-4 text-forest/25 text-lg select-none" aria-hidden="true">✿</span>
                <span className="absolute -top-8 left-1/3 text-terracotta/20 text-sm select-none" aria-hidden="true">✦</span>
                <span className="absolute bottom-32 -left-6 text-forest/20 text-xl select-none" aria-hidden="true">✦</span>

                {/* Big logo above headline */}
                <div className="mb-6">
                  <Image src="/skifte-logo.png" alt="Skifte Collective" width={400} height={160} className="h-24 md:h-32 w-auto object-contain" />
                </div>
                <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] text-ink mb-6">
                  {/* Line 1: slightly smaller */}
                  <span className="block text-[0.85em]">Swap the</span>
                  {/* Line 2: BIGGEST — the "things" line */}
                  <span className="block text-[1.15em]">
                    <span className="relative inline-block text-terracotta">
                      things
                      <WobblyUnderline />
                    </span>{" "}
                    they
                  </span>
                  {/* Line 3: medium */}
                  <span className="block">
                    <span className="relative inline-block text-forest">
                      outgrew.
                      <HandDrawnCircle />
                    </span>
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-ink/60 max-w-lg mb-2 leading-relaxed">
                  A community for moms, in every neighborhood.
                </p>
                <p className="text-base text-ink/40 max-w-lg mb-6 leading-relaxed italic">
                  Swap, share, and simplify — together.
                </p>

                {/* Hand-drawn arrow to CTA */}
                <HandDrawnArrow />

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
                {/* Real photo collage */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-3">
                    <div className="rounded-2xl overflow-hidden aspect-square shadow-sm">
                      <Image src="/linen-bloomers.jpg" alt="Linen bloomers" width={300} height={300} className="w-full h-full object-cover" />
                    </div>
                    <div className="rounded-2xl overflow-hidden aspect-square shadow-sm">
                      <Image src="/wooden-toy.jpg" alt="Wooden toy" width={300} height={300} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="space-y-3 mt-6">
                    <div className="rounded-2xl overflow-hidden aspect-square shadow-sm">
                      <Image src="/onesie-bundle.jpg" alt="Onesie bundle" width={300} height={300} className="w-full h-full object-cover" />
                    </div>
                    <div className="rounded-2xl overflow-hidden aspect-square shadow-sm">
                      <Image src="/board-books.jpg" alt="Board books" width={300} height={300} className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
                {/* Floating trust badge */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-4 -left-2 bg-warm-white rounded-2xl shadow-lg px-4 py-3 border border-cream-200"
                >
                  <p className="text-xs font-medium text-terracotta">🌿 1,247 items swapped</p>
                </motion.div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Organic wavy SVG divider — hand-drawn feel */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
            <path d="M0 45C120 70 240 20 360 40C480 60 600 15 720 35C840 55 960 10 1080 38C1200 66 1320 25 1440 42V80H0V45Z" fill="#FEFCFA" />
          </svg>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-warm-white py-20 md:py-28" style={paperTexture}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInOnScroll>
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink mb-4">
                ✦ How it works ✦
              </h2>
              <p className="text-ink/60 max-w-md mx-auto">
                Three steps. Zero waste. All the good vibes.
              </p>
            </div>
          </FadeInOnScroll>

          <StaggerOnScroll className="grid md:grid-cols-3 gap-8 relative">
            {/* Hand-drawn dotted line connecting cards (desktop only) */}
            <svg className="hidden md:block absolute top-1/2 left-0 w-full -translate-y-1/2 pointer-events-none" viewBox="0 0 900 20" fill="none" preserveAspectRatio="none">
              <path d="M100 10 Q250 3 450 12 Q650 4 800 10" stroke="#C96A3A" strokeWidth="2" strokeLinecap="round" strokeDasharray="6 8" fill="none" opacity="0.3"/>
            </svg>
            {steps.map((step, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }}
                  transition={{ duration: 0.2 }}
                  className="bg-cream-50 rounded-2xl p-8 text-center border-2 border-cream-200 relative"
                  style={{
                    transform: i === 0 ? "rotate(-1deg)" : i === 2 ? "rotate(1deg)" : "none",
                    boxShadow: "2px 3px 0px #C96A3A40",
                  }}
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
      <section className="py-20 md:py-28 bg-cream-50" style={paperTexture}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInOnScroll>
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink mb-2">
                  🌿 Fresh Swaps Near You
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
      <section className="bg-terracotta py-20 md:py-28 relative overflow-hidden">
        {/* Organic top edge */}
        <div className="absolute top-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" className="w-full block -mt-px">
            <path d="M0 40V0C240 30 480 5 720 20C960 35 1200 8 1440 0V40H0Z" fill="#FEFCFA" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInOnScroll>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4 relative inline-block">
              Find your people.
              <SectionUnderline />
            </h2>
            <p className="text-white/70 text-lg max-w-lg mx-auto mb-10">
              Join neighborhood circles and meet moms near you.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {["🌳 Elm Street Moms", "🏡 Your Neighborhood Parents", "🌿 Riverside Families"].map((circle) => (
                <span
                  key={circle}
                  className="inline-flex items-center px-5 py-3 rounded-full bg-white/15 text-white text-sm font-medium border border-white/20"
                  style={{ boxShadow: "1px 2px 0px rgba(255,255,255,0.1)" }}
                >
                  <span className="text-lg mr-1.5">{circle.split(" ")[0]}</span>
                  {circle.split(" ").slice(1).join(" ")}
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

        {/* Organic bottom edge */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" className="w-full block -mb-px">
            <path d="M0 0V40C240 10 480 35 720 20C960 5 1200 32 1440 40V0H0Z" fill="#F5C842" />
          </svg>
        </div>
      </section>

      {/* Baby Stage Guide Teaser */}
      <section className="bg-sunshine py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInOnScroll>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-ink mb-4">
              🌿 Know what to swap, when.
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
