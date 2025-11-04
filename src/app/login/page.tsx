"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { authService } from "@/lib/auth-service";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const user = await authService.getCurrentUser();
      if (user) router.push("/dashboard");
    };
    checkSession();
  }, [router]);

  return (
    <LoginForm
      onLoginSuccess={() => router.push("/dashboard")}
      onToggleSignup={() => router.push("/signup")}
    />
  );
}
