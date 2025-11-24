"use client";

import React from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { UserTypeSelector } from "@/components/auth/user-type-selector";

export default function SelectUserTypePage() {
  return (
    <MainLayout>
      <div className="flex min-h-[80vh] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <UserTypeSelector />
      </div>
    </MainLayout>
  );
}
