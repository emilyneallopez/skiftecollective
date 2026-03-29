"use client";

import Link from "next/link";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ArrowLeft, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockConversations, mockMessages } from "@/lib/data/mock/messages";
import { mockProfiles } from "@/lib/data/mock/profiles";
import { mockItems } from "@/lib/data/mock/items";
import { getInitials, formatRelativeTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

const currentUserId = "sarah-chen";

const conversations = mockConversations
  .filter((c) => c.participant_ids.includes(currentUserId))
  .map((conv) => {
    const messages = mockMessages.filter((m) => m.conversation_id === conv.id);
    const lastMessage = messages[messages.length - 1];
    const otherParticipant = mockProfiles.find(
      (p) => conv.participant_ids.includes(p.id) && p.id !== currentUserId
    );
    const item = mockItems.find((i) => i.id === conv.item_id);
    return {
      ...conv,
      otherParticipant,
      item,
      lastMessage,
      messages: messages.map((m) => ({
        ...m,
        sender: mockProfiles.find((p) => p.id === m.sender_id),
      })),
    };
  });

export default function MessagesPage() {
  const [activeConv, setActiveConv] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [localMessages, setLocalMessages] = useState<Record<string, typeof conversations[0]["messages"]>>({});

  const activeConversation = conversations.find((c) => c.id === activeConv);
  const currentMessages = [
    ...(activeConversation?.messages || []),
    ...(localMessages[activeConv || ""] || []),
  ];

  const sendMessage = () => {
    if (!newMessage.trim() || !activeConv) return;
    const msg = {
      id: `local-${Date.now()}`,
      conversation_id: activeConv,
      sender_id: currentUserId,
      content: newMessage.trim(),
      created_at: new Date().toISOString(),
      sender: mockProfiles.find((p) => p.id === currentUserId),
    };
    setLocalMessages((prev) => ({
      ...prev,
      [activeConv]: [...(prev[activeConv] || []), msg],
    }));
    setNewMessage("");
  };

  return (
    <div className="h-[calc(100vh-5rem)] flex flex-col">
      <AnimatePresence mode="wait">
        {!activeConv ? (
          /* CONVERSATION LIST */
          <motion.div
            key="list"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col h-full"
          >
            <div className="px-4 pt-8 pb-4">
              <h1 className="font-heading text-3xl text-foreground">Messages</h1>
              <p className="font-body text-sm text-foreground/50 mt-1">Chat with moms about swaps</p>
            </div>

            {conversations.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <MessageCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading text-xl text-foreground mb-2">No messages yet</h3>
                <p className="font-body text-sm text-foreground/50 leading-relaxed mb-4">
                  When you send a swap request or someone reaches out about your items, the conversation starts here.
                </p>
                <Link href="/browse" className="px-6 py-2.5 bg-primary text-white rounded-full font-heading text-sm inline-block text-center">
                  Browse swaps
                </Link>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto">
                {conversations.map((conv, i) => (
                  <motion.button
                    key={conv.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setActiveConv(conv.id)}
                    className="w-full flex items-center gap-4 px-4 py-4 text-left border-b border-border hover:bg-card/80 transition-colors active:bg-card"
                  >
                    <Avatar className="h-12 w-12 shrink-0">
                      <AvatarImage src={conv.otherParticipant?.avatar_url} />
                      <AvatarFallback className="bg-primary/10 text-primary font-heading text-sm">
                        {conv.otherParticipant ? getInitials(conv.otherParticipant.name) : "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2 mb-0.5">
                        <p className="font-heading text-base text-foreground truncate">
                          {conv.otherParticipant?.name}
                        </p>
                        <span className="font-body text-[11px] text-foreground/40 shrink-0">
                          {conv.lastMessage ? formatRelativeTime(conv.lastMessage.created_at) : ""}
                        </span>
                      </div>
                      {conv.item && (
                        <p className="font-body text-[11px] text-primary mb-0.5 truncate">
                          Re: {conv.item.title}
                        </p>
                      )}
                      <p className="font-body text-xs text-foreground/50 truncate">
                        {conv.lastMessage?.content}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          /* ACTIVE CONVERSATION */
          <motion.div
            key="chat"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex flex-col h-full"
          >
            {/* Chat header */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-border bg-background">
              <button
                onClick={() => setActiveConv(null)}
                className="p-1.5 -ml-1.5 rounded-full hover:bg-card transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-foreground/70" />
              </button>
              <Avatar className="h-9 w-9">
                <AvatarImage src={activeConversation?.otherParticipant?.avatar_url} />
                <AvatarFallback className="bg-primary/10 text-primary font-heading text-sm">
                  {activeConversation?.otherParticipant ? getInitials(activeConversation.otherParticipant.name) : "?"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-heading text-base text-foreground truncate">
                  {activeConversation?.otherParticipant?.name}
                </p>
                {activeConversation?.item && (
                  <p className="font-body text-[11px] text-primary truncate">
                    Re: {activeConversation.item.title}
                  </p>
                )}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {currentMessages.map((msg) => {
                const isMe = msg.sender_id === currentUserId;
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex items-end gap-2 max-w-[80%] ${isMe ? "flex-row-reverse" : ""}`}>
                      {!isMe && (
                        <Avatar className="h-7 w-7 shrink-0 mb-1">
                          <AvatarImage src={msg.sender?.avatar_url} />
                          <AvatarFallback className="text-[9px] bg-primary/10 text-primary font-heading">
                            {msg.sender ? getInitials(msg.sender.name) : "?"}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className={`px-4 py-2.5 rounded-2xl text-sm font-body ${
                        isMe
                          ? "bg-primary text-white rounded-br-sm"
                          : "bg-card text-foreground rounded-bl-sm border border-border"
                      }`}>
                        <p className="leading-relaxed">{msg.content}</p>
                        <p className={`text-[10px] mt-1 ${isMe ? "text-white/50" : "text-foreground/40"}`}>
                          {formatRelativeTime(msg.created_at)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Input */}
            <div className="px-4 pb-4 pt-3 border-t border-border bg-background">
              <form
                onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
                className="flex items-center gap-2"
              >
                <input
                  placeholder="Say something..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 h-11 px-4 rounded-full bg-card border border-border font-body text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
                <motion.button
                  type="submit"
                  disabled={!newMessage.trim()}
                  whileTap={{ scale: 0.9 }}
                  className="h-11 w-11 rounded-full bg-primary text-white flex items-center justify-center shrink-0 disabled:opacity-40 transition-opacity"
                >
                  <Send className="h-4 w-4" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
