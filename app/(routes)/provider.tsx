"use client";
import { useEffect, useState } from "react";
import { useAuthContext } from "../provider";
import { useRouter } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import axios from "axios";
import AppHeader from "../_components/AppHeader";
import { AppSidebar } from "../_components/AppSidebar";
import { toast } from "sonner";

function DashboardProvider({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthContext();
  const router = useRouter();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const verifyAccess = async () => {
      try {
        if (!loading && !user) {
          router.replace("/");
          return;
        }

        if (user) {
          await checkUser();
        }
      } catch (error) {
        console.error("Access verification error:", error);
        router.replace("/");
      } finally {
        setIsVerifying(false);
      }
    };

    verifyAccess();
  }, [user, loading, router]);

  const checkUser = async () => {
    try {
      if (!user?.email || !user?.displayName) {
        throw new Error("Invalid user data");
      }

      await axios.post("/api/user", {
        userName: user.displayName,
        userEmail: user.email,
      });
    } catch (error) {
      console.error("User check error:", error);
      toast.error("Failed to verify user");
      throw error; // Propagate error to parent handler
    }
  };

  if (loading || isVerifying) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <AppHeader />
        <div className="p-10">{children}</div>
      </main>
    </SidebarProvider>
  );
}

export default DashboardProvider;
