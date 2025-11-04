"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { authService } from "@/lib/auth-service";

export default function Home() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function check() {
      try {
        const user = await authService.getCurrentUser();
        if (user) {
          router.replace("/dashboard");
        } else {
          router.replace("/login");
        }
      } catch (err) {
        router.replace("/login");
      } finally {
        setChecking(false);
      }
    }
    check();
  }, [router]);

  return checking ? (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-slate-700 dark:text-white">
        Checking auth...
      </div>
    </div>
  ) : null;
}
