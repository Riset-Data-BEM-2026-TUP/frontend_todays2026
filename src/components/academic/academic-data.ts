export interface AcademicPlatformItem {
  id: string;
  nama: string;
  singkatan: string;
  kategori: string;
  url: string;
  deskripsi: string;
  deskripsiLengkap: string;
  bannerGradient: string;
  iconName: string;
  tags: string[];
  fiturUtama: string[];
  panduanAkses: string[];
  kendalaSolusi: string;
}

export const ACADEMIC_PLATFORMS: AcademicPlatformItem[] = [
  {
    id: 'igracias',
    nama: 'iGracias Telkom University',
    singkatan: 'iGracias',
    kategori: 'Portal Utama Akademik',
    url: 'https://igracias.telkomuniversity.ac.id/',
    deskripsi: 'Portal layanan akademik terpadu untuk pengisian KRS, cek KHS, nilai semester, dan presensi perkuliahan.',
    deskripsiLengkap:
      'iGracias (Integrated Academic Information System) adalah sistem informasi akademik utama bagi seluruh civitas akademika Telkom University Purwokerto. Melalui portal ini, mahasiswa dapat mengelola administrasi perkuliahan mulai dari perwalian KRS, melihat jadwal kuliah, mengecek KHS & IPK, cetak transkrip sementara, hingga pengajuan cuti dan beasiswa.',
    bannerGradient: 'from-rust via-amber-700 to-forest-deep',
    iconName: 'LayoutDashboard',
    tags: ['KRS & KHS', 'Presensi', 'Transkrip Nilai', 'Perwalian'],
    fiturUtama: [
      'Perwalian & Pengisian Kartu Rencana Studi (KRS) online',
      'Melihat Kartu Hasil Studi (KHS) dan pencapaian IPK harian',
      'Monitoring presensi kehadiran perkuliahan per mata kuliah',
      'Pengajuan Beasiswa, Cuti Akademik, dan Wisuda',
    ],
    panduanAkses: [
      'Gunakan Username akun TelU (NIM mahasiswa) dan Password iGracias resmi.',
      'Lakukan pengisian KRS sesuai jadwal registrasi akademik yang telah ditentukan fakultas.',
      'Pastikan melakukan kuesioner dosen di akhir semester untuk melihat nilai KHS.',
    ],
    kendalaSolusi:
      'Jika lupa password iGracias atau akun terkunci, gunakan fitur "Lupa Password" menggunakan email student resmi atau hubungi Helpdesk IT Services Telkom University.',
  },
  {
    id: 'celoe-lms',
    nama: 'CeLOE LMS (EduRoom)',
    singkatan: 'LMS CeLOE',
    kategori: 'E-Learning & Tugas',
    url: 'https://lms.telkomuniversity.ac.id/',
    deskripsi: 'Platform pembelajaran digital untuk akses materi kuliah, pengumpulan tugas harian, dan forum kuis online.',
    deskripsiLengkap:
      'CeLOE LMS (Center for e-Learning and Open Education) merupakan platform pembelajaran jarak jauh berbasis Moodle yang digunakan dalam kegiatan belajar mengajar harian. Dosen membagikan modul perkuliahan, rekaman video, forum diskusi, kuis interaktif, dan penugasan harian melalui platform ini.',
    bannerGradient: 'from-emerald-800 via-forest to-forest-deep',
    iconName: 'BookOpenCheck',
    tags: ['Materi Perkuliahan', 'Submit Tugas', 'Kuis Online', 'Forum Diskusi'],
    fiturUtama: [
      'Unduh modul slide materi perkuliahan & video pembelajaran',
      'Pengumpulan tugas perkuliahan harian dan tugas besar',
      'Pengerjaan Kuis online & Ujian Tengah/Akhir Semester (UTS/UAS)',
      'Forum diskusi interaktif antara Dosen pengampu dan mahasiswa',
    ],
    panduanAkses: [
      'Login menggunakan Single Sign-On (SSO) akun iGracias Telkom University.',
      'Pilih mata kuliah yang terdaftar pada semester berjalan sesuai kelas KRS.',
      'Perhatikan deadline tanggal & jam pengumpulan tugas agar tidak mengalami keterlambatan submit.',
    ],
    kendalaSolusi:
      'Mata kuliah tidak muncul di LMS? Pastikan status perwalian KRS di iGracias sudah disetujui Dosen Pembimbing Akademik (DPA).',
  },
  {
    id: 'open-library',
    nama: 'TelU Open Library',
    singkatan: 'OpenLib',
    kategori: 'Perpustakaan & Riset',
    url: 'https://openlibrary.telkomuniversity.ac.id/',
    deskripsi: 'Perpustakaan digital resmi dengan akses ribuan e-book, jurnal internasional, dan karya ilmiah e-theses.',
    deskripsiLengkap:
      'TelU Open Library adalah fasilitas perpustakaan modern Telkom University yang menyediakan akses literatur fisik dan digital. Mahasiswa dapat meminjam buku perpustakaan, mengakses e-book publikasi internasional (IEEE, ScienceDirect, Scopus), serta mencari referensi Tugas Akhir / Skripsi alumni.',
    bannerGradient: 'from-amber-800 via-rust to-forest-deep',
    iconName: 'Library',
    tags: ['E-Book', 'Jurnal Ilmiah', 'E-Theses', 'Peminjaman Buku'],
    fiturUtama: [
      'Pencarian katalog buku fisik & pemesanan peminjaman online',
      'Akses gratis repositori jurnal ilmiah internasional terindeks Scopus/IEEE',
      'Browsing dokumen Tugas Akhir, Skripsi, dan Tesis alumni',
      'Fasilitas bebas pustaka online untuk persyaratan kelulusan',
    ],
    panduanAkses: [
      'Login menggunakan SSO akun iGracias mahasiswa.',
      'Gunakan bilah pencarian kata kunci untuk menemukan buku atau jurnal riset.',
      'Untuk pengunduhan jurnal internasional berlangganan, gunakan jaringan WiFi kampus atau VPN TelU.',
    ],
    kendalaSolusi:
      'Memerlukan surat bebas pustaka? Lakukan pengecekan pengembalian buku dan unggah mandiri berkas Tugas Akhir melalui menu E-Theses Open Library.',
  },
  {
    id: 'mytelu-app',
    nama: 'MyTelU Mobile App',
    singkatan: 'MyTelU',
    kategori: 'Aplikasi Mobile & KTM Digital',
    url: 'https://play.google.com/store/apps/details?id=ac.id.telkomuniversity.mytelu',
    deskripsi: 'Aplikasi smartphone serbaguna untuk Kartu Tanda Mahasiswa (KTM) digital, jadwal harian, & presensi QR.',
    deskripsiLengkap:
      'MyTelU adalah aplikasi mobile resmi Telkom University yang dirancang untuk memudahkan aktivitas harian mahasiswa di dalam genggaman. Dilengkapi dengan e-KTM (KTM Digital), pemindaian presensi kuliah berbasis QR Code, hingga notifikasi pengumuman kampus secara real-time.',
    bannerGradient: 'from-forest-deep via-emerald-900 to-forest',
    iconName: 'Smartphone',
    tags: ['E-KTM Digital', 'Presensi QR', 'Jadwal Harian', 'Notifikasi'],
    fiturUtama: [
      'Kartu Tanda Mahasiswa Digital (e-KTM) resmi',
      'Fitur Scan QR Code untuk presensi perkuliahan di ruang kelas',
      'Pengingat jadwal kuliah harian dan lokasi ruang kelas',
      'Informasi tagihan BPP perkuliahan & pengumuman resmi kampus',
    ],
    panduanAkses: [
      'Unduh aplikasi MyTelU melalui Google Play Store (Android) atau App Store (iOS).',
      'Login menggunakan username NIM dan password SSO iGracias.',
      'Aktifkan izin kamera untuk pemindaian QR Code presensi di dalam kelas.',
    ],
    kendalaSolusi:
      'Gagal melakukan scan QR presensi? Pastikan koneksi internet stabil dan izin lokasi (GPS) pada smartphone telah diaktifkan.',
  },
  {
    id: 'office-365',
    nama: 'Office 365 & Email Student',
    singkatan: 'M365 Student',
    kategori: 'Layanan Akun & Lisensi',
    url: 'https://outlook.office.com/',
    deskripsi: 'Lisensi resmi gratis Microsoft Office 365, Email Student, Teams, dan cloud storage OneDrive 1TB.',
    deskripsiLengkap:
      'Seluruh mahasiswa aktif Telkom University Purwokerto berhak mendapatkan lisensi resmi perangkat lunak Microsoft Office 365 secara gratis. Layanan ini mencakup email mahasiswa resmi (@student.telkomuniversity.ac.id), Microsoft Word, Excel, PowerPoint, MS Teams untuk perkuliahan, dan OneDrive 1 Terabyte.',
    bannerGradient: 'from-blue-900 via-forest-deep to-rust',
    iconName: 'Mail',
    tags: ['Email Student', 'Lisensi MS Office', 'OneDrive 1TB', 'MS Teams'],
    fiturUtama: [
      'Email resmi mahasiswa (@student.telkomuniversity.ac.id)',
      'Lisensi aktivasi Microsoft Office 365 ProPlus di hingga 5 perangkat',
      'Penyimpanan awan (Cloud Storage) OneDrive berkapasitas 1 Terabyte (1000GB)',
      'Akses Microsoft Teams untuk kelas online & rapat organisasi',
    ],
    panduanAkses: [
      'Format email: namakamu@student.telkomuniversity.ac.id.',
      'Login portal office.com menggunakan email student dan password SSO.',
      'Klik tombol "Install Office" pada dashboard untuk mengunduh installer resmi di laptop/PC kamu.',
    ],
    kendalaSolusi:
      'Password email terpisah dari iGracias? Anda dapat melakukan penyelarasan password melalui menu Pengaturan Profil di portal iGracias.',
  },
  {
    id: 'tak-skpi',
    nama: 'Portal TAK & Kemahasiswaan',
    singkatan: 'TAK TelU',
    kategori: 'Kemahasiswaan & Sertifikat',
    url: 'https://igracias.telkomuniversity.ac.id/',
    deskripsi: 'Portal rekapitulasi Transkrip Aktivitas Kemahasiswaan (TAK) untuk pengajuan poin sertifikat & SKPI.',
    deskripsiLengkap:
      'Transkrip Aktivitas Kemahasiswaan (TAK) adalah poin apresiasi bagi mahasiswa yang aktif dalam kegiatan organisasi, kepanitiaan PKKMB, perlombaan, dan bakti sosial. Pencapaian poin TAK menjadi salah satu kelengkapan berkas Surat Keterangan Pendamping Ijazah (SKPI) sebelum wisuda.',
    bannerGradient: 'from-rust via-forest-deep to-amber-900',
    iconName: 'Award',
    tags: ['Poin TAK', 'SKPI', 'Sertifikat PKKMB', 'Prestasi'],
    fiturUtama: [
      'Unggah bukti sertifikat kepanitiaan, organisasi, & keikutsertaan lomba',
      'Rekapitulasi poin TAK per kategori (Kepemimpinan, Penalar, Pengabdian)',
      'Cetak Transkrip Aktivitas Kemahasiswaan resmi',
      'Validasi poin TAK oleh Dosen Pembimbing Akademik (DPA)',
    ],
    panduanAkses: [
      'Akses menu "TAK" pada dashboard iGracias mahasiswa.',
      'Unggah scan sertifikat asli berformat PDF/JPG beserta deskripsi kegiatan.',
      'Ajukan verifikasi sertifikat kepada DPA sebelum batas waktu yudisium.',
    ],
    kendalaSolusi:
      'Sertifikat PKKMB otomatis terinput ke poin TAK setelah Anda dinyatakan lulus rangkaian pengenalan kampus BHUMARA 2026.',
  },
];
