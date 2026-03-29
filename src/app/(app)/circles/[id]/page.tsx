"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Users, MapPin, Calendar, Check, MessageCircle, Lock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockCircles } from "@/lib/data/mock/circles";
import { mockProfiles } from "@/lib/data/mock/profiles";
import { getInitials } from "@/lib/utils";

const mockEvents = [
  {
    id: "ev-1",
    title: "Spring Swap Meet",
    date: "Saturday, April 12 · 10am",
    location: "Prospect Park",
    description: "Bring your gently-used baby clothes and gear. Meet your neighbors, swap stuff, and let the kids run wild.",
    rsvps: 24,
  },
  {
    id: "ev-2",
    title: "Toy Exchange + Playdate",
    date: "Sunday, April 20 · 2pm",
    location: "Local playground TBD",
    description: "Swap toys while the kids play. Coffee and snacks provided.",
    rsvps: 17,
  },
  {
    id: "ev-3",
    title: "New Mom Welcome Meetup",
    date: "Thursday, April 24 · 11am",
    location: "Local coffee shop",
    description: "New to the neighborhood or just had a baby? Come meet other moms.",
    rsvps: 11,
  },
];

export default function CircleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const circle = mockCircles.find((c) => c.id === params.id) || mockCircles[0];
  const members = mockProfiles.slice(0, 8);

  const [joined, setJoined] = useState(false);
  const [showJoinCelebration, setShowJoinCelebration] = useState(false);
  const [rsvpd, setRsvpd] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("skifte_joined_circles");
    const joinedList = stored ? JSON.parse(stored) : ["circle-1", "circle-4"];
    if (joinedList.includes(params.id)) setJoined(true);
  }, [params.id]);

  const handleJoin = () => {
    setJoined(true);
    setShowJoinCelebration(true);
    const stored = localStorage.getItem("skifte_joined_circles");
    const joinedList = stored ? JSON.parse(stored) : [];
    if (!joinedList.includes(params.id)) {
      localStorage.setItem("skifte_joined_circles", JSON.stringify([...joinedList, params.id]));
    }
    setTimeout(() => setShowJoinCelebration(false), 3000);
  };

  const toggleRsvp = (eventId: string) => {
    setRsvpd((prev) =>
      prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]
    );
  };

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="relative h-52 bg-gradient-to-br from-primary/30 to-secondary/30">
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 z-10 w-9 h-9 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-white" />
        </button>
        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="font-heading text-2xl text-white mb-1">{circle.name}</h1>
          <div className="flex items-center gap-3 text-white/80 text-xs font-body">
            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{circle.neighborhood}</span>
            <span className="flex items-center gap-1"><Users className="h-3 w-3" />{circle.member_count} members</span>
          </div>
        </div>
      </div>

      <div className="px-4 pt-5 space-y-5">

        {/* About */}
        <p className="font-body text-sm text-foreground/70 leading-relaxed">{circle.description}</p>

        {/* Join / Joined button */}
        <AnimatePresence mode="wait">
          {!joined ? (
            <motion.button
              key="join"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleJoin}
              className="w-full h-12 bg-primary text-white rounded-full font-heading text-base active:opacity-80 cursor-pointer"
            >
              Join this circle
            </motion.button>
          ) : (
            <motion.div
              key="joined"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full h-12 bg-secondary/15 border border-secondary/30 rounded-full flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4 text-secondary" />
              <span className="font-heading text-base text-secondary">You&apos;re in this circle</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Join celebration */}
        <AnimatePresence>
          {showJoinCelebration && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-secondary/10 border border-secondary/20 rounded-2xl p-4 text-center"
            >
              <p className="font-heading text-lg text-secondary">Welcome to the circle!</p>
              <p className="font-body text-sm text-foreground/60 mt-1">
                You can now see events, meet members, and start chatting.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* GATED CONTENT — only visible after joining */}
        {!joined ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-card border border-border rounded-2xl p-6 text-center"
          >
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
              <Lock className="w-5 h-5 text-foreground/30" />
            </div>
            <p className="font-heading text-base text-foreground mb-1">Join to see inside</p>
            <p className="font-body text-sm text-foreground/50 leading-relaxed">
              Events, members, and conversations are only visible to moms in this circle.
            </p>
          </motion.div>
        ) : (
          <>
            {/* Upcoming Events */}
            <div>
              <h2 className="font-heading text-xl text-[#7A9E8A] mb-3">Upcoming Events</h2>
              <div className="space-y-3">
                {mockEvents.map((event, i) => {
                  const isGoing = rsvpd.includes(event.id);
                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="bg-card rounded-2xl border border-border p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <h3 className="font-heading text-base text-foreground mb-1">{event.title}</h3>
                          <div className="flex items-center gap-1 mb-1">
                            <Calendar className="w-3 h-3 text-primary flex-shrink-0" />
                            <span className="font-body text-xs text-primary">{event.date}</span>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            <MapPin className="w-3 h-3 text-foreground/40 flex-shrink-0" />
                            <span className="font-body text-xs text-foreground/50">{event.location}</span>
                          </div>
                          <p className="font-body text-xs text-foreground/60 leading-relaxed">{event.description}</p>
                          <p className="font-body text-xs text-foreground/40 mt-2">{event.rsvps + (isGoing ? 1 : 0)} going</p>
                        </div>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => toggleRsvp(event.id)}
                          className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-heading transition-colors ${
                            isGoing
                              ? "bg-secondary/15 text-secondary border border-secondary/30"
                              : "bg-primary text-white"
                          }`}
                        >
                          {isGoing ? "Going ✓" : "RSVP"}
                        </motion.button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Members */}
            <div>
              <h2 className="font-heading text-xl text-[#7A9E8A] mb-3">Members</h2>
              <div className="space-y-3">
                {members.map((member, i) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="flex items-center gap-3"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={member.avatar_url} />
                      <AvatarFallback className="bg-primary/10 text-primary font-heading text-sm">
                        {getInitials(member.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-heading text-sm text-foreground">{member.name}</p>
                      <p className="font-body text-xs text-foreground/50">{member.neighborhood} · {member.swaps_completed} swaps</p>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => router.push("/messages")}
                      className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center active:bg-primary/20"
                    >
                      <MessageCircle className="w-4 h-4 text-primary" />
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
