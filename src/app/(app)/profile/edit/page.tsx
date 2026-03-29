"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Camera, ArrowLeft, Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export const dynamic = "force-dynamic";

export default function EditProfilePage() {
  const router = useRouter();
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [displayName, setDisplayName] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [bio, setBio] = useState("");
  const [children, setChildren] = useState<string[]>([]);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarUrl(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/auth"); return; }

      let photoUrl = avatarUrl;

      // Upload photo if selected
      if (avatarFile) {
        const ext = avatarFile.name.split(".").pop();
        const path = `avatars/${user.id}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(path, avatarFile, { upsert: true });
        if (!uploadError) {
          const { data } = supabase.storage.from("avatars").getPublicUrl(path);
          photoUrl = data.publicUrl;
        }
      }

      await supabase.from("profiles").upsert({
        user_id: user.id,
        display_name: displayName || undefined,
        location: neighborhood || undefined,
        bio: bio || undefined,
          children_ages: children.length > 0 ? children.join(', ') : undefined,
        avatar_url: photoUrl || undefined,
        updated_at: new Date().toISOString(),
      });

      setSaved(true);
      setTimeout(() => router.push("/profile/me"), 1000);
    } catch {
      // continue
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 pt-8 pb-24 max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => router.back()} className="p-2 -ml-2 rounded-full hover:bg-card transition-colors">
          <ArrowLeft className="w-5 h-5 text-foreground/70" />
        </button>
        <h1 className="font-heading text-2xl text-foreground">Edit Profile</h1>
      </div>

      {/* Photo upload */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-24 h-24 rounded-full bg-primary/10 border-2 border-dashed border-primary/30 flex items-center justify-center cursor-pointer overflow-hidden"
          >
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <Camera className="w-8 h-8 text-primary/40" />
            )}
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-md"
          >
            <Camera className="w-4 h-4" />
          </button>
        </div>
        <p className="font-body text-xs text-foreground/40 mt-3">Tap to upload a photo</p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handlePhotoSelect}
          className="hidden"
        />
      </div>

      {/* Form */}
      <div className="space-y-4">
        <div>
          <label className="block font-body text-sm font-semibold text-foreground/60 mb-2">Display name</label>
          <input
            type="text"
            placeholder="What should moms call you?"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full px-4 py-3 bg-card border border-border rounded-2xl font-body text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
          />
        </div>

        <div>
          <label className="block font-body text-sm font-semibold text-foreground/60 mb-2">Neighborhood</label>
          <input
            type="text"
            placeholder="e.g. Park Slope, Brooklyn"
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
            className="w-full px-4 py-3 bg-card border border-border rounded-2xl font-body text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
          />
        </div>

        <div>
          <label className="block font-body text-sm font-semibold text-foreground/60 mb-2">About you <span className="font-normal text-foreground/30">(optional)</span></label>
          <textarea
            placeholder="A little about you and your family..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 bg-card border border-border rounded-2xl font-body text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
          />
        </div>


        <div>
          <label className="block font-body text-sm font-semibold text-foreground/60 mb-2">
            How old are your little ones?
          </label>
          <p className="font-body text-xs text-foreground/30 mb-3">Helps match you with the right swaps nearby.</p>
          <div className="flex flex-wrap gap-2">
            {["Pregnant", "Newborn (0-3m)", "3-6 months", "6-12 months", "1-2 years", "2-3 years", "3-5 years", "5+ years"].map((stage) => {
              const selected = children.includes(stage);
              return (
                <motion.button
                  key={stage}
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setChildren(prev => selected ? prev.filter(s => s !== stage) : [...prev, stage])}
                  className={`px-4 py-2 rounded-full text-sm font-body transition-colors border ${
                    selected
                      ? "bg-primary text-white border-primary"
                      : "bg-card text-foreground/60 border-border hover:border-primary/40"
                  }`}
                >
                  {stage}
                </motion.button>
              );
            })}
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSave}
          disabled={loading}
          className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-full font-heading text-base flex items-center justify-center gap-2 transition-colors mt-4"
        >
          {saved ? (
            <><Check className="w-4 h-4" /> Saved!</>
          ) : loading ? (
            "Saving..."
          ) : (
            "Save profile"
          )}
        </motion.button>
      </div>
    </div>
  );
}
