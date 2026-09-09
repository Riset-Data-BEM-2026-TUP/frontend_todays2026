'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

/**
 * Gate chrome global (Navbar + Footer).
 * Route dashboard (/admin, /portal) sudah punya layout/sidebar sendiri, jadi
 * navbar & footer publik tidak dirender di sana agar tidak redundan/salah konteks.
 * Navbar & Footer di-render di server (layout) lalu dilewatkan sebagai prop —
 * komponen ini hanya memutuskan apakah menampilkannya berdasarkan pathname.
 */
const BARE_PREFIXES = ['/admin', '/portal'];

export function SiteChrome({
  navbar,
  footer,
  children,
}: {
  navbar: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname() ?? '';
  const bare = BARE_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  return (
    // Sticky footer: wrapper setinggi minimal 1 layar, <main> tumbuh mengisi sisa
    // ruang, sehingga footer selalu menempel di bawah tanpa space kosong meski
    // konten halaman pendek.
    <div className="flex min-h-dvh flex-col">
      {!bare && navbar}
      <main className="flex-1">{children}</main>
      {!bare && footer}
    </div>
  );
}
