"use client"

import { useState, useEffect } from "react"
import { LoginForm } from "@/components/auth/login-form"
import { SignupForm } from "@/components/auth/signup-form"
import { Dashboard } from "@/components/dashboard/dashboard"
import { authService } from "@/lib/auth-service"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isSignup, setIsSignup] = useState(false)
  const [currentUser, setCurrentUser] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await authService.getCurrentUser()
        if (user) {
          setIsLoggedIn(true)
          setCurrentUser(user.name || user.email)
        }
      } catch (error) {
        console.log(" No authenticated user")
      } finally {
        setMounted(true)
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
        <div className="animate-pulse text-slate-900 dark:text-white">Loading...</div>
      </div>
    )
  }

  if (isLoggedIn && currentUser) {
    return (
      <Dashboard
        currentUser={currentUser}
        onLogout={async () => {
          try {
            await authService.logout()
            setIsLoggedIn(false)
            setCurrentUser(null)
          } catch (error) {
            console.error("Logout failed:", error)
          }
        }}
      />
    )
  }

  return (
    <>
      {isSignup ? (
        <SignupForm
          onSignupSuccess={(name) => {
            setCurrentUser(name)
            setIsLoggedIn(true)
          }}
          onToggleLogin={() => setIsSignup(false)}
        />
      ) : (
        <LoginForm
          onLoginSuccess={(name) => {
            setCurrentUser(name)
            setIsLoggedIn(true)
          }}
          onToggleSignup={() => setIsSignup(true)}
        />
      )}
    </>
  )
}
