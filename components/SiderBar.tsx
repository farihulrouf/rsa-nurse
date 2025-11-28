'use client';

import React from "react";
import { Home, Users, FileText, Settings, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-bold text-primary">RASA-nurse</h1>
        <p className="text-sm text-muted-foreground mt-1">Home Visit Nursing Records</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-colors"
        >
          <Home className="w-5 h-5" />
          <span className="font-medium">Dashboard</span>
        </Link>
        <Link
          href="/dashboard/patients"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-colors"
        >
          <Users className="w-5 h-5" />
          <span className="font-medium">Patients</span>
        </Link>
        <Link
          href="/dashboard/records"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-colors"
        >
          <FileText className="w-5 h-5" />
          <span className="font-medium">Records</span>
        </Link>
        <Link
          href="/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-colors"
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </Link>
      </nav>

      <div className="p-4 border-t border-border">
        <Button className="w-full" size="lg">
          <Plus className="w-4 h-4 mr-2" />
          New Record
        </Button>
      </div>
    </aside>
  );
}
