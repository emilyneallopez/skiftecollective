import { type Conversation, type Message } from "@/lib/types";

export const mockConversations: Conversation[] = [
  {
    id: "conv-1",
    item_id: "item-1",
    swap_request_id: "swap-1",
    participant_ids: ["sarah-chen", "maya-johnson"],
    created_at: "2024-08-12T10:00:00Z",
  },
  {
    id: "conv-2",
    item_id: "item-3",
    swap_request_id: "swap-2",
    participant_ids: ["priya-patel", "olivia-nguyen"],
    created_at: "2024-08-13T14:00:00Z",
  },
  {
    id: "conv-3",
    item_id: "item-4",
    swap_request_id: null,
    participant_ids: ["emma-wilson", "rachel-kim"],
    created_at: "2024-08-14T16:00:00Z",
  },
  {
    id: "conv-4",
    item_id: "item-5",
    swap_request_id: "swap-3",
    participant_ids: ["aisha-brown", "jessica-martinez"],
    created_at: "2024-08-15T09:00:00Z",
  },
];

export const mockMessages: Message[] = [
  // Conversation 1: Sarah & Maya about romper set
  {
    id: "msg-1",
    conversation_id: "conv-1",
    sender_id: "maya-johnson",
    content: "Hi Sarah! I love those organic rompers. I have a Kyte Baby sleep sack in 6-9m that Theo just grew out of — would you be interested in a swap?",
    created_at: "2024-08-12T10:05:00Z",
  },
  {
    id: "msg-2",
    conversation_id: "conv-1",
    sender_id: "sarah-chen",
    content: "Oh yes! We love Kyte Baby. What color is the sleep sack? And is it the tog 1.0 or 2.5?",
    created_at: "2024-08-12T10:15:00Z",
  },
  {
    id: "msg-3",
    conversation_id: "conv-1",
    sender_id: "maya-johnson",
    content: "It's the sage green, 1.0 tog — perfect for summer! I can send pics if you'd like.",
    created_at: "2024-08-12T10:20:00Z",
  },
  {
    id: "msg-4",
    conversation_id: "conv-1",
    sender_id: "sarah-chen",
    content: "That sounds perfect! Want to meet at the Prospect Park playground tomorrow around 10?",
    created_at: "2024-08-12T10:30:00Z",
  },
  {
    id: "msg-5",
    conversation_id: "conv-1",
    sender_id: "maya-johnson",
    content: "See you there!",
    created_at: "2024-08-12T10:35:00Z",
  },

  // Conversation 2: Priya & Olivia about rainbow stacker
  {
    id: "msg-6",
    conversation_id: "conv-2",
    sender_id: "olivia-nguyen",
    content: "Priya! I've been looking for a Grimm's rainbow forever. Would you swap for my Lovevery Block Set? It's the toddler one with the shape sorter.",
    created_at: "2024-08-13T14:10:00Z",
  },
  {
    id: "msg-7",
    conversation_id: "conv-2",
    sender_id: "priya-patel",
    content: "Oh that would be amazing! My twins are obsessed with shape sorting right now. What condition is it in?",
    created_at: "2024-08-13T14:25:00Z",
  },
  {
    id: "msg-8",
    conversation_id: "conv-2",
    sender_id: "olivia-nguyen",
    content: "Really good condition — a few small scratches on the wooden pieces but nothing major. All pieces included. I can drop it off this weekend if you're free?",
    created_at: "2024-08-13T14:30:00Z",
  },

  // Conversation 3: Emma & Rachel about books (free claim)
  {
    id: "msg-9",
    conversation_id: "conv-3",
    sender_id: "rachel-kim",
    content: "Hi Emma! I'd love to claim the Big Dreams book set for my little one. Thank you so much for listing them as free — that's incredibly generous!",
    created_at: "2024-08-14T16:05:00Z",
  },
  {
    id: "msg-10",
    conversation_id: "conv-3",
    sender_id: "emma-wilson",
    content: "Of course! They're such wonderful books and I'd love them to go to someone who'll enjoy them. I'm on Court Street most days — want to pick up anytime this week?",
    created_at: "2024-08-14T16:20:00Z",
  },
  {
    id: "msg-11",
    conversation_id: "conv-3",
    sender_id: "rachel-kim",
    content: "That would be wonderful! How about Wednesday afternoon? Welcome to the neighborhood gift for Mia 💕",
    created_at: "2024-08-14T16:30:00Z",
  },

  // Conversation 4: Aisha & Jessica about carrier
  {
    id: "msg-12",
    conversation_id: "conv-4",
    sender_id: "jessica-martinez",
    content: "Hey Aisha! That Ergobaby carrier looks great. I have a bunch of 12-18m clothing bundles if any of that interests you for a swap?",
    created_at: "2024-08-15T09:10:00Z",
  },
  {
    id: "msg-13",
    conversation_id: "conv-4",
    sender_id: "aisha-brown",
    content: "My niece is actually in 18-24m now, but thank you! Do you have anything in that size range?",
    created_at: "2024-08-15T09:30:00Z",
  },
];
