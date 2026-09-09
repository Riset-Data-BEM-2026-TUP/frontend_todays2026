'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface PinnedAboutSectionProps {
  filosofi?: string;
  tema?: string;
  maknaLogo?: string;
  maknaMaskot?: string;
}

export function PinnedAboutSection({
  filosofi,
  tema,
  maknaLogo,
  maknaMaskot,
}: PinnedAboutSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 28,
    restDelta: 0.001,
  });

  // Orbital Mechanical Ring Rotations
  const ring1Rotate = useTransform(smoothProgress, [0, 1], [0, 360]);
  const ring2Rotate = useTransform(smoothProgress, [0, 1], [0, -360]);
  const logoScale = useTransform(smoothProgress, [0, 0.25, 0.5, 0.75, 1], [1, 1.15, 1, 1.15, 1]);
  const glowOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.3, 0.85, 0.3]);

  // Card Opacities and Y Slidings for 4 Steps
  const card1Opacity = useTransform(smoothProgress, [0, 0.05, 0.2, 0.25], [0, 1, 1, 0]);
  const card1Y = useTransform(smoothProgress, [0, 0.05, 0.2, 0.25], [40, 0, 0, -40]);

  const card2Opacity = useTransform(smoothProgress, [0.25, 0.3, 0.45, 0.5], [0, 1, 1, 0]);
  const card2Y = useTransform(smoothProgress, [0.25, 0.3, 0.45, 0.5], [40, 0, 0, -40]);

  const card3Opacity = useTransform(smoothProgress, [0.5, 0.55, 0.7, 0.75], [0, 1, 1, 0]);
  const card3Y = useTransform(smoothProgress, [0.5, 0.55, 0.7, 0.75], [40, 0, 0, -40]);

  const card4Opacity = useTransform(smoothProgress, [0.75, 0.8, 0.95, 1], [0, 1, 1, 1]);
  const card4Y = useTransform(smoothProgress, [0.75, 0.8, 0.95, 1], [40, 0, 0, 0]);

  const steps = [
    { title: 'Filosofi', text: filosofi, opacity: card1Opacity, y: card1Y, num: '01' },
    { title: 'Tema', text: tema, opacity: card2Opacity, y: card2Y, num: '02' },
    { title: 'Makna Logo', text: maknaLogo, opacity: card3Opacity, y: card3Y, num: '03' },
    { title: 'Makna Maskot', text: maknaMaskot, opacity: card4Opacity, y: card4Y, num: '04' },
  ];

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-forest-deep text-cream">
      {/* Sticky Container Pinned to Viewport */}
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        {/* Background Radial Atmosphere */}
        <motion.div
          style={{ opacity: glowOpacity }}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sage/25 via-forest-deep to-forest-deep"
        />

        {/* Ambient Grid Pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-15 bhumara-pattern-bg" />

        <div className="relative z-10 mx-auto flex max-w-6xl w-full flex-col lg:flex-row items-center justify-between px-6 gap-10">
          
          {/* Left Column: Mechanical Emblem Centerpiece */}
          <div className="relative flex items-center justify-center size-64 sm:size-80 lg:size-[420px] shrink-0">
            {/* Outer Orbital Ring 1 */}
            <motion.div
              style={{ rotate: ring1Rotate }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-sage/40"
            />

            {/* Inner Orbital Ring 2 with Accent Nodes */}
            <motion.div
              style={{ rotate: ring2Rotate }}
              className="absolute inset-5 rounded-full border border-rust/50"
            >
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 size-4 rounded-full bg-rust shadow-[0_0_12px_#B46A32]" />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 size-4 rounded-full bg-sage shadow-[0_0_12px_#9CAF88]" />
            </motion.div>

            {/* Pulsating Core Glow */}
            <motion.div
              style={{ opacity: glowOpacity }}
              className="absolute inset-16 rounded-full bg-rust/30 blur-2xl"
            />

            {/* BHUMARA Logo Emblem */}
            <motion.div style={{ scale: logoScale }} className="relative z-10 drop-shadow-2xl">
              <Image
                src="/logo-pkkmb.png"
                alt="Logo BHUMARA Emblem"
                width={200}
                height={200}
                priority
                className="w-36 sm:w-48 lg:w-56 drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
              />
            </motion.div>
          </div>

          {/* Right Column: Scroll-Driven Content Panels */}
          <div className="relative flex-1 w-full max-w-xl min-h-[320px] flex items-center">
            {steps.map((step) => (
              <motion.div
                key={step.title}
                style={{ opacity: step.opacity, y: step.y }}
                className="absolute inset-0 flex flex-col justify-center rounded-3xl border border-cream/20 bg-cream/10 p-8 sm:p-10 backdrop-blur-xl shadow-2xl"
              >
                <div className="flex items-center justify-end border-b border-cream/15 pb-4 mb-4">
                  <span className="font-display text-2xl font-black text-sage/80">{step.num}</span>
                </div>
                <h3 className="font-display text-3xl sm:text-4xl font-black text-cream">
                  {step.title}
                </h3>
                <p className="mt-4 text-base sm:text-lg text-cream/90 font-medium leading-relaxed">
                  {step.text ?? '—'}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Step Progress Dots Indicator */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              className="size-3.5 rounded-full border border-cream/40 bg-cream/20"
              style={{
                backgroundColor: useTransform(
                  smoothProgress,
                  [i * 0.25, i * 0.25 + 0.2],
                  ['rgba(243, 233, 210, 0.2)', '#B46A32']
                ),
                scale: useTransform(
                  smoothProgress,
                  [i * 0.25, i * 0.25 + 0.2],
                  [1, 1.4]
                ),
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
