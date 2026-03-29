"use client";

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Camera, Handshake, Baby } from 'lucide-react';
import ItemCard from '@/components/items/item-card';
import { sampleListings, categoryLabels, categoryEmojis } from '@/lib/sample-data';
import Image from 'next/image';

const steps = [
  { icon: MapPin, title: 'Join Your Neighborhood', desc: 'Find moms nearby in the same season of life.' },
  { icon: Camera, title: 'Share What You\'ve Outgrown', desc: 'List baby clothes, toys, maternity, and gear.' },
  { icon: Handshake, title: 'Swap & Connect', desc: 'Coordinate porch pickups or meet at local events.' },
];

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="px-4 pt-10 pb-4 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Image src="/skifte-logo.png" alt="Skifte Collective" width={160} height={64} className="h-14 w-auto object-contain mb-3" />
        <p className="text-sm font-body text-primary mt-1">The neighborhood network for modern motherhood</p>
        <p className="text-xs font-body mt-2 max-w-sm text-foreground/60 leading-relaxed">
          Swap baby clothes, toys, and gear with moms nearby while building real community in your neighborhood.
        </p>
        <div className="flex gap-3 mt-4">
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={() => router.push('/circles')}
            className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-heading hover:opacity-90 transition-opacity"
          >
            Join your neighborhood
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={() => router.push('/browse')}
            className="px-5 py-2.5 rounded-full border border-primary text-primary text-sm font-heading hover:bg-primary/5 transition-colors"
          >
            Browse swaps
          </motion.button>
        </div>
      </motion.div>

      {/* How Skifte Works */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-2xl font-heading text-foreground mb-4">How Skifte Works</h2>
        <div className="relative flex flex-col gap-0">
          {steps.map((step, i) => (
            <div key={step.title} className="flex items-start gap-4 relative">
              {i < steps.length - 1 && (
                <div className="absolute left-[19px] top-12 w-[2px] h-[calc(100%-16px)] bg-border" />
              )}
              <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center">
                <step.icon className="w-4 h-4 text-primary" />
              </div>
              <div className="pb-6">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-body">Step {i + 1}</p>
                <h3 className="text-base font-heading text-foreground mt-0.5">{step.title}</h3>
                <p className="text-xs text-muted-foreground font-body mt-0.5 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* First Year Map CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-5 cursor-pointer hover:shadow-md transition-shadow border border-[#E5D5BD]"
        onClick={() => router.push('/first-year')}
        whileHover={{ y: -2 }}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Baby className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-heading text-foreground">The First Year Map</h2>
            <p className="text-xs text-muted-foreground font-body mt-0.5 leading-relaxed">
              A gentle guide to what you&apos;ll need, when to swap, and how to make the most of every stage.
            </p>
          </div>
          <motion.div animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <ArrowRight className="w-4 h-4 text-primary flex-shrink-0" />
          </motion.div>
        </div>
      </motion.div>

      {/* Categories */}
      <div>
        <h2 className="text-2xl font-heading text-foreground mb-3">Browse Categories</h2>
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {Object.entries(categoryLabels).map(([key, label], i) => (
            <motion.button
              key={key}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push(`/browse?category=${key}`)}
              className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full bg-card border border-border text-sm font-heading text-foreground hover:border-primary/40 transition-colors"
            >
              <span>{categoryEmojis[key]}</span>
              <span>{label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* New For You */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-2xl font-heading text-foreground">New For You</h2>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/browse')}
            className="flex items-center gap-1 text-xs font-body text-primary"
          >
            See all <ArrowRight className="w-3 h-3" />
          </motion.button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {sampleListings.slice(0, 4).map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.05 }}
            >
              <ItemCard item={item} onPress={() => router.push(`/items/${item.id}`)} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Impact */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-secondary/10 rounded-2xl p-5 text-center border border-[#E5D5BD]"
      >
        <Image src="/skifte-icon.png" alt="Skifte" width={48} height={48} className="w-12 h-12 mx-auto mb-2 object-contain" />
        <h3 className="font-heading text-foreground text-2xl">Our Collective Impact</h3>
        <p className="text-3xl font-heading text-secondary mt-1">1,247 items</p>
        <p className="text-sm font-body text-foreground/60 mt-1">passed from one family to another</p>
        <p className="text-xs text-muted-foreground font-body mt-1">2,494 lbs kept out of landfills</p>
      </motion.div>
    </div>
  );
}
