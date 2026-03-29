"use client";

import { Home, Search, PlusCircle, Users, User } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState } from 'react';

const tabs = [
  { icon: Home, label: 'Home', path: '/home' },
  { icon: Search, label: 'Browse', path: '/browse' },
  { icon: PlusCircle, label: 'Share', path: '/list' },
  { icon: Users, label: 'Community', path: '/circles' },
  { icon: User, label: 'You', path: '/profile/me' },
];

const BottomNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [tapped, setTapped] = useState<string | null>(null);

  const handleTap = (path: string) => {
    setTapped(path);
    router.push(path);
    setTimeout(() => setTapped(null), 300);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-t border-border safe-area-bottom">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-1">
        {tabs.map((tab) => {
          const isActive = pathname === tab.path || (tab.path === '/circles' && pathname.startsWith('/circles')) || (tab.path === '/profile/me' && pathname.startsWith('/profile'));
          const isTapped = tapped === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => handleTap(tab.path)}
              className={`flex flex-col items-center justify-center gap-0.5 flex-1 py-1 relative rounded-xl transition-colors cursor-pointer ${isActive ? 'bg-primary/5' : ''}`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-0.5 inset-x-2 h-0.5 bg-primary rounded-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              {/* Tap flash */}
              {isTapped && (
                <motion.div
                  initial={{ opacity: 0.5, scale: 0.5 }}
                  animate={{ opacity: 0, scale: 2 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 rounded-xl bg-primary/20"
                />
              )}
              <motion.div
                animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 20 }}
              >
                <tab.icon
                  className={`w-5 h-5 transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
                />
              </motion.div>
              <span
                className={`text-[10px] font-body transition-colors ${isActive ? 'text-primary font-medium' : 'text-muted-foreground'}`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
