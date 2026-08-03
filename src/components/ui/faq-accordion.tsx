'use client';

import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChevronDown, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getFaq } from '@/lib/api/queries';

export function FaqAccordion() {
  const [search, setSearch] = useState('');
  const { data, isLoading } = useQuery({ queryKey: ['faq'], queryFn: () => getFaq() });
  const [open, setOpen] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return data ?? [];
    return (data ?? []).filter(
      (f) => f.pertanyaan.toLowerCase().includes(q) || f.jawaban.toLowerCase().includes(q),
    );
  }, [data, search]);

  return (
    <div>
      {/* Search Input (Standard UX Touch Target 48px+) */}
      <div className="mb-8 flex items-center gap-3 rounded-2xl border border-sand bg-cream px-5 py-3.5 shadow-sm focus-within:border-rust focus-within:ring-2 focus-within:ring-rust/20 transition-all">
        <Search size={20} className="text-forest/70 shrink-0" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari pertanyaan seputar PKKMB…"
          className="w-full bg-transparent text-base text-ink outline-none placeholder:text-forest/50"
        />
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            className="size-7 border-3 border-rust border-t-transparent rounded-full"
          />
        </div>
      )}

      <div className="space-y-4">
        {filtered.map((f) => {
          const isOpen = open === f.id;
          return (
            <motion.div
              key={f.id}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="overflow-hidden rounded-2xl border border-sand/60 bg-cream shadow-sm hover:border-sand transition-colors"
            >
              {/* Accordion Trigger (Comfortable 48px+ touch target & text-base typography) */}
              <button
                onClick={() => setOpen(isOpen ? null : f.id)}
                className="flex w-full items-center justify-between px-6 py-4.5 sm:py-5 text-left font-display text-base sm:text-lg font-bold text-ink hover:text-rust transition-colors"
                aria-expanded={isOpen}
              >
                <span className="pr-4 leading-snug">{f.pertanyaan}</span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <ChevronDown size={20} className="text-forest/70 shrink-0" />
                </motion.div>
              </button>

              {/* Accordion Answer Content (Human Reading 16px font & 1.6 line height) */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                  >
                    <p className="border-t border-sand/40 px-6 py-5 text-base text-forest/90 leading-relaxed bg-sage/5">
                      {f.jawaban}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}

        {!isLoading && filtered.length === 0 && (
          <p className="py-8 text-center text-base text-forest/70 font-medium">Tidak ada pertanyaan yang sesuai dengan pencarian Anda.</p>
        )}
      </div>
    </div>
  );
}
