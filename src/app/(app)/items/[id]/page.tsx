"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, MapPin, Star, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ItemCard } from "@/components/item-card";
import { SwapRequestModal } from "@/components/swap-request-modal";
import { FadeIn } from "@/components/motion/fade-in";
import { mockItems } from "@/lib/data/mock/items";
import { mockProfiles } from "@/lib/data/mock/profiles";
import { CONDITIONS, LISTING_TYPES } from "@/lib/constants";
import { getInitials } from "@/lib/utils";

export default function ItemDetailPage() {
  const params = useParams();
  const [currentImage, setCurrentImage] = useState(0);
  const [liked, setLiked] = useState(false);
  const [swapModalOpen, setSwapModalOpen] = useState(false);

  const item = mockItems.find((i) => i.id === params.id);
  if (!item) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-lg text-muted-foreground">Item not found.</p>
        <Link href="/browse">
          <Button variant="link" className="text-terracotta mt-4">
            Back to browse
          </Button>
        </Link>
      </div>
    );
  }

  const user = mockProfiles.find((p) => p.id === item.user_id)!;
  const condition = CONDITIONS.find((c) => c.value === item.condition);
  const listingType = LISTING_TYPES.find((l) => l.value === item.listing_type);
  const itemWithUser = { ...item, user };

  // Related items from same user or neighborhood
  const relatedItems = mockItems
    .filter((i) => i.id !== item.id && (i.user_id === item.user_id || i.neighborhood === item.neighborhood))
    .slice(0, 4)
    .map((i) => ({ ...i, user: mockProfiles.find((p) => p.id === i.user_id) }));

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % item.images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + item.images.length) % item.images.length);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <FadeIn>
        <Link
          href="/browse"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-terracotta transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to browse
        </Link>
      </FadeIn>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Carousel */}
        <FadeIn direction="left">
          <div className="relative">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-cream">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={item.images[currentImage]}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {item.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/80 backdrop-blur flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/80 backdrop-blur flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}

              <div className="absolute top-4 left-4 flex gap-2">
                {listingType && (
                  <Badge className={`${listingType.color} text-xs`}>
                    {listingType.label}
                  </Badge>
                )}
              </div>
            </div>

            {/* Thumbnail strip */}
            {item.images.length > 1 && (
              <div className="flex gap-2 mt-3">
                {item.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`relative h-16 w-16 rounded-lg overflow-hidden border-2 transition-all ${
                      i === currentImage
                        ? "border-terracotta"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${item.title} ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </FadeIn>

        {/* Item Info */}
        <FadeIn direction="right" delay={0.1}>
          <div>
            <div className="flex items-start justify-between gap-4 mb-4">
              <h1 className="font-heading text-2xl md:text-3xl font-bold text-ink leading-tight">
                {item.title}
              </h1>
              <motion.button
                whileTap={{ scale: 0.8 }}
                onClick={() => setLiked(!liked)}
                className="p-2 rounded-full hover:bg-cream transition-colors shrink-0"
              >
                <Heart
                  className={`h-6 w-6 transition-colors ${
                    liked
                      ? "fill-terracotta text-terracotta"
                      : "text-muted-foreground"
                  }`}
                />
              </motion.button>
            </div>

            {item.listing_type === "sell" && item.price && (
              <p className="text-2xl font-bold text-ink mb-4">${item.price}</p>
            )}

            <div className="flex flex-wrap gap-2 mb-6">
              {condition && (
                <Badge variant="secondary" className={condition.color}>
                  {condition.label}
                </Badge>
              )}
              <Badge variant="secondary" className="bg-cream-200 text-ink/70">
                {item.size}
              </Badge>
              <Badge variant="secondary" className="bg-cream-200 text-ink/70">
                {item.category}
              </Badge>
            </div>

            <p className="text-ink/70 leading-relaxed mb-6">{item.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Brand</p>
                <p className="text-sm font-medium">{item.brand}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Size</p>
                <p className="text-sm font-medium">{item.size}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Condition</p>
                <p className="text-sm font-medium">{condition?.label}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Category</p>
                <p className="text-sm font-medium capitalize">{item.category}</p>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Seller Card */}
            <Link
              href={`/profile/${user.id}`}
              className="flex items-center gap-4 p-4 rounded-xl bg-cream hover:bg-cream-200 transition-colors mb-6"
            >
              <Avatar className="h-12 w-12">
                <AvatarImage src={user.avatar_url} />
                <AvatarFallback className="bg-terracotta/10 text-terracotta">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium text-sm">{user.name}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {user.neighborhood}
                  </span>
                  <span>{user.swaps_completed} swaps</span>
                  <span className="flex items-center gap-0.5">
                    <Star className="h-3 w-3 fill-terracotta text-terracotta" />
                    {user.rating}
                  </span>
                </div>
              </div>
            </Link>

            {/* CTA */}
            {item.listing_type === "swap" && (
              <Button
                onClick={() => setSwapModalOpen(true)}
                className="w-full h-12 bg-terracotta hover:bg-terracotta-600 text-white rounded-full text-base"
              >
                Request Swap
              </Button>
            )}
            {item.listing_type === "free" && (
              <Button className="w-full h-12 bg-forest hover:bg-forest-600 text-white rounded-full text-base">
                Claim (Free)
              </Button>
            )}
            {item.listing_type === "sell" && (
              <Button className="w-full h-12 bg-ink hover:bg-ink/80 text-white rounded-full text-base">
                Buy for ${item.price}
              </Button>
            )}
          </div>
        </FadeIn>
      </div>

      {/* Related Items */}
      {relatedItems.length > 0 && (
        <div className="mt-16">
          <h2 className="font-heading text-xl font-semibold mb-6">
            More from this neighborhood
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedItems.map((relItem) => (
              <ItemCard key={relItem.id} item={relItem} />
            ))}
          </div>
        </div>
      )}

      <SwapRequestModal
        open={swapModalOpen}
        onOpenChange={setSwapModalOpen}
        item={itemWithUser}
      />
    </div>
  );
}
