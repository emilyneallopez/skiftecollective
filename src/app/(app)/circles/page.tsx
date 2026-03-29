"use client";

import { useState } from "react";
import Image from "next/image";
import { Users, MapPin, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockCircles } from "@/lib/data/mock/circles";
import { mockProfiles } from "@/lib/data/mock/profiles";
import { getInitials } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export default function CirclesPage() {
  const [joinedCircles, setJoinedCircles] = useState<string[]>([
    "circle-1",
    "circle-4",
  ]);
  const [expandedCircle, setExpandedCircle] = useState<string | null>(null);

  const toggleJoin = (circleId: string) => {
    setJoinedCircles((prev) =>
      prev.includes(circleId)
        ? prev.filter((id) => id !== circleId)
        : [...prev, circleId]
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        className="mb-8"
      >
        <h1 className="font-heading text-3xl text-primary mb-2">
          Circles
        </h1>
        <p className="text-muted-foreground font-body">
          Join neighborhood groups to swap locally and build community.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockCircles.map((circle, index) => {
          const isJoined = joinedCircles.includes(circle.id);
          const isExpanded = expandedCircle === circle.id;
          const members = mockProfiles.slice(0, Math.min(circle.member_count, 6));

          return (
            <motion.div
              key={circle.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5, ease }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-xl border border-border overflow-hidden transition-shadow hover:shadow-lg"
            >
              {/* Cover Image */}
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={circle.cover_image}
                  alt={circle.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-heading text-xl text-white">
                    {circle.name}
                  </h3>
                  <div className="flex items-center gap-3 text-white/80 text-xs font-body mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {circle.neighborhood}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {circle.member_count} members
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="text-sm font-body text-foreground/70 mb-4 leading-relaxed">
                  {circle.description}
                </p>

                {/* Member avatars */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex -space-x-2">
                    {members.slice(0, 5).map((member) => (
                      <Avatar
                        key={member.id}
                        className="h-7 w-7 border-2 border-white"
                      >
                        <AvatarImage src={member.avatar_url} />
                        <AvatarFallback className="text-[9px] bg-accent">
                          {getInitials(member.name)}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {circle.member_count > 5 && (
                      <div className="h-7 w-7 rounded-full bg-accent border-2 border-white flex items-center justify-center">
                        <span className="text-[9px] font-medium text-foreground/60">
                          +{circle.member_count - 5}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <motion.div className="flex-1" whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={() => toggleJoin(circle.id)}
                      variant={isJoined ? "outline" : "default"}
                      className={`w-full rounded-full text-sm font-heading ${
                        isJoined
                          ? "border-border text-foreground/70"
                          : "bg-primary hover:bg-primary/90 text-white"
                      }`}
                    >
                      {isJoined ? "Joined" : "Join Circle"}
                    </Button>
                  </motion.div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setExpandedCircle(isExpanded ? null : circle.id)
                    }
                    className="rounded-full"
                  >
                    <ChevronRight
                      className={`h-4 w-4 transition-transform ${
                        isExpanded ? "rotate-90" : ""
                      }`}
                    />
                  </Button>
                </div>

                {/* Expanded: Members & Activity */}
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-4 pt-4 border-t border-border space-y-3"
                  >
                    <h4 className="text-xs font-heading text-muted-foreground uppercase tracking-wide">
                      Members
                    </h4>
                    <div className="space-y-2">
                      {members.map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center gap-3 py-1"
                        >
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={member.avatar_url} />
                            <AvatarFallback className="text-[10px] bg-accent">
                              {getInitials(member.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-heading">
                              {member.name}
                            </p>
                            <p className="text-[11px] font-body text-muted-foreground">
                              {member.neighborhood} ·{" "}
                              {member.swaps_completed} swaps
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <h4 className="text-xs font-heading text-muted-foreground uppercase tracking-wide pt-2">
                      Recent Activity
                    </h4>
                    <div className="space-y-2 text-sm font-body text-foreground/70">
                      <p>
                        <span className="font-heading text-foreground">
                          {members[0]?.name}
                        </span>{" "}
                        listed a new item
                      </p>
                      <p>
                        <span className="font-heading text-foreground">
                          {members[1]?.name}
                        </span>{" "}
                        completed a swap
                      </p>
                      <p>
                        <span className="font-heading text-foreground">
                          {members[2]?.name}
                        </span>{" "}
                        joined the circle
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
