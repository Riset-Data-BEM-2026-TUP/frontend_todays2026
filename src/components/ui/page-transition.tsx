'use client';

import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // NOTE: Sengaja TIDAK memakai <AnimatePresence mode="wait"> di sini.
  // Di Next.js App Router (React 19), AnimatePresence yang di-key ke pathname
  // di dalam layout tidak reliabel: siklus exit→enter kerap macet sehingga
  // wrapper terjebak di state initial (opacity: 0) dan SELURUH halaman kosong.
  // Dengan `key={pathname}` pada motion.div biasa, React me-remount subtree
  // tiap navigasi → animasi enter (mount) selalu jalan → konten pasti tampil.
  // Hanya animasikan opacity (TANPA transform). Transform y akan meninggalkan
  // `transform` permanen → membuat stacking context yang "memenjarakan" hero,
  // sehingga hero tak bisa berada di atas <JungleFrame /> (z-100). Fade saja aman.
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
