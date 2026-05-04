"use client";

import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import { signInWithGoogle, signOut } from "@/lib/firebase/auth";
import { Button } from "@/components/ui/Button";

export function Header() {
  const { user, loading } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold">
          <span className="text-2xl">&#x1F9E0;</span>
          <span className="hidden sm:inline">AI Engineer Roadmap</span>
          <span className="sm:hidden">AI Roadmap</span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
            Dashboard
          </Link>
          <Link href="/schedule" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
            Schedule
          </Link>

          {!loading && (
            user ? (
              <div className="flex items-center gap-3">
                {user.photoURL && (
                  <img
                    src={user.photoURL}
                    alt=""
                    className="h-8 w-8 rounded-full"
                    referrerPolicy="no-referrer"
                  />
                )}
                <Button variant="ghost" size="sm" onClick={() => signOut()}>
                  Sign out
                </Button>
              </div>
            ) : (
              <Button size="sm" onClick={() => signInWithGoogle()}>
                Sign in
              </Button>
            )
          )}
        </nav>
      </div>
    </header>
  );
}
