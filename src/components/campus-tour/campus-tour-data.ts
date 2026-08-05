export interface CampusSpotItem {
  id: string;
  nama: string;
  kategori: string;
  lokasi: string;
  deskripsi: string;
  deskripsiLengkap: string;
  fasilitas: string[];
  gradient: string;
  mapUrl?: string;
  jamOperasional: string;
  panduanAkses: string[];
  tataTertib: string[];
  iconName: string;
}

export const CAMPUS_SPOTS: CampusSpotItem[] = [
  {
    id: 'auditorium',
    nama: 'Auditorium Telkom University Purwokerto',
    kategori: 'Gedung Utama',
    lokasi: 'Gedung Rektorat Utama Lt. 3',
    deskripsi: 'Pusat utama Opening & Closing Ceremony PKKMB BHUMARA 2026, wisuda, dan panggung pertunjukan seni.',
    deskripsiLengkap:
      'Auditorium Utama Telkom University Purwokerto merupakan gedung serbaguna berkapasitas besar yang digunakan untuk perhelatan terbesar kampus. Gedung ini dilengkapi tata suara 10.000 Watt, pencahayaan panggung profesional, pendingin udara terpusat, dan tribun bertingkat yang siap menampung seluruh peserta PKKMB BHUMARA 2026.',
    fasilitas: [
      'Kapasitas 1.500 Orang Duduk',
      'System Tata Suara 10.000W & Stage Lighting',
      'Ruang Transit VVIP & Ruang Ganti Artis',
      'Full Central Air Conditioner (AC)',
    ],
    gradient: 'from-rust via-amber-700 to-forest-deep',
    mapUrl: 'https://maps.app.goo.gl/8NskKq6Xjpg4Pf6s8',
    jamOperasional: '07.00 – 21.00 WIB (Sesuai Izin Kegiatan)',
    panduanAkses: [
      'Masuk melalui Lobby Utama Gedung Rektorat.',
      'Gunakan Elevator / Lift Tengah menuju Lantai 3.',
      'Wajib menunjukkan ID Card Temporary Peserta PKKMB atau KTM Mahasiswa.',
    ],
    tataTertib: [
      'Dilarang membawa makanan berkuah & minuman berwarna ke dalam karpet auditorium.',
      'Menjaga kebersihan dan membuang sampah pada tempat sampah terpilah di pintu keluar.',
      'Selalu mematuhi instruksi Sie Acara dan Pemandu Kelompok selama kegiatan berlangsung.',
    ],
    iconName: 'Building2',
  },
  {
    id: 'open-library',
    nama: 'Perpustakaan & TelU Open Library',
    kategori: 'Fasilitas Publik',
    lokasi: 'Gedung Akademik Lt. 2',
    deskripsi: 'Ruang baca modern dengan ribuan koleksi e-book, repositori riset Scopus, dan quiet study zone.',
    deskripsiLengkap:
      'TelU Open Library adalah pusat repositori ilmu pengetahuan dan ruang baca modern. Dilengkapi dengan sudut diskusi privat, co-working space, jaringan internet kecepatan tinggi, serta akses gratis ke basis data jurnal internasional terkemuka seperti IEEE Xplore, ScienceDirect, dan SpringerLink.',
    fasilitas: [
      'Ruang Diskusi Privat Ber-AC',
      'Akses Wi-Fi 6 Berkecepatan Tinggi',
      'Komputer Komputer Akses E-Journal & E-Book',
      'Area Lesehan Cozy & Quiet Study Zone',
    ],
    gradient: 'from-forest-deep via-forest to-sage',
    mapUrl: 'https://maps.app.goo.gl/8NskKq6Xjpg4Pf6s8',
    jamOperasional: '08.00 – 17.00 WIB (Senin – Jumat)',
    panduanAkses: [
      'Tunjukkan QR e-KTM pada aplikasi MyTelU di gerbang pintu masuk (Turnstile).',
      'Simpan tas dan barang bawaan besar di loker penyimpanan yang telah disediakan.',
      'Gunakan komputer catalog (OPAC) untuk mencari nomor panggil buku.',
    ],
    tataTertib: [
      'Menjaga ketenangan dan tidak mengobrol dengan suara keras di Quiet Zone.',
      'Dilarang membawa makanan berat ke area koleksi buku.',
      'Kembalikan buku ke troli pengembalian setelah selesai dibaca.',
    ],
    iconName: 'Library',
  },
  {
    id: 'lab-rpl',
    nama: 'Laboratorium Rekayasa Perangkat Lunak & AI',
    kategori: 'Lab & Riset',
    lokasi: 'Gedung Laboratorium Terpadu Lt. 3',
    deskripsi: 'Lab komputer spesifikasi tinggi untuk praktikum pemrograman, riset Machine Learning, dan software engineering.',
    deskripsiLengkap:
      'Laboratorium RPL & AI dirancang khusus untuk menunjang kegiatan pembelajaran praktikum coding, riset kecerdasan buatan, dan pengembangan aplikasi. Setiap PC dilengkapi dengan kartu grafis High-End, dual monitor setup, serta jaringan LAN dedicated untuk pengujian perangkat lunak skala besar.',
    fasilitas: [
      'PC Spesifikasi High-End (Intel i9 + RTX 4080)',
      'Dual Monitor Ergonomis di Setiap Workstation',
      'Server Riset Cloud & Jaringan LAN Gigabit',
      'Proyektor Interaktif & Smart Whiteboard',
    ],
    gradient: 'from-forest via-sage to-rust',
    mapUrl: 'https://maps.app.goo.gl/8NskKq6Xjpg4Pf6s8',
    jamOperasional: '07.00 – 18.00 WIB (Sesuai Jadwal Praktikum)',
    panduanAkses: [
      'Hadir 10 menit sebelum jam praktikum dimulai.',
      'Wajib mengenakan jas laboratorium / pakaian rapi berkerah.',
      'Login komputer praktikum menggunakan akun Single Sign-On (SSO) TelU.',
    ],
    tataTertib: [
      'Dilarang membawa makanan dan minuman di atas meja komputer.',
      'Mematikan (shutdown) PC dan merapikan kursi setelah sesi praktikum selesai.',
      'Dilarang mengubah konfigurasi hardware tanpa izin Asisten Laboratorium.',
    ],
    iconName: 'Cpu',
  },
  {
    id: 'student-center',
    nama: 'Student Center & Area Ormawa',
    kategori: 'Area Terbuka',
    lokasi: 'Kawasan Tengah Kampus',
    deskripsi: 'Pusat sekretariat UKM/BEM, panggung ekspresi mahasiswa, co-working outdoor, dan kantin hibrida.',
    deskripsiLengkap:
      'Student Center merupakan jantung dinamika kemahasiswaan di Telkom University Purwokerto. Tempat ini menampung sekretariat 20+ Unit Kegiatan Mahasiswa (UKM), Badan Eksekutif Mahasiswa (BEM), Himpunan Mahasiswa (HIMA), serta panggung amphiteater tempat berkumpulnya ide-ide kreatif mahasiswa.',
    fasilitas: [
      'Sekretariat Bersama UKM & BEM',
      'Amphiteater & Panggung Ekspresi Outdoor',
      'Kantin Hibrida & Tenant UMKM Mahasiswa',
      'Bumi Perkemahan & Green Workspace',
    ],
    gradient: 'from-rust via-sand to-forest-deep',
    mapUrl: 'https://maps.app.goo.gl/8NskKq6Xjpg4Pf6s8',
    jamOperasional: '24 Jam (Area Publik Kampus)',
    panduanAkses: [
      'Bebas diakses oleh seluruh mahasiswa aktif Telkom University.',
      'Untuk penggunaan panggung amphiteater acara UKM, ajukan izin permohonan ruang ke Kemahasiswaan.',
    ],
    tataTertib: [
      'Menjaga kebersihan bersama dengan memilah sampah organik dan anorganik.',
      'Menjaga ketertiban dan tidak merusak fasilitas publik Student Center.',
    ],
    iconName: 'Users',
  },
  {
    id: 'lapangan-olahraga',
    nama: 'Lapangan Olahraga Terpadu',
    kategori: 'Area Terbuka',
    lokasi: 'Kawasan Barat Kampus',
    deskripsi: 'Fasilitas outdoor olahraga mencakup lapangan Futsal, Basket, Voli, dan jogging track.',
    deskripsiLengkap:
      'Kompleks lapangan olahraga terpadu disediakan untuk menunjang kebugaran fisik dan bakat atletik mahasiswa. Dilengkapi dengan penerangan lampu sorot malam hari, tribun penonton, serta perlengkapan pertandingan resmi cabang olahraga Futsal, Basket, Voli, dan Bulu Tangkis.',
    fasilitas: [
      'Lapangan Futsal Rumput Sintetis Standard',
      'Lapangan Basket Vinyl & Lapangan Voli',
      'Lampu Sorot LED Penerangan Malam',
      'Tribun Penonton & Ruang Bilas Air Bersih',
    ],
    gradient: 'from-forest-deep via-sage to-cream',
    mapUrl: 'https://maps.app.goo.gl/8NskKq6Xjpg4Pf6s8',
    jamOperasional: '06.00 – 21.00 WIB (Setiap Hari)',
    panduanAkses: [
      'Pemesanan jadwal lapangan dilakukan melalui portal MyTelU App / UKM Olahraga.',
      'Wajib memakai sepatu olahraga yang sesuai dengan jenis permukaan lapangan.',
    ],
    tataTertib: [
      'Dilarang merokok dan membuang sampah sembarangan di area lapangan.',
      'Mengembalikan perlengkapan olahraga kampus ke pos sekretariat setelah digunakan.',
    ],
    iconName: 'Trophy',
  },
  {
    id: 'masjid-kampus',
    nama: "Masjid Syamsul 'Ulum Kampus",
    kategori: 'Fasilitas Publik',
    lokasi: 'Area Timur Kampus',
    deskripsi: 'Pusat kegiatan ibadah, kajian keagamaan, dan moderasi beragama seluruh civitas akademika.',
    deskripsiLengkap:
      "Masjid Syamsul 'Ulum Kampus Telkom University Purwokerto merupakan sarana ibadah utama yang luas, sejuk, dan terawat. Selain sebagai tempat Sholat Berjamaah, masjid ini aktif digunakan untuk kegiatan kajian keislaman, peringatan hari besar keagamaan, dan pembinaan karakter rohani mahasiswa.",
    fasilitas: [
      'Ruang Utama Sholat Ber-AC Kapasitas 2.000 Jamaah',
      'Area Wudhu Bersih & Suci dengan Air Melimpah',
      'Perlengkapan Ibadah (Mukena & Sajadah) Terawat',
      'Perpustakaan Buku Keislaman & Ruang Kajian',
    ],
    gradient: 'from-emerald-900 via-forest to-forest-deep',
    mapUrl: 'https://maps.app.goo.gl/8NskKq6Xjpg4Pf6s8',
    jamOperasional: '24 Jam (Terbuka Umum)',
    panduanAkses: [
      'Bebas diakses oleh seluruh civitas akademika dan masyarakat umum.',
      'Lepas alas kaki di batas suci yang telah ditandai.',
    ],
    tataTertib: [
      'Berpakaian sopan dan menutup aurat.',
      'Menjaga ketenangan dan mematikan nada dering smartphone saat berada di ruang utama sholat.',
    ],
    iconName: 'Landmark',
  },
];
