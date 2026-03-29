"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, MapPin, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ItemCard from '@/components/items/item-card';
import { sampleListings, categoryLabels } from '@/lib/sample-data';

const sizeOptions: Record<string, string[]> = {
  baby_clothes: ['Newborn', '0-3M', '3-6M', '6-9M', '9-12M', '12-18M', '18-24M', '2T', '3T', '4T', '5T'],
  maternity_clothes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  toys: ['0-6M', '6-12M', '12M+', '2+', '3+', '4+', '5+'],
  books: ['0-1Y', '1-3Y', '3-5Y', '5+'],
  gear: ['0-6M', '6-12M', '12M+', '2+', '3+'],
  other: [],
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function BrowsePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || 'all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [userLocation, setUserLocation] = useState('');
  const [radiusMiles, setRadiusMiles] = useState(10);
  const [, setLocationFilterEnabled] = useState(false);
  const [detectingLocation, setDetectingLocation] = useState(false);

  const detectLocation = () => {
    if (!navigator.geolocation) return;
    setDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json`);
          const data = await res.json();
          const city = data.address?.city || data.address?.town || data.address?.village || data.address?.suburb || '';
          const state = data.address?.state_code || data.address?.state || '';
          const location = city && state ? `${city}, ${state}` : city || 'Near you';
          setUserLocation(location);
          setLocationFilterEnabled(true);
        } catch {
          setUserLocation('Near you');
          setLocationFilterEnabled(true);
        }
        setDetectingLocation(false);
      },
      () => setDetectingLocation(false)
    );
  };

  useEffect(() => {
    detectLocation();
  }, []);

  const allListings = [...sampleListings];
  const availableSizes = selectedCategory !== 'all' ? (sizeOptions[selectedCategory] || []) : [];

  const filtered = allListings.filter((item) => {
    const matchesSearch = !search || item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.brand?.toLowerCase().includes(search.toLowerCase()) ||
      item.size?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSize = selectedSize === 'all' || item.size?.toLowerCase().includes(selectedSize.toLowerCase());
    return matchesSearch && matchesCategory && matchesSize;
  });

  return (
    <div className="px-4 pt-12 pb-4 space-y-4">
      <div className="relative inline-block">
        <h1 className="text-3xl font-heading text-primary">Browse</h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.4, ease }}
          style={{ transformOrigin: 'left' }}
          className="h-[3px] bg-primary/30 rounded-full mt-1"
        />
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search items, brands, sizes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-2xl text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
        />
      </div>

      {/* Location Filter */}
      <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
            {detectingLocation ? (
              <span className="text-sm font-body text-muted-foreground">Finding your location...</span>
            ) : userLocation ? (
              <span className="text-sm font-body font-medium text-foreground">{userLocation}</span>
            ) : (
              <span className="text-sm font-body text-muted-foreground">Location not set</span>
            )}
          </div>
          <button
            onClick={detectLocation}
            className="flex items-center gap-1.5 text-xs font-body font-medium text-primary hover:text-primary/70 transition-colors"
          >
            <Navigation className="w-3.5 h-3.5" />
            {userLocation ? 'Update' : 'Use my location'}
          </button>
        </div>

        {/* Distance slider — always visible */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-body text-muted-foreground">Distance</span>
            <span className="text-xs font-heading text-primary">
              {radiusMiles >= 20 ? 'Any distance' : `Within ${radiusMiles} miles`}
            </span>
          </div>
          <input
            type="range"
            value={radiusMiles}
            onChange={(e) => setRadiusMiles(Number(e.target.value))}
            min={1}
            max={20}
            step={1}
            className="w-full h-2 rounded-full appearance-none bg-primary/20 accent-primary cursor-pointer"
            style={{ accentColor: '#C96A3A' }}
          />
          <div className="flex justify-between text-[10px] font-body text-muted-foreground">
            <span>1 mi</span>
            <span>5 mi</span>
            <span>10 mi</span>
            <span>20 mi</span>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-hide">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => { setSelectedCategory('all'); setSelectedSize('all'); }}
          className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-heading font-medium transition-all ${
            selectedCategory === 'all'
              ? 'bg-primary text-primary-foreground scale-105'
              : 'bg-card border border-border text-foreground'
          }`}
        >
          All
        </motion.button>
        {Object.entries(categoryLabels).map(([key, label]) => (
          <motion.button
            key={key}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { setSelectedCategory(key); setSelectedSize('all'); }}
            className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-heading font-medium transition-all ${
              selectedCategory === key
                ? 'bg-primary text-primary-foreground scale-105'
                : 'bg-card border border-border text-foreground'
            }`}
          >
            {label}
          </motion.button>
        ))}
      </div>

      {/* Size Filter */}
      {availableSizes.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-hide">
          <button
            onClick={() => setSelectedSize('all')}
            className={`flex-shrink-0 px-3 py-1 rounded-full text-[11px] font-body font-medium transition-colors ${
              selectedSize === 'all'
                ? 'bg-secondary text-secondary-foreground'
                : 'bg-card border border-border text-foreground'
            }`}
          >
            All Sizes
          </button>
          {availableSizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`flex-shrink-0 px-3 py-1 rounded-full text-[11px] font-body font-medium transition-colors ${
                selectedSize === size
                  ? 'bg-secondary text-secondary-foreground'
                  : 'bg-card border border-border text-foreground'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      )}

      {/* Results */}
      <p className="text-xs text-muted-foreground font-body">{filtered.length} items</p>
      <div className="grid grid-cols-2 gap-3 items-stretch">
        {filtered.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.5, ease }}
          >
            <ItemCard
              item={item}
              onPress={() => router.push(`/item/${item.id}`)}
            />
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#7A9E8A]/10 flex items-center justify-center"><span className="text-[#7A9E8A] font-heading text-xl">S</span></div>
          <h3 className="font-heading text-xl text-primary mb-2">Your neighborhood is just getting started.</h3>
          <p className="font-body text-sm text-foreground/50 mb-6">Be the first mom to list something — someone nearby will thank you.</p>
          <Link href="/list">
            <button className="bg-primary text-white rounded-full px-6 py-2.5 font-heading text-sm">Share something →</button>
          </Link>
        </motion.div>
      )}
    </div>
  );
}
