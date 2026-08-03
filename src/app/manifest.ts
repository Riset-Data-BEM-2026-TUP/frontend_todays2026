import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BHUMARA — PKKMB Telkom University Purwokerto 2026',
    short_name: 'BHUMARA',
    description: 'Growing Today, Thriving Tomorrow',
    start_url: '/',
    display: 'standalone',
    background_color: '#F3E9D2',
    theme_color: '#65704A',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
