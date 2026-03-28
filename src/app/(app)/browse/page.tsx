"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ItemCard } from "@/components/item-card";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { FadeIn } from "@/components/motion/fade-in";
import { mockItems } from "@/lib/data/mock/items";
import { mockProfiles } from "@/lib/data/mock/profiles";
import { CATEGORIES, CONDITIONS, LISTING_TYPES } from "@/lib/constants";
import { type ItemCategory, type ItemCondition, type ListingType } from "@/lib/types";

const allItems = mockItems.map((item) => ({
  ...item,
  user: mockProfiles.find((p) => p.id === item.user_id),
}));

export default function BrowsePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<ItemCategory | "">("");
  const [condition, setCondition] = useState<ItemCondition | "">("");
  const [listingType, setListingType] = useState<ListingType | "">("");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let items = allItems;
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.brand.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q)
      );
    }
    if (category) items = items.filter((i) => i.category === category);
    if (condition) items = items.filter((i) => i.condition === condition);
    if (listingType) items = items.filter((i) => i.listing_type === listingType);
    return items;
  }, [search, category, condition, listingType]);

  const activeFilters = [category, condition, listingType].filter(Boolean).length;

  const clearFilters = () => {
    setCategory("");
    setCondition("");
    setListingType("");
    setSearch("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <FadeIn>
        <div className="mb-6">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-ink mb-2">
            Swaps near you
          </h1>
          <p className="text-muted-foreground">
            {filtered.length} items available in your neighborhood
          </p>
        </div>
      </FadeIn>

      {/* Category pills */}
      <FadeIn delay={0.05}>
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setCategory("")}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              !category
                ? "bg-terracotta text-white"
                : "bg-cream text-ink/70 hover:bg-cream-200"
            }`}
          >
            All
          </button>
          {[
            { value: "clothing" as ItemCategory, label: "Clothing", emoji: "👗" },
            { value: "toys" as ItemCategory, label: "Toys", emoji: "🧸" },
            { value: "gear" as ItemCategory, label: "Gear", emoji: "🍼" },
            { value: "books" as ItemCategory, label: "Books", emoji: "📚" },
          ].map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(category === cat.value ? "" : cat.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                category === cat.value
                  ? "bg-terracotta text-white"
                  : "bg-cream text-ink/70 hover:bg-cream-200"
              }`}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>
      </FadeIn>

      {/* Search + Filters */}
      <FadeIn delay={0.1}>
        <div className="mb-8 space-y-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search items, brands..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-11 rounded-full bg-cream border-cream-200"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className={`rounded-full gap-2 border-cream-300 ${showFilters ? "bg-cream" : ""}`}
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span className="hidden sm:inline">Filters</span>
              {activeFilters > 0 && (
                <Badge className="bg-terracotta text-white text-[10px] h-5 w-5 p-0 flex items-center justify-center rounded-full">
                  {activeFilters}
                </Badge>
              )}
            </Button>
          </div>

          {showFilters && (
            <div className="bg-cream rounded-xl p-4 space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block">
                  Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() =>
                        setCategory(category === cat.value ? "" : cat.value)
                      }
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        category === cat.value
                          ? "bg-terracotta text-white"
                          : "bg-white text-ink/70 hover:bg-white/80"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block">
                  Condition
                </label>
                <div className="flex flex-wrap gap-2">
                  {CONDITIONS.map((cond) => (
                    <button
                      key={cond.value}
                      onClick={() =>
                        setCondition(condition === cond.value ? "" : cond.value)
                      }
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        condition === cond.value
                          ? "bg-terracotta text-white"
                          : "bg-white text-ink/70 hover:bg-white/80"
                      }`}
                    >
                      {cond.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block">
                  Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {LISTING_TYPES.map((type) => (
                    <button
                      key={type.value}
                      onClick={() =>
                        setListingType(listingType === type.value ? "" : type.value)
                      }
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        listingType === type.value
                          ? "bg-terracotta text-white"
                          : "bg-white text-ink/70 hover:bg-white/80"
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {activeFilters > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-terracotta hover:underline"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>
      </FadeIn>

      {/* Items Grid */}
      {filtered.length > 0 ? (
        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((item) => (
            <StaggerItem key={item.id}>
              <ItemCard item={item} />
            </StaggerItem>
          ))}
        </StaggerChildren>
      ) : (
        <div className="text-center py-20">
          <p className="text-lg font-heading text-ink/50 mb-2">No items found</p>
          <p className="text-sm text-muted-foreground mb-6">
            Try adjusting your filters or search terms.
          </p>
          <Button
            onClick={clearFilters}
            variant="outline"
            className="rounded-full border-cream-300"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
