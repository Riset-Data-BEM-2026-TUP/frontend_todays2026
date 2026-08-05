'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { href: '/timeline', label: 'Timeline' },
  { href: '/explore-ormawa', label: 'Ormawa' },
  { href: '/academic', label: 'Akademik' },
  { href: '/campus-tour', label: 'Campus Tour' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Kontak' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-3 sm:top-5 left-0 right-0 z-[1000] mx-auto max-w-5xl px-3 sm:px-4"
    >
      {/* Floating Glassmorphism Pill Container */}
      <div className="relative rounded-2xl border border-sand/50 bg-cream/85 px-4 sm:px-6 py-2.5 shadow-lg shadow-forest-deep/5 backdrop-blur-xl transition-all duration-300">
        <nav className="flex items-center justify-between">
          {/* Logo & Brand Name */}
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            <Link href="/" className="flex items-center gap-2.5 font-display text-lg sm:text-xl text-forest-deep">
              <Image src="/logo-pkkmb.png" alt="BHUMARA" width={30} height={30} className="drop-shadow-sm" />
              <span>BHUMARA</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation Links (Underline Hover Fill terinspirasi PIONIR UGM) */}
          <div className="hidden items-center gap-7 md:flex">
            {links.map((l) => {
              const isActive = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`group relative py-1 text-sm font-medium transition-colors ${
                    isActive ? 'text-rust font-bold' : 'text-forest hover:text-rust'
                  }`}
                >
                  <span className="relative z-10">{l.label}</span>
                  {/* Underline Hover Expand (PIONIR UGM style) */}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 rounded-full bg-rust transition-[width] duration-300 ease-out ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/login"
                className="rounded-full bg-rust px-5 py-2 text-sm font-semibold text-cream shadow-md shadow-rust/20 hover:bg-rust/90 transition-colors"
              >
                Login
              </Link>
            </motion.div>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="p-1 md:hidden text-forest hover:text-rust transition-colors"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Drawer Slide Down */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden pt-3 md:hidden border-t border-sand/40 mt-2.5"
            >
              <div className="flex flex-col space-y-2 pb-2">
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`block px-2 py-1.5 text-base font-medium rounded-lg transition-colors ${
                      pathname === l.href ? 'text-rust bg-rust/10 font-bold' : 'text-forest hover:text-rust hover:bg-cream'
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                ))}
                <Link
                  href="/login"
                  className="mt-2 block rounded-full bg-rust px-4 py-2.5 text-center font-semibold text-cream shadow-md"
                  onClick={() => setOpen(false)}
                >
                  Login
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
