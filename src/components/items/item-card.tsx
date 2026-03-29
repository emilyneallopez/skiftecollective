"use client";

import { Heart, MapPin, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { categoryEmojis, conditionLabels } from '@/lib/sample-data';

interface ItemCardProps {
  item: {
    id: string;
    title: string;
    category: string;
    size?: string | null;
    brand?: string | null;
    condition: string;
    location?: string | null;
    image_urls?: string[] | null;
    profiles?: {
      display_name?: string | null;
      avatar_url?: string | null;
      is_verified?: boolean | null;
    };
  };
  onPress?: () => void;
  onFavorite?: () => void;
  isFavorited?: boolean;
}

const ItemCard = ({ item, onPress, onFavorite, isFavorited = false }: ItemCardProps) => {
  const hasImage = item.image_urls && item.image_urls.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -3, boxShadow: '0 8px 25px -5px rgba(201, 106, 58, 0.12)' }}
      onClick={onPress}
      className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border cursor-pointer group transition-colors"
    >
      {/* Image */}
      <div className="aspect-square bg-muted relative overflow-hidden">
        {hasImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.image_urls![0]}
            alt={item.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">
            {categoryEmojis[item.category] || '\u{1F4E6}'}
          </div>
        )}
        {/* Favorite button */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onFavorite?.();
          }}
          whileTap={{ scale: 1.3 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${isFavorited ? 'fill-primary text-primary' : 'text-foreground/50'}`}
          />
        </motion.button>
        {/* Condition badge */}
        <div className="absolute bottom-2 left-2">
          <span className="text-[10px] font-heading font-medium bg-card/80 backdrop-blur-sm px-2.5 py-1 rounded-full text-foreground">
            {conditionLabels[item.condition] || item.condition}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="font-heading font-medium text-[15px] text-foreground leading-tight line-clamp-1">
          {item.title}
        </h3>
        <div className="flex items-center gap-1 mt-1">
          {item.size && (
            <span className="text-[11px] text-foreground/50">Size {item.size}</span>
          )}
          {item.size && item.brand && (
            <span className="text-foreground/50 text-[11px]">&middot;</span>
          )}
          {item.brand && (
            <span className="text-[11px] text-foreground/50">{item.brand}</span>
          )}
        </div>
        {item.profiles && (
          <div className="flex items-center gap-1 mt-1.5">
            <div className="w-4 h-4 rounded-full bg-accent flex items-center justify-center text-[8px] font-medium text-accent-foreground">
              {item.profiles.display_name?.charAt(0) || '?'}
            </div>
            <span className="text-[11px] text-foreground/50">{item.profiles.display_name}</span>
            {item.profiles.is_verified && (
              <CheckCircle2 className="w-3 h-3 text-secondary" />
            )}
          </div>
        )}
        {item.location && (
          <div className="flex items-center gap-0.5 mt-1">
            <MapPin className="w-3 h-3 text-foreground/50" />
            <span className="text-[10px] text-foreground/50">{item.location}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ItemCard;
