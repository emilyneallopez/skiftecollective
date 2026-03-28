"use client";

import Link from "next/link";
import { Baby, ArrowRight, Sparkles, PackageCheck, Lightbulb, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FadeIn, FadeInOnScroll } from "@/components/motion/fade-in";
import { mockStages } from "@/lib/data/mock/stages";

const stageColors: Record<string, string> = {
  newborn: "bg-terracotta-50 border-terracotta-200",
  infant: "bg-forest-50 border-forest-200",
  toddler: "bg-terracotta-50 border-terracotta-200",
  "big-kid": "bg-forest-50 border-forest-200",
  "school-age": "bg-terracotta-50 border-terracotta-200",
};

const stageAccentColors: Record<string, string> = {
  newborn: "text-terracotta",
  infant: "text-forest",
  toddler: "text-terracotta",
  "big-kid": "text-forest",
  "school-age": "text-terracotta",
};

export default function GuidePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <FadeIn>
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-terracotta/10 mb-4">
            <Baby className="h-6 w-6 text-terracotta" />
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-ink mb-3">
            The Baby Stage Guide
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Your stage-by-stage guide to what to swap, what to keep, and how to make the most
            of every phase. Think of it as a cheat sheet for smart parenting.
          </p>
        </div>
      </FadeIn>

      <div className="space-y-4">
        <Accordion type="single" collapsible className="space-y-4">
          {mockStages.map((stage, index) => (
            <FadeInOnScroll key={stage.id} delay={index * 0.05}>
              <AccordionItem
                value={stage.id}
                className={`border rounded-xl overflow-hidden ${stageColors[stage.id] || "bg-cream border-cream-200"}`}
              >
                <AccordionTrigger className="px-6 py-5 hover:no-underline [&[data-state=open]>div>.arrow]:rotate-90">
                  <div className="flex items-center gap-4 text-left">
                    <div
                      className={`text-3xl font-heading font-bold ${stageAccentColors[stage.id] || "text-terracotta"}`}
                    >
                      {stage.age_range}
                    </div>
                    <div>
                      <h2 className="font-heading text-xl font-semibold text-ink">
                        {stage.name}
                      </h2>
                      <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
                        {stage.description.slice(0, 80)}...
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-8 pt-2">
                    {/* Description */}
                    <p className="text-sm text-ink/70 leading-relaxed">
                      {stage.description}
                    </p>

                    {/* What to swap */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="h-4 w-4 text-terracotta" />
                        <h3 className="font-medium text-sm">What to Swap Now</h3>
                      </div>
                      <ul className="space-y-2">
                        {stage.what_to_swap.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-ink/70">
                            <span className="text-terracotta mt-1">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* What to keep */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <PackageCheck className="h-4 w-4 text-forest" />
                        <h3 className="font-medium text-sm">What to Hold Onto</h3>
                      </div>
                      <ul className="space-y-2">
                        {stage.what_to_keep.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-ink/70">
                            <span className="text-forest mt-1">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tips */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Lightbulb className="h-4 w-4 text-terracotta" />
                        <h3 className="font-medium text-sm">Swap Tips</h3>
                      </div>
                      <ul className="space-y-2">
                        {stage.tips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-ink/70">
                            <span className="text-terracotta/60 mt-1">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Recommended categories */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <ShoppingBag className="h-4 w-4 text-forest" />
                        <h3 className="font-medium text-sm">Browse by Category</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {stage.recommended_categories.map((cat) => (
                          <Link key={cat} href={`/browse?category=${cat}`}>
                            <Badge
                              variant="secondary"
                              className="bg-white hover:bg-white/80 cursor-pointer capitalize"
                            >
                              {cat}
                              <ArrowRight className="h-3 w-3 ml-1" />
                            </Badge>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </FadeInOnScroll>
          ))}
        </Accordion>
      </div>

      {/* CTA */}
      <FadeInOnScroll>
        <div className="text-center mt-12 p-8 bg-cream rounded-2xl">
          <h3 className="font-heading text-xl font-semibold mb-2">
            Ready to start swapping?
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            List items your little one has outgrown and discover what others have to share.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/list">
              <Button className="bg-terracotta hover:bg-terracotta-600 text-white rounded-full px-8 gap-2">
                List an Item
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/browse">
              <Button
                variant="outline"
                className="rounded-full px-8 border-cream-300"
              >
                Browse Items
              </Button>
            </Link>
          </div>
        </div>
      </FadeInOnScroll>
    </div>
  );
}
