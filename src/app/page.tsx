"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
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

const ease = [0.22, 1, 0.36, 1] as const;

function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const interval = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(interval);
  }, [target, duration]);
  return <>{count.toLocaleString()}</>;
}

export default function Home() {
  const router = useRouter();

  return (
    <div className="px-4 pt-12 pb-4 space-y-8 max-w-lg mx-auto">
      {/* Header */}
      <div>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="text-2xl font-heading mt-1 text-primary"
        >
          The neighborhood network for modern motherhood
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
          className="text-xs font-body mt-2 max-w-sm text-foreground/70"
        >
          Swap baby clothes, toys, and gear with moms nearby while building real community in your neighborhood.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex gap-3 mt-4"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            onClick={() => router.push('/community')}
            className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-heading font-medium hover:opacity-90 transition-opacity"
          >
            Join your neighborhood
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            onClick={() => router.push('/browse')}
            className="px-5 py-2.5 rounded-full border border-primary text-primary text-sm font-heading font-medium hover:bg-primary/5 transition-colors"
          >
            Browse swaps
          </motion.button>
        </motion.div>

        {/* Trust badges */}
        <div className="flex flex-wrap gap-2 mt-4">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-heading border border-primary/20"
          >
            2,400+ moms swapping
          </motion.div>
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-xs font-heading border border-secondary/20"
          >
            Trusted & verified
          </motion.div>
        </div>
      </div>

      {/* How Skifte Works */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease }}
      >
        <h2 className="text-3xl font-heading text-foreground mb-4">How Skifte Works</h2>
        <div className="relative flex flex-col gap-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, ease }}
              className="flex items-start gap-4 relative"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.2, duration: 0.4 }}
                  style={{ transformOrigin: 'top' }}
                  className="absolute left-[19px] top-12 w-[2px] h-[calc(100%-16px)] bg-border"
                />
              )}
              {/* Step circle */}
              <motion.div
                whileInView={{ scale: [0.8, 1.1, 1] }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center"
              >
                <step.icon className="w-4 h-4 text-primary" />
              </motion.div>
              {/* Content */}
              <div className="pb-6">
                <p className="text-[10px] uppercase tracking-widest text-foreground/50 font-body">Step {i + 1}</p>
                <h3 className="text-sm font-heading text-foreground mt-0.5">{step.title}</h3>
                <p className="text-xs text-foreground/50 font-body mt-0.5">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Why Skifte Exists */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease }}
        className="bg-card rounded-2xl p-5 border border-border"
      >
        <h2 className="text-3xl font-heading text-foreground mb-2">Why Skifte Exists</h2>
        <p className="text-xs text-foreground/50 font-body mb-4">Helping moms share more, waste less, and build real community.</p>
        <div className="grid grid-cols-3 gap-3 text-center">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, ease }}
              whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.08)" }}
              className="flex flex-col items-center gap-1.5 p-2 rounded-xl transition-shadow"
            >
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                <pillar.icon className="w-4 h-4 text-secondary" />
              </div>
              <h3 className="text-xs font-heading text-foreground">{pillar.title}</h3>
              <p className="text-[10px] leading-tight text-foreground/50 font-body">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* First Year Map CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease }}
        whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.08)" }}
        className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-5 cursor-pointer transition-shadow"
        onClick={() => router.push('/first-year')}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Baby className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-heading text-foreground">The First Year Map</h2>
            <p className="text-xs text-foreground/50 font-body mt-0.5">
              A gentle roadmap of what you&apos;ll need, when babies outgrow things, and how swapping helps.
            </p>
          </div>
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowRight className="w-4 h-4 text-primary flex-shrink-0" />
          </motion.div>
        </div>
      </motion.div>

      {/* Categories */}
      <div>
        <h2 className="text-3xl font-heading text-foreground mb-4">Browse Categories</h2>
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {Object.entries(categoryLabels).map(([key, label], i) => (
            <motion.button
              key={key}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => router.push(`/browse?category=${key}`)}
              className="flex-shrink-0 flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-card border border-border text-sm font-heading text-foreground hover:border-primary/40 transition-colors"
            >
              <span className="text-lg">{categoryEmojis[key]}</span>
              <span>{label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* New For You */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-3xl font-heading text-foreground">New For You</h2>
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
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.05 } },
          }}
        >
          {sampleListings.slice(0, 4).map((item) => (
            <motion.div
              key={item.id}
              variants={{
                hidden: { opacity: 0, y: 16 },
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
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease }}
        className="bg-secondary/10 rounded-2xl p-5 text-center"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/skifte-icon.png" alt="Skifte" className="w-12 h-12 mx-auto mb-2" />
        <h3 className="font-heading text-foreground text-3xl">Our Collective Impact</h3>
        <motion.p
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="text-4xl font-heading text-primary mt-2"
        >
          <AnimatedCounter target={1247} />
        </motion.p>
        <p className="text-sm font-heading text-foreground/70 mt-1">items passed from one family to another</p>
        <p className="text-xs text-foreground/50 font-body mt-2">
          2,494 lbs kept out of landfills
        </p>
      </motion.div>
    </div>
  );
}
