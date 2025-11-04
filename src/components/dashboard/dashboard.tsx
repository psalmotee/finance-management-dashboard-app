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
        {/* Main */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 overflow-auto">
          {activeTab === "dashboard" && (
            <DashboardOverview currentUser={currentUser} />
          )}
          {activeTab === "invoices" && (
            <InvoiceManager currentUser={currentUser} />
          )}
        </main>
      </div>
    </div>
  );
}
