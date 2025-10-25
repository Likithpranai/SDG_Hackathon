"use client";

import React from 'react';
import { MainLayout, RouteGuard, BuyerMarketplace } from '@/components';

export default function MarketplacePage() {
  return (
    <RouteGuard requiredUserType="buyer">
      <MainLayout>
        <BuyerMarketplace />
      </MainLayout>
    </RouteGuard>
  );
}
