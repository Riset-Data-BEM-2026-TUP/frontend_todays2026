export interface RundownItem {
  time: string;
  activity: string;
  notes?: string;
}

export interface DayTimelineData {
  id: string;
  dayNumber: string; // e.g. "01"
  dayLabel: string; // e.g. "Hari 1"
  dateStr: string; // e.g. "12 Agustus 2026"
  title: string;
  summary: string;
  timeRange: string;
  location: string;
  status: 'completed' | 'ongoing' | 'upcoming';
  dresscode: string;
  checklist: string[];
  rundown: RundownItem[];
  mapUrl?: string;
}

export const INITIAL_TIMELINE_DAYS: DayTimelineData[] = [
  {
    id: 'day-1',
    dayNumber: '01',
    dayLabel: 'Hari 1',
    dateStr: '12 Agustus 2026',
    title: 'Pembukaan PKKMB & Campus Tour',
    summary: 'Upacara pembukaan resmi PKKMB Telkom University Purwokerto 2026, pengenalan jajaran rektorat, serta penelusuran fasilitas kampus.',
    timeRange: '07:00 – 16:00 WIB',
    location: 'Gedung Utama & Lapangan Olahraga Kampus',
    status: 'upcoming',
    dresscode: 'Kemeja Putih Lengan Panjang, Celana/Rok Kain Hitam, Dasi Hitam, Almamater & Sepatu Pantofel/Hitam Polos.',
    checklist: [
      'ID Card Temporary / Nametag Peserta',
      'Tumbler Minum (Min. 600ml)',
      'Buku Catatan BHUMARA & Pulpen',
      'Obat-obatan Pribadi',
      'Jas Hujan / Payung Lipat',
      'Perlengkapan Ibadah (Sajadah/Mukena)',
    ],
    rundown: [
      { time: '07:00 – 07:30', activity: 'Registrasi & Penataan Barisan Kontingen', notes: 'Kumpul di Lapangan Utama' },
      { time: '07:30 – 09:30', activity: 'Upacara Pembukaan PKKMB BHUMARA 2026', notes: 'Sambutan Rektor & Penyematan Atribut' },
      { time: '09:30 – 11:30', activity: 'Kuliah Umum & Sidang Terbuka Senat', notes: 'Auditorium Gedung Utama' },
      { time: '11:30 – 13:00', activity: 'ISOMA (Istirahat, Sholat, Makan)', notes: 'Kantin & Area Masjid Kampus' },
      { time: '13:00 – 15:30', activity: 'Jelajah Kampus (Campus Tour & Landmark Check)', notes: 'Didampingi Mentor Kelompok' },
      { time: '15:30 – 16:00', activity: 'Briefing Penutupan Hari Pertama', notes: 'Evaluasi & Checklist Hari ke-2' },
    ],
    mapUrl: 'https://maps.app.goo.gl/8NskKq6Xjpg4Pf6s8',
  },
  {
    id: 'day-2',
    dayNumber: '02',
    dayLabel: 'Hari 2',
    dateStr: '13 Agustus 2026',
    title: 'Seminar Kebangsaan & Sistem Akademik',
    summary: 'Pembekalan wawasan kebangsaan, nilai-nilai moderasi beragama, serta sosialisasi sistem akademik (iGracias/LMS) Telkom University.',
    timeRange: '07:00 – 15:30 WIB',
    location: 'Auditorium Gedung Utama Telkom University',
    status: 'upcoming',
    dresscode: 'Kemeja Batik Nusantara, Celana/Rok Kain Hitam, Almamater & Sepatu Formal.',
    checklist: [
      'Buku Catatan & Alat Tulis',
      'Smartphone / Laptop Terisi Baterai Penuh',
      'Tumbler Air Minum',
      'Makan Siang / Roti Bekal',
      'Perlengkapan Ibadah',
    ],
    rundown: [
      { time: '07:00 – 07:45', activity: 'Presensi & Pengondisian Peserta', notes: 'Pemeriksaan Atribut' },
      { time: '07:45 – 10:00', activity: 'Seminar Wawasan Kebangsaan & Karakter Kebhayangkaraan', notes: 'Pemateri Tamu Nasional' },
      { time: '10:00 – 11:45', activity: 'Sosialisasi Sistem Layanan Akademik & iGracias', notes: 'Bagian Administrasi Akademik' },
      { time: '11:45 – 13:15', activity: 'ISOMA (Istirahat, Sholat, Makan)', notes: 'Rest Area Kampus' },
      { time: '13:15 – 15:00', activity: 'Workshop Pencegahan Kekerasan Seksual & Perundungan (PPKS)', notes: 'Diskusi Interaktif' },
      { time: '15:00 – 15:30', activity: 'Absensi Sore & Persiapan Hari Ke-3', notes: 'Info Alat Bakti Sosial' },
    ],
    mapUrl: 'https://maps.app.goo.gl/8NskKq6Xjpg4Pf6s8',
  },
  {
    id: 'day-3',
    dayNumber: '03',
    dayLabel: 'Hari 3',
    dateStr: '14 Agustus 2026',
    title: 'Ekspo ORMAWA & Bakti Lingkungan BHUMARA',
    summary: 'Pameran parade Organisasi Mahasiswa (UKM/HIMA), atraksi unjuk bakat mahasiswa, serta aksi sosial dan pengabdian masyarakat.',
    timeRange: '07:00 – 16:00 WIB',
    location: 'Gedung Olahraga & Lingkungan Sekitar Kampus',
    status: 'upcoming',
    dresscode: 'Kaos Resmi BHUMARA 2026 / Kaos Olahraga Kampus, Celana Training/Panjang, Sepatu Kets / Sneakers.',
    checklist: [
      'Paket Sembako / Barang Bakti Sosial',
      'Topi Lapangan BHUMARA',
      'Tumbler & Hand Sanitizer',
      'Kantong Ramah Lingkungan',
      'Kamera / Handphone untuk Dokumentasi',
    ],
    rundown: [
      { time: '07:00 – 07:30', activity: 'Apel Pagi & Pelepasan Tim Bakti Sosial', notes: 'Lapangan Serbaguna' },
      { time: '07:30 – 10:30', activity: 'Aksi Pengabdian Masyarakat & Clean-Up Lingkungan', notes: 'Area Desa Sekitar Kampus' },
      { time: '10:30 – 11:45', activity: 'Pembukaan Parade Ekspo ORMAWA', notes: 'Atraksi Unjuk Bakat UKM' },
      { time: '11:45 – 13:15', activity: 'ISOMA', notes: 'Food Court & Stand Komunitas' },
      { time: '13:15 – 15:30', activity: 'Open Booth UKM & Pendaftaran Anggota Baru', notes: 'Kunjungan Stand ORMAWA' },
      { time: '15:30 – 16:00', activity: 'Refleksi Kelompok Bersama Pendamping', notes: 'Pembagian Awarding Sementara' },
    ],
    mapUrl: 'https://maps.app.goo.gl/8NskKq6Xjpg4Pf6s8',
  },
  {
    id: 'day-4',
    dayNumber: '04',
    dayLabel: 'Hari 4',
    dateStr: '15 Agustus 2026',
    title: 'Inagurasi, Pengumuman Kelompok & Inagurasi Budaya',
    summary: 'Puncak selebrasi penutupan PKKMB BHUMARA 2026, pengumuman kelompok terbaik, paper mob, dan pertunjukan seni budaya Purwokerto.',
    timeRange: '07:00 – 13:00 WIB',
    location: 'Lapangan Utama Telkom University Purwokerto',
    status: 'upcoming',
    dresscode: 'Kemeja Bebas Rapi Berkerah / Pakaian Adat Daerah, Celana/Rok Gelap, Sepatu Kets.',
    checklist: [
      'Kertas Warna Formasi Paper Mob',
      'Tongkat / Bendera Mini Kelompok',
      'Kamera HP untuk Foto Bersama',
      'Kesan & Pesan tertulis untuk Mentor',
    ],
    rundown: [
      { time: '07:00 – 07:45', activity: 'Geladi Bersama Formasi Paper Mob BHUMARA', notes: 'Lapangan Utama' },
      { time: '07:45 – 09:30', activity: 'Atraksi Paper Mob & Konfigurasi Angka BHUMARA 2026', notes: 'Dokumentasi Drone & Media' },
      { time: '09:30 – 11:30', activity: 'Upacara Penutupan Official & Inagurasi Mahasiswa Baru', notes: 'Pengukuhan Telkomian 2026' },
      { time: '11:30 – 12:30', activity: 'Pengumuman Kelompok & Mentor Terbaik BHUMARA', notes: 'Penyerahan Sertifikat & Hadiah' },
      { time: '12:30 – 13:00', activity: 'Pentas Seni Budaya Lengger Purwokerto & Foto Bersama', notes: 'Penutupan Rangkaian PKKMB' },
    ],
    mapUrl: 'https://maps.app.goo.gl/8NskKq6Xjpg4Pf6s8',
  },
];
