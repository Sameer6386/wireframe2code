"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ProfileAvatar from "./ProfileAvatar";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface AppHeaderProps {
  hideSidebar?: boolean;
}

function AppHeader({ hideSidebar = false }: AppHeaderProps) {
  const isMobile = useIsMobile();

  return (
    <header
      className="sticky top-0 z-50 w-full bg-white border-b"
      role="banner"
    >
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {!hideSidebar && (
            <SidebarTrigger>
              {/* Removed asChild prop and wrapped Button directly */}
              <Button variant="ghost" size="icon" aria-label="Toggle sidebar">
                <Menu className="h-5 w-5" />
              </Button>
            </SidebarTrigger>
          )}

          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            aria-label="Go to homepage"
          >
            <Image
              src="/logo.svg"
              alt="Wireframe to Code logo"
              width={40}
              height={40}
              className="w-10 h-10"
              priority
            />
            {!isMobile && (
              <div>
                <h1 className="font-bold text-lg">Wireframe to Code</h1>
                <p className="text-xs text-gray-500">Convert designs to code</p>
              </div>
            )}
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <ProfileAvatar />
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
