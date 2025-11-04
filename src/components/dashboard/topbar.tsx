"use client";

import { Bell, ChevronDown, Search } from "lucide-react";
import Image from "next/image";
import ProfilePic from "@/assets/images/profile-picture.png";

interface TopbarProps {
  currentUser: string;
  activeTab: string;
}

export default function Topbar({ currentUser, activeTab }: TopbarProps) {
  return (
    <header className="bg-white ">
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

          <div className="flex items-center gap-2 p-1.5 pl-2 rounded-full cursor-pointer transition-colors bg-(--gray-2) shadow-sm hover:bg-(--gray-5)">
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
        </div>
      </div>
    </header>
  );
}
