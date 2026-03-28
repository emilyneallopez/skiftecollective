import Link from "next/link";
import Image from "next/image";
import { APP_NAME } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="bg-cream border-t border-cream-200 pb-24 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="inline-block">
              <Image src="/logo.png" alt="Skifte Collective" width={120} height={48} className="h-12 w-auto object-contain" />
            </Link>
            <p className="mt-2 text-sm text-terracotta/60">A community for moms, in every neighborhood.</p>
          </div>
          <div>
            <h4 className="font-heading font-medium text-sm mb-3 text-ink">Explore</h4>
            <ul className="space-y-2">
              <li><Link href="/browse" className="text-sm text-terracotta/60 hover:text-terracotta transition-colors">Browse Items</Link></li>
              <li><Link href="/circles" className="text-sm text-terracotta/60 hover:text-terracotta transition-colors">Circles</Link></li>
              <li><Link href="/guide" className="text-sm text-terracotta/60 hover:text-terracotta transition-colors">Stage Guide</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-medium text-sm mb-3 text-ink">Community</h4>
            <ul className="space-y-2">
              <li><Link href="/list" className="text-sm text-terracotta/60 hover:text-terracotta transition-colors">List an Item</Link></li>
              <li><Link href="/profile/sarah-chen" className="text-sm text-terracotta/60 hover:text-terracotta transition-colors">My Profile</Link></li>
              <li><Link href="/messages" className="text-sm text-terracotta/60 hover:text-terracotta transition-colors">Messages</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-medium text-sm mb-3 text-ink">About</h4>
            <ul className="space-y-2">
              <li><span className="text-sm text-terracotta/60">How It Works</span></li>
              <li><span className="text-sm text-terracotta/60">Trust & Safety</span></li>
              <li><span className="text-sm text-terracotta/60">Contact Us</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-cream-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {/* Hand-drawn leaf decoration */}
            <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
              <path d="M2 14 Q5 4 10 2 Q15 4 18 14" stroke="#3A6349" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4"/>
              <path d="M10 2 L10 14" stroke="#3A6349" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.3"/>
            </svg>
            <p className="text-xs text-terracotta/60">
              &copy; {new Date().getFullYear()} {APP_NAME}. Made with 🤍 for moms everywhere.
            </p>
          </div>
          <div className="flex gap-6">
            <span className="text-xs text-terracotta/60">Privacy</span>
            <span className="text-xs text-terracotta/60">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
