"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { signInWithGoogle } from "@/lib/firebase/auth";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useEffect } from "react";

export default function LoginPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/dashboard");
  }, [user, router]);

  async function handleSignIn() {
    await signInWithGoogle();
    router.push("/dashboard");
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4">
      <Card className="max-w-sm w-full text-center">
        <h1 className="text-xl font-bold mb-2">Sign In</h1>
        <p className="text-sm text-gray-500 mb-6">Sign in with Google to save your progress across devices.</p>
        <Button onClick={handleSignIn} className="w-full">
          Sign in with Google
        </Button>
        <p className="mt-4 text-xs text-gray-400">
          You can also use the portal as a guest — progress saves to your browser.
        </p>
      </Card>
    </div>
  );
}
