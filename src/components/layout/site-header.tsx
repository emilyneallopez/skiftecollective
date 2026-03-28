"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, Search, Bell, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-warm-white/80 backdrop-blur-md border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image src="/skifte-logo.png" alt="Skifte Collective" width={100} height={40} className="h-10 w-auto object-contain" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-terracotta",
                  pathname === link.href
                    ? "text-terracotta"
                    : "text-ink/70"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/browse">
              <Button variant="ghost" size="icon" className="text-ink/60 hover:text-terracotta">
                <Search className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/messages">
              <Button variant="ghost" size="icon" className="relative text-ink/60 hover:text-terracotta">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-terracotta text-[10px] text-white flex items-center justify-center font-medium">
                  3
                </span>
              </Button>
            </Link>
            <Link href="/list">
              <Button className="bg-terracotta hover:bg-terracotta-600 text-white gap-1.5 rounded-full px-5">
                <Plus className="h-4 w-4" />
                List Item
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="https://picsum.photos/seed/sarah/200/200" />
                    <AvatarFallback className="bg-cream text-terracotta text-sm">SC</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/profile/sarah-chen">My Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/messages">Messages</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/auth">Sign Out</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-2">
            <Link href="/list">
              <Button size="icon" className="bg-terracotta hover:bg-terracotta-600 text-white rounded-full h-9 w-9">
                <Plus className="h-4 w-4" />
              </Button>
            </Link>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 bg-warm-white">
                <SheetTitle>
                  <Image src="/skifte-logo.png" alt="Skifte Collective" width={100} height={40} className="h-10 w-auto object-contain" />
                </SheetTitle>
                <nav className="flex flex-col gap-1 mt-8">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                        pathname === link.href
                          ? "bg-cream text-terracotta"
                          : "text-ink/70 hover:bg-cream hover:text-terracotta"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    href="/messages"
                    onClick={() => setMobileOpen(false)}
                    className="px-3 py-2.5 rounded-lg text-sm font-medium text-ink/70 hover:bg-cream hover:text-terracotta"
                  >
                    Messages
                  </Link>
                  <Link
                    href="/profile/sarah-chen"
                    onClick={() => setMobileOpen(false)}
                    className="px-3 py-2.5 rounded-lg text-sm font-medium text-ink/70 hover:bg-cream hover:text-terracotta"
                  >
                    My Profile
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
