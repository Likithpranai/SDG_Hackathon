"use client";

import React from 'react';
import { MainLayout, RouteGuard, BuyerDashboard } from '@/components';

export default function BuyerDashboardPage() {
  return (
    <RouteGuard requiredUserType="buyer">
      <MainLayout>
        <BuyerDashboard />
      </MainLayout>
    </RouteGuard>
  );
}
