'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

/**
 * DEKOR HUTAN DIHAPUS — tema situs kini "langit / Growing Today" (selaras Figma).
 *
 * Semua elemen PNG hutan (dedaunan, satwa, bunga, pohon, harimau, matahari, bingkai
 * sudut) beserta section "Satwa Nusantara" (FaunaBand) sudah tidak dirender.
 *
 * Komponen dipertahankan (tanda tangan prop sama) supaya pemakaian lama tetap kompilasi.
 * `PageDecor` di-REPURPOSE menjadi ambient AWAN langit halus → tiap halaman mendapat
 * vibe langit yang konsisten tanpa perlu wiring baru. Sisanya no-op.
 */

type DecorName = string;

export function Decor(_props: { name: DecorName; className?: string; priority?: boolean }) {
  return null;
}

export function EdgeDecor(_props: { children?: ReactNode; className?: string }) {
  return null;
}

/** Satu gumpalan awan lembut (bulatan putih di-blur) — dipakai ambient langit. */
function SkyCloud({ className = '', scale = 1 }: { className?: string; scale?: number }) {
  return (
    <div className={`absolute ${className}`} style={{ transform: `scale(${scale})` }} aria-hidden>
      <div className="relative h-14 w-44">
        <div className="absolute inset-0 rounded-full bg-white/80 blur-xl" />
        <div className="absolute -top-5 left-9 h-16 w-16 rounded-full bg-white/85 blur-lg" />
        <div className="absolute -top-3 left-20 h-14 w-20 rounded-full bg-white/80 blur-lg" />
      </div>
    </div>
  );
}

export function FloatingLeaves() {
  return null;
}

export function VineDivider(_props: { className?: string }) {
  return null;
}

export function EdgeCritter(_props: { name: DecorName; side?: 'left' | 'right' }) {
  return null;
}

export function AmbientLeaves(_props: { count?: number }) {
  return null;
}

/**
 * Ambient LANGIT untuk header halaman: beberapa awan lembut melayang di area atas,
 * full-bleed, pointer-none. Menggantikan dekor hutan lama dengan vibe langit Figma.
 * Prop `critter` dsb. diabaikan (kompatibilitas mundur).
 */
export function PageDecor(_props: { critter?: DecorName; critterClassName?: string; ambient?: boolean }) {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-screen -translate-x-1/2 overflow-hidden"
      aria-hidden
    >
      <motion.div
        className="absolute inset-0"
        animate={{ x: [-14, 14, -14] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      >
        <SkyCloud className="left-[4%] top-[8%] opacity-70" scale={0.9} />
        <SkyCloud className="right-[6%] top-[16%] opacity-60" scale={1.1} />
        <SkyCloud className="left-[28%] top-[2%] opacity-50" scale={0.7} />
      </motion.div>
    </div>
  );
}

export function JungleCornersTop() {
  return null;
}

export function JungleCornersBottom() {
  return null;
}

export function FaunaBand() {
  return null;
}
