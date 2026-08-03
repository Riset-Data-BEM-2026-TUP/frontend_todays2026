'use client';

import { useEffect } from 'react';

/**
 * Memastikan Service Worker lama di-unregister pada mode development
 * agar tidak mencegat/memperlambat navigasi HMR di localhost:3000.
 */
export function DevServiceWorkerCleaner() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister();
        }
      });
    }
  }, []);

  return null;
}
