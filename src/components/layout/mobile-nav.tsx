"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Search, PlusCircle, MessageCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/browse", label: "Browse", icon: Search },
  { href: "/list", label: "List", icon: PlusCircle },
  { href: "/messages", label: "Messages", icon: MessageCircle },
  { href: "/profile/sarah-chen", label: "Profile", icon: User },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-cream-200 safe-area-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {links.map((link) => {
          const isActive = pathname.startsWith(link.href);
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex flex-col items-center gap-1 py-1 px-3"
            >
              <motion.div
                whileTap={{ scale: 0.85 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 transition-colors",
                    isActive ? "text-terracotta" : "text-ink/40"
                  )}
                />
              </motion.div>
              <span
                className={cn(
                  "text-[10px] font-medium transition-colors",
                  isActive ? "text-terracotta" : "text-ink/40"
                )}
              >
                {link.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
