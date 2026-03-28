import { type SwapRequest } from "@/lib/types";

export const mockSwapRequests: SwapRequest[] = [
  {
    id: "swap-1",
    requester_id: "maya-johnson",
    item_id: "item-1",
    offered_item_id: null,
    message: "I have a Kyte Baby sleep sack in 6-9m sage green I could swap!",
    status: "accepted",
    created_at: "2024-08-12T10:00:00Z",
  },
  {
    id: "swap-2",
    requester_id: "olivia-nguyen",
    item_id: "item-3",
    offered_item_id: null,
    message: "Would love to swap my Lovevery Block Set for the rainbow stacker!",
    status: "pending",
    created_at: "2024-08-13T14:00:00Z",
  },
  {
    id: "swap-3",
    requester_id: "jessica-martinez",
    item_id: "item-5",
    offered_item_id: "item-6",
    message: "Interested in the Ergobaby! I have pajama bundles in various sizes.",
    status: "pending",
    created_at: "2024-08-15T09:00:00Z",
  },
  {
    id: "swap-4",
    requester_id: "sarah-chen",
    item_id: "item-8",
    offered_item_id: "item-10",
    message: "Would you swap the play gym for magnetic tiles? My son has outgrown the gym stage!",
    status: "completed",
    created_at: "2024-07-20T10:00:00Z",
  },
  {
    id: "swap-5",
    requester_id: "emma-wilson",
    item_id: "item-9",
    offered_item_id: "item-11",
    message: "My daughter's done with these dresses — swap for the bouncer?",
    status: "declined",
    created_at: "2024-08-01T10:00:00Z",
  },
];
