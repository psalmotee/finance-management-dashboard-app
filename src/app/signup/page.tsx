"use client";

import { useRouter } from "next/navigation";
import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
  const router = useRouter();

  const handleSignupSuccess = (name: string) => {
    console.log("Signup successful for:", name);
    router.push("/dashboard");
  };

  const handleToggleLogin = () => {
    router.push("/login");
  };

  return (
    <SignupForm
      onSignupSuccess={handleSignupSuccess}
      onToggleLogin={handleToggleLogin}
    />
  );
}
