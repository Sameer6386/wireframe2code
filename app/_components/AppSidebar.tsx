"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  Home,
  Paintbrush,
  CircleDollarSign,
  Settings,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthContext } from "../provider";

interface NavItem {
  title: string;
  url: string;
  icon: React.ElementType;
  description?: string;
}

const navigationItems: NavItem[] = [
  {
    title: "Workspace",
    url: "/dashboard",
    icon: Home,
    description: "Your main workspace",
  },
  {
    title: "Designs",
    url: "/designs",
    icon: Paintbrush,
    description: "View your designs",
  },
  {
    title: "Credits",
    url: "/credits",
    icon: CircleDollarSign,
    description: "Manage your credits",
  },
];

const footerItems: NavItem[] = [
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    description: "Manage your account",
  },
  {
    title: "Help",
    url: "/help",
    icon: HelpCircle,
    description: "Get support",
  },
];

function NavLink({ item, isActive }: { item: NavItem; isActive: boolean }) {
  return (
    <Link
      href={item.url}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
        "hover:bg-gray-100",
        isActive && "bg-gray-100 text-blue-600"
      )}
      aria-current={isActive ? "page" : undefined}
    >
      <item.icon className="w-5 h-5" />
      <div>
        <div className="font-medium">{item.title}</div>
        {item.description && (
          <div className="text-xs text-gray-500">{item.description}</div>
        )}
      </div>
    </Link>
  );
}

export function AppSidebar() {
  const pathname = usePathname();
  const { user } = useAuthContext();

  if (!user) return null;

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="p-4 border-b border-gray-200">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.svg"
            alt="logo"
            width={40}
            height={40}
            className="w-10 h-10"
            priority
          />
          <div>
            <h2 className="font-bold text-xl">Wireframe to Code</h2>
            <p className="text-sm text-gray-500">Build Awesome</p>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <nav className="space-y-1">
          {navigationItems.map((item) => (
            <NavLink
              key={item.url}
              item={item}
              isActive={pathname === item.url}
            />
          ))}
        </nav>
      </SidebarContent>

      <SidebarFooter className="p-2 border-t border-gray-200">
        <nav className="space-y-1">
          {footerItems.map((item) => (
            <NavLink
              key={item.url}
              item={item}
              isActive={pathname === item.url}
            />
          ))}
        </nav>
      </SidebarFooter>
    </Sidebar>
  );
}
