'use client';

import React, { useState, useRef, useEffect } from "react";
import { Bell, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/SiderBar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const notifications = [
  { id: 1, title: "New patient assigned", time: "2h ago" },
  { id: 2, title: "Record updated by Dr. Lee", time: "5h ago" },
  { id: 3, title: "System maintenance scheduled", time: "1d ago" },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [showNotif, setShowNotif] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <div className="min-h-screen bg-background flex w-full">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header
          showNotif={showNotif}
          setShowNotif={setShowNotif}
          showUserMenu={showUserMenu}
          setShowUserMenu={setShowUserMenu}
        />
        <main className="flex-1 p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

interface HeaderProps {
  showNotif: boolean;
  setShowNotif: React.Dispatch<React.SetStateAction<boolean>>;
  showUserMenu: boolean;
  setShowUserMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({
  showNotif,
  setShowNotif,
  showUserMenu,
  setShowUserMenu,
}) => {
  const userMenuRef = useRef<HTMLDivElement>(null);

  // close dropdown if click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowUserMenu]);

  return (
    <header className="bg-card border-b border-border px-8 py-4 flex items-center justify-end gap-4 relative">
      {/* Notification */}
      <div className="relative">
        <Button
          variant="ghost"
          className="p-2"
          onClick={() => setShowNotif(!showNotif)}
        >
          <Bell className="w-5 h-5 text-foreground" />
        </Button>
        {showNotif && (
          <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-card border border-border rounded shadow-lg z-50">
            <h4 className="px-4 py-2 font-semibold border-b border-border">
              Notifications
            </h4>
            <div className="max-h-60 overflow-y-auto">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <p className="text-sm font-medium">{notif.title}</p>
                  <p className="text-xs text-muted-foreground">{notif.time}</p>
                </div>
              ))}
            </div>
            <div className="px-4 py-2 border-t border-border text-center text-sm text-primary cursor-pointer">
              View All
            </div>
          </div>
        )}
      </div>

      {/* User Avatar */}
      <div className="relative" ref={userMenuRef}>
        <div
          className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold cursor-pointer"
          onClick={() => setShowUserMenu(!showUserMenu)}
        >
          SJ
        </div>

        {showUserMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-card border border-border rounded shadow-lg z-50">
            <div
              className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => alert("Go to Settings")}
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </div>
            <div
              className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => alert("Logout")}
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
