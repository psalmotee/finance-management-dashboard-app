// src/app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Dashboard } from "@/components/dashboard/dashboard";
import { authService } from "@/lib/auth-service";

export default function DashboardPage() {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      try {
        const user = await authService.getCurrentUser();
        if (!user) {
          router.replace("/auth/login");
          return;
        }
        setCurrentUser(user.name || user.email || "User");
      } catch (err) {
        console.error(err);
        router.replace("/auth/login");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-slate-700 dark:text-white">
          Loading dashboard...
        </div>
      </div>
    );
  }

  if (!currentUser) return null;

  return (
    <Dashboard
      currentUser={currentUser}
      onLogout={async () => {
        try {
          await authService.logout();
          router.replace("/auth/login");
        } catch (e) {
          console.error("Logout failed", e);
        }
      }}
    />
  );
}
