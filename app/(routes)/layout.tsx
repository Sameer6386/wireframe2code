"use client";
import React from "react";
import DashboardProvider from "./provider";
import { useAuthContext } from "../provider";
import { useRouter } from "next/navigation";
import { LoadingScreen } from "@/components/ui/loading";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  React.useEffect(() => {
    // Check authentication status after loading is complete
    if (!loading) {
      if (!user) {
        router.replace("/");
      }
    }
  }, [user, loading, router]);

  // Show loading screen while checking auth
  if (loading) {
    return <LoadingScreen />;
  }

  // Don't render anything if not authenticated
  if (!user) {
    return null;
  }

  return <DashboardProvider>{children}</DashboardProvider>;
}

export default DashboardLayout;
