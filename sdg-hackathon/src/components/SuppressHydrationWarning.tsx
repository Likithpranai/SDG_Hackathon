'use client';

import { useEffect, useState } from 'react';

export function SuppressHydrationWarning({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <style jsx global>{`
        /* Hide hydration warnings */
        [data-next-hydration-error] {
          display: none;
        }
      `}</style>
      {isMounted ? children : <div style={{ visibility: 'hidden' }}>{children}</div>}
    </>
  );
}
