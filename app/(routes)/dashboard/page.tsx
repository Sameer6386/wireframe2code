"use client";
import { useAuthContext } from "@/app/provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ImageUpload from "./_components/ImageUpload";

export default function Dashboard() {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/");
    }
  }, [user, loading, router]);

  if (loading) {
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
    <div className="container mx-auto px-4">
      <ImageUpload />
    </div>
  );
}
