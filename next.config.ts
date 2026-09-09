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
  // Standalone HANYA untuk Docker/VPS (diaktifkan via env NEXT_OUTPUT_STANDALONE=true
  // saat build image). Di Hostinger Node.js hosting biarkan default agar `next start` normal.
  ...(process.env.NEXT_OUTPUT_STANDALONE === 'true' ? { output: 'standalone' as const } : {}),
  // Next 15.0.0 dev (Windows + pnpm) kadang gagal meng-emit vendor-chunk untuk
  // framer-motion → "Cannot find module './vendor-chunks/framer-motion…js'".
  // Transpile paket ini agar di-bundle inline, bukan di-externalize jadi chunk terpisah.
  transpilePackages: ['framer-motion'],
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default withPWA(nextConfig);
