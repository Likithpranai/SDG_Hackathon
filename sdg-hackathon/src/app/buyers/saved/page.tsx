"use client";

import React from 'react';
import { MainLayout, RouteGuard, SavedArtworks } from '@/components';

export default function SavedArtworksPage() {
  return (
    <RouteGuard requiredUserType="buyer">
      <MainLayout>
        <SavedArtworks />
      </MainLayout>
    </RouteGuard>
  );
}
