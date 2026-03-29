"use client";

import { useState, useEffect } from 'react';
import { Heart, MapPin, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { categoryEmojis, conditionLabels } from '@/lib/sample-data';
import { isFavorite, toggleFavorite } from '@/lib/favorites';

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
    images?: string[] | null;
    profiles?: {
      display_name?: string | null;
      avatar_url?: string | null;
      is_verified?: boolean | null;
    };
  };
  onPress?: () => void;
  onFavorite?: () => void;
  
}

const conditionColors: Record<string, string> = {
  like_new: 'bg-[#D1FAE5] text-[#065F46]',
  good: 'bg-[#DBEAFE] text-[#1E40AF]',
  fair: 'bg-[#FEE2E2] text-[#991B1B]',
  loved: 'bg-[#FEE2E2] text-[#991B1B]',
  new_with_tags: 'bg-[#FEF3C7] text-[#92400E]',
};

const ItemCard = ({ item, onPress, onFavorite }: ItemCardProps) => {
  const imageUrl = item.image_urls?.[0] || (item as any).images?.[0] || null;
  const hasImage = !!imageUrl;
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    setFavorited(isFavorite(item.id));
  }, [item.id]);

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newState = toggleFavorite(item.id);
    setFavorited(newState);
    onFavorite?.();
  };
  const badgeColor = conditionColors[item.condition] || 'bg-card/80 text-foreground';

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={onPress}
      className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border cursor-pointer group"
    >
      {/* Image */}
      <div className="aspect-square bg-muted relative overflow-hidden flex-shrink-0">
        {hasImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl!}
            alt={item.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">
            {categoryEmojis[item.category] || '\u{1F4E6}'}
          </div>
        )}
        {/* Favorite button */}
        <motion.button
          onClick={handleFavorite}
          whileTap={{ scale: 1.4 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${favorited ? 'fill-primary text-primary' : 'text-foreground/50'}`}
          />
        </motion.button>
        {/* Condition badge */}
        <div className="absolute bottom-2 left-2">
          <span className={`text-[10px] font-heading font-medium px-2.5 py-1 rounded-full ${badgeColor}`}>
            {conditionLabels[item.condition] || item.condition}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1">
        <h3 className="font-heading font-medium text-[15px] text-foreground leading-tight line-clamp-1">
          {item.title}
        </h3>
        <div className="flex items-center gap-1 mt-1">
          {item.size && (
            <span className="text-[11px] font-body text-foreground/50">Size {item.size}</span>
          )}
          {item.size && item.brand && (
            <span className="text-foreground/50 text-[11px]">&middot;</span>
          )}
          {item.brand && (
            <span className="text-[11px] font-body text-foreground/50">{item.brand}</span>
          )}
        </div>
        {item.profiles && (
          <div className="flex items-center gap-1 mt-1.5">
            <div className="w-4 h-4 rounded-full bg-accent flex items-center justify-center text-[8px] font-medium text-accent-foreground">
              {item.profiles.display_name?.charAt(0) || '?'}
            </div>
            <span className="text-[11px] font-body text-primary/70">{item.profiles.display_name}</span>
            {item.profiles.is_verified && (
              <CheckCircle2 className="w-3 h-3 text-secondary" />
            )}
          </div>
        )}
        {item.location && (
          <div className="flex items-center gap-0.5 mt-1">
            <MapPin className="w-3 h-3 text-primary/50" />
            <span className="text-[10px] font-body text-primary/50">{item.location}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ItemCard;
