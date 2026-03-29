"use client";

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Camera, Handshake, Heart, DollarSign, Recycle, Baby } from 'lucide-react';
import ItemCard from '@/components/items/item-card';
import { sampleListings, categoryLabels, categoryEmojis } from '@/lib/sample-data';

const steps = [
  { icon: MapPin, title: 'Join Your Neighborhood', desc: 'Find moms nearby in the same season of life.' },
  { icon: Camera, title: 'Share What You\'ve Outgrown', desc: 'List baby clothes, toys, maternity, and gear.' },
  { icon: Handshake, title: 'Swap & Connect', desc: 'Coordinate porch pickups or meet at local events.' },
];

const pillars = [
  { icon: Heart, title: 'Community', desc: 'Meet moms nearby through swaps, circles, and real-life connection.' },
  { icon: DollarSign, title: 'Affordability', desc: 'Kids outgrow everything. Find what you need without starting from scratch.' },
  { icon: Recycle, title: 'Sustainability', desc: 'Keep high-quality items in use, locally.' },
];

export default function Home() {
  const router = useRouter();

  return (
    <div className="px-4 pt-12 pb-4 space-y-8 max-w-lg mx-auto">
      {/* Header */}
      <div>
        <p className="text-base font-display mt-1 text-primary">The neighborhood network for modern motherhood</p>
        <p className="text-xs font-body mt-2 max-w-sm text-foreground/70">
          Swap baby clothes, toys, and gear with moms nearby while building real community in your neighborhood.
        </p>
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => router.push('/community')}
            className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-heading font-medium hover:opacity-90 transition-opacity"
          >
            Join your neighborhood
          </button>
          <button
            onClick={() => router.push('/browse')}
            className="px-5 py-2.5 rounded-full border border-primary text-primary text-sm font-heading font-medium hover:bg-primary/5 transition-colors"
          >
            Browse swaps
          </button>
        </div>
      </div>

      {/* How Skifte Works */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-lg font-heading text-foreground mb-4">✨ How Skifte Works</h2>
        <div className="relative flex flex-col gap-0">
          {steps.map((step, i) => (
            <div key={step.title} className="flex items-start gap-4 relative">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="absolute left-[19px] top-12 w-[2px] h-[calc(100%-16px)] bg-border" />
              )}
              {/* Step circle */}
              <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <step.icon className="w-4 h-4 text-primary" />
              </div>
              {/* Content */}
              <div className="pb-6">
                <p className="text-[10px] uppercase tracking-widest text-foreground/50 font-body">Step {i + 1}</p>
                <h3 className="text-sm font-heading text-foreground mt-0.5">{step.title}</h3>
                <p className="text-xs text-foreground/50 font-body mt-0.5">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Why Skifte Exists */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-card rounded-2xl p-5 border border-border"
      >
        <h2 className="text-lg font-heading text-foreground mb-1">💛 Why Skifte Exists</h2>
        <p className="text-xs text-foreground/50 font-body mb-4">Helping moms share more, waste less, and build real community.</p>
        <div className="grid grid-cols-3 gap-3 text-center">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="flex flex-col items-center gap-1.5">
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                <pillar.icon className="w-4 h-4 text-secondary" />
              </div>
              <h3 className="text-xs font-heading text-foreground">{pillar.title}</h3>
              <p className="text-[10px] leading-tight text-foreground/50 font-body">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* First Year Map CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-5 cursor-pointer hover:shadow-md transition-shadow"
        onClick={() => router.push('/first-year')}

      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Baby className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-base font-heading text-foreground">👶 The First Year Map</h2>
            <p className="text-xs text-foreground/50 font-body mt-0.5">
              A gentle roadmap of what you&apos;ll need, when babies outgrow things, and how swapping helps.
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-primary flex-shrink-0" />
        </div>
      </motion.div>

      {/* Categories */}
      <div>
        <h2 className="text-lg font-heading text-foreground mb-3">🌿 Browse Categories</h2>
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => router.push(`/browse?category=${key}`)}
              className="flex-shrink-0 flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-card border border-border text-sm font-heading text-foreground hover:border-primary/40 transition-colors"
            >
              <span className="text-lg">{categoryEmojis[key]}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* New For You */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-heading text-foreground">🆕 New For You</h2>
          <button
            onClick={() => router.push('/browse')}
            className="flex items-center gap-1 text-xs font-heading text-primary"
          >
            See all <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <motion.div
          className="grid grid-cols-2 gap-3"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.05 } },
          }}
        >
          {sampleListings.slice(0, 4).map((item) => (
            <motion.div
              key={item.id}
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <ItemCard
                item={item}
                onPress={() => router.push(`/item/${item.id}`)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Eco Impact */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-secondary/10 rounded-2xl p-5 text-center"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/skifte-icon.png" alt="Skifte" className="w-12 h-12 mx-auto mb-2" />
        <h3 className="font-heading text-foreground text-lg">Our Collective Impact</h3>
        <p className="text-4xl font-display text-primary mt-2">1,247</p>
        <p className="text-sm font-heading text-foreground/70 mt-1">items passed from one family to another</p>
        <p className="text-xs text-foreground/50 font-body mt-2">
          2,494 lbs kept out of landfills
        </p>
      </motion.div>
    </div>
  );
}
