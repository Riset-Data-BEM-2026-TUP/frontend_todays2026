'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface MaskedTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

/**
 * Split-Text Masked Heading Reveal
 * Inspired by HKI Paris & Unshift JP.
 * Words slide up from beneath an overflow mask with skew & cubic-bezier easing.
 */
export function MaskedText({
  text,
  className = '',
  delay = 0,
  as: Component = 'span',
}: MaskedTextProps) {
  const words = text.trim().split(/\s+/);

  return (
    <Component className={`inline-block overflow-hidden ${className}`}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-20px' }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.06,
              delayChildren: delay,
            },
          },
        }}
        className="inline-block"
      >
        {words.map((word, index) => (
          <span key={index} className="inline-block overflow-hidden py-1 mr-[0.25em] last:mr-0 align-bottom">
            <motion.span
              variants={{
                hidden: { y: '115%', rotateZ: 2, opacity: 0 },
                visible: {
                  y: '0%',
                  rotateZ: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.65,
                    ease: [0.16, 1, 0.3, 1],
                  },
                },
              }}
              className="inline-block"
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Component>
  );
}

interface MaskedImageProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

/**
 * Masked Image / Asset Curtain Wipe Reveal
 */
export function MaskedImageReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: MaskedImageProps) {
  const getInitialClip = () => {
    switch (direction) {
      case 'up':
        return 'inset(100% 0 0 0)';
      case 'down':
        return 'inset(0 0 100% 0)';
      case 'left':
        return 'inset(0 0 0 100%)';
      case 'right':
        return 'inset(0 100% 0 0)';
    }
  };

  return (
    <motion.div
      initial={{ clipPath: getInitialClip(), scale: 1.08 }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 1.1,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
}
