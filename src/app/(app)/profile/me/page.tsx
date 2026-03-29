"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Camera, MapPin, Edit2 } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export const dynamic = "force-dynamic";

interface Profile {
  display_name?: string;
  location?: string;
  bio?: string;
  avatar_url?: string;
  children_ages?: string;
}

export default function MyProfilePage() {
  const router = useRouter();
  const supabase = createClient();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { router.replace("/auth"); return; }
      setEmail(user.email || "");
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();
      setProfile(data || {});
      setLoading(false);
    });
  }, [router, supabase]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const name = profile?.display_name || email.split("@")[0] || "You";
  const initials = name.charAt(0).toUpperCase();

  return (
    <div className="px-4 pt-8 pb-24 max-w-lg mx-auto">
      {/* Profile header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start gap-4 mb-6"
      >
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-primary/10 overflow-hidden flex items-center justify-center">
            {profile?.avatar_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={profile.avatar_url} alt={name} className="w-full h-full object-cover" />
            ) : (
              <span className="font-heading text-3xl text-primary">{initials}</span>
            )}
          </div>
        </div>
        <div className="flex-1 pt-1">
          <h1 className="font-heading text-2xl text-foreground">{name}</h1>
          {profile?.location && (
            <div className="flex items-center gap-1 mt-1">
              <MapPin className="w-3.5 h-3.5 text-foreground/40" />
              <span className="font-body text-sm text-foreground/50">{profile.location}</span>
            </div>
          )}
          {profile?.children_ages && (
            <p className="font-body text-xs text-primary mt-1">{profile.children_ages}</p>
          )}
          {profile?.bio && (
            <p className="font-body text-sm text-foreground/60 mt-2 leading-relaxed">{profile.bio}</p>
          )}
        </div>
        <Link href="/profile/edit">
          <button className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-card transition-colors">
            <Edit2 className="w-4 h-4 text-foreground/50" />
          </button>
        </Link>
      </motion.div>

      {/* Empty profile nudge */}
      {!profile?.display_name && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-primary/5 border border-primary/20 rounded-2xl p-4 mb-6"
        >
          <p className="font-heading text-sm text-primary mb-1">Complete your profile</p>
          <p className="font-body text-xs text-foreground/50 mb-3">Add your name, neighborhood, and a photo so other moms can find you.</p>
          <Link href="/profile/edit">
            <button className="px-5 py-2 bg-primary text-white rounded-full font-heading text-sm flex items-center gap-2">
              <Camera className="w-3.5 h-3.5" /> Add a photo
            </button>
          </Link>
        </motion.div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Listed", value: "0" },
          { label: "Swapped", value: "0" },
          { label: "Circles", value: "0" },
        ].map((stat) => (
          <div key={stat.label} className="bg-card rounded-2xl p-3 text-center border border-border">
            <p className="font-heading text-2xl text-primary">{stat.value}</p>
            <p className="font-body text-xs text-foreground/50">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="space-y-3">
        <Link href="/list">
          <div className="flex items-center justify-between p-4 bg-card rounded-2xl border border-border">
            <div>
              <p className="font-heading text-base text-foreground">Share something</p>
              <p className="font-body text-xs text-foreground/50">List an item for swap or free</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-heading text-lg">+</span>
            </div>
          </div>
        </Link>
        <Link href="/browse">
          <div className="flex items-center justify-between p-4 bg-card rounded-2xl border border-border">
            <div>
              <p className="font-heading text-base text-foreground">My wishlist</p>
              <p className="font-body text-xs text-foreground/50">Items you&apos;ve saved</p>
            </div>
          </div>
        </Link>
        <Link href="/messages">
          <div className="flex items-center justify-between p-4 bg-card rounded-2xl border border-border">
            <div>
              <p className="font-heading text-base text-foreground">Messages</p>
              <p className="font-body text-xs text-foreground/50">Swap conversations</p>
            </div>
          </div>
        </Link>
        <Link href="/trust">
          <div className="flex items-center justify-between p-4 bg-card rounded-2xl border border-border">
            <div>
              <p className="font-heading text-base text-foreground">Trust & Safety</p>
              <p className="font-body text-xs text-foreground/50">How we keep Skifte safe</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
