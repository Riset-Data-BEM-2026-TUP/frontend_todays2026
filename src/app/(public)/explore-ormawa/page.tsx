'use client';

import { useState, useMemo } from 'react';
import { AnimatedSection, TextReveal, GlowCard } from '@/components/ui/animated-section';
import { Search, Users, ExternalLink, Sparkles, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export type OrmawaItem = {
  id: string;
  nama: string;
  singkatan: string;
  kategori: string;
  deskripsi: string;
  instagram: string;
  isOpen: boolean;
  tags: string[];
  bannerGradient: string;
};

const initialOrmawaList: OrmawaItem[] = [
  {
    id: '1',
    nama: 'Software Engineering Club',
    singkatan: 'SEC',
    kategori: 'Penalaran & Teknologi',
    deskripsi: 'Wadah pengembangan bakat mahasiswa di bidang rekayasa perangkat lunak, web development, dan competitive programming.',
    instagram: '@sec.telkompwt',
    isOpen: true,
    tags: ['Coding', 'Web Dev', 'AI/ML', 'Hackathon'],
    bannerGradient: 'from-forest-deep via-forest to-sage/40',
  },
  {
    id: '2',
    nama: 'Cyber Security Team',
    singkatan: 'CST',
    kategori: 'Penalaran & Teknologi',
    deskripsi: 'Komunitas keamanan siber Telkom University Purwokerto yang fokus pada Capture The Flag (CTF) dan ethical hacking.',
    instagram: '@cst.telkompwt',
    isOpen: true,
    tags: ['CTF', 'CyberSecurity', 'Pentest'],
    bannerGradient: 'from-rust/90 via-rust/60 to-sand/40',
  },
  {
    id: '3',
    nama: 'UKM Olahraga Telkom',
    singkatan: 'UKMO',
    kategori: 'Olahraga',
    deskripsi: 'Mewadahi minat bakat cabang olahraga Futsal, Basket, Badminton, Voli, dan E-Sports berprestasi.',
    instagram: '@ukmo.telkompwt',
    isOpen: true,
    tags: ['Futsal', 'Basket', 'Badminton', 'E-Sports'],
    bannerGradient: 'from-forest via-sage to-cream/30',
  },
  {
    id: '4',
    nama: 'UKM Musik & Seni Teater',
    singkatan: 'HARMONY',
    kategori: 'Seni & Budaya',
    deskripsi: 'Wadah berekspresi mahasiswa dalam bidang olah vokal, instrumen musik, produksi lagu, serta pertunjukan seni teater.',
    instagram: '@harmony.telkompwt',
    isOpen: false,
    tags: ['Band', 'Vokal', 'Teater', 'Konser'],
    bannerGradient: 'from-rust via-sand to-forest-deep/60',
  },
  {
    id: '5',
    nama: 'Himpunan Mahasiswa Informatika',
    singkatan: 'HMIF',
    kategori: 'Himpunan Jurusan',
    deskripsi: 'Himpunan mahasiswa program studi S1 Informatika Telkom University Purwokerto penggerak kegiatan akademik & non-akademik.',
    instagram: '@hmif.telkompwt',
    isOpen: true,
    tags: ['Informatika', 'Himpunan', 'Advokasi'],
    bannerGradient: 'from-forest-deep via-rust/70 to-sage/50',
  },
  {
    id: '6',
    nama: 'UKM Kerohanian Islam',
    singkatan: 'UKKI',
    kategori: 'Keagamaan',
    deskripsi: 'Organisasi kemahasiswaan pembinaan nilai keislaman, kajian rutin, bakti sosial, dan kepemimpinan islami.',
    instagram: '@ukki.telkompwt',
    isOpen: true,
    tags: ['Kajian', 'Baksos', 'Karakter'],
    bannerGradient: 'from-forest via-sage/80 to-cream/40',
  },
];

const categories = ['Semua', 'Penalaran & Teknologi', 'Olahraga', 'Seni & Budaya', 'Himpunan Jurusan', 'Keagamaan'];

export default function ExploreOrmawaPage() {
  const [selectedCat, setSelectedCat] = useState('Semua');
  const [search, setSearch] = useState('');
  const [selectedOrmawa, setSelectedOrmawa] = useState<OrmawaItem | null>(null);

  const filtered = useMemo(() => {
    return initialOrmawaList.filter((item) => {
      const matchCat = selectedCat === 'Semua' || item.kategori === selectedCat;
      const q = search.toLowerCase().trim();
      const matchSearch =
        !q ||
        item.nama.toLowerCase().includes(q) ||
        item.singkatan.toLowerCase().includes(q) ||
        item.deskripsi.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [selectedCat, search]);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-28 sm:pt-32 pb-24">
      {/* Page Header */}
      <AnimatedSection>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={18} className="text-rust" />
          <span className="font-display text-xs font-bold uppercase tracking-widest text-rust">
            DIREKTORI ORGANISASI KAMPUS
          </span>
        </div>
        <h1 className="font-display text-4xl text-forest-deep sm:text-5xl">
          <TextReveal text="Explore Ormawa & UKM" />
        </h1>
        <p className="mt-4 text-lg text-forest/80 font-medium leading-relaxed max-w-2xl">
          Jelajahi beragam pilihan Organisasi Kemahasiswaan (Ormawa) & Unit Kegiatan Mahasiswa (UKM) di Telkom University Purwokerto.
        </p>
      </AnimatedSection>

      {/* Controls & Filter Bar */}
      <AnimatedSection delay={0.1} className="mt-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md flex items-center rounded-2xl border border-sand bg-cream px-4 py-3 shadow-sm focus-within:border-rust focus-within:ring-2 focus-within:ring-rust/20 transition-all">
          <Search size={18} className="text-forest/60 shrink-0 mr-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama Ormawa, UKM, atau minat..."
            className="w-full bg-transparent text-base text-ink outline-none placeholder:text-forest/50"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          <Filter size={16} className="text-rust shrink-0 mr-1 hidden sm:block" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`rounded-full px-4 py-2 text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                selectedCat === cat
                  ? 'bg-rust text-cream shadow-md shadow-rust/25 scale-105'
                  : 'bg-sand/30 text-forest hover:bg-sand/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </AnimatedSection>

      {/* Ormawa Grid */}
      <AnimatedSection delay={0.2} className="mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <GlowCard key={item.id} className="flex flex-col justify-between h-full group">
              <div>
                {/* Banner Gradient Header */}
                <div className={`h-24 rounded-2xl bg-gradient-to-r ${item.bannerGradient} p-4 flex items-start justify-between relative overflow-hidden mb-4`}>
                  <div className="absolute inset-0 opacity-20 bhumara-pattern-bg" />
                  <span className="relative z-10 rounded-full bg-forest-deep/80 backdrop-blur-md px-3 py-1 text-xs font-bold text-cream border border-cream/20">
                    {item.singkatan}
                  </span>
                  {item.isOpen && (
                    <span className="relative z-10 rounded-full bg-rust px-3 py-1 text-xs font-bold text-cream shadow-sm animate-pulse">
                      Open Recruitment
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-rust">
                    {item.kategori}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-forest-deep group-hover:text-rust transition-colors">
                  {item.nama}
                </h3>

                <p className="mt-2 text-sm text-forest/80 leading-relaxed font-medium line-clamp-3">
                  {item.deskripsi}
                </p>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-md bg-sage/20 border border-sage/40 px-2.5 py-0.5 text-xs font-semibold text-forest">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-sand/40 flex items-center justify-between">
                <span className="text-xs font-bold text-forest/70 flex items-center gap-1">
                  <Users size={14} className="text-rust" /> {item.instagram}
                </span>
                <button
                  onClick={() => setSelectedOrmawa(item)}
                  className="inline-flex items-center gap-1.5 text-xs font-extrabold text-rust hover:text-rust/80 transition-colors uppercase tracking-wider"
                >
                  Detail <ExternalLink size={13} />
                </button>
              </div>
            </GlowCard>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center rounded-3xl border border-dashed border-sand/60 bg-cream/50">
            <Users size={40} className="mx-auto text-forest/40 mb-3" />
            <p className="font-display text-lg font-bold text-forest-deep">Tidak ada Ormawa yang ditemukan</p>
            <p className="mt-1 text-sm text-forest/70">Coba ubah kata kunci pencarian atau kategori filter Anda.</p>
          </div>
        )}
      </AnimatedSection>

      {/* Modal Detail View */}
      <AnimatePresence>
        {selectedOrmawa && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-deep/70 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-lg rounded-3xl bg-cream p-6 sm:p-8 shadow-2xl border border-sand relative overflow-hidden"
            >
              <div className={`h-28 rounded-2xl bg-gradient-to-r ${selectedOrmawa.bannerGradient} p-4 flex items-end justify-between -mx-2 -mt-2 mb-6`}>
                <h3 className="font-display text-2xl font-black text-cream drop-shadow-md">{selectedOrmawa.nama}</h3>
                <span className="rounded-full bg-forest-deep/90 px-3 py-1 text-xs font-bold text-cream">
                  {selectedOrmawa.singkatan}
                </span>
              </div>

              <div className="space-y-4 text-forest-deep">
                <div>
                  <span className="text-xs font-bold text-rust uppercase tracking-wider">Kategori</span>
                  <p className="text-base font-semibold">{selectedOrmawa.kategori}</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-rust uppercase tracking-wider">Deskripsi Singkat</span>
                  <p className="text-sm font-medium leading-relaxed mt-1 text-forest/90">{selectedOrmawa.deskripsi}</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-rust uppercase tracking-wider">Kontak Resmi</span>
                  <p className="text-sm font-bold text-rust mt-1">{selectedOrmawa.instagram}</p>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setSelectedOrmawa(null)}
                  className="rounded-full bg-forest-deep px-6 py-2.5 text-sm font-bold text-cream hover:bg-forest-deep/90 transition-colors"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
