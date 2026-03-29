"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, MapPin } from 'lucide-react';
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

export default function BrowsePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || 'all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [userLocation, setUserLocation] = useState('');
  const [radiusMiles, setRadiusMiles] = useState(20);
  const [locationFilterEnabled, setLocationFilterEnabled] = useState(false);

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
      <h1 className="text-2xl font-heading text-foreground">Browse</h1>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search items, brands, sizes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      {/* Location Filter */}
      <div className="bg-card border border-border rounded-xl p-3 space-y-2.5">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
          <input
            type="text"
            placeholder="Your location (e.g. Austin, TX)"
            value={userLocation}
            onChange={(e) => {
              setUserLocation(e.target.value);
              setLocationFilterEnabled(!!e.target.value.trim());
            }}
            className="flex-1 text-sm font-body text-foreground bg-transparent placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
        {locationFilterEnabled && userLocation && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground font-body">Distance</span>
              <span className="text-[11px] font-medium text-primary font-body">
                {radiusMiles >= 20 ? 'Any distance' : `Within ${radiusMiles} mi`}
              </span>
            </div>
            <input
              type="range"
              value={radiusMiles}
              onChange={(e) => setRadiusMiles(Number(e.target.value))}
              min={1}
              max={20}
              step={1}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground font-body">
              <span>1 mi</span>
              <span>20 mi</span>
            </div>
          </div>
        )}
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-hide">
        <button
          onClick={() => { setSelectedCategory('all'); setSelectedSize('all'); }}
          className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-body font-medium transition-colors ${
            selectedCategory === 'all'
              ? 'bg-primary text-primary-foreground'
              : 'bg-card border border-border text-foreground'
          }`}
        >
          All
        </button>
        {Object.entries(categoryLabels).map(([key, label]) => (
          <button
            key={key}
            onClick={() => { setSelectedCategory(key); setSelectedSize('all'); }}
            className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-body font-medium transition-colors ${
              selectedCategory === key
                ? 'bg-primary text-primary-foreground'
                : 'bg-card border border-border text-foreground'
            }`}
          >
            {label}
          </button>
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
      <div className="grid grid-cols-2 gap-3">
        {filtered.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onPress={() => router.push(`/item/${item.id}`)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 space-y-3">
          <p className="text-5xl">🌿</p>
          <h3 className="text-lg font-heading text-foreground">Nothing here yet</h3>
          <p className="text-sm font-body text-foreground/50">Be the first to list something in your neighborhood.</p>
          <button
            onClick={() => router.push('/list')}
            className="inline-flex items-center gap-1.5 mt-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-heading font-medium"
          >
            List an item →
          </button>
        </div>
      )}
    </div>
  );
}
