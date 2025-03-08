"use client";
import { auth } from "@/configs/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { toast } from "sonner";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface AuthenticationProps {
  children: React.ReactNode;
}

function Authentication({ children }: AuthenticationProps) {
  const [isLoading, setIsLoading] = useState(false);
  const provider = new GoogleAuthProvider();

  const onButtonPress = async () => {
    try {
      setIsLoading(true);
      // Configure Google Auth Provider
      provider.setCustomParameters({
        prompt: "select_account",
      });

      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        toast.success("Successfully signed in!");
      }
    } catch (error: any) {
      console.error("Authentication error:", error);

      switch (error.code) {
        case "auth/operation-not-allowed":
          toast.error("Google sign-in is not enabled. Please contact support.");
          break;
        case "auth/popup-blocked":
          toast.error("Please allow popups for this website");
          break;
        case "auth/cancelled-popup-request":
          // User closed the popup, no need to show error
          break;
        default:
          toast.error("Failed to sign in. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      onClick={onButtonPress}
      className={`cursor-pointer ${isLoading ? "opacity-50 pointer-events-none" : ""}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onButtonPress();
        }
      }}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <LoadingSpinner size="sm" />
        </div>
      ) : (
        children
      )}
    </div>
  );
}

export default Authentication;
