'use client';

import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChevronDown, Search, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { getFaq, type Faq } from '@/lib/api/queries';

export const EXACT_VERCEL_FAQ_ITEMS: Faq[] = [
  {
    id: '1',
    pertanyaan: 'Apa itu PKKMB?',
    jawaban:
      'PKKMB (Pengenalan Kehidupan Kampus bagi Mahasiswa Baru) adalah program wajib bagi seluruh mahasiswa baru untuk mengenal lingkungan kampus, sistem akademik, dan nilai-nilai yang dianut oleh Telkom University Purwokerto.',
    isFeatured: true,
    kategori: { nama: 'Umum', slug: 'umum' },
  },
  {
    id: '2',
    pertanyaan: 'Apakah PKKMB wajib diikuti?',
    jawaban:
      'Ya, PKKMB wajib diikuti oleh seluruh mahasiswa baru. Ketidakhadiran tanpa keterangan yang sah akan mempengaruhi status kemahasiswaan.',
    isFeatured: true,
    kategori: { nama: 'Aturan', slug: 'aturan' },
  },
  {
    id: '3',
    pertanyaan: 'Apa yang harus dibawa saat PKKMB?',
    jawaban:
      'Bawa atribut lengkap (baju putih, celana/rok hitam, topi, name tag), alat tulis, air minum, dan jas almamater untuk upacara.',
    isFeatured: true,
    kategori: { nama: 'Atribut', slug: 'atribut' },
  },
  {
    id: '4',
    pertanyaan: 'Bagaimana jika NIM saya tidak ditemukan di sistem?',
    jawaban:
      'Hubungi panitia PKKMB melalui kontak WhatsApp yang tersedia di halaman Kontak Penting pada guidebook.',
    isFeatured: false,
    kategori: { nama: 'Bantuan', slug: 'bantuan' },
  },
  {
    id: '5',
    pertanyaan: 'Apakah quiz bisa diulang?',
    jawaban:
      'Quiz hanya bisa dikerjakan satu kali. Setelah submit, kamu tidak bisa mengerjakan ulang. Pastikan jawabanmu sudah yakin sebelum menekan tombol kumpulkan.',
    isFeatured: false,
    kategori: { nama: 'Quiz', slug: 'quiz' },
  },
  {
    id: '6',
    pertanyaan: 'Bagaimana cara mengetahui kelompok PKKMB saya?',
    jawaban:
      'Setelah menyelesaikan quiz, fitur Cari Kelompok akan terbuka. Masukkan NIM kamu untuk melihat nomor kelompok, nama kelompok, dan mentor.',
    isFeatured: true,
    kategori: { nama: 'Kelompok', slug: 'kelompok' },
  },
  {
    id: '7',
    pertanyaan: 'Apa yang dimaksud dengan badge?',
    jawaban:
      'Badge adalah gelar unik yang diberikan berdasarkan skor quiz kamu. Badge juga menampilkan ikon hewan hutan yang berbeda sesuai pencapaian skor.',
    isFeatured: false,
    kategori: { nama: 'Quiz', slug: 'quiz' },
  },
];

export function FaqAccordion() {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState<string | null>('1');

  const { data, isLoading } = useQuery({
    queryKey: ['faq'],
    queryFn: () => getFaq(),
    staleTime: 1000 * 60 * 5,
  });

  const faqItems = useMemo(() => {
    return data && data.length >= EXACT_VERCEL_FAQ_ITEMS.length
      ? data
      : EXACT_VERCEL_FAQ_ITEMS;
  }, [data]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return faqItems;
    return faqItems.filter(
      (f) =>
        f.pertanyaan.toLowerCase().includes(q) ||
        f.jawaban.toLowerCase().includes(q)
    );
  }, [faqItems, search]);

  return (
    <div className="space-y-6">
      {/* Search Input Bar */}
      <div className="relative flex items-center gap-3 rounded-2xl border border-sand/60 bg-cream px-5 py-3.5 shadow-sm focus-within:border-rust focus-within:ring-2 focus-within:ring-rust/20 transition-all">
        <Search size={18} className="text-forest/60 shrink-0" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari pertanyaan seputar PKKMB..."
          className="w-full bg-transparent text-sm sm:text-base text-ink outline-none placeholder:text-forest/50 font-medium"
        />
      </div>

      {isLoading && !data && (
        <div className="flex items-center justify-center py-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            className="size-7 border-3 border-rust border-t-transparent rounded-full"
          />
        </div>
      )}

      {/* Accordion List */}
      <div className="space-y-3.5">
        {filtered.map((f, index) => {
          const isOpen = open === f.id;
          const numberStr = String(index + 1).padStart(2, '0');
          const isEven = index % 2 === 0;

          return (
            <div
              key={f.id}
              className={`overflow-hidden rounded-2xl border transition-colors duration-300 transform-gpu ${
                isOpen
                  ? 'border-rust/50 bg-cream shadow-md'
                  : isEven
                  ? 'border-forest/15 bg-cream/95 hover:border-rust/40 shadow-sm'
                  : 'border-sage/30 bg-sage/12 hover:border-forest/40 shadow-sm'
              }`}
            >
              {/* Accordion Trigger Button */}
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : f.id)}
                className="flex w-full items-start justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 text-left font-display text-base sm:text-lg font-bold text-forest-deep hover:text-rust transition-colors duration-300 group select-none"
                aria-expanded={isOpen}
              >
                <span className="flex items-start gap-3.5">
                  <span className="mt-0.5 shrink-0 font-display text-sm font-bold text-rust">
                    {numberStr}
                  </span>
                  <span className="leading-snug">{f.pertanyaan}</span>
                </span>

                <div
                  className={`flex size-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                    isOpen
                      ? 'bg-rust text-cream rotate-180 shadow-sm'
                      : 'bg-forest-deep/10 text-forest-deep group-hover:bg-rust group-hover:text-cream'
                  }`}
                >
                  <ChevronDown
                    size={18}
                    className="transition-transform duration-300"
                  />
                </div>
              </button>

              {/* Accordion Answer Content (GPU-Accelerated CSS Grid 0fr -> 1fr, zero layout thrashing) */}
              <div
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isOpen
                    ? 'grid-rows-[1fr] opacity-100'
                    : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="border-t border-forest/10 px-5 py-4 sm:px-6 sm:py-5 bg-sand/10">
                    <p
                      className={`text-sm sm:text-base text-forest-deep leading-relaxed font-medium whitespace-pre-line pl-7 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isOpen
                          ? 'opacity-100 translate-y-0 delay-75'
                          : 'opacity-0 -translate-y-1'
                      }`}
                    >
                      {f.jawaban}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="py-12 text-center rounded-2xl border border-dashed border-sand/60 bg-cream/50">
            <HelpCircle size={36} className="mx-auto text-forest/40 mb-2" />
            <p className="font-display text-base font-bold text-forest-deep">
              Tidak ada pertanyaan yang sesuai
            </p>
            <p className="mt-1 text-xs sm:text-sm text-forest/70">
              Coba gunakan kata kunci pencarian lain.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
