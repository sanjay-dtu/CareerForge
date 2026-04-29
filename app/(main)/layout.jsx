"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Sidebar } from "@/components/sidebar";

const MainLayout = ({ isOnboarded, children }) => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to onboarding if the user is not onboarded
    if (isOnboarded === false && !window.location.pathname.includes("/onboarding")) {
      router.replace("/onboarding"); // Use replace to avoid adding to history stack
    }
  }, [isOnboarded, router]);

  return (
    <div className="flex min-h-screen pt-16"> 
      <Sidebar />
      <div className="flex-1 p-5 md:p-8 max-w-7xl mx-auto w-full">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;