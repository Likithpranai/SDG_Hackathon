"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { MainLayout } from "@/components";
import { UserTypeSelector } from "@/components/auth/user-type-selector";

export default function LoginPage() {
  const router = useRouter();

  // Redirect to the user type selector page
  useEffect(() => {
    router.replace("/select-user-type");
  }, [router]);

  return (
    <MainLayout>
      <div className="flex min-h-[80vh] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <UserTypeSelector />
      </div>
    </MainLayout>
  );
}
