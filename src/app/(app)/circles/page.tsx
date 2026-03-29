"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Users, MapPin, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockCircles } from "@/lib/data/mock/circles";
import { mockProfiles } from "@/lib/data/mock/profiles";
import { getInitials } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export default function CirclesPage() {
  const router = useRouter();
  const [joinedCircles, setJoinedCircles] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("skifte_joined_circles");
    if (stored) setJoinedCircles(JSON.parse(stored));
    else setJoinedCircles(["circle-1", "circle-4"]);
  }, []);

  const toggleJoin = (circleId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setJoinedCircles((prev) => {
      const updated = prev.includes(circleId)
        ? prev.filter((id) => id !== circleId)
        : [...prev, circleId];
      localStorage.setItem("skifte_joined_circles", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="px-4 pt-8 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        className="mb-6"
      >
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-heading text-3xl text-foreground mb-1">Circles</h1>
            <p className="font-body text-sm text-foreground/50">
              Join neighborhood groups to swap locally.
            </p>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => alert("Start a Circle coming soon! Email us at hello@skiftecollective.com")}
            className="flex-shrink-0 px-4 py-2 bg-[#3A6349] text-white rounded-full font-heading text-sm mt-1"
          >
            + Start a circle
          </motion.button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-4">
        {mockCircles.map((circle, index) => {
          const isJoined = joinedCircles.includes(circle.id);
          const members = mockProfiles.slice(0, 5);

          return (
            <motion.div
              key={circle.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.07, duration: 0.5, ease }}
              whileHover={{ y: -2 }}
              onClick={() => router.push(`/circles/${circle.id}`)}
              className="bg-card rounded-2xl border border-border overflow-hidden cursor-pointer active:opacity-90"
            >
              {/* Cover */}
              <div className="relative h-36 overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                {circle.cover_image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={circle.cover_image}
                    alt={circle.name}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="font-heading text-xl text-white">{circle.name}</h3>
                  <div className="flex items-center gap-3 text-white/75 text-xs font-body mt-0.5">
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{circle.neighborhood}</span>
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" />{circle.member_count} members</span>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-4">
                <p className="font-body text-sm text-foreground/60 mb-4 leading-relaxed line-clamp-2">
                  {circle.description}
                </p>

                <div className="flex items-center justify-between">
                  {/* Member avatars */}
                  <div className="flex -space-x-2">
                    {members.map((member) => (
                      <Avatar key={member.id} className="h-7 w-7 border-2 border-card">
                        <AvatarImage src={member.avatar_url} />
                        <AvatarFallback className="text-[9px] bg-primary/10 text-primary font-heading">
                          {getInitials(member.name)}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {circle.member_count > 5 && (
                      <div className="h-7 w-7 rounded-full bg-muted border-2 border-card flex items-center justify-center">
                        <span className="text-[9px] font-body text-foreground/50">+{circle.member_count - 5}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileTap={{ scale: 0.93 }}
                      onClick={(e) => toggleJoin(circle.id, e)}
                      className={`px-5 py-2 rounded-full text-sm font-heading transition-colors ${
                        isJoined
                          ? "bg-secondary/15 text-secondary border border-secondary/30"
                          : "bg-primary text-white"
                      }`}
                    >
                      {isJoined ? "Joined" : "Join"}
                    </motion.button>
                    <button
                      onClick={(e) => { e.stopPropagation(); router.push(`/circles/${circle.id}`); }}
                      className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
                    >
                      <ChevronRight className="h-4 w-4 text-foreground/40" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
