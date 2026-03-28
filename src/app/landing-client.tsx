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
  { emoji: "📸", step: "List", title: "Share what you&apos;ve outgrown", description: "Snap a photo. Add details. Post in seconds." },
  { emoji: "💛", step: "Match", title: "Find something you love", description: "Find something you love. Offer something you have." },
  { emoji: "🤝", step: "Swap", title: "Meet up and exchange", description: "Meet nearby. Exchange. Feel good about it." },
];

export function LandingPageClient() {
  return (
    <div className="min-h-screen bg-warm-white">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-cream pb-20 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-16">

          {/* Nav */}
          <div className="flex items-center justify-between mb-12 md:mb-16">
            <Link href="/">
              <Image src="/skifte-logo.png" alt="Skifte Collective" width={160} height={64} className="h-12 w-auto object-contain" />
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/auth">
                <Button variant="ghost" className="text-sm text-terracotta/80 hover:text-terracotta font-medium">Sign In</Button>
              </Link>
              <Link href="/auth?tab=signup">
                <Button className="bg-terracotta hover:bg-terracotta-600 text-white rounded-full px-6 text-sm font-medium">Join Free</Button>
              </Link>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left — copy */}
            <FadeIn direction="none" duration={0.8}>
              <div>
                <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold leading-tight text-ink mb-4">
                  Swap the things they outgrew.
                </h1>
                <p className="text-lg text-ink/60 max-w-lg mb-8 leading-relaxed">
                  A community for moms, in every neighborhood. Swap baby clothes, toys, and gear with families nearby — and build real connection while you&apos;re at it.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                  <Link href="/auth?tab=signup">
                    <Button size="lg" className="bg-terracotta hover:bg-terracotta-600 text-white rounded-full px-8 text-base gap-2 font-medium">
                      Join the collective <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/auth">
                    <Button size="lg" variant="outline" className="rounded-full px-8 text-base border-terracotta/30 text-terracotta hover:bg-cream-200 font-medium">
                      Sign in
                    </Button>
                  </Link>
                </div>
                {/* Trust badges */}
                <div className="flex gap-3 flex-wrap">
                  <motion.span
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="inline-flex items-center px-4 py-2 rounded-full bg-terracotta/10 text-terracotta text-sm font-medium border border-terracotta/20"
                  >
                    🌿 Free to join
                  </motion.span>
                  <motion.span
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                    className="inline-flex items-center px-4 py-2 rounded-full bg-forest/10 text-forest text-sm font-medium border border-forest/20"
                  >
                    ✨ Moms near you
                  </motion.span>
                </div>
              </div>
            </FadeIn>

            {/* Right — photo collage */}
            <FadeIn delay={0.3} direction="none" duration={0.8}>
              <div className="relative">
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
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-4 -left-2 bg-warm-white rounded-2xl shadow-lg px-4 py-3 border border-cream-200"
                >
                  <p className="text-xs font-medium text-terracotta">🌿 1,247 items swapped</p>
                </motion.div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Wave divider */}
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
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink mb-3">How Skifte Works</h2>
              <p className="text-ink/50 max-w-md mx-auto">Three steps. Zero waste. All the good vibes.</p>
            </div>
          </FadeInOnScroll>
          <StaggerOnScroll className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }}
                  transition={{ duration: 0.2 }}
                  className="bg-cream rounded-2xl p-8 text-center border border-cream-300"
                >
                  <span className="text-4xl mb-4 block">{step.emoji}</span>
                  <p className="text-xs font-semibold tracking-widest uppercase text-terracotta mb-2">Step {i + 1}</p>
                  <h3 className="font-heading text-xl font-bold mb-3 text-ink">{step.title}</h3>
                  <p className="text-sm text-ink/50 leading-relaxed">{step.description}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerOnScroll>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-20 md:py-28 bg-cream/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInOnScroll>
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink mb-2">Fresh Swaps Near You</h2>
                <p className="text-ink/50">See what&apos;s swapping in your neighborhood.</p>
              </div>
              <Link href="/auth">
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

      {/* Circles Teaser */}
      <section className="bg-terracotta py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInOnScroll>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4">Find your people.</h2>
            <p className="text-white/70 text-lg max-w-lg mx-auto mb-10">
              Join neighborhood circles and meet moms near you.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {["🌳 Local Moms", "🌿 Organic & Eco", "👶 New Mom Support", "🧸 Toy Swappers"].map((circle) => (
                <span key={circle} className="inline-flex items-center px-5 py-2.5 rounded-full bg-white/15 text-white text-sm font-medium">
                  {circle}
                </span>
              ))}
            </div>
            <Link href="/auth?tab=signup">
              <Button size="lg" className="bg-sunshine hover:bg-yellow-400 text-ink rounded-full px-8 text-base font-semibold">
                Explore circles
              </Button>
            </Link>
          </FadeInOnScroll>
        </div>
      </section>

      {/* First Year Guide Teaser */}
      <section className="bg-sunshine py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInOnScroll>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-ink mb-4">Know what to swap, when.</h2>
            <p className="text-ink/70 text-lg max-w-lg mx-auto mb-10">
              Our Baby Stage Guide tells you exactly what to let go of — and what to hold onto — at every age.
            </p>
            <Link href="/auth?tab=signup">
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
