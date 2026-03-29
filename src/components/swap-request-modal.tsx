"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { type Item } from "@/lib/types";
import { mockItems } from "@/lib/data/mock/items";
import { CheckCircle } from "lucide-react";

interface SwapRequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: Item;
}

export function SwapRequestModal({ open, onOpenChange, item }: SwapRequestModalProps) {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [message, setMessage] = useState(
    `Hi! I'd love to swap for your ${item.title}. `
  );
  const [submitted, setSubmitted] = useState(false);

  // Current user's items (Sarah Chen)
  const myItems = mockItems.filter(
    (i) => i.user_id === "sarah-chen" && i.id !== item.id
  );

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      onOpenChange(false);
      router.push("/messages");
    }, 1800);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center py-8 gap-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
              >
                <CheckCircle className="h-16 w-16 text-forest" />
              </motion.div>
              <h3 className="font-heading text-xl font-semibold">Swap Request Sent!</h3>
              <p className="text-sm font-body text-muted-foreground text-center">
                Your request is on its way to {item.user?.name?.split(" ")[0]}. Taking you to messages now.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <DialogHeader>
                <DialogTitle className="font-heading text-lg">
                  Request a Swap
                </DialogTitle>
                <p className="text-sm text-muted-foreground">
                  Select an item from your closet to offer in exchange for{" "}
                  <span className="font-medium text-ink">{item.title}</span>
                </p>
              </DialogHeader>

              <div className="mt-6 space-y-6">
                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Your items to offer
                  </label>
                  <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                    {myItems.map((myItem) => (
                      <button
                        key={myItem.id}
                        onClick={() => setSelectedItem(myItem.id)}
                        className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                          selectedItem === myItem.id
                            ? "border-terracotta ring-2 ring-terracotta/20"
                            : "border-transparent hover:border-cream-300"
                        }`}
                      >
                        <Image
                          src={myItem.images[0]}
                          alt={myItem.title}
                          fill
                          className="object-cover"
                          sizes="120px"
                        />
                        {selectedItem === myItem.id && (
                          <div className="absolute inset-0 bg-terracotta/20 flex items-center justify-center">
                            <CheckCircle className="h-6 w-6 text-white drop-shadow" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                  {selectedItem && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Offering: {myItems.find((i) => i.id === selectedItem)?.title}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Message to {item.user?.name?.split(" ")[0]}
                  </label>
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell them about your item and why you'd like to swap..."
                    rows={3}
                    className="resize-none"
                  />
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={!selectedItem || !message.trim()}
                  className="w-full bg-[#C96A3A] hover:bg-[#A85530] text-white rounded-full cursor-pointer"
                >
                  Send swap request
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
