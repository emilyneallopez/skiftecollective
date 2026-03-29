import Link from "next/link";
import Image from "next/image";

export function SiteFooter() {
  return (
    <footer className="bg-[#FAF5EF] border-t border-[#E5D5BD] pb-24 md:pb-0">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div>
            <Link href="/" className="inline-block">
              <Image src="/skifte-logo.png" alt="Skifte Collective" width={120} height={48} className="h-10 w-auto object-contain" />
            </Link>
            <p className="mt-2 font-body text-sm text-[#8B6E5A]/50">The neighborhood network for modern motherhood.</p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2 md:justify-end">
            <Link href="/browse" className="font-body text-sm text-[#8B6E5A]/60 hover:text-[#C96A3A] transition-colors">Browse</Link>
            <Link href="/circles" className="font-body text-sm text-[#8B6E5A]/60 hover:text-[#C96A3A] transition-colors">Circles</Link>
            <Link href="/first-year" className="font-body text-sm text-[#8B6E5A]/60 hover:text-[#C96A3A] transition-colors">First Year Map</Link>
            <Link href="/trust" className="font-body text-sm text-[#8B6E5A]/60 hover:text-[#C96A3A] transition-colors">Trust & Safety</Link>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-[#E5D5BD]">
          <p className="font-body text-xs text-[#8B6E5A]/40 italic">
            Made with love for moms everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}
