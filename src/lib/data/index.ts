import { mockProfiles } from "./mock/profiles";
import { mockItems } from "./mock/items";
import { mockCircles } from "./mock/circles";
import { mockConversations, mockMessages } from "./mock/messages";
import { mockSwapRequests } from "./mock/swaps";
import { mockStages } from "./mock/stages";
import type { Item, Profile, Circle, Conversation, Message, SwapRequest, BabyStage, ItemCategory, ItemCondition } from "@/lib/types";

// Profiles
export async function getProfiles(): Promise<Profile[]> {
  return mockProfiles;
}

export async function getProfileById(id: string): Promise<Profile | undefined> {
  return mockProfiles.find((p) => p.id === id);
}

export async function getCurrentUser(): Promise<Profile> {
  return mockProfiles[0]; // Sarah Chen as default logged-in user
}

// Items
export async function getItems(filters?: {
  category?: ItemCategory;
  condition?: ItemCondition;
  neighborhood?: string;
  size?: string;
  search?: string;
}): Promise<Item[]> {
  let items = mockItems.map((item) => ({
    ...item,
    user: mockProfiles.find((p) => p.id === item.user_id),
  }));

  if (filters?.category) {
    items = items.filter((i) => i.category === filters.category);
  }
  if (filters?.condition) {
    items = items.filter((i) => i.condition === filters.condition);
  }
  if (filters?.neighborhood) {
    items = items.filter((i) => i.neighborhood === filters.neighborhood);
  }
  if (filters?.size) {
    items = items.filter((i) => i.size === filters.size);
  }
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    items = items.filter(
      (i) =>
        i.title.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q) ||
        i.brand.toLowerCase().includes(q)
    );
  }

  return items;
}

export async function getItemById(id: string): Promise<(Item & { user: Profile }) | undefined> {
  const item = mockItems.find((i) => i.id === id);
  if (!item) return undefined;
  const user = mockProfiles.find((p) => p.id === item.user_id)!;
  return { ...item, user };
}

export async function getItemsByUserId(userId: string): Promise<Item[]> {
  return mockItems
    .filter((i) => i.user_id === userId)
    .map((item) => ({
      ...item,
      user: mockProfiles.find((p) => p.id === item.user_id),
    }));
}

export async function getFeaturedItems(): Promise<Item[]> {
  return mockItems.slice(0, 6).map((item) => ({
    ...item,
    user: mockProfiles.find((p) => p.id === item.user_id),
  }));
}

// Circles
export async function getCircles(): Promise<Circle[]> {
  return mockCircles;
}

export async function getCircleById(id: string): Promise<Circle | undefined> {
  return mockCircles.find((c) => c.id === id);
}

// Conversations & Messages
export async function getConversations(userId: string): Promise<(Conversation & { participants: Profile[]; last_message?: Message; item?: Item })[]> {
  return mockConversations
    .filter((c) => c.participant_ids.includes(userId))
    .map((conv) => {
      const messages = mockMessages.filter((m) => m.conversation_id === conv.id);
      const lastMessage = messages[messages.length - 1];
      return {
        ...conv,
        participants: mockProfiles.filter((p) => conv.participant_ids.includes(p.id)),
        last_message: lastMessage
          ? { ...lastMessage, sender: mockProfiles.find((p) => p.id === lastMessage.sender_id) }
          : undefined,
        item: mockItems.find((i) => i.id === conv.item_id),
      };
    });
}

export async function getConversationById(id: string): Promise<Conversation | undefined> {
  return mockConversations.find((c) => c.id === id);
}

export async function getMessagesByConversation(conversationId: string): Promise<Message[]> {
  return mockMessages
    .filter((m) => m.conversation_id === conversationId)
    .map((msg) => ({
      ...msg,
      sender: mockProfiles.find((p) => p.id === msg.sender_id),
    }));
}

// Swap Requests
export async function getSwapRequests(userId: string): Promise<SwapRequest[]> {
  return mockSwapRequests
    .filter((sr) => sr.requester_id === userId || mockItems.find((i) => i.id === sr.item_id)?.user_id === userId)
    .map((sr) => ({
      ...sr,
      requester: mockProfiles.find((p) => p.id === sr.requester_id),
      item: mockItems.find((i) => i.id === sr.item_id),
      offered_item: sr.offered_item_id ? mockItems.find((i) => i.id === sr.offered_item_id) : undefined,
    }));
}

// Baby Stages
export async function getStages(): Promise<BabyStage[]> {
  return mockStages;
}

export async function getStageById(id: string): Promise<BabyStage | undefined> {
  return mockStages.find((s) => s.id === id);
}

// Neighborhoods (derived from items)
export function getNeighborhoods(): string[] {
  const neighborhoods = new Set(mockItems.map((i) => i.neighborhood));
  return Array.from(neighborhoods).sort();
}
