'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * Dynamic Morphing Organic SVG Dividers & Background Frames
 * Inspired by Unshift JP & HKI Paris.
 */

export function OrganicWaveDivider({
  position = 'bottom',
  fillColor = '#EAF5FF',
  className = '',
}: {
  position?: 'top' | 'bottom';
  fillColor?: string;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute left-0 right-0 z-10 w-full overflow-hidden leading-none select-none ${
        position === 'top' ? 'top-0 -translate-y-[98%]' : 'bottom-0 translate-y-[98%]'
      } ${className}`}
    >
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-12 sm:h-20 lg:h-28 object-fill"
        preserveAspectRatio="none"
      >
        <motion.path
          d={
            position === 'top'
              ? 'M0,120 C320,30 420,110 720,50 C1020,-10 1140,80 1440,20 L1440,120 L0,120 Z'
              : 'M0,0 C320,90 420,10 720,70 C1020,130 1140,40 1440,100 L1440,0 L0,0 Z'
          }
          animate={{
            d:
              position === 'top'
                ? [
                    'M0,120 C320,30 420,110 720,50 C1020,-10 1140,80 1440,20 L1440,120 L0,120 Z',
                    'M0,120 C280,70 480,20 720,90 C960,160 1200,40 1440,80 L1440,120 L0,120 Z',
                    'M0,120 C320,30 420,110 720,50 C1020,-10 1140,80 1440,20 L1440,120 L0,120 Z',
                  ]
                : [
                    'M0,0 C320,90 420,10 720,70 C1020,130 1140,40 1440,100 L1440,0 L0,0 Z',
                    'M0,0 C280,50 480,100 720,30 C960,-40 1200,80 1440,40 L1440,0 L0,0 Z',
                    'M0,0 C320,90 420,10 720,70 C1020,130 1140,40 1440,100 L1440,0 L0,0 Z',
                  ],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          fill={fillColor}
        />
      </svg>
    </div>
  );
}

/**
 * Floating Organic 3D-Like Blob Background Decoration
 */
export function OrganicFloatingBlob({
  className = '',
  color = 'from-rust/20 to-sage/30',
}: {
  className?: string;
  color?: string;
}) {
  return (
    <motion.div
      animate={{
        scale: [1, 1.15, 0.92, 1],
        rotate: [0, 90, 180, 360],
        borderRadius: [
          '40% 60% 70% 30% / 40% 50% 60% 50%',
          '60% 40% 30% 70% / 50% 30% 70% 50%',
          '50% 60% 30% 60% / 30% 60% 40% 70%',
          '40% 60% 70% 30% / 40% 50% 60% 50%',
        ],
      }}
      transition={{
        duration: 18,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={`pointer-events-none absolute bg-gradient-to-tr ${color} blur-2xl ${className}`}
    />
  );
}
