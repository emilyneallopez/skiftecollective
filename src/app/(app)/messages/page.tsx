"use client";

import { useState } from "react";
import Link from "next/link";
import { Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { mockConversations, mockMessages } from "@/lib/data/mock/messages";
import { mockProfiles } from "@/lib/data/mock/profiles";
import { mockItems } from "@/lib/data/mock/items";
import { getInitials, formatRelativeTime } from "@/lib/utils";

const currentUserId = "sarah-chen";

// Build enriched conversations
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
  const [activeConv, setActiveConv] = useState(conversations[0]?.id || "");
  const [newMessage, setNewMessage] = useState("");
  const [localMessages, setLocalMessages] = useState<Record<string, typeof conversations[0]["messages"]>>({});

  const activeConversation = conversations.find((c) => c.id === activeConv);
  const currentMessages = [
    ...(activeConversation?.messages || []),
    ...(localMessages[activeConv] || []),
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <FadeIn>
        <h1 className="font-heading text-2xl font-bold text-ink mb-6">
          Messages
        </h1>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-16rem)]">
        {/* Conversation List */}
        <div className="md:col-span-1 bg-white rounded-xl border border-cream-200 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-cream-200">
            <p className="text-sm font-medium text-muted-foreground">
              {conversations.length} conversations
            </p>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setActiveConv(conv.id)}
                className={`w-full flex items-start gap-3 p-4 text-left transition-colors border-b border-cream-100 ${
                  activeConv === conv.id
                    ? "bg-cream"
                    : "hover:bg-cream/50"
                }`}
              >
                <Avatar className="h-10 w-10 shrink-0">
                  <AvatarImage src={conv.otherParticipant?.avatar_url} />
                  <AvatarFallback className="text-xs bg-cream">
                    {conv.otherParticipant
                      ? getInitials(conv.otherParticipant.name)
                      : "?"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium truncate">
                      {conv.otherParticipant?.name}
                    </p>
                    <span className="text-[10px] text-muted-foreground shrink-0">
                      {conv.lastMessage
                        ? formatRelativeTime(conv.lastMessage.created_at)
                        : ""}
                    </span>
                  </div>
                  {conv.item && (
                    <Badge
                      variant="secondary"
                      className="text-[10px] bg-cream-200 mb-1 px-1.5 py-0"
                    >
                      Re: {conv.item.title.slice(0, 25)}...
                    </Badge>
                  )}
                  <p className="text-xs text-muted-foreground truncate">
                    {conv.lastMessage?.content}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Active Conversation */}
        <div className="md:col-span-2 bg-white rounded-xl border border-cream-200 overflow-hidden flex flex-col">
          {activeConversation ? (
            <>
              {/* Header */}
              <div className="p-4 border-b border-cream-200 flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src={activeConversation.otherParticipant?.avatar_url}
                  />
                  <AvatarFallback className="text-xs bg-cream">
                    {activeConversation.otherParticipant
                      ? getInitials(activeConversation.otherParticipant.name)
                      : "?"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">
                    {activeConversation.otherParticipant?.name}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {activeConversation.otherParticipant?.neighborhood}
                  </p>
                </div>
                {activeConversation.item && (
                  <Link
                    href={`/items/${activeConversation.item.id}`}
                    className="ml-auto"
                  >
                    <Badge
                      variant="secondary"
                      className="text-xs hover:bg-cream-300 cursor-pointer"
                    >
                      {activeConversation.item.title.slice(0, 30)}...
                    </Badge>
                  </Link>
                )}
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {currentMessages.map((msg) => {
                  const isMe = msg.sender_id === currentUserId;
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`flex items-end gap-2 max-w-[75%] ${isMe ? "flex-row-reverse" : ""}`}>
                        {!isMe && (
                          <Avatar className="h-6 w-6 shrink-0">
                            <AvatarImage src={msg.sender?.avatar_url} />
                            <AvatarFallback className="text-[8px] bg-cream">
                              {msg.sender ? getInitials(msg.sender.name) : "?"}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`px-4 py-2.5 rounded-2xl text-sm ${
                            isMe
                              ? "bg-terracotta text-white rounded-br-md"
                              : "bg-cream text-ink rounded-bl-md"
                          }`}
                        >
                          <p>{msg.content}</p>
                          <p
                            className={`text-[10px] mt-1 ${
                              isMe ? "text-white/60" : "text-muted-foreground"
                            }`}
                          >
                            {formatRelativeTime(msg.created_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-cream-200">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage();
                  }}
                  className="flex gap-2"
                >
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 h-11 rounded-full bg-cream border-cream-200"
                  />
                  <Button
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="h-11 w-11 rounded-full bg-terracotta hover:bg-terracotta-600 text-white shrink-0 p-0"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <p>Select a conversation to start messaging.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
