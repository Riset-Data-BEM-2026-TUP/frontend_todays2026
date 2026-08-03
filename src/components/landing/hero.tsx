'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FloatingOrbs, TextReveal, FloatingBadge } from '@/components/ui/animated-section';

export function Hero({ tagline }: { tagline?: string }) {
  return (
    <section className="relative overflow-hidden bg-forest-deep text-cream min-h-[85vh] flex items-center justify-center py-20 sm:py-28">
      {/* Dynamic Ambient Floating Particles & Pattern Mesh */}
      <FloatingOrbs />
      <div className="pointer-events-none absolute inset-0 opacity-15 bhumara-pattern-bg" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-4 sm:px-6 text-center">
        {/* Floating Badge (PIONIR UGM inspired status pill) */}
        <div className="mb-6">
          <FloatingBadge text="PKKMB Telkom University Purwokerto 2026" />
        </div>

        {/* Logo Container */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative group cursor-pointer"
        >
          {/* Multi-layered Pulsating Glow Aura */}
          <motion.div
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -inset-6 rounded-full bg-gradient-to-r from-sage via-cream/40 to-rust opacity-40 blur-3xl group-hover:opacity-80 transition-opacity"
          />

          {/* Continuous Sinusoidal Floating Motion */}
          <motion.div
            animate={{
              y: [-8, 8],
              rotate: [-1.2, 1.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          >
            <Image
              src="/logo-pkkmb.png"
              alt="Logo PKKMB Telkom University Purwokerto 2026"
              width={150}
              height={150}
              priority
              className="relative drop-shadow-[0_20px_40px_rgba(0,0,0,0.55)] transition-transform duration-300 group-hover:scale-105"
            />
          </motion.div>
        </motion.div>

        {/* Title: BHUMARA (Visual Anchor) */}
        <div className="mt-8 overflow-hidden">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl font-extrabold tracking-widest sm:text-7xl lg:text-8xl bg-gradient-to-b from-cream via-cream to-sage/80 bg-clip-text text-transparent drop-shadow-md"
          >
            BHUMARA
          </motion.h1>
        </div>

        {/* Subtitle Tagline */}
        <div className="mt-4 max-w-2xl mx-auto">
          <p className="text-lg sm:text-2xl font-medium text-cream/90 tracking-wide leading-relaxed">
            <TextReveal text={tagline ?? 'Growing Today, Thriving Tomorrow'} delay={0.4} />
          </p>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="mt-10 flex flex-wrap justify-center gap-4 sm:gap-5"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <Link
              href="/login"
              className="relative inline-flex min-h-[50px] items-center justify-center rounded-full bg-rust px-8 py-3.5 text-base font-semibold text-cream shadow-[0_10px_25px_rgba(180,106,50,0.4)] hover:bg-rust/90 transition-all duration-300 overflow-hidden group"
            >
              <span className="relative z-10">Login</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cream/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <Link
              href="/timeline"
              className="inline-flex min-h-[50px] items-center justify-center rounded-full border border-cream/40 px-8 py-3.5 text-base font-semibold text-cream hover:bg-cream/10 hover:border-cream/70 backdrop-blur-md transition-all duration-300"
            >
              Jelajahi Website &rarr;
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
