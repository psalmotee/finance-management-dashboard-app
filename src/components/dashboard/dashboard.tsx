// src/components/dashboard/dashboard.tsx
"use client";

import { useState } from "react";
import { DashboardOverview } from "./dashboard-overview";
import  InvoiceManager  from "./invoice-manager";
import { ThemeToggle } from "@/components/theme-toggle";
import { SidebarNavigation } from "./sidebar-nav";
import { Bell, ChevronDown, Search } from "lucide-react";
import Image from "next/image";
import ProfilePic from "@/assets/images/profile-picture.png";
import Topbar from "./topbar";

interface DashboardProps {
  currentUser: string;
  onLogout: () => void;
}

export function Dashboard({ currentUser, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "transactions" | "invoices" | "myWallet" | "settings"
  >("dashboard");

  return (
    <div className="min-h-screen bg-background dark:bg-background flex flex-col md:flex-row">
      {/* Sidebar */}
      <SidebarNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={onLogout}
        currentUser={currentUser}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Topbar currentUser={currentUser} activeTab={activeTab} />
        {/* <header className="bg-white">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-semibold text-(--text-color-1) hidden md:block">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h1>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <div className="hidden md:flex items-center gap-1">
                <div className="p-2 rounded-full cursor-pointer text-(--text-color-2) hover:text-(--text-color-1)">
                  <Search size={18} />
                </div>
                <div className="p-2 rounded-full cursor-pointer text-(--text-color-2) hover:text-(--text-color-1)">
                  <Bell size={20} />
                </div>
              </div>

              <div
                className="flex items-center gap-2 p-1.5 pl-2 rounded-full cursor-pointer transition-colors bg-(--gray-2) shadow-sm hover:bg-(--gray-5)"
               
              >
                <div className="rounded-full w-6 h-6 flex items-center justify-center overflow-hidden">
                  <Image
                    src={ProfilePic}
                    alt="Profile Picture"
                    width={24}
                    height={24}
                    className="object-cover w-full h-full"
                  />
                </div>

                <span className="text-sm font-medium text-(--text-color-1) hidden sm:inline">
                  {currentUser}
                </span>
                <ChevronDown size={16} className="text-(--text-color-1) mr-1" />
              </div>

              <div className="md:hidden">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </header> */}

        {/* Main */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 overflow-auto">
          {activeTab === "dashboard" && (
            <DashboardOverview currentUser={currentUser} />
          )}
          {activeTab === "invoices" && (
            <InvoiceManager currentUser={currentUser} />
          )}
          {/* add other tab renders as needed */}
        </main>
      </div>
    </div>
  );
}
