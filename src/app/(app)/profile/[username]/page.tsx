"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { MapPin, Star, Package, RefreshCw, Award, ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ItemCard } from "@/components/item-card";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { mockProfiles } from "@/lib/data/mock/profiles";
import { mockItems } from "@/lib/data/mock/items";

import { getInitials } from "@/lib/utils";

export default function ProfilePage() {
  const params = useParams();
  const profile = mockProfiles.find((p) => p.id === params.username);

  if (!profile) {
    // Show current user's empty profile
    return (
      <div className="px-4 pt-10 pb-24 max-w-lg mx-auto">
        <div className="flex flex-col items-center text-center py-10">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <span className="font-heading text-3xl text-primary">?</span>
          </div>
          <h2 className="font-heading text-2xl text-foreground mb-2">Set up your profile</h2>
          <p className="font-body text-sm text-foreground/50 max-w-xs mb-6 leading-relaxed">
            Add your name, neighborhood, and a photo so other moms can find you.
          </p>
          <Link href="/profile/edit">
            <button className="px-8 py-3 bg-primary text-white rounded-full font-heading text-base">
              Set up my profile
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const items = mockItems
    .filter((i) => i.user_id === profile.id)
    .map((item) => ({ ...item, user: profile }));

  const isOwnProfile = profile.id === "sarah-chen";

  const badges = [];
  if (profile.swaps_completed >= 20) badges.push("Super Swapper");
  if (profile.swaps_completed >= 10) badges.push("Trusted");
  if (profile.items_count >= 15) badges.push("Generous");
  if (profile.rating >= 4.9) badges.push("Top Rated");

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <FadeIn>
        <Link
          href="/browse"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-terracotta transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-start gap-6 mb-10">
          <Avatar className="h-24 w-24 border-4 border-white shadow-md">
            <AvatarImage src={profile.avatar_url} />
            <AvatarFallback className="text-2xl bg-[#C96A3A]/10 text-[#C96A3A]">
              {getInitials(profile.name)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="font-heading text-2xl font-bold text-ink">
                  {profile.name}
                </h1>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {profile.neighborhood}
                  </span>
                  <span className="flex items-center gap-0.5">
                    <Star className="h-3.5 w-3.5 fill-terracotta text-terracotta" />
                    {profile.rating}
                  </span>
                </div>
              </div>
              {isOwnProfile && (
                <Link href="/profile/edit">
                  <Button
                    variant="outline"
                    className="rounded-full border-primary/30 text-primary text-sm font-heading"
                  >
                    Edit Profile
                  </Button>
                </Link>
              )}
            </div>

            <p className="text-sm text-ink/70 mt-3 max-w-lg leading-relaxed">
              {profile.bio}
            </p>

            {/* Stats */}
            <div className="flex gap-6 mt-4">
              <div className="text-center">
                <div className="flex items-center gap-1.5 text-sm font-semibold text-ink">
                  <Package className="h-4 w-4 text-terracotta" />
                  {profile.items_count}
                </div>
                <p className="text-[11px] text-muted-foreground">Listed</p>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-1.5 text-sm font-semibold text-ink">
                  <RefreshCw className="h-4 w-4 text-forest" />
                  {profile.swaps_completed}
                </div>
                <p className="text-[11px] text-muted-foreground">Swaps</p>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-1.5 text-sm font-semibold text-ink">
                  <Award className="h-4 w-4 text-terracotta" />
                  {badges.length}
                </div>
                <p className="text-[11px] text-muted-foreground">Badges</p>
              </div>
            </div>

            {/* Badges */}
            {badges.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {badges.map((badge) => (
                  <Badge
                    key={badge}
                    variant="secondary"
                    className="bg-terracotta/10 text-terracotta text-xs"
                  >
                    {badge}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </FadeIn>

      {/* Tabs */}
      <Tabs defaultValue="closet" className="w-full">
        <TabsList className="bg-cream w-full justify-start rounded-lg h-11 p-1">
          <TabsTrigger
            value="closet"
            className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm px-6"
          >
            My Closet ({items.length})
          </TabsTrigger>
          <TabsTrigger
            value="wishlist"
            className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm px-6"
          >
            Wishlist
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm px-6"
          >
            Reviews
          </TabsTrigger>
        </TabsList>

        <TabsContent value="closet" className="mt-6">
          {items.length > 0 ? (
            <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <StaggerItem key={item.id}>
                  <ItemCard item={item} />
                </StaggerItem>
              ))}
            </StaggerChildren>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No items listed yet.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="wishlist" className="mt-6">
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-2">No wishlist items yet.</p>
            <p className="text-sm text-muted-foreground">
              Heart items while browsing to add them to your wishlist.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <div className="space-y-4">
            {[
              {
                reviewer: "Maya Johnson",
                avatar: "",
                rating: 5,
                comment: "Sarah is the best! The rompers were in perfect condition and she was so friendly at pickup. Would swap again anytime.",
                date: "2 weeks ago",
              },
              {
                reviewer: "Priya Patel",
                avatar: "",
                rating: 5,
                comment: "Quick to respond, items exactly as described. Love being in the same circle!",
                date: "1 month ago",
              },
              {
                reviewer: "Olivia Nguyen",
                avatar: "",
                rating: 5,
                comment: "The magnetic tiles were amazing — my son is obsessed. Thank you Sarah!",
                date: "1 month ago",
              },
            ].map((review, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-cream"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={review.avatar} />
                    <AvatarFallback className="text-xs bg-terracotta/10 text-terracotta">
                      {getInitials(review.reviewer)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{review.reviewer}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {Array.from({ length: review.rating }).map((_, j) => (
                          <Star
                            key={j}
                            className="h-3 w-3 fill-terracotta text-terracotta"
                          />
                        ))}
                      </div>
                      <span className="text-[11px] text-muted-foreground">
                        {review.date}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-ink/70">{review.comment}</p>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
