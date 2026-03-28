"use client";

import { Home, Search, PlusCircle, MessageCircle, User } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const tabs = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Search, label: 'Browse', path: '/browse' },
  { icon: PlusCircle, label: 'Add', path: '/add-item' },
  { icon: MessageCircle, label: 'Messages', path: '/messages' },
  { icon: User, label: 'Profile', path: '/profile' },
];

const BottomNav = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-t border-border safe-area-bottom">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-1">
        {tabs.map((tab) => {
          const isActive = pathname === tab.path || (tab.path === '/messages' && pathname.startsWith('/messages'));
          return (
            <button
              key={tab.path}
              onClick={() => router.push(tab.path)}
              className="flex flex-col items-center justify-center gap-0.5 flex-1 py-1 relative"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-0.5 inset-x-2 h-0.5 bg-primary rounded-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <tab.icon
                className={`w-5 h-5 transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
              />
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
