"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { type Item } from "@/lib/types";
import { CONDITIONS, LISTING_TYPES } from "@/lib/constants";
import { getInitials } from "@/lib/utils";
import { useState } from "react";

interface ItemCardProps {
  item: Item;
  index?: number;
}

export function ItemCard({ item }: ItemCardProps) {
  const [liked, setLiked] = useState(false);
  const condition = CONDITIONS.find((c) => c.value === item.condition);
  const listingType = LISTING_TYPES.find((l) => l.value === item.listing_type);

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }}
      transition={{ duration: 0.2 }}
      className="group relative bg-white rounded-xl overflow-hidden border border-cream-200"
    >
      <Link href={`/items/${item.id}`}>
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={item.images[0]}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            {listingType && (
              <Badge className={`${listingType.color} text-xs font-medium`}>
                {listingType.label}
              </Badge>
            )}
          </div>
          <div className="absolute top-3 right-3 flex gap-2">
            {condition && (
              <Badge variant="secondary" className={`${condition.color} text-xs`}>
                {condition.label}
              </Badge>
            )}
          </div>
          {item.listing_type === "sell" && item.price && (
            <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2.5 py-1 text-sm font-semibold text-ink">
              ${item.price}
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/items/${item.id}`}>
          <h3 className="font-medium text-ink text-sm leading-snug line-clamp-2 mb-2 group-hover:text-terracotta transition-colors">
            {item.title}
          </h3>
        </Link>
        <p className="text-xs text-muted-foreground mb-3">
          {item.size} · {item.brand}
        </p>
        <div className="flex items-center justify-between">
          <Link
            href={`/profile/${item.user_id}`}
            className="flex items-center gap-2 group/user"
          >
            <Avatar className="h-6 w-6">
              <AvatarImage src={item.user?.avatar_url} />
              <AvatarFallback className="text-[10px] bg-cream">
                {item.user ? getInitials(item.user.name) : "?"}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground group-hover/user:text-terracotta transition-colors">
              {item.user?.name}
            </span>
          </Link>
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={(e) => {
              e.preventDefault();
              setLiked(!liked);
            }}
            className="p-1.5 rounded-full hover:bg-cream transition-colors"
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                liked ? "fill-terracotta text-terracotta" : "text-muted-foreground"
              }`}
            />
          </motion.button>
        </div>
        <p className="text-[11px] text-muted-foreground mt-2">{item.neighborhood}</p>
      </div>
    </motion.div>
  );
}
