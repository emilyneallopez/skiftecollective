import { type ItemCategory, type ItemCondition, type ListingType, type AgeStage } from "./types";

export const APP_NAME = "Skifte Collective";
export const APP_TAGLINE = "The Neighborhood Network for Modern Motherhood";

export const NAV_LINKS = [
  { href: "/browse", label: "Browse" },
  { href: "/circles", label: "Circles" },
  { href: "/guide", label: "Stage Guide" },
] as const;

export const MOBILE_NAV_LINKS = [
  { href: "/browse", label: "Browse", icon: "Search" },
  { href: "/list", label: "List", icon: "Plus" },
  { href: "/messages", label: "Messages", icon: "MessageCircle" },
  { href: "/profile/sarah-chen", label: "Profile", icon: "User" },
] as const;

export const CATEGORIES: { value: ItemCategory; label: string }[] = [
  { value: "clothing", label: "Clothing" },
  { value: "toys", label: "Toys" },
  { value: "gear", label: "Gear" },
  { value: "books", label: "Books" },
  { value: "essentials", label: "Essentials" },
];

export const CONDITIONS: { value: ItemCondition; label: string; color: string }[] = [
  { value: "like-new", label: "Like New", color: "bg-mint-100 text-forest-700" },
  { value: "good", label: "Good", color: "bg-sky-100 text-sky-500" },
  { value: "loved", label: "Loved", color: "bg-blush-100 text-blush-400" },
];

export const LISTING_TYPES: { value: ListingType; label: string; color: string }[] = [
  { value: "swap", label: "Swap", color: "bg-terracotta text-white" },
  { value: "free", label: "Free", color: "bg-sunshine text-ink" },
  { value: "sell", label: "Sale", color: "bg-forest text-white" },
];

export const AGE_STAGES: { value: AgeStage; label: string; range: string }[] = [
  { value: "newborn", label: "Newborn", range: "0–3m" },
  { value: "infant", label: "Infant", range: "3–12m" },
  { value: "toddler", label: "Toddler", range: "1–3y" },
  { value: "big-kid", label: "Big Kid", range: "3–6y" },
  { value: "school-age", label: "School Age", range: "6+" },
];

export const SIZES = [
  "NB", "0-3m", "3-6m", "6-9m", "9-12m", "12-18m", "18-24m",
  "2T", "3T", "4T", "5T", "6", "7", "8",
];
