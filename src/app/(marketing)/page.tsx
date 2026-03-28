"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, RefreshCw, Heart, Users, Sparkles, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ItemCard } from "@/components/item-card";
import { FadeIn, FadeInOnScroll } from "@/components/motion/fade-in";
import { StaggerOnScroll, StaggerItem } from "@/components/motion/stagger-children";
import { mockItems } from "@/lib/data/mock/items";
import { mockProfiles } from "@/lib/data/mock/profiles";
import { mockCircles } from "@/lib/data/mock/circles";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { SiteFooter } from "@/components/layout/site-footer";

const featuredItems = mockItems.slice(0, 6).map((item) => ({
  ...item,
  user: mockProfiles.find((p) => p.id === item.user_id),
}));

const steps = [
  {
    icon: Sparkles,
    title: "List Your Items",
    description: "Snap a photo, add a few details, and your item is live. Takes 60 seconds.",
  },
  {
    icon: RefreshCw,
    title: "Match & Connect",
    description: "Browse items from moms nearby. Found something you love? Request a swap.",
  },
  {
    icon: Heart,
    title: "Swap & Share",
    description: "Meet up locally, make the exchange, and give great stuff a second life.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-warm-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 md:pt-16 md:pb-24">
          {/* Top nav bar */}
          <div className="flex items-center justify-between mb-16 md:mb-24">
            <Link href="/" className="flex items-center">
              <span className="font-heading text-2xl font-bold">
                <span className="text-terracotta">S</span>
                <span className="text-forest">k</span>
                <span className="text-terracotta-600">i</span>
                <span className="text-forest-600">f</span>
                <span className="text-terracotta">t</span>
                <span className="text-forest">e</span>
              </span>
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/auth">
                <Button variant="ghost" className="text-sm text-ink/70 hover:text-terracotta">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth?tab=signup">
                <Button className="bg-terracotta hover:bg-terracotta-600 text-white rounded-full px-6 text-sm">
                  Join Free
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeIn direction="none" duration={0.8}>
              <div>
                <p className="text-sm font-medium text-forest tracking-wide uppercase mb-4">
                  The Neighborhood Network for Modern Motherhood
                </p>
                <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] text-ink mb-6">
                  Everything good{" "}
                  <span className="text-terracotta">deserves</span>{" "}
                  a second life
                </h1>
                <p className="text-lg text-ink/60 max-w-lg mb-8 leading-relaxed">
                  Swap, gift, and share baby clothes, toys, and essentials with moms
                  in your neighborhood. Because community is the best parenting hack.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/auth?tab=signup">
                    <Button
                      size="lg"
                      className="bg-terracotta hover:bg-terracotta-600 text-white rounded-full px-8 text-base gap-2"
                    >
                      Join the Collective
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/browse">
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-full px-8 text-base border-cream-300 hover:bg-cream"
                    >
                      Browse Items
                    </Button>
                  </Link>
                </div>

                {/* Social proof */}
                <div className="mt-10 flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {mockProfiles.slice(0, 5).map((profile) => (
                      <Avatar key={profile.id} className="h-8 w-8 border-2 border-white">
                        <AvatarImage src={profile.avatar_url} />
                        <AvatarFallback className="text-[10px] bg-cream">
                          {getInitials(profile.name)}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <p className="text-sm text-ink/50">
                    <span className="font-semibold text-ink/70">500+</span> Brooklyn moms swapping
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.3} direction="none" duration={0.8}>
              <div className="relative">
                <div className="grid grid-cols-2 gap-3">
                  {featuredItems.slice(0, 4).map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className={`relative rounded-xl overflow-hidden ${
                        i === 0 ? "row-span-2 aspect-[3/4]" : "aspect-square"
                      }`}
                    >
                      <Image
                        src={item.images[0]}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-white text-xs font-medium truncate">
                          {item.title}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-cream py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInOnScroll>
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink mb-4">
                How it works
              </h2>
              <p className="text-ink/60 max-w-md mx-auto">
                Three simple steps to give your baby items a beautiful second chapter.
              </p>
            </div>
          </FadeInOnScroll>

          <StaggerOnScroll className="grid md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, i) => (
              <StaggerItem key={i}>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-terracotta/10 mb-6">
                    <step.icon className="h-6 w-6 text-terracotta" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-sm text-ink/60 leading-relaxed">{step.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerOnScroll>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInOnScroll>
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink mb-2">
                  Just listed
                </h2>
                <p className="text-ink/60">Fresh finds from your neighborhood.</p>
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

      {/* Circles Teaser */}
      <section className="bg-forest py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInOnScroll>
            <div className="text-center mb-12">
              <Users className="h-8 w-8 text-white/60 mx-auto mb-4" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                Find your circle
              </h2>
              <p className="text-white/60 max-w-md mx-auto">
                Join neighborhood groups of moms who swap regularly, share tips, and build real friendships.
              </p>
            </div>
          </FadeInOnScroll>

          <StaggerOnScroll className="grid md:grid-cols-3 gap-6">
            {mockCircles.slice(0, 3).map((circle) => (
              <StaggerItem key={circle.id}>
                <Link href="/circles" className="block">
                  <div className="bg-white/10 backdrop-blur rounded-xl p-6 hover:bg-white/15 transition-colors">
                    <div className="relative h-32 rounded-lg overflow-hidden mb-4">
                      <Image
                        src={circle.cover_image}
                        alt={circle.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-white mb-1">
                      {circle.name}
                    </h3>
                    <p className="text-sm text-white/50 mb-3 line-clamp-2">
                      {circle.description}
                    </p>
                    <p className="text-xs text-white/40">
                      {circle.member_count} members
                    </p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerOnScroll>

          <FadeInOnScroll>
            <div className="text-center mt-10">
              <Link href="/circles">
                <Button
                  variant="outline"
                  className="rounded-full px-8 border-white/30 text-white hover:bg-white/10 hover:text-white"
                >
                  Explore All Circles
                </Button>
              </Link>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Baby Stage Guide Teaser */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeInOnScroll direction="left">
              <div>
                <BookOpen className="h-8 w-8 text-terracotta mb-4" />
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink mb-4">
                  The Baby Stage Guide
                </h2>
                <p className="text-ink/60 mb-6 leading-relaxed">
                  Not sure what to swap, keep, or let go? Our stage-by-stage guide helps you make smart
                  decisions about baby gear at every milestone — from newborn to school age.
                </p>
                <Link href="/guide">
                  <Button className="bg-terracotta hover:bg-terracotta-600 text-white rounded-full px-8 gap-2">
                    Read the Guide
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </FadeInOnScroll>

            <FadeInOnScroll direction="right">
              <div className="grid grid-cols-2 gap-3">
                {["Newborn 0–3m", "Infant 3–12m", "Toddler 1–3y", "Big Kid 3–6y"].map(
                  (stage, i) => (
                    <div
                      key={stage}
                      className={`rounded-xl p-5 ${
                        i % 2 === 0
                          ? "bg-cream"
                          : "bg-terracotta/5"
                      }`}
                    >
                      <p className="font-heading text-lg font-semibold text-ink mb-1">
                        {stage.split(" ")[0]}
                      </p>
                      <p className="text-xs text-ink/50">{stage.split(" ").slice(1).join(" ")}</p>
                    </div>
                  )
                )}
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInOnScroll>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink mb-4">
              Ready to join the collective?
            </h2>
            <p className="text-ink/60 mb-8 max-w-md mx-auto">
              Sign up free in 30 seconds. Start browsing, listing, and connecting with moms in your neighborhood today.
            </p>
            <Link href="/auth?tab=signup">
              <Button
                size="lg"
                className="bg-terracotta hover:bg-terracotta-600 text-white rounded-full px-10 text-base gap-2"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </FadeInOnScroll>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
