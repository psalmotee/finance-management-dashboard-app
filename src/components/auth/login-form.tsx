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

interface LoginFormProps {
  onLoginSuccess: (name: string) => void;
  onToggleSignup: () => void;
}

export function LoginForm({ onLoginSuccess, onToggleSignup }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!email || !password) {
        setError("Please fill in all fields");
        return;
      }

      const user = await authService.login(email, password);
      onLoginSuccess(user.name || email);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
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
                Welcome back
              </CardTitle>
              <CardDescription className="text-md text-(--text-secondary)">
                Welcome back! Please enter your details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-lg text-red-700 dark:text-red-400 text-sm">
                    {error}
                  </div>
                )}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium ">Password</label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-(-text-secondary)"
                    />
                    <span className="text-slate-700 dark:text-slate-400">
                      Remember for 30 days
                    </span>
                  </label>
                  <button
                    type="button"
                    className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  >
                    Forgot password
                  </button>
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11"
                >
                  {loading ? "Signing in..." : "Sign in"}
                </Button>
              </form>
              <p className="text-center text-sm text-(--text-secondary) dark:text-slate-400 mt-6">
                Don't have an account?{" "}
                <button
                  onClick={onToggleSignup}
                  className="text-(--primary-fg) dark:text-blue-400 hover:underline font-semibold"
                >
                  Sign up for free
                  <span><Image src={curveLine} alt="Clock and hand" /></span>
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
