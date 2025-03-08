"use client";
import { auth } from "@/configs/firebaseConfig";
import { User, onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { Toaster } from "sonner";
import { LoadingScreen } from "@/components/ui/loading";

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export function useAuthContext() {
  return useContext(AuthContext);
}

export default function Provider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Optimize auth state changes
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setUser(user);
        setLoading(false);
        setMounted(true);
      },
      (error) => {
        console.error("Auth error:", error);
        setLoading(false);
        setMounted(true);
      },
      () => {
        setLoading(false);
        setMounted(true);
      }
    );

    return () => unsubscribe();
  }, []);

  // Show loading screen only for initial load
  if (!mounted) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
      <Toaster />
    </AuthContext.Provider>
  );
}
