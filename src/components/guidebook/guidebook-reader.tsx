'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Sparkles,
  Calendar,
  Shirt,
  FileText,
  MapPin,
  Phone,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Bookmark,
  Share2,
  Check,
} from 'lucide-react';
import { FloatingLeaves, Decor, JungleCornersTop } from '@/components/ui/jungle-decor';

export interface GuidebookSection {
  id: number;
  title: string;
  subtitle: string;
  readTime: string;
  notesCount: number;
  icon: any;
  heading: string;
  paragraphs: string[];
  listItems?: string[];
}

const sections: GuidebookSection[] = [
  {
    id: 1,
    subtitle: 'Bab 1',
    title: 'Sambutan',
    readTime: '1 menit',
    notesCount: 4,
    icon: Sparkles,
    heading: 'Selamat datang, Mahasiswa Baru Telkom University Purwokerto!',
    paragraphs: [
      'Selamat kamu telah bergabung dalam keluarga besar Telkom University Purwokerto. Kampus ini bukan sekadar tempat belajar, tapi rumah kedua yang akan menemani perjalananmu selama kurang lebih 4 tahun ke depan.',
      'PKKMB (Pengenalan Kehidupan Kampus bagi Mahasiswa Baru) adalah gerbang awal kamu memulai petualangan di dunia perkuliahan. Selama kegiatan ini, kamu akan mengenal lingkungan kampus, bertemu teman baru, dan memahami nilai-nilai dasar yang dijunjung tinggi oleh almamater kita.',
      'Selamat menjelajah, Rimbawan Muda!',
    ],
  },
  {
    id: 2,
    subtitle: 'Bab 2',
    title: 'Rundown',
    readTime: '2 menit',
    notesCount: 5,
    icon: Calendar,
    heading: 'Rundown & Jadwal Kegiatan PKKMB 2026',
    paragraphs: [
      'Berikut adalah gambaran umum jadwal kegiatan PKKMB yang perlu kamu perhatikan dan persiapkan:',
    ],
    listItems: [
      'Hari 1: Upacara pembukaan, pengenalan pejabat fakultas & prodi, serta Campus Tour interaktif.',
      'Hari 2: Seminar wawasan kebangsaan, moderasi beragama, dan penanaman integritas mahasiswa.',
      'Hari 3: Expo Ormawa (Pengenalan UKM, BEM, DPM) dan aksi kepedulian sosial lingkungan.',
      'Hari 4: Malam puncak inagurasi, penutupan, serta pengumuman pembagian kelompok peserta.',
      'Pastikan kamu hadir tepat waktu setiap hari dan selalu mengisi presensi kehadiran resmi.',
    ],
  },
  {
    id: 3,
    subtitle: 'Bab 3',
    title: 'Atribut',
    readTime: '2 menit',
    notesCount: 5,
    icon: Shirt,
    heading: 'Ketentuan Atribut & Seragam Peserta',
    paragraphs: [
      'Setiap peserta PKKMB wajib mengenakan pakaian dan atribut resmi sesuai ketentuan berikut:',
    ],
    listItems: [
      '1. Kemeja putih polos lengan panjang dan celana/rok kain hitam formal (bukan jeans).',
      '2. Topi khas PKKMB BHUMARA / pitam almamater sesuai panduan fakultas.',
      '3. Name tag peserta fisik (dipasang dengan lanyard resmi yang dibagikan panitia).',
      '4. Sepatu dominan hitam formal atau sepatu olahraga bertali rapi.',
      '5. Jas almamater Telkom University dipakai wajib saat upacara pembukaan dan penutupan.',
    ],
  },
  {
    id: 4,
    subtitle: 'Bab 4',
    title: 'Tata Tertib',
    readTime: '3 menit',
    notesCount: 6,
    icon: FileText,
    heading: 'Tata Tertib & Peraturan Pelaksanaan',
    paragraphs: [
      'Demi kelancaran dan kenyamanan bersama, seluruh peserta wajib mematuhi norma dan peraturan kampus:',
    ],
    listItems: [
      '1. Hadir di lokasi kegiatan paling lambat 15 menit sebelum pengondisian dimulai.',
      '2. Bersikap sopan, saling menghargai sesama peserta, panitia, dosen, dan staf kampus.',
      '3. Dilarang merokok, membawa senjata, minuman keras, maupun obat-obatan terlarang.',
      '4. Wajib mengisi presensi kehadiran fisik dan digital setiap sesi acara.',
      '5. Menjaga kebersihan area kampus dan membuang sampah pada tempatnya.',
      '6. Dilarang meninggalkan area kegiatan tanpa izin bertuliskan dari Tim Kedisiplinan/Panitia.',
    ],
  },
  {
    id: 5,
    subtitle: 'Bab 5',
    title: 'Peta Kampus',
    readTime: '2 menit',
    notesCount: 6,
    icon: MapPin,
    heading: 'Denah & Panduan Area Kampus',
    paragraphs: [
      'Kampus Telkom University Purwokerto dilengkapi fasilitas modern yang terbagi dalam beberapa zona utama:',
    ],
    listItems: [
      '• Gedung Rektorat (Gedung A): Pusat layanan administrasi akademik & aula utama.',
      '• Gedung Fakultas (Gedung B-E): Laboratorium riset, ruang kuliah, dan sekretariat prodi.',
      '• Perpustakaan Digital: Terletak di Lantai 2 Gedung Utama dengan akses e-journal 24 jam.',
      '• Student Center & Kantin: Pusat kegiatan mahasiswa dan pujasera di sisi timur kampus.',
      '• Masjid Kampus: Tempat ibadah yang nyaman di area hijau tengah kampus.',
      '• Kantong Parkir: Area khusus kendaraan roda dua dan empat dekat Pintu Gerbang Utama.',
    ],
  },
  {
    id: 6,
    subtitle: 'Bab 6',
    title: 'Kontak Penting',
    readTime: '1 menit',
    notesCount: 6,
    icon: Phone,
    heading: 'Kontak Darurat & Layanan Bantuan',
    paragraphs: [
      'Simpan kontak penting berikut jika membutuhkan informasi atau bantuan selama pelaksanaan PKKMB:',
    ],
    listItems: [
      '• Helpdesk Panitia PKKMB: 0812-3456-7890 (WhatsApp Official)',
      '• Layanan Bagian Kemahasiswaan: (0281) 641 629',
      '• Email Resmi PKKMB: pkkmb@telkomuniversity.ac.id',
      '• Instagram Official: @todays.telupurwokerto',
      '• Website Resmi: purwokerto.telkomuniversity.ac.id',
      '• Keamanan & Pos Satpam 24 Jam: 0812-9876-5432',
    ],
  },
];

export function GuidebookReader() {
  const [activeTab, setActiveTab] = useState(0);
  const [openedChapters, setOpenedChapters] = useState<number[]>([1]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('bhumara_opened_chapters');
      if (saved) {
        setOpenedChapters(JSON.parse(saved));
      }
    } catch {
      /* fallback */
    }
  }, []);

  const handleSelectChapter = (index: number) => {
    setActiveTab(index);
    const chapterId = sections[index].id;
    if (!openedChapters.includes(chapterId)) {
      const updated = [...openedChapters, chapterId];
      setOpenedChapters(updated);
      try {
        localStorage.setItem('bhumara_opened_chapters', JSON.stringify(updated));
      } catch {
        /* fallback */
      }
    }
  };

  const currentSec = sections[activeTab];
  const progressPercent = Math.round((openedChapters.length / sections.length) * 100);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <FloatingLeaves />

      {/* Header Banner Page Title */}
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-sand/40 bg-sand/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-forest-deep mb-3 backdrop-blur-md">
          <BookOpen size={14} className="text-rust" />
          <span>Panduan Resmi PKKMB 2026</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-forest-deep drop-shadow-sm">
          Guidebook PKKMB
        </h1>
        <p className="mt-3 text-base sm:text-lg text-forest/90 font-medium leading-relaxed">
          Buku panduan digital peserta PKKMB Telkom University Purwokerto. Jelajahi bab untuk mengenal peraturan, rundown, dan informasi kampus.
        </p>
      </div>

      {/* 3-Column Layout Container */}
      <div className="grid gap-6 lg:grid-cols-[18rem_minmax(0,1fr)_15rem] lg:items-start">
        {/* === COLUMN 1: LEFT SIDEBAR (Chapter Selector) === */}
        <aside className="rounded-3xl border border-sand/40 bg-cream/80 p-4 shadow-xl backdrop-blur-xl lg:sticky lg:top-24">
          <div className="mb-4 flex items-center justify-between border-b border-sand/30 pb-3 px-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forest-deep">
              <BookOpen size={16} className="text-rust" />
              <span>Daftar Bab</span>
            </div>
            <span className="text-xs font-bold text-rust bg-rust/10 px-2 py-0.5 rounded-full">
              {openedChapters.length}/{sections.length} Dibuka
            </span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {sections.map((sec, idx) => {
              const IconComp = sec.icon;
              const isActive = activeTab === idx;
              const isOpened = openedChapters.includes(sec.id);

              return (
                <button
                  key={sec.id}
                  onClick={() => handleSelectChapter(idx)}
                  className={`group flex min-w-[200px] lg:min-w-0 items-center justify-between gap-3 rounded-2xl p-3 text-left transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-forest-deep text-cream shadow-lg scale-[1.02]'
                      : 'bg-sand/15 text-forest-deep hover:bg-sand/30'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`flex size-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
                        isActive
                          ? 'bg-rust text-cream'
                          : 'bg-forest/10 text-forest group-hover:bg-rust group-hover:text-cream'
                      }`}
                    >
                      <IconComp size={18} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <span
                        className={`block text-[10px] font-bold uppercase tracking-wider ${
                          isActive ? 'text-cream/70' : 'text-forest/70'
                        }`}
                      >
                        {sec.subtitle}
                      </span>
                      <span className="block truncate text-sm font-extrabold font-display">
                        {sec.title}
                      </span>
                    </div>
                  </div>

                  {isOpened && (
                    <span
                      className={`flex size-5 shrink-0 items-center justify-center rounded-full ${
                        isActive ? 'bg-rust text-cream' : 'bg-forest/20 text-forest-deep'
                      }`}
                    >
                      <Check size={12} strokeWidth={3} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        {/* === COLUMN 2: MIDDLE MAIN READER SURFACE === */}
        <section className="min-w-0">
          {/* Top Progress Bar & Indicator */}
          <div className="mb-4 flex items-center justify-between gap-4 px-1">
            <div className="flex items-center gap-2 text-xs font-bold text-forest-deep">
              <Sparkles size={14} className="text-rust" />
              <span>
                Bab {currentSec.id} dari {sections.length}
              </span>
            </div>
            <span className="text-xs font-bold text-forest/80">
              Progres Pembacaan: {progressPercent}%
            </span>
          </div>

          <div className="h-2 w-full overflow-hidden rounded-full bg-sand/30">
            <motion.div
              className="h-full rounded-full bg-rust"
              initial={{ width: 0 }}
              animate={{ width: `${((activeTab + 1) / sections.length) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>

          {/* Book Page Paper Surface */}
          <div className="relative mt-5 min-h-[460px] overflow-hidden rounded-3xl border border-sand/40 bg-cream/90 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
            {/* Red Margin Notebook Line */}
            <div className="absolute left-6 sm:left-10 top-0 h-full w-px bg-rust/20" />

            <AnimatePresence mode="wait">
              <motion.article
                key={currentSec.id}
                initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative pl-6 sm:pl-10"
              >
                {/* Chapter Header */}
                <header className="mb-8 border-b border-sand/30 pb-6">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <div className="flex size-14 items-center justify-center rounded-2xl bg-forest-deep text-cream shadow-md">
                      {(() => {
                        const IconComponent = currentSec.icon;
                        return <IconComponent size={26} className="text-rust" />;
                      })()}
                    </div>
                    <span className="font-display text-5xl sm:text-6xl font-black text-sand/60">
                      0{currentSec.id}
                    </span>
                  </div>

                  <h2 className="font-display text-2xl sm:text-4xl text-forest-deep leading-tight">
                    {currentSec.heading}
                  </h2>
                </header>

                {/* Chapter Content Body */}
                <div className="space-y-4 text-forest-deep/90 font-medium text-base sm:text-lg leading-relaxed">
                  {currentSec.paragraphs.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}

                  {currentSec.listItems && (
                    <div className="mt-4 space-y-2.5 rounded-2xl bg-sand/15 p-4 sm:p-5 border border-sand/30">
                      {currentSec.listItems.map((item, iIdx) => (
                        <div key={iIdx} className="flex items-start gap-3">
                          <span className="mt-1 size-2 rounded-full bg-rust shrink-0" />
                          <span className="text-sm sm:text-base text-forest-deep font-semibold">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          {/* Bottom Prev / Next Navigation Buttons */}
          <div className="mt-6 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => activeTab > 0 && handleSelectChapter(activeTab - 1)}
              disabled={activeTab === 0}
              className="inline-flex min-h-[46px] w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-sand/40 bg-sand/20 px-6 py-2.5 text-sm font-extrabold text-forest-deep hover:bg-sand/40 disabled:opacity-40 disabled:pointer-events-none transition-all duration-300 cursor-pointer"
            >
              <ChevronLeft size={18} />
              <span>Sebelumnya</span>
            </button>

            <button
              type="button"
              onClick={() => activeTab < sections.length - 1 && handleSelectChapter(activeTab + 1)}
              disabled={activeTab === sections.length - 1}
              className="inline-flex min-h-[46px] w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-rust px-7 py-2.5 text-sm font-extrabold text-cream shadow-md hover:bg-rust/90 disabled:opacity-40 disabled:pointer-events-none transition-all duration-300 cursor-pointer"
            >
              <span>Bab selanjutnya</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </section>

        {/* === COLUMN 3: RIGHT SIDEBAR (Stats & Actions) === */}
        <aside className="grid grid-cols-2 gap-3 lg:sticky lg:top-24 lg:grid-cols-1">
          {/* Card 1: Read Time */}
          <div className="rounded-3xl border border-sand/40 bg-sand/20 p-5 backdrop-blur-md">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-forest-deep text-cream">
              <Clock size={20} className="text-rust" />
            </div>
            <p className="mt-4 font-display text-3xl text-forest-deep">
              {currentSec.readTime}
            </p>
            <p className="mt-1 text-xs font-semibold text-forest/80">
              Estimasi waktu baca bab ini
            </p>
          </div>

          {/* Card 2: Chapter Takeaways */}
          <div className="rounded-3xl border border-sand/40 bg-forest-deep p-5 text-cream shadow-lg">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-cream/10 text-rust">
              <Bookmark size={20} />
            </div>
            <p className="mt-4 font-display text-3xl text-cream">
              {currentSec.notesCount} Poin
            </p>
            <p className="mt-1 text-xs font-semibold text-cream/70">
              Catatan penting dalam bab ini
            </p>
          </div>

          {/* Card 3: Share / Bookmark Action */}
          <div className="col-span-2 lg:col-span-1 rounded-3xl border border-sand/40 bg-cream/80 p-5 backdrop-blur-md text-forest-deep">
            <button
              onClick={handleShare}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-sand/50 bg-sand/20 px-4 py-2.5 text-xs font-extrabold hover:bg-sand/40 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <CheckCircle2 size={16} className="text-forest" />
                  <span>Tautan Tersalin!</span>
                </>
              ) : (
                <>
                  <Share2 size={16} className="text-rust" />
                  <span>Bagikan Halaman Ini</span>
                </>
              )}
            </button>
            <p className="mt-3 text-xs leading-relaxed text-forest/80 text-center font-medium">
              Progres membacamu otomatis tersimpan saat berpindah bab.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
