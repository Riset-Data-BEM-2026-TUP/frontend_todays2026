'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import anime from 'animejs';
import {
  Camera,
  Sparkles,
  Maximize2,
  X,
  Calendar,
  Tag,
  ChevronRight,
  Compass,
  Users,
  Award,
} from 'lucide-react';
import { FloatingLeaves, Decor } from '@/components/ui/jungle-decor';

export interface GalleryItem {
  id: string;
  title: string;
  category: 'campus-tour' | 'expo-ormawa' | 'inagurasi' | 'kebersamaan';
  categoryLabel: string;
  date: string;
  image: string;
  description: string;
  aspect: 'tall' | 'wide' | 'square';
}

const galleryData: GalleryItem[] = [
  {
    id: '1',
    title: 'Upacara Pembukaan & Welcoming PKKMB 2026',
    category: 'inagurasi',
    categoryLabel: 'Inagurasi',
    date: '12 Agustus 2026',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1200',
    description: 'Kemeriahan pembukaan PKKMB BHUMARA 2026 disambut antusias oleh ribuan mahasiswa baru Telkom University Purwokerto.',
    aspect: 'wide',
  },
  {
    id: '2',
    title: 'Eksplorasi Gedung Rektorat & Fasilitas Kampus',
    category: 'campus-tour',
    categoryLabel: 'Campus Tour',
    date: '12 Agustus 2026',
    image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=1200',
    description: 'Mahasiswa baru menjelajahi laboratorium, perpustakaan digital, dan zona akademik terpadu.',
    aspect: 'tall',
  },
  {
    id: '3',
    title: 'Panggung Unjuk Bakat & Expo Ormawa',
    category: 'expo-ormawa',
    categoryLabel: 'Expo Ormawa',
    date: '14 Agustus 2026',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1200',
    description: 'Demonstrasi atraktif dari puluhan UKM, BEM, dan komunitas mahasiswa Telkom University Purwokerto.',
    aspect: 'square',
  },
  {
    id: '4',
    title: 'Seminar Kebangsaan & Pembentukan Karakter',
    category: 'kebersamaan',
    categoryLabel: 'Kebersamaan',
    date: '13 Agustus 2026',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1200',
    description: 'Sesi inspiratif pembekalan wawasan kebangsaan, moderasi beragama, dan kepemimpinan muda.',
    aspect: 'square',
  },
  {
    id: '5',
    title: 'Momen Hangat Kebersamaan Kelompok Rimbawan',
    category: 'kebersamaan',
    categoryLabel: 'Kebersamaan',
    date: '13 Agustus 2026',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200',
    description: 'Diskusi kelompok dan ice breaking yang mempererat tali silaturahmi antar mahasiswa baru.',
    aspect: 'tall',
  },
  {
    id: '6',
    title: 'Malam Inagurasi & Selebrasi Api Unggun',
    category: 'inagurasi',
    categoryLabel: 'Inagurasi',
    date: '15 Agustus 2026',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1200',
    description: 'Puncak perayaan penyambutan keluarga baru BHUMARA dengan pertunjukan seni dan pesta kembang api.',
    aspect: 'wide',
  },
];

const categories = [
  { id: 'all', label: 'Semua Momen' },
  { id: 'campus-tour', label: 'Campus Tour' },
  { id: 'expo-ormawa', label: 'Expo Ormawa' },
  { id: 'inagurasi', label: 'Inagurasi' },
  { id: 'kebersamaan', label: 'Kebersamaan' },
];

export function SuasanaKampusGallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const filteredData =
    selectedCategory === 'all'
      ? galleryData
      : galleryData.filter((item) => item.category === selectedCategory);

  // Anime.js Staggered Entrance Animation when category changes
  useEffect(() => {
    if (cardsRef.current.length > 0) {
      const validCards = cardsRef.current.filter(Boolean);
      anime({
        targets: validCards,
        opacity: [0, 1],
        translateY: [40, 0],
        scale: [0.9, 1],
        rotateX: [-12, 0],
        delay: anime.stagger(90, { start: 50, from: 'first' }),
        easing: 'cubicBezier(0.22, 1, 0.36, 1)',
        duration: 700,
      });
    }
  }, [selectedCategory]);

  // Mousemove 3D Tilt calculation (Magnetic 3D card tilt effect)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    anime({
      targets: card,
      rotateX: rotateX,
      rotateY: rotateY,
      scale: 1.03,
      duration: 300,
      easing: 'easeOutQuad',
    });
  };

  const handleMouseLeave = (index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    anime({
      targets: card,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 500,
      easing: 'easeOutElastic(1, .5)',
    });
  };

  return (
    <section className="relative overflow-hidden bg-forest-deep py-24 sm:py-32 text-cream border-y border-sand/30">
      {/* Background Decor & Atmospheric Glow Pulse */}
      <FloatingLeaves />

      {/* Atmospheric Mist Radial Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-sage/30 via-rust/20 to-transparent blur-3xl"
      />

      {/* Jungle Corner Accents */}
      <Decor name="pohon" className="pointer-events-none absolute -left-10 bottom-0 hidden w-44 opacity-25 lg:block" />
      <Decor name="bunga2" className="pointer-events-none absolute -right-12 bottom-0 hidden w-48 opacity-30 lg:block" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-sand/30 bg-cream/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-sand backdrop-blur-md mb-4 shadow-inner">
            <Camera size={14} className="text-rust" />
            <span>Dokumentasi Visual PKKMB</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-cream drop-shadow-md">
            Potongan Suasana Kampus
          </h2>

          <p className="mt-4 text-base sm:text-lg text-cream/80 font-medium leading-relaxed">
            Abadikan momen berharga, euforia kebersamaan, dan petualangan pertama Pejuang Rimba di Telkom University Purwokerto.
          </p>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap justify-center gap-2.5 sm:gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative rounded-full px-5 py-2 text-xs sm:text-sm font-extrabold transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-rust text-cream shadow-[0_4px_20px_rgba(180,106,50,0.5)] scale-105'
                    : 'bg-cream/10 text-cream/70 hover:bg-cream/20 hover:text-cream border border-cream/15'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid (Anime.js Kinetic Physics Cards) */}
        <div
          ref={galleryRef}
          className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 perspective-1000"
        >
          {filteredData.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
              onClick={() => setActiveItem(item)}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-cream/20 bg-cream/10 p-4 backdrop-blur-xl shadow-2xl transition-shadow duration-300 hover:border-sand/70 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] cursor-pointer transform-gpu"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Photo Container */}
              <div className="relative h-60 w-full overflow-hidden rounded-2xl bg-forest-deep">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Dark Gradient Overlay & Lightbox Button */}
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                <div className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-xl bg-forest-deep/70 backdrop-blur-md text-cream opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                  <Maximize2 size={16} />
                </div>

                <div className="absolute bottom-3 left-3">
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-rust/90 px-3 py-1 text-[11px] font-bold text-cream backdrop-blur-md shadow-sm">
                    <Tag size={12} />
                    {item.categoryLabel}
                  </span>
                </div>
              </div>

              {/* Card Meta & Caption */}
              <div className="mt-4 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-sand/80 mb-1.5">
                    <Calendar size={13} className="text-rust" />
                    <span>{item.date}</span>
                  </div>

                  <h3 className="font-display text-lg sm:text-xl font-bold text-cream group-hover:text-sand transition-colors line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-cream/75 line-clamp-2 font-medium leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-cream/15 pt-3">
                  <span className="text-xs font-bold text-rust group-hover:underline flex items-center gap-1">
                    Lihat Dokumentasi <ChevronRight size={14} />
                  </span>
                  <Sparkles size={16} className="text-sand/50 group-hover:text-sand transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal (Enlarged Image & Details) */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveItem(null)}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4 sm:p-6 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.85, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, y: 30, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full overflow-hidden rounded-3xl border border-cream/20 bg-forest-deep p-6 text-cream shadow-2xl"
            >
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 z-20 flex size-10 items-center justify-center rounded-full bg-cream/10 text-cream hover:bg-rust transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="grid gap-6 md:grid-cols-12 items-center">
                <div className="relative h-72 sm:h-96 md:col-span-7 w-full overflow-hidden rounded-2xl bg-black">
                  <Image
                    src={activeItem.image}
                    alt={activeItem.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="md:col-span-5 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="rounded-md bg-rust px-3 py-1 text-xs font-bold text-cream">
                        {activeItem.categoryLabel}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-sand font-semibold">
                        <Calendar size={13} /> {activeItem.date}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl text-cream leading-tight">
                      {activeItem.title}
                    </h3>

                    <p className="mt-4 text-sm text-cream/85 leading-relaxed font-medium">
                      {activeItem.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-cream/15 flex items-center justify-between text-xs text-sand">
                    <span>PKKMB BHUMARA 2026</span>
                    <span>Telkom University Purwokerto</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
