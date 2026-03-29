"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Camera, MapPin, Edit2 } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export const dynamic = "force-dynamic";

const ease = [0.22, 1, 0.36, 1] as const;

interface Profile {
  display_name?: string;
  location?: string;
  bio?: string;
  avatar_url?: string;
  children_ages?: string;
}

function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (target === 0) return;
    let start = 0;
    const step = Math.max(1, Math.ceil(target / (duration / 30)));
    const interval = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [target, duration]);
  return count;
}

export default function MyProfilePage() {
  const router = useRouter();
  const supabase = createClient();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const listed = useCountUp(0);
  const swapped = useCountUp(0);
  const circles = useCountUp(0);

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

  const stats = [
    { label: "Listed", value: listed },
    { label: "Swapped", value: swapped },
    { label: "Circles", value: circles },
  ];

  const actions = [
    { href: "/list", title: "Share something", desc: "List an item for swap or free", icon: "+" },
    { href: "/browse", title: "My wishlist", desc: "Items you've saved" },
    { href: "/messages", title: "Messages", desc: "Swap conversations" },
    { href: "/trust", title: "Trust & Safety", desc: "How we keep Skifte safe" },
  ];

  return (
    <div className="px-4 pt-8 pb-24 max-w-lg mx-auto">
      {/* Profile header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
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
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-card transition-colors cursor-pointer"
          >
            <Edit2 className="w-4 h-4 text-foreground/50" />
          </motion.button>
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
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 bg-primary text-white rounded-full font-heading text-sm flex items-center gap-2 cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5" /> Add a photo
            </motion.button>
          </Link>
        </motion.div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.06, ease }}
            className="bg-card rounded-2xl p-3 text-center border border-border"
          >
            <p className="font-heading text-2xl text-primary">{stat.value}</p>
            <p className="font-body text-xs text-foreground/50">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="space-y-3">
        {actions.map((action, i) => (
          <motion.div
            key={action.href}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.06, ease }}
            whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}
            whileTap={{ scale: 0.98 }}
          >
            <Link href={action.href}>
              <div className="flex items-center justify-between p-4 bg-card rounded-2xl border border-border cursor-pointer">
                <div>
                  <p className="font-heading text-base text-foreground">{action.title}</p>
                  <p className="font-body text-xs text-foreground/50">{action.desc}</p>
                </div>
                {action.icon && (
                  <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-white font-heading text-lg">{action.icon}</span>
                  </div>
                )}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Empty items nudge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 bg-[#7A9E8A]/10 rounded-2xl p-5 text-center border border-[#E5D5BD]"
      >
        <p className="text-2xl mb-2">🌿</p>
        <p className="font-heading text-base text-[#8B6E5A] mb-1">Share your first item</p>
        <p className="font-body text-sm text-[#8B6E5A]/50 leading-relaxed">Another mom nearby is probably looking for exactly what you have.</p>
        <Link href="/list">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="mt-3 px-5 py-2 bg-primary text-white rounded-full font-heading text-sm cursor-pointer"
          >
            List something →
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}
