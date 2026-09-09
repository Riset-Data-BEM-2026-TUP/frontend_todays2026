'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Render hanya setelah mount (client-only). Dekorasi ini bergantung pada
 * useReducedMotion() yang nilainya berbeda di server vs client → agar tidak
 * memicu hydration mismatch, elemen animatif tidak dirender saat SSR.
 */
function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

/* =====================================================================
 * SKY SCAPE — sistem dekorasi tema langit (selaras Figma PKKMB 2026).
 * Awan bertekstur, roket/objek melintas, skyline gedung, & cincin radar.
 * Semua elemen: pointer-events-none, aria-hidden, di belakang konten (z rendah),
 * dan menghormati prefers-reduced-motion. Dipakai berlapis per-section.
 * ===================================================================== */

/** Bentuk awan kompleks (SVG multi-bulatan) — lebih "berisi" dari sekadar blur. */
export function CloudShape({
  className = '',
  className2 = '',
  width = 220,
}: {
  className?: string;
  /** kelas tambahan pada <svg> (mis. opacity). */
  className2?: string;
  width?: number;
}) {
  return (
    <div className={`pointer-events-none absolute ${className}`} aria-hidden>
      <svg
        width={width}
        height={width * 0.62}
        viewBox="0 0 220 136"
        fill="none"
        className={`drop-shadow-[0_10px_18px_rgba(30,60,100,0.12)] ${className2}`}
      >
        <path
          d="M46 116c-24 0-42-16-42-37 0-19 15-34 35-36 4-22 24-38 47-38 19 0 36 11 44 28 5-2 10-3 16-3 20 0 36 15 38 34 17 3 30 17 30 34 0 10-8 18-18 18H46z"
          fill="white"
          fillOpacity="0.92"
        />
        <path
          d="M46 116c-24 0-42-16-42-37 0-19 15-34 35-36 4-22 24-38 47-38"
          stroke="white"
          strokeOpacity="0.5"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  );
}

/**
 * Backdrop awan GLOBAL — dipasang sekali di layout agar SEMUA halaman punya
 * atmosfer langit (awan lembut hanyut) di belakang konten. `fixed` + low-opacity,
 * pointer-none. SSR-safe (CloudShape statis + animasi CSS yang hormati reduced-motion).
 */
export function SkyBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="animate-sky-drift">
        <CloudShape className="left-[5%] top-[12%]" width={210} className2="opacity-40" />
        <CloudShape className="right-[8%] top-[24%]" width={270} className2="opacity-30" />
        <CloudShape className="left-[28%] top-[58%]" width={180} className2="opacity-25" />
        <CloudShape className="right-[16%] top-[70%]" width={230} className2="opacity-25" />
        <CloudShape className="left-[60%] top-[38%]" width={160} className2="opacity-20" />
      </div>
    </div>
  );
}

/** Lapisan awan hanyut berlapis (parallax berbeda kecepatan/kedalaman). */
export function DriftingClouds({ className = '' }: { className?: string }) {
  const mounted = useMounted();
  const reduce = useReducedMotion();
  if (!mounted) return null;
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <div className={reduce ? '' : 'animate-sky-drift'}>
        <CloudShape className="left-[3%] top-[12%]" width={180} className2="opacity-70" />
        <CloudShape className="right-[8%] top-[22%]" width={240} className2="opacity-55" />
      </div>
      <div className={reduce ? '' : 'animate-sky-float'} style={{ animationDuration: '9s' }}>
        <CloudShape className="left-[38%] top-[6%]" width={130} className2="opacity-45" />
      </div>
    </div>
  );
}

/** Roket melintas diagonal berulang (aset Figma /images/sky/roket.png) + jejak lembut. */
export function FlyingRocket({
  className = '',
  duration = 16,
  delay = 2,
  size = 90,
  rotate = 40,
}: {
  className?: string;
  duration?: number;
  delay?: number;
  size?: number;
  /** Kemiringan roket dalam derajat (searah jarum jam = ke kanan). */
  rotate?: number;
}) {
  const mounted = useMounted();
  const reduce = useReducedMotion();
  if (!mounted) return null;
  if (reduce) {
    // Reduced-motion: tampilkan diam (tanpa lintasan), tetap miring agar tidak kaku.
    return (
      <div className={`pointer-events-none absolute ${className}`} aria-hidden style={{ transform: `rotate(${rotate}deg)` }}>
        <Image src="/images/sky/roket.png" alt="" width={size} height={size} className="opacity-80" />
      </div>
    );
  }
  return (
    <motion.div
      className={`pointer-events-none absolute ${className}`}
      aria-hidden
      initial={{ x: '-12vw', y: 20, opacity: 0 }}
      animate={{ x: '112vw', y: -70, opacity: [0, 1, 1, 0] }}
      transition={{ duration, delay, repeat: Infinity, repeatDelay: 6, ease: 'easeInOut' }}
      style={{ rotate }}
    >
      <div className="relative">
        {/* Jejak asap lembut */}
        <span className="absolute right-full top-1/2 h-2 w-24 -translate-y-1/2 rounded-full bg-gradient-to-l from-white/70 to-transparent blur-[3px]" />
        <Image src="/images/sky/roket.png" alt="" width={size} height={size} className="drop-shadow-[0_8px_16px_rgba(30,60,100,0.25)]" />
      </div>
    </motion.div>
  );
}

/** Objek melayang bergoyang lembut (balon/helikopter/pesawat) — aset PNG Figma. */
export function FloatingObject({
  src,
  className = '',
  size = 96,
  amplitude = 14,
  duration = 6,
}: {
  src: string;
  className?: string;
  size?: number;
  amplitude?: number;
  duration?: number;
}) {
  const mounted = useMounted();
  const reduce = useReducedMotion();
  if (!mounted) return null;
  return (
    <motion.div
      className={`pointer-events-none absolute ${className}`}
      aria-hidden
      animate={reduce ? undefined : { y: [0, -amplitude, 0], rotate: [-2, 2, -2] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
    >
      <Image src={src} alt="" width={size} height={size} className="drop-shadow-[0_12px_22px_rgba(30,60,100,0.2)]" />
    </motion.div>
  );
}

/** Cincin radar konsentris berdenyut — aksen seperti frame Timeline. */
export function RippleRings({ className = '', size = 320 }: { className?: string; size?: number }) {
  const mounted = useMounted();
  const reduce = useReducedMotion();
  if (!mounted) return null;
  return (
    <div className={`pointer-events-none absolute ${className}`} aria-hidden>
      <svg width={size} height={size} viewBox="0 0 320 320" fill="none">
        {[60, 110, 160].map((r, i) => (
          <motion.circle
            key={r}
            cx="160"
            cy="160"
            r={r}
            stroke="rgb(var(--forest))"
            strokeOpacity="0.12"
            strokeWidth="2"
            animate={reduce ? undefined : { opacity: [0.25, 0.6, 0.25], scale: [0.96, 1, 0.96] }}
            transition={{ duration: 4, delay: i * 0.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: 'center' }}
          />
        ))}
      </svg>
    </div>
  );
}
