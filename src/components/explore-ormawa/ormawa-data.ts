export type OrmawaItem = {
  id: string;
  nama: string;
  singkatan: string;
  kategori: string;
  deskripsi: string;
  deskripsiLengkap: string;
  instagram: string;
  isOpen: boolean;
  tags: string[];
  bannerGradient: string;
  visiMisi?: string;
  programKerja: string[];
  syaratPendaftaran: string[];
  linkPendaftaran?: string;
};

export const INITIAL_ORMAWA_LIST: OrmawaItem[] = [
  {
    id: '1',
    nama: 'Software Engineering Club',
    singkatan: 'SEC',
    kategori: 'Penalaran & Teknologi',
    deskripsi: 'Wadah pengembangan bakat mahasiswa di bidang rekayasa perangkat lunak, web development, dan competitive programming.',
    deskripsiLengkap: 'Software Engineering Club (SEC) adalah komunitas riset dan pengembangan teknologi mahasiswa Telkom University Purwokerto yang berfokus pada pengembangan perangkat lunak modern, aplikasi web & mobile, kecerdasan buatan (AI/ML), dan persiapan kompetisi Gemastik & Hackathon.',
    instagram: '@sec.telkompwt',
    isOpen: true,
    tags: ['Coding', 'Web Dev', 'AI/ML', 'Hackathon'],
    bannerGradient: 'from-forest-deep via-forest to-sage/50',
    visiMisi: 'Menciptakan talenta teknokrat muda yang siap bersaing secara global dalam inovasi perangkat lunak.',
    programKerja: [
      'SEC BootCamp (Web & Mobile Development)',
      'Mentoring Competitive Programming & Gemastik',
      'Hackathon Internally & Workshop Tech Talk',
      'Showcase Project Expo Mahasiswa',
    ],
    syaratPendaftaran: [
      'Mahasiswa Aktif Telkom University Purwokerto',
      'Memiliki ketertarikan tinggi di bidang pemrograman / teknologi',
      'Komitmen mengikuti kegiatan rutin (1x seminggu)',
      'Mengisi formulir pendaftaran online',
    ],
    linkPendaftaran: 'https://instagram.com/sec.telkompwt',
  },
  {
    id: '2',
    nama: 'Cyber Security Team',
    singkatan: 'CST',
    kategori: 'Penalaran & Teknologi',
    deskripsi: 'Komunitas keamanan siber Telkom University Purwokerto yang fokus pada Capture The Flag (CTF) dan ethical hacking.',
    deskripsiLengkap: 'Cyber Security Team (CST) memfasilitasi mahasiswa yang berminat pada dunia jaringan, enkripsi, analisis kerentanan sistem, dan eksploitasi etis. Anggota CST secara rutin mewakili kampus dalam ajang CTF nasional & internasional.',
    instagram: '@cst.telkompwt',
    isOpen: true,
    tags: ['CTF', 'CyberSecurity', 'Pentest', 'Network'],
    bannerGradient: 'from-rust/90 via-rust/60 to-sand/50',
    visiMisi: 'Menjadi pusat keunggulan edukasi & pertahanan keamanan siber di lingkungan akademis.',
    programKerja: [
      'Internal Weekly CTF Challenge',
      'Workshop Penetration Testing & Web Hacking',
      'Sharing Session Forensic Digital & Cryptography',
    ],
    syaratPendaftaran: [
      'Mahasiswa Aktif Telkom University Purwokerto',
      'Memahami dasar perintah Linux / Jaringan Komputer (Nilai Tambah)',
      'Memiliki rasa ingin tahu tinggi dan etika siber',
    ],
    linkPendaftaran: 'https://instagram.com/cst.telkompwt',
  },
  {
    id: '3',
    nama: 'UKM Olahraga Telkom',
    singkatan: 'UKMO',
    kategori: 'Olahraga',
    deskripsi: 'Mewadahi minat bakat cabang olahraga Futsal, Basket, Badminton, Voli, dan E-Sports berprestasi.',
    deskripsiLengkap: 'UKM Olahraga (UKMO) adalah tempat berkumpulnya atlet dan pencinta olahraga kampus Telkom Purwokerto. Terdiri dari berbagai divisi: Futsal, Basket, Badminton, Voli, Tenis Meja, dan E-Sports.',
    instagram: '@ukmo.telkompwt',
    isOpen: true,
    tags: ['Futsal', 'Basket', 'Badminton', 'E-Sports'],
    bannerGradient: 'from-forest via-sage to-cream/40',
    visiMisi: 'Membina fisik prima, jiwa sportif, dan mencetak atlet berprestasi untuk kejuaraan antar universitas.',
    programKerja: [
      'Latihan Rutin Mingguan Per Divisi',
      'Rektor Cup & Turnamen Inter-Prodi',
      'Try Out & OIS (Olimpiade Olahraga Kampus)',
    ],
    syaratPendaftaran: [
      'Mahasiswa Aktif Telkom University Purwokerto',
      'Menyukai / berminat pada salah satu divisi olahraga',
      'Sehat jasmani dan rohani',
    ],
    linkPendaftaran: 'https://instagram.com/ukmo.telkompwt',
  },
  {
    id: '4',
    nama: 'UKM Musik & Seni Teater',
    singkatan: 'HARMONY',
    kategori: 'Seni & Budaya',
    deskripsi: 'Wadah berekspresi mahasiswa dalam bidang olah vokal, instrumen musik, produksi lagu, serta pertunjukan seni teater.',
    deskripsiLengkap: 'HARMONY menampung kreativitas musik (band, paduan suara, acoustic) dan pertunjukan drama/teater panggung. HARMONY sering mengisi acara besar kampus dan konser inagurasi PKKMB.',
    instagram: '@harmony.telkompwt',
    isOpen: false,
    tags: ['Band', 'Vokal', 'Teater', 'Konser'],
    bannerGradient: 'from-rust via-sand to-forest-deep/70',
    visiMisi: 'Mengekspresikan seni secara bebas, estetis, dan menghibur bagi masyarakat kampus.',
    programKerja: [
      'Parade Band & Live Acoustic Night',
      'Pementasan Teater Tahunan',
      'Coaching Clinic Olah Vokal & Arranging',
    ],
    syaratPendaftaran: [
      'Mahasiswa Aktif Telkom University Purwokerto',
      'Mengikuti audisi sesuai bakat (Vokal / Alat Musik / Seni Peran)',
    ],
    linkPendaftaran: 'https://instagram.com/harmony.telkompwt',
  },
  {
    id: '5',
    nama: 'Himpunan Mahasiswa Informatika',
    singkatan: 'HMIF',
    kategori: 'Himpunan Jurusan',
    deskripsi: 'Himpunan mahasiswa program studi S1 Informatika Telkom University Purwokerto penggerak kegiatan akademik & non-akademik.',
    deskripsiLengkap: 'HMIF berfungsi sebagai organisasi advokasi, pengabdi masyarakat, dan wadah persaudaraan seluruh mahasiswa S1 Informatika Telkom Purwokerto.',
    instagram: '@hmif.telkompwt',
    isOpen: true,
    tags: ['Informatika', 'Himpunan', 'Advokasi', 'Sosial'],
    bannerGradient: 'from-forest-deep via-rust/70 to-sage/60',
    visiMisi: 'Mewujudkan HMIF yang solid, responsif, berprestasi, dan berdampak positif bagi mahasiswa dan almamater.',
    programKerja: [
      'Informatics Gathering & Welcoming Party',
      'Kunjungan Industri & Kuliah Pakar',
      'Bakti Sosial Informatika Mengajar',
    ],
    syaratPendaftaran: [
      'Mahasiswa Aktif S1 Informatika Telkom Purwokerto',
      'Lolos seleksi berkas & wawancara fungsionaris',
    ],
    linkPendaftaran: 'https://instagram.com/hmif.telkompwt',
  },
  {
    id: '6',
    nama: 'UKM Kerohanian Islam',
    singkatan: 'UKKI',
    kategori: 'Keagamaan',
    deskripsi: 'Organisasi kemahasiswaan pembinaan nilai keislaman, kajian rutin, bakti sosial, dan kepemimpinan islami.',
    deskripsiLengkap: 'UKKI bergerak di bidang dakwah kampus, kepemimpinan islami, kajian ilmiah Al-Qur\'an, sosial kemanusiaan, serta mentoring agama bagi mahasiswa muslim.',
    instagram: '@ukki.telkompwt',
    isOpen: true,
    tags: ['Kajian', 'Baksos', 'Karakter', 'Mentoring'],
    bannerGradient: 'from-forest via-sage/80 to-cream/50',
    visiMisi: 'Menjadi wadah pembentukan karakter mahasiswa muslim yang berakhlak mulia, cerdas, dan bermanfaat.',
    programKerja: [
      'Kajian Akbar & Semarak Ramadan',
      'Mentoring Agama Mahasiswa Baru',
      'Bakti Sosial Dapur Ummat & Peduli Bencana',
    ],
    syaratPendaftaran: [
      'Mahasiswa Muslim Aktif Telkom University Purwokerto',
      'Niat lurus untuk belajar & berorganisasi',
    ],
    linkPendaftaran: 'https://instagram.com/ukki.telkompwt',
  },
];

export const ORMAWA_CATEGORIES = ['Semua', 'Penalaran & Teknologi', 'Olahraga', 'Seni & Budaya', 'Himpunan Jurusan', 'Keagamaan'];
