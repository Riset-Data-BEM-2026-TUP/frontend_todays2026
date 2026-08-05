'use client';

import { motion } from 'framer-motion';

export function AtmosphericHeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
      {/* 1. Base Layer Gradient: Fades from misty atmospheric green at top to bright cream at bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#7c8f69]/45 via-[#b6c7a3]/25 to-cream" />

      {/* 2. Floating Atmospheric Fog / Mist Radial Layers */}
      <motion.div
        animate={{
          x: [-20, 20, -20],
          y: [-10, 10, -10],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-24 left-1/4 h-[450px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-[#9caf88]/50 to-transparent blur-3xl"
      />

      <motion.div
        animate={{
          x: [20, -20, 20],
          y: [10, -10, 10],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-10 right-1/4 h-[400px] w-[600px] translate-x-1/2 rounded-full bg-gradient-to-tl from-[#65704a]/30 to-transparent blur-3xl"
      />

      {/* Subtle Pattern Grid Mesh for texture */}
      <div className="absolute inset-0 opacity-[0.06] bhumara-pattern-bg" />

      {/* 3. Large Left Tree Canopy Silhouette (Soft & Atmospheric) */}
      <div className="absolute -left-12 top-0 h-full w-[45vw] max-w-[550px] min-w-[280px] opacity-[0.22] text-[#4d5839]">
        <svg
          viewBox="0 0 400 800"
          fill="currentColor"
          className="h-full w-full object-cover"
          preserveAspectRatio="none"
        >
          {/* Main Trunk */}
          <path d="M-50 850 C -20 600, 30 450, 10 250 C -5 100, 40 20, 80 -50 L-100 -50 Z" opacity="0.85" />
          {/* Main Branches & Canopy Clusters */}
          <circle cx="110" cy="120" r="140" opacity="0.65" />
          <circle cx="60" cy="220" r="120" opacity="0.75" />
          <circle cx="180" cy="180" r="100" opacity="0.55" />
          <circle cx="130" cy="350" r="110" opacity="0.7" />
          <circle cx="40" cy="480" r="130" opacity="0.8" />
          <circle cx="170" cy="300" r="85" opacity="0.6" />
          
          {/* Overarching leaves overlay */}
          <path d="M 0 0 C 120 40, 240 80, 280 200 C 220 220, 140 160, 0 140 Z" opacity="0.5" />
          <path d="M 40 180 C 180 220, 290 280, 320 400 C 240 420, 160 340, 40 300 Z" opacity="0.45" />
        </svg>
      </div>

      {/* 4. Large Right Tree Canopy Silhouette (Soft & Atmospheric) */}
      <div className="absolute -right-12 top-0 h-full w-[45vw] max-w-[550px] min-w-[280px] opacity-[0.22] text-[#4d5839]">
        <svg
          viewBox="0 0 400 800"
          fill="currentColor"
          className="h-full w-full object-cover"
          preserveAspectRatio="none"
        >
          {/* Main Trunk Right */}
          <path d="M450 850 C 420 600, 370 450, 390 250 C 405 100, 360 20, 320 -50 L500 -50 Z" opacity="0.85" />
          {/* Main Canopy Clusters Right */}
          <circle cx="290" cy="110" r="145" opacity="0.65" />
          <circle cx="340" cy="210" r="125" opacity="0.75" />
          <circle cx="220" cy="170" r="105" opacity="0.55" />
          <circle cx="270" cy="340" r="115" opacity="0.7" />
          <circle cx="360" cy="470" r="135" opacity="0.8" />
          <circle cx="230" cy="290" r="90" opacity="0.6" />

          {/* Overarching leaves overlay right */}
          <path d="M 400 0 C 280 40, 160 80, 120 200 C 180 220, 260 160, 400 140 Z" opacity="0.5" />
          <path d="M 360 180 C 220 220, 110 280, 80 400 C 160 420, 240 340, 360 300 Z" opacity="0.45" />
        </svg>
      </div>

      {/* 5. Bottom Left Shrub & Hill Silhouette */}
      <div className="absolute -left-10 bottom-0 h-48 w-80 sm:h-64 sm:w-[420px] opacity-[0.25] text-[#556240]">
        <svg viewBox="0 0 400 200" fill="currentColor" className="h-full w-full">
          <ellipse cx="60" cy="180" rx="140" ry="90" opacity="0.85" />
          <ellipse cx="180" cy="200" rx="130" ry="80" opacity="0.7" />
          <ellipse cx="280" cy="220" rx="100" ry="60" opacity="0.5" />
        </svg>
      </div>

      {/* 6. Bottom Right Shrub & Hill Silhouette */}
      <div className="absolute -right-10 bottom-0 h-48 w-80 sm:h-64 sm:w-[420px] opacity-[0.25] text-[#556240]">
        <svg viewBox="0 0 400 200" fill="currentColor" className="h-full w-full">
          <ellipse cx="340" cy="180" rx="140" ry="90" opacity="0.85" />
          <ellipse cx="220" cy="200" rx="130" ry="80" opacity="0.7" />
          <ellipse cx="120" cy="220" rx="100" ry="60" opacity="0.5" />
        </svg>
      </div>

      {/* 7. Bottom Linear Gradient Overlay to guarantee a 100% smooth blend into cream background */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-cream via-cream/80 to-transparent" />
    </div>
  );
}
