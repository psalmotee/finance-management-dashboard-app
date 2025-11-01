"use client";

import { useState } from "react";
import {
  Menu,
  Home,
  ArrowUpDown,
  FileText,
  Wallet,
  Settings,
  HelpCircle,
} from "lucide-react";
import Image from "next/image";
import Logo from "@/assets/images/Logo.png";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarNavigationProps {
  activeTab:
    | "dashboard"
    | "transactions"
    | "invoices"
    | "myWallet"
    | "settings";
  onTabChange: (
    tab: "dashboard" | "transactions" | "invoices" | "myWallet" | "settings"
  ) => void;
  onLogout: () => void;
  currentUser: string;
}

export function SidebarNavigation({
  activeTab,
  onTabChange,
  onLogout,
  currentUser,
}: SidebarNavigationProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile = useIsMobile();

  const navigationItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <Home className="w-5 h-5" />,
    },
    {
      id: "transactions",
      label: "Transactions",
      icon: <ArrowUpDown className="w-5 h-5" />,
    },
    {
      id: "invoices",
      label: "Invoices",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      id: "myWallet",
      label: "My Wallets",
      icon: <Wallet className="w-5 h-5" />,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="w-5 h-5" />,
    },
    { id: "help", label: "Help", icon: <HelpCircle className="w-5 h-5" /> }, // New help item
  ];

  const handleNavClick = (
    tab:
      | "dashboard"
      | "transactions"
      | "invoices"
      | "myWallet"
      | "settings"
      | "help"
  ) => {
    onTabChange(tab as any); // Type assertion for simplicity
    if (isMobile) {
      setIsDrawerOpen(false);
    }
  };

  // -----------------------------------------------------
  // DESKTOP SIDEBAR STYLING
  // -----------------------------------------------------
  const desktopSidebar = (
    // Sidebar Container: White background, no vertical border (image shows subtle shadow/no strong border)
    <aside
      className="hidden md:flex flex-col w-64 bg-white dark:bg-[var(--background)] h-screen sticky top-0 border-r border-gray-100 dark:border-gray-800"
      style={{ boxShadow: "2px 0 4px -2px rgba(0, 0, 0, 0.05)" }} // Subtle shadow matching design
    >
      {/* Sidebar Header: Adjusted padding and removed bottom border to match image */}
      <div className="py-6 px-6 mb-6">
        <Image src={Logo} alt="Maglo Logo" width={90} height={30} />
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 pt-0 space-y-1">
        {" "}
        {/* Reduced top padding and space-y to match image */}
        {navigationItems.slice(0, 5).map(
          (
            item // Only the main 5 tabs
          ) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id as any)}
              className={`
              w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors 
              ${
                activeTab === item.id
                  ? // ACTIVE TAB: Uses Primary Accent Color for BG and Primary Foreground for Text
                    "bg-(--primary-color) text-(--text-color-1) font-semibold"
                  : // INACTIVE TAB: Uses Secondary Text Color for a muted look
                    "text-(--text-color-2) hover:bg-(--gray-5)"
              }
            `}
            >
              {/* The icon wrapping span might need to be adjusted if your SVG/Image components have inherent color/size */}
              <span className="[&>img]:w-5 [&>img]:h-5">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          )
        )}
      </nav>

      {/* Sidebar Footer */}
      {/* Separator line and lower navigation items */}
      <div className="py-4 space-y-1">
        {navigationItems.slice(5).map(
          (
            item // Help item
          ) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id as any)}
              className="w-full flex items-center gap-3 px-8 py-3 rounded-lg text-(--text-color-2) font-normal text-base hover:bg-(--gray-5) "
            >
              <span className="[&>img]:w-5 [&>img]:h-5">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          )
        )}

        {/* Logout Button matching the image's text/icon style */}
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-8 py-3 text-(--text-color-2) font-normal hover:bg-(--gray-5)"
        >
          <span className="[&>img]:w-5 [&>img]:h-5">{/*  */}</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
  // -----------------------------------------------------
  // MOBILE DRAWER STYLING (Left largely untouched for basic functionality)
  // -----------------------------------------------------
  const mobileDrawer = (
    // ... (Your original mobile drawer code goes here)
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-(--text-color-1)"
        >
          <Menu className="w-6 h-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-white dark:bg-slate-950 border-t border-border dark:border-slate-800">
        <div className="flex flex-col h-auto py-6">
          <div className="px-6 pb-6 border-b border-border dark:border-slate-800">
            <h2 className="text-xl font-bold text-primary">Maglo Finance</h2>
            <p className="text-sm text-text-secondary dark:text-slate-400 mt-1">
              {currentUser}
            </p>
          </div>

          <nav className="px-2 py-2 space-y-1">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? "bg-(--primary-bg) text-(--primary-fg)] font-semibold"
                    : "text-(--text-primary)] "
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="px-2 py-4 border-t border-border dark:border-slate-800 mt-auto space-y-2">
            <Button
              onClick={onLogout}
              variant="outline"
              className="w-full text-text-primary dark:text-slate-300 hover:bg-muted dark:hover:bg-slate-800 border-border dark:border-slate-700 bg-transparent"
            >
              Logout
            </Button>
            <DrawerClose asChild>
              <Button
                variant="outline"
                className="w-full text-text-primary dark:text-slate-300 hover:bg-muted dark:hover:bg-slate-800 border-border dark:border-slate-700 bg-transparent"
              >
                Close
              </Button>
            </DrawerClose>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );

  return {
    desktopSidebar,
    mobileDrawer,
  };
}
