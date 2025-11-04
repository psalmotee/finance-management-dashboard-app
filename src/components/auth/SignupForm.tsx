"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import HandTime from "@/assets/images/hand-time.png";
import curveLine from "@/assets/icons/curve-line.svg";
import Logo from "@/assets/images/Logo.png";
import { authService } from "@/lib/auth-service";

interface SignupFormProps {
  onSignupSuccess: (name: string) => void;
  onToggleLogin: () => void;
}

export default function SignupForm({
  onSignupSuccess,
  onToggleLogin,
}: SignupFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!name || !email || !password ) {
        setError("Please fill in all fields");
        return;
      }

      if (password.length < 8) {
        setError("Password must be at least 8 characters");
        return;
      }

      await authService.signup(email, password, name);
      onSignupSuccess(name);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2  min-h-screen">
      {/* Left side - Form */}
      <div className="flex flex-col items-center p-6 md:p-12">
        <div className="w-full max-w-sm flex flex-col">
          <div className="mb-20">
            <Image src={Logo} alt="Logo" />
          </div>

          <Card className="">
            <CardHeader className="space-y-2 pb-6">
              <CardTitle className="text-3xl font-semibold">
                Create new account
              </CardTitle>
              <CardDescription className="">
                Welcome back! Please enter your details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 bg-(--unpad-bg) border border-(--unpaid-bg)/80 rounded-lg text-(--unpaid-text) text-sm">
                    {error}
                  </div>
                )}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input
                    type="text"
                    placeholder="Mehfuazul Nabil"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                    className=""
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className=""
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Password</label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className=""
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full font-semibold h-11"
                >
                  {loading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
              <p className="text-center text-smtext-sm text-(--text-secondary) mt-6">
                Already have an account?{" "}
                <button
                  onClick={onToggleLogin}
                  className="text-(--text-color-1) hover:text-(--text-color-1)/80 cursor-pointer font-semibold"
                >
                  Sign in
                  <span>
                    <Image src={curveLine} alt="Clock and hand" width={50} />
                  </span>
                </button>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden md:flex items-center justify-center bg-slate-100 dark:bg-slate-900">
        <div className="w-full h-full flex items-center justify-center">
          <Image
            src={HandTime}
            alt="Clock and hand"
            className="object-cover w-full h-full"
            priority
          />
        </div>
      </div>
    </div>
  );
}
