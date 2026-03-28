export type ItemCategory = "clothing" | "toys" | "gear" | "books" | "essentials";
export type ItemCondition = "like-new" | "good" | "loved";
export type ListingType = "swap" | "free" | "sell";
export type ItemStatus = "active" | "pending" | "swapped" | "sold" | "archived";
export type SwapStatus = "pending" | "accepted" | "declined" | "completed";
export type AgeStage = "newborn" | "infant" | "toddler" | "big-kid" | "school-age";

export interface Profile {
  id: string;
  email: string;
  name: string;
  avatar_url: string;
  neighborhood: string;
  zip: string;
  bio: string;
  items_count: number;
  swaps_completed: number;
  rating: number;
  created_at: string;
}

export interface Item {
  id: string;
  user_id: string;
  title: string;
  description: string;
  category: ItemCategory;
  size: string;
  brand: string;
  condition: ItemCondition;
  listing_type: ListingType;
  status: ItemStatus;
  images: string[];
  neighborhood: string;
  zip: string;
  price?: number;
  created_at: string;
  user?: Profile;
}

export interface SwapRequest {
  id: string;
  requester_id: string;
  item_id: string;
  offered_item_id: string | null;
  message: string;
  status: SwapStatus;
  created_at: string;
  requester?: Profile;
  item?: Item;
  offered_item?: Item;
}

export interface Conversation {
  id: string;
  item_id: string;
  swap_request_id: string | null;
  participant_ids: string[];
  created_at: string;
  participants?: Profile[];
  item?: Item;
  last_message?: Message;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  sender?: Profile;
}

export interface Circle {
  id: string;
  name: string;
  description: string;
  cover_image: string;
  neighborhood: string;
  member_count: number;
  created_at: string;
  members?: Profile[];
}

export interface CircleMember {
  id: string;
  circle_id: string;
  user_id: string;
  joined_at: string;
}

export interface Review {
  id: string;
  reviewer_id: string;
  reviewee_id: string;
  swap_id: string;
  rating: number;
  comment: string;
  created_at: string;
  reviewer?: Profile;
}

export interface BabyStage {
  id: AgeStage;
  name: string;
  age_range: string;
  description: string;
  what_to_swap: string[];
  what_to_keep: string[];
  tips: string[];
  recommended_categories: ItemCategory[];
}
