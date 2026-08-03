import type { NextConfig } from 'next';
import withPWAInit from '@ducanh2912/next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development' && process.env.ENABLE_PWA_DEV !== 'true',
  fallbacks: { document: '/offline' },
  workboxOptions: {
    runtimeCaching: [
      // GET API publik: tampilkan cache dulu, update di belakang
      {
        urlPattern: ({ url }: any) => url.pathname.startsWith('/api/v1') && !url.pathname.startsWith('/api/v1/me'),
        handler: 'StaleWhileRevalidate',
        options: { cacheName: 'api-public' },
      },
    ],
  },
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: { formats: ['image/avif', 'image/webp'] },
};

export default withPWA(nextConfig);
