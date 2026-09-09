'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * Latar HERO tema "READY / GROWING TODAY" (langit) — selaras Figma:
 * gradient langit biru, matahari bercahaya, dan awan putih melayang berlapis (parallax
 * mengikuti kursor). Pulau 3D interaktif dirender terpisah sebagai centerpiece hero
 * (lihat FullpageHeroExperience → Bhumara3DScene), jadi di sini murni 2D.
 */

/** Satu gumpalan awan lembut (beberapa bulatan putih di-blur). */
function Cloud({ className = '', scale = 1 }: { className?: string; scale?: number }) {
  return (
    <div className={`absolute ${className}`} style={{ transform: `scale(${scale})` }}>
      <div className="relative h-16 w-48">
        <div className="absolute inset-0 rounded-full bg-white/90 blur-xl" />
        <div className="absolute -top-6 left-10 h-20 w-20 rounded-full bg-white/95 blur-lg" />
        <div className="absolute -top-4 left-24 h-16 w-24 rounded-full bg-white/90 blur-lg" />
        <div className="absolute top-1 left-2 h-14 w-16 rounded-full bg-white/85 blur-lg" />
      </div>
    </div>
  );
}

export function AtmosphericHeroBackground() {
  // Parallax kursor untuk awan → efek kedalaman "diorama langit".
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 });

  const farX = useTransform(sx, [-1, 1], [18, -18]);
  const farY = useTransform(sy, [-1, 1], [12, -12]);
  const midX = useTransform(sx, [-1, 1], [34, -34]);
  const nearX = useTransform(sx, [-1, 1], [-48, 48]);
  const nearY = useTransform(sy, [-1, 1], [-16, 16]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, [mx, my]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
      {/* 1. Gradient langit: biru cerah di atas → memudar ke permukaan terang di bawah */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#55a4ee] via-[#7cc0f0] to-cream" />

      {/* 2. Matahari bercahaya (pojok kanan atas) */}
      <motion.div
        style={{ x: farX, y: farY }}
        className="absolute -right-10 -top-16 h-72 w-72 rounded-full bg-gradient-to-br from-[#fff6cf] via-[#ffe08a]/70 to-transparent blur-2xl"
      />
      <motion.div
        style={{ x: farX, y: farY }}
        animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.06, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-10 top-6 h-40 w-40 rounded-full bg-[#fff3b0] blur-2xl"
      />

      {/* 3. Awan CSS berlapis (parallax berbeda kedalaman) */}
      <motion.div style={{ x: farX, y: farY }} className="absolute inset-0">
        <Cloud className="left-[8%] top-[14%] opacity-80 animate-drift" scale={0.9} />
        <Cloud className="right-[14%] top-[26%] opacity-70 animate-drift" scale={0.7} />
      </motion.div>
      <motion.div style={{ x: midX }} className="absolute inset-0">
        <Cloud className="left-[24%] top-[8%] opacity-95 animate-drift" scale={1.15} />
        <Cloud className="right-[6%] top-[40%] opacity-85 animate-drift" scale={1} />
      </motion.div>
      <motion.div style={{ x: nearX, y: nearY }} className="absolute inset-0">
        <Cloud className="left-[-4%] bottom-[24%] opacity-95" scale={1.4} />
        <Cloud className="right-[-2%] bottom-[12%] opacity-90" scale={1.6} />
      </motion.div>

      {/* 4. Kabut awan tebal menyapu dasar → transisi mulus ke konten bawah */}
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-cream via-cream/85 to-transparent" />
      <Cloud className="left-[30%] bottom-[2%] opacity-95" scale={1.8} />
      <Cloud className="right-[26%] -bottom-2 opacity-90" scale={2} />
    </div>
  );
}
