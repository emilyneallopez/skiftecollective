import Link from "next/link";
import Image from "next/image";
import { APP_NAME, APP_TAGLINE } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="bg-cream border-t border-cream-200 pb-24 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="inline-block">
              <Image src="/logo.jpg" alt="Skifte Collective" width={120} height={48} className="h-12 w-auto object-contain" />
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">{APP_TAGLINE}</p>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-3">Explore</h4>
            <ul className="space-y-2">
              <li><Link href="/browse" className="text-sm text-muted-foreground hover:text-terracotta transition-colors">Browse Items</Link></li>
              <li><Link href="/circles" className="text-sm text-muted-foreground hover:text-terracotta transition-colors">Circles</Link></li>
              <li><Link href="/guide" className="text-sm text-muted-foreground hover:text-terracotta transition-colors">Stage Guide</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-3">Community</h4>
            <ul className="space-y-2">
              <li><Link href="/list" className="text-sm text-muted-foreground hover:text-terracotta transition-colors">List an Item</Link></li>
              <li><Link href="/profile/sarah-chen" className="text-sm text-muted-foreground hover:text-terracotta transition-colors">My Profile</Link></li>
              <li><Link href="/messages" className="text-sm text-muted-foreground hover:text-terracotta transition-colors">Messages</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-3">About</h4>
            <ul className="space-y-2">
              <li><span className="text-sm text-muted-foreground">How It Works</span></li>
              <li><span className="text-sm text-muted-foreground">Trust & Safety</span></li>
              <li><span className="text-sm text-muted-foreground">Contact Us</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-cream-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {APP_NAME}. Made with love in Brooklyn.
          </p>
          <div className="flex gap-6">
            <span className="text-xs text-muted-foreground">Privacy</span>
            <span className="text-xs text-muted-foreground">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
