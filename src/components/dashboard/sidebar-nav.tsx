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
    { id: "dashboard", label: "Dashboard", icon: <Home className="w-5 h-5" /> },
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
    { id: "help", label: "Help", icon: <HelpCircle className="w-5 h-5" /> },
  ];

  const handleNavClick = (tab: string) => {
    onTabChange(tab as any);
    if (isMobile) setIsDrawerOpen(false);
  };

  const desktopSidebar = (
    <aside
      className="hidden md:flex flex-col w-64 bg-white dark:bg-[var(--background)] h-screen sticky top-0 border-r border-gray-100 dark:border-gray-800"
      style={{ boxShadow: "2px 0 4px -2px rgba(0, 0, 0, 0.05)" }}
    >
      <div className="py-6 px-6 mb-6">
        <Image src={Logo} alt="Maglo Logo" width={90} height={30} />
      </div>

      <nav className="flex-1 p-4 pt-0 space-y-1">
        {navigationItems.slice(0, 5).map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
              activeTab === item.id
                ? "bg-(--primary-color) text-(--text-color-1) font-semibold"
                : "text-(--text-color-2) hover:bg-(--gray-5)"
            }`}
          >
            <span className="[&>img]:w-5 [&>img]:h-5">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="py-4 space-y-1">
        {navigationItems.slice(5).map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className="w-full flex items-center gap-3 px-8 py-3 rounded-lg text-(--text-color-2) font-normal text-base hover:bg-(--gray-5)"
          >
            <span className="[&>img]:w-5 [&>img]:h-5">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-8 py-3 text-(--text-color-2) font-normal hover:bg-(--gray-5)"
        >
          <span className="[&>img]:w-5 [&>img]:h-5"></span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );

  const mobileDrawer = (
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

      <DrawerContent className="bg-white border-t border-border dark:border-slate-800">
        <div className="flex flex-col h-auto py-6">
          <div className="px-6 pb-6 border-b border-border">
            <h2 className="text-xl font-bold text-primary">Maglo Finance</h2>
            <p className="text-sm text-text-secondary  mt-1">
              {currentUser}
            </p>
          </div>

          <nav className="px-2 py-2 space-y-1">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? "bg-(--primary-bg) text-(--primary-fg) font-semibold"
                    : "text-(--text-primary)"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="px-2 py-4 border-t border-border  mt-auto space-y-2">
            <Button onClick={onLogout} variant="outline" className="w-full">
              Logout
            </Button>
            <DrawerClose asChild>
              <Button variant="outline" className="w-full">
                Close
              </Button>
            </DrawerClose>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );

  return (
    <>
      {/* Desktop sidebar */}
      {desktopSidebar}

      {/* Mobile trigger + drawer */}
      <div className="md:hidden flex items-center">{mobileDrawer}</div>
    </>
  );
}
