"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, Camera, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FadeIn } from "@/components/motion/fade-in";
import { CATEGORIES, CONDITIONS, LISTING_TYPES, SIZES } from "@/lib/constants";

const STEPS = ["Photos", "Details", "Confirm"];

export default function ListItemPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [photos, setPhotos] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [brand, setBrand] = useState("");
  const [condition, setCondition] = useState("");
  const [listingType, setListingType] = useState("swap");
  const [neighborhood, setNeighborhood] = useState("Park Slope");
  const [zip, setZip] = useState("11215");
  const [submitted, setSubmitted] = useState(false);

  const addPlaceholderPhoto = () => {
    if (photos.length < 5) {
      const localPhotos = ["/linen-bloomers.jpg", "/wooden-toy.jpg", "/onesie-bundle.jpg", "/board-books.jpg", "/baby-bouncer.jpg", "/maternity-dress.jpg"];
      setPhotos([...photos, localPhotos[photos.length % localPhotos.length]]);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const canProceed = () => {
    if (step === 0) return photos.length > 0;
    if (step === 1) return title && category && size && condition && listingType;
    return true;
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => router.push("/browse"), 2500);
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-forest/10 mb-6"
        >
          <Check className="h-10 w-10 text-forest" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="font-heading text-2xl font-bold mb-2">Listed!</h1>
          <p className="text-muted-foreground">
            Your item is now live. We&apos;ll notify you when someone is interested.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <FadeIn>
        <h1 className="font-heading text-2xl text-[#3B1F0E] mb-2">Share something</h1>
        <p className="font-body text-[#3B1F0E]/50 mb-8">
          Give something great a second life.
        </p>
      </FadeIn>

      {/* Progress Bar */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  i <= step
                    ? "bg-terracotta text-white"
                    : "bg-cream text-ink/40"
                }`}
              >
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span
                className={`text-sm hidden sm:block ${
                  i <= step ? "text-ink font-medium" : "text-ink/40"
                }`}
              >
                {s}
              </span>
            </div>
          ))}
        </div>
        <div className="h-1.5 bg-cream rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-terracotta rounded-full"
            initial={false}
            animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Photos */}
        {step === 0 && (
          <motion.div
            key="photos"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="font-heading text-lg font-semibold mb-1">Add Photos</h2>
              <p className="text-sm text-muted-foreground">
                Up to 5 photos. Tap to add a placeholder image.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {photos.map((photo, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden">
                  <Image
                    src={photo}
                    alt={`Photo ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                  <button
                    onClick={() => removePhoto(i)}
                    className="absolute top-2 right-2 h-6 w-6 rounded-full bg-black/50 flex items-center justify-center"
                  >
                    <X className="h-3 w-3 text-white" />
                  </button>
                  {i === 0 && (
                    <span className="absolute bottom-2 left-2 text-[10px] font-medium bg-white/80 backdrop-blur rounded px-1.5 py-0.5">
                      Cover
                    </span>
                  )}
                </div>
              ))}
              {photos.length < 5 && (
                <button
                  onClick={addPlaceholderPhoto}
                  className="aspect-square rounded-xl border-2 border-dashed border-cream-300 flex flex-col items-center justify-center gap-2 hover:border-terracotta/50 hover:bg-cream transition-all"
                >
                  <Camera className="h-6 w-6 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Add Photo</span>
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* Step 2: Details */}
        {step === 1 && (
          <motion.div
            key="details"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="font-heading text-lg font-semibold mb-1">Item Details</h2>
              <p className="text-sm text-muted-foreground">
                Tell other moms about this item.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-body font-medium text-[#3B1F0E]/70 mb-1.5 block">Title</label>
                <Input
                  placeholder="e.g., Organic Cotton Romper Set"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="h-11 rounded-lg"
                />
              </div>

              <div>
                <label className="text-sm font-body font-medium text-[#3B1F0E]/70 mb-1.5 block">Description</label>
                <Textarea
                  placeholder="Describe the item — condition details, what it comes with, why you love it..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="resize-none rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-body font-medium text-[#3B1F0E]/70 mb-1.5 block">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.value}
                        onClick={() => setCategory(cat.value)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          category === cat.value
                            ? "bg-terracotta text-white"
                            : "bg-cream text-ink/70 hover:bg-cream-200"
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-body font-medium text-[#3B1F0E]/70 mb-1.5 block">Size</label>
                  <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                    {SIZES.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                          size === s
                            ? "bg-terracotta text-white"
                            : "bg-cream text-ink/70 hover:bg-cream-200"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-body font-medium text-[#3B1F0E]/70 mb-1.5 block">Brand</label>
                <Input
                  placeholder="e.g., Carter's, Hanna Andersson"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="h-11 rounded-lg"
                />
              </div>

              <div>
                <label className="text-sm font-body font-medium text-[#3B1F0E]/70 mb-1.5 block">Condition</label>
                <div className="flex flex-wrap gap-2">
                  {CONDITIONS.map((cond) => (
                    <button
                      key={cond.value}
                      onClick={() => setCondition(cond.value)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        condition === cond.value
                          ? "bg-terracotta text-white"
                          : "bg-cream text-ink/70 hover:bg-cream-200"
                      }`}
                    >
                      {cond.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-body font-medium text-[#3B1F0E]/70 mb-1.5 block">Listing Type</label>
                <div className="flex flex-wrap gap-2">
                  {LISTING_TYPES.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setListingType(type.value)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        listingType === type.value
                          ? "bg-terracotta text-white"
                          : "bg-cream text-ink/70 hover:bg-cream-200"
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>


            </div>
          </motion.div>
        )}

        {/* Step 3: Confirm */}
        {step === 2 && (
          <motion.div
            key="confirm"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="font-heading text-lg font-semibold mb-1">Almost there!</h2>
              <p className="text-sm text-muted-foreground">
                Confirm your location and review your listing.
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-body font-medium text-[#3B1F0E]/70 mb-1.5 block">Neighborhood</label>
                  <Input
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    className="h-11 rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-sm font-body font-medium text-[#3B1F0E]/70 mb-1.5 block">ZIP Code</label>
                  <Input
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    className="h-11 rounded-lg"
                  />
                </div>
              </div>

              {/* Preview */}
              <div className="bg-cream rounded-xl p-6 space-y-4">
                <h3 className="font-medium text-sm text-muted-foreground">Preview</h3>
                <div className="flex gap-4">
                  {photos[0] && (
                    <div className="relative h-24 w-24 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={photos[0]}
                        alt="Preview"
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-sm">{title || "Untitled"}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {category || "Category"} · {size || "Size"} · {CONDITIONS.find(c => c.value === condition)?.label || "Condition"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {neighborhood} · {LISTING_TYPES.find(l => l.value === listingType)?.label}
                      
                    </p>
                  </div>
                </div>
                {description && (
                  <p className="text-xs text-muted-foreground line-clamp-3">{description}</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between mt-10 pt-6 border-t border-cream-200">
        <Button
          variant="ghost"
          onClick={() => setStep(step - 1)}
          disabled={step === 0}
          className="gap-1 rounded-full"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>

        {step < STEPS.length - 1 ? (
          <Button
            onClick={() => setStep(step + 1)}
            disabled={!canProceed()}
            className="bg-terracotta hover:bg-terracotta-600 text-white rounded-full px-6 gap-1"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            className="bg-forest hover:bg-forest-600 text-white rounded-full px-8"
          >
            Publish Listing
          </Button>
        )}
      </div>
    </div>
  );
}
