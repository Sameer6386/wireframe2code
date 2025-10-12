"use client";
import { auth } from "@/configs/firebaseConfig";
import { signOut } from "firebase/auth";
import Image from "next/image";
import { useState } from "react";
import { useAuthContext } from "../provider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LogOut, Settings, User } from "lucide-react";

function ProfileAvatar() {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthContext();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      if (!auth) {
        toast.error("Authentication not initialized");
        return;
      }

      setIsLoading(true);
      await signOut(auth);
      router.replace("/");
      toast.success("Successfully signed out");
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Failed to sign out");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full"
          aria-label="Open user menu"
        >
          {user.photoURL ? (
            <Image
              src={user.photoURL}
              alt="Profile picture"
              fill
              className="rounded-full object-cover"
            />
          ) : (
            <User className="h-5 w-5" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56" align="end" sideOffset={8}>
        <div className="space-y-3">
          <div className="flex items-center gap-3 px-2">
            <div className="relative h-10 w-10 rounded-full">
              {user.photoURL ? (
                <Image
                  src={user.photoURL}
                  alt="Profile picture"
                  fill
                  className="rounded-full object-cover"
                />
              ) : (
                <User className="h-5 w-5" />
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{user.displayName}</span>
              <span className="text-xs text-gray-500">{user.email}</span>
            </div>
          </div>

          <div className="border-t border-gray-200" />

          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => router.push("/settings")}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleSignOut}
              disabled={isLoading}
            >
              <LogOut className="mr-2 h-4 w-4" />
              {isLoading ? "Signing out..." : "Sign out"}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ProfileAvatar;
