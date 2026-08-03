'use client';

import { useState, useMemo } from 'react';
import { AnimatedSection, TextReveal, GlowCard } from '@/components/ui/animated-section';
import { MapPin, Navigation, Compass, Building2, CheckCircle2 } from 'lucide-react';

export type CampusSpot = {
  id: string;
  nama: string;
  kategori: string;
  lokasi: string;
  deskripsi: string;
  fasilitas: string[];
  gradient: string;
};

const campusSpots: CampusSpot[] = [
  {
    id: '1',
    nama: 'Auditorium Telkom University Purwokerto',
    kategori: 'Gedung Utama',
    lokasi: 'Gedung Rektorat Lt. 3',
    deskripsi: 'Pusat pelaksanaan Opening & Closing Ceremony PKKMB BHUMARA 2026, wisuda, seminar nasional, dan pentas seni.',
    fasilitas: ['Kapasitas 1.500 Orang', 'Full AC & Sound System 10.000W', 'Stage Lighting Professional'],
    gradient: 'from-rust/90 via-rust/60 to-forest-deep',
  },
  {
    id: '2',
    nama: 'Perpustakaan & Open Library',
    kategori: 'Fasilitas Publik',
    lokasi: 'Gedung Akademik Lt. 2',
    deskripsi: 'Ruang baca modern dilengkapi dengan ribuan koleksi e-book, jurnal internasional, quiet study zone, dan co-working space.',
    fasilitas: ['Ruang Diskusi Privat', 'High Speed Wi-Fi 6', 'Komputer Akses E-Journal'],
    gradient: 'from-forest-deep via-forest to-sage/50',
  },
  {
    id: '3',
    nama: 'Laboratorium Rekayasa Perangkat Lunak',
    kategori: 'Lab & Riset',
    lokasi: 'Gedung Laboratorium Terpadu Lt. 3',
    deskripsi: 'Laboratorium komputer spesifikasi tinggi untuk kegiatan praktikum pemrograman, pengembangan software, dan riset AI.',
    fasilitas: ['PC Intel i9 + RTX 4080', 'Dual Monitor Setup', 'Server Lokal Riset'],
    gradient: 'from-forest via-sage to-rust/40',
  },
  {
    id: '4',
    nama: 'Student Center & Area UKM',
    kategori: 'Area Terbuka',
    lokasi: 'Kawasan Tengah Kampus',
    deskripsi: 'Pusat sekretariat organisasi mahasiswa (Ormawa/UKM), tempat kumpul kreatif, panggung terbuka, dan kantin mahasiswa.',
    fasilitas: ['Sekretariat UKM', 'Panggung Terbuka', 'Kantin Hibrida & Food Court'],
    gradient: 'from-rust via-sand to-forest-deep',
  },
  {
    id: '5',
    nama: 'Lapangan Olahraga Terpadu',
    kategori: 'Area Terbuka',
    lokasi: 'Area Barat Kampus',
    deskripsi: 'Fasilitas olahraga outdoor mencakup lapangan Futsal, Basket, Voli, dan area jogging track terawat.',
    fasilitas: ['Lapangan Futsal Standard', 'Lapangan Basket & Voli', 'Lampu Penerangan Malam'],
    gradient: 'from-forest-deep via-sage/80 to-cream/30',
  },
];

const categories = ['Semua', 'Gedung Utama', 'Fasilitas Publik', 'Lab & Riset', 'Area Terbuka'];

export default function CampusTourPage() {
  const [selectedCat, setSelectedCat] = useState('Semua');

  const filtered = useMemo(() => {
    if (selectedCat === 'Semua') return campusSpots;
    return campusSpots.filter((s) => s.kategori === selectedCat);
  }, [selectedCat]);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-28 sm:pt-32 pb-24">
      {/* Header */}
      <AnimatedSection>
        <div className="flex items-center gap-2 mb-2">
          <Compass size={18} className="text-rust" />
          <span className="font-display text-xs font-bold uppercase tracking-widest text-rust">
            PETA & FASILITAS KAMPUS
          </span>
        </div>
        <h1 className="font-display text-4xl text-forest-deep sm:text-5xl">
          <TextReveal text="Campus Tour Virtual" />
        </h1>
        <p className="mt-4 text-lg text-forest/80 font-medium leading-relaxed max-w-2xl">
          Kenali lingkungan, titik penting, dan fasilitas modern di Telkom University Purwokerto sebelum kamu mendarat di kampus.
        </p>
      </AnimatedSection>

      {/* Filter Category */}
      <AnimatedSection delay={0.1} className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
              selectedCat === cat
                ? 'bg-rust text-cream shadow-md shadow-rust/25 scale-105'
                : 'bg-sand/30 text-forest hover:bg-sand/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </AnimatedSection>

      {/* Spot Grid */}
      <AnimatedSection delay={0.2} className="mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((spot) => (
            <GlowCard key={spot.id} className="flex flex-col justify-between h-full">
              <div>
                {/* Visual Header */}
                <div className={`h-28 rounded-2xl bg-gradient-to-r ${spot.gradient} p-4 flex flex-col justify-between relative overflow-hidden mb-5`}>
                  <div className="absolute inset-0 opacity-20 bhumara-pattern-bg" />
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="rounded-full bg-forest-deep/80 backdrop-blur-md px-3 py-1 text-xs font-bold text-cream border border-cream/20">
                      {spot.kategori}
                    </span>
                    <Building2 size={20} className="text-cream/80" />
                  </div>
                  <div className="relative z-10 flex items-center gap-1.5 text-xs font-bold text-cream/90">
                    <MapPin size={14} className="text-rust" />
                    <span>{spot.lokasi}</span>
                  </div>
                </div>

                <h3 className="font-display text-2xl font-bold text-forest-deep">{spot.nama}</h3>
                <p className="mt-2 text-sm text-forest/80 font-medium leading-relaxed">{spot.deskripsi}</p>

                {/* Facilities Checklist */}
                <div className="mt-4 pt-4 border-t border-sand/40 space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-rust">Fasilitas Utama:</span>
                  <ul className="space-y-1.5">
                    {spot.fasilitas.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs font-semibold text-forest-deep">
                        <CheckCircle2 size={14} className="text-rust shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-3 flex items-center justify-between">
                <span className="text-xs font-bold text-forest/60">Telkom University Purwokerto</span>
                <span className="inline-flex items-center gap-1 text-xs font-extrabold text-rust">
                  <Navigation size={12} /> Peta Lokasi
                </span>
              </div>
            </GlowCard>
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}
