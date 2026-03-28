"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

export default function AuthPage() {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<"signin" | "signup">(
    searchParams.get("tab") === "signup" ? "signup" : "signin"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [neighborhood, setNeighborhood] = useState("");

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-4">
            <Image src="/logo.jpg" alt="Skifte Collective" width={160} height={64} className="h-16 w-auto object-contain mx-auto" />
          </Link>
          <p className="text-sm text-muted-foreground">
            The Neighborhood Network for Modern Motherhood
          </p>
        </div>

        <motion.div
          layout
          className="bg-white rounded-2xl shadow-sm border border-cream-200 p-8"
        >
          {/* Tab Switcher */}
          <div className="flex gap-1 p-1 bg-cream rounded-lg mb-8">
            <button
              onClick={() => setTab("signin")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                tab === "signin"
                  ? "bg-white shadow-sm text-ink"
                  : "text-ink/50 hover:text-ink/70"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setTab("signup")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                tab === "signup"
                  ? "bg-white shadow-sm text-ink"
                  : "text-ink/50 hover:text-ink/70"
              }`}
            >
              Join Free
            </button>
          </div>

          {/* Google OAuth */}
          <Button
            variant="outline"
            className="w-full gap-3 h-11 rounded-lg border-cream-300 hover:bg-cream/50 mb-6"
          >
            <GoogleIcon />
            Continue with Google
          </Button>

          <div className="flex items-center gap-3 mb-6">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">or</span>
            <Separator className="flex-1" />
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={tab}
              initial={{ opacity: 0, x: tab === "signup" ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: tab === "signup" ? -20 : 20 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
              onSubmit={(e) => e.preventDefault()}
            >
              {tab === "signup" && (
                <>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      Full Name
                    </label>
                    <Input
                      type="text"
                      placeholder="Sarah Chen"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-11 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      Neighborhood
                    </label>
                    <Input
                      type="text"
                      placeholder="Park Slope, Brooklyn"
                      value={neighborhood}
                      onChange={(e) => setNeighborhood(e.target.value)}
                      className="h-11 rounded-lg"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="text-sm font-medium mb-1.5 block">Email</label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 rounded-lg"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 rounded-lg"
                />
              </div>

                  <Button className="w-full h-11 bg-terracotta hover:bg-terracotta-600 text-white rounded-full mt-2 font-medium">
                  {tab === "signin" ? "Sign In" : "Join the Collective"}
                </Button>
            </motion.form>
          </AnimatePresence>

          {tab === "signin" && (
            <p className="text-center text-xs text-muted-foreground mt-4">
              <button className="hover:text-terracotta transition-colors">
                Forgot password?
              </button>
            </p>
          )}
        </motion.div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
