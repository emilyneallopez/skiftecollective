"use client";

import { useState } from "react";
import Image from "next/image";
import { Users, MapPin, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { mockCircles } from "@/lib/data/mock/circles";
import { mockProfiles } from "@/lib/data/mock/profiles";
import { getInitials } from "@/lib/utils";

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
      <FadeIn>
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-ink mb-2">
            Circles
          </h1>
          <p className="text-muted-foreground">
            Join neighborhood groups to swap locally and build community.
          </p>
        </div>
      </FadeIn>

      <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockCircles.map((circle) => {
          const isJoined = joinedCircles.includes(circle.id);
          const isExpanded = expandedCircle === circle.id;
          // Assign some random members for display
          const members = mockProfiles.slice(0, Math.min(circle.member_count, 6));

          return (
            <StaggerItem key={circle.id}>
              <div className="bg-white rounded-xl border border-cream-200 overflow-hidden">
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
                    <h3 className="font-heading text-xl font-bold text-white">
                      {circle.name}
                    </h3>
                    <div className="flex items-center gap-3 text-white/80 text-xs mt-1">
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
                  <p className="text-sm text-ink/70 mb-4 leading-relaxed">
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
                          <AvatarFallback className="text-[9px] bg-cream">
                            {getInitials(member.name)}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {circle.member_count > 5 && (
                        <div className="h-7 w-7 rounded-full bg-cream border-2 border-white flex items-center justify-center">
                          <span className="text-[9px] font-medium text-ink/60">
                            +{circle.member_count - 5}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => toggleJoin(circle.id)}
                      variant={isJoined ? "outline" : "default"}
                      className={`flex-1 rounded-full text-sm ${
                        isJoined
                          ? "border-cream-300 text-ink/70"
                          : "bg-terracotta hover:bg-terracotta-600 text-white"
                      }`}
                    >
                      {isJoined ? "Joined" : "Join Circle"}
                    </Button>
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
                    <div className="mt-4 pt-4 border-t border-cream-200 space-y-3">
                      <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
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
                              <AvatarFallback className="text-[10px] bg-cream">
                                {getInitials(member.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">
                                {member.name}
                              </p>
                              <p className="text-[11px] text-muted-foreground">
                                {member.neighborhood} ·{" "}
                                {member.swaps_completed} swaps
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide pt-2">
                        Recent Activity
                      </h4>
                      <div className="space-y-2 text-sm text-ink/70">
                        <p>
                          <span className="font-medium text-ink">
                            {members[0]?.name}
                          </span>{" "}
                          listed a new item
                        </p>
                        <p>
                          <span className="font-medium text-ink">
                            {members[1]?.name}
                          </span>{" "}
                          completed a swap
                        </p>
                        <p>
                          <span className="font-medium text-ink">
                            {members[2]?.name}
                          </span>{" "}
                          joined the circle
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerChildren>
    </div>
  );
}
