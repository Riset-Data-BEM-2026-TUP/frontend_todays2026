'use client';

import { useEffect, useState } from 'react';
import {
  Loader2,
  AlertTriangle,
  Calendar,
  HelpCircle,
  Users,
  GraduationCap,
  MapPin,
  Settings as SettingsIcon,
} from 'lucide-react';
import { apiFetch } from '@/lib/api/client';
import { AdminManager, type Resource } from '@/components/admin/admin-manager';

type AdminUser = {
  id: string;
  email: string;
  role: string;
  phone?: string;
  pendamping?: { nama?: string };
};

/** Konfigurasi seluruh resource yang bisa dikelola (CRUD) dari panel. */
const RESOURCES: Resource[] = [
  {
    key: 'timeline',
    label: 'Timeline',
    icon: Calendar,
    hint: 'Agenda & rundown kegiatan PKKMB',
    listUrl: '/timeline',
    titleField: 'judul',
    subtitleField: 'lokasi',
    categoryField: 'status',
    fields: [
      { name: 'judul', label: 'Judul', required: true },
      { name: 'deskripsi', label: 'Deskripsi', type: 'textarea' },
      { name: 'lokasi', label: 'Lokasi' },
      { name: 'startAt', label: 'Mulai', type: 'datetime', required: true },
      { name: 'endAt', label: 'Selesai', type: 'datetime' },
      { name: 'dresscode', label: 'Dresscode', type: 'textarea' },
      { name: 'urutan', label: 'Urutan', type: 'number' },
    ],
  },
  {
    key: 'faq',
    label: 'FAQ',
    icon: HelpCircle,
    hint: 'Pertanyaan yang sering diajukan',
    listUrl: '/faq',
    writeBase: '/faq',
    titleField: 'pertanyaan',
    subtitleField: 'jawaban',
    fields: [
      { name: 'kategoriId', label: 'Kategori', type: 'select', optionsUrl: '/faq-kategori', required: true },
      { name: 'pertanyaan', label: 'Pertanyaan', required: true },
      { name: 'jawaban', label: 'Jawaban', type: 'textarea', required: true },
      { name: 'isFeatured', label: 'Unggulan', type: 'boolean' },
      { name: 'urutan', label: 'Urutan', type: 'number' },
    ],
  },
  {
    key: 'ormawa',
    label: 'Ormawa & UKM',
    icon: Users,
    hint: 'Organisasi & unit kegiatan mahasiswa',
    listUrl: '/ormawa',
    titleField: 'nama',
    categoryField: 'kategori',
    subtitleField: 'slug',
    fields: [
      { name: 'slug', label: 'Slug (unik)', required: true, placeholder: 'contoh: astralic' },
      { name: 'nama', label: 'Nama', required: true },
      { name: 'kategori', label: 'Kategori', required: true, placeholder: 'UKM / HIMA / BEM ...' },
      { name: 'deskripsi', label: 'Deskripsi', type: 'textarea' },
      { name: 'visiMisi', label: 'Visi & Misi', type: 'textarea' },
      { name: 'programKerja', label: 'Program Kerja', type: 'textarea' },
      { name: 'instagramUrl', label: 'Instagram URL', type: 'url' },
      { name: 'logoUrl', label: 'Logo URL', type: 'url' },
    ],
  },
  {
    key: 'academic',
    label: 'Platform Akademik',
    icon: GraduationCap,
    hint: 'iGracias, CeLOE, OpenLibrary, dll.',
    listUrl: '/academic',
    titleField: 'nama',
    categoryField: 'kategori',
    subtitleField: 'url',
    fields: [
      { name: 'nama', label: 'Nama', required: true },
      { name: 'singkatan', label: 'Singkatan' },
      { name: 'kategori', label: 'Kategori', required: true },
      { name: 'url', label: 'URL', type: 'url' },
      { name: 'deskripsi', label: 'Deskripsi', type: 'textarea' },
      { name: 'deskripsiLengkap', label: 'Deskripsi Lengkap', type: 'textarea' },
      { name: 'fiturUtama', label: 'Fitur Utama', type: 'list' },
      { name: 'urutan', label: 'Urutan', type: 'number' },
    ],
  },
  {
    key: 'gedung',
    label: 'Gallery / Gedung',
    icon: MapPin,
    hint: 'Lokasi, fasilitas & suasana kampus',
    listUrl: '/gedung',
    titleField: 'nama',
    categoryField: 'kategori',
    subtitleField: 'lokasi',
    fields: [
      { name: 'nama', label: 'Nama', required: true },
      { name: 'kategori', label: 'Kategori' },
      { name: 'lokasi', label: 'Lokasi' },
      { name: 'deskripsi', label: 'Deskripsi', type: 'textarea' },
      { name: 'deskripsiLengkap', label: 'Deskripsi Lengkap', type: 'textarea' },
      { name: 'fasilitas', label: 'Fasilitas', type: 'list' },
      { name: 'jamOperasional', label: 'Jam Operasional' },
      { name: 'googleMapsUrl', label: 'Google Maps URL', type: 'url' },
      { name: 'urutan', label: 'Urutan', type: 'number' },
    ],
  },
  {
    key: 'settings',
    label: 'Pengaturan Situs',
    icon: SettingsIcon,
    hint: 'Konten dinamis (about, kontak, dll.)',
    listUrl: '/settings/list',
    writeBase: '/settings',
    idField: 'key',
    usePutForCreate: true,
    titleField: 'key',
    subtitleField: 'value',
    fields: [
      { name: 'key', label: 'Key', required: true, placeholder: 'contoh: about.tema' },
      { name: 'value', label: 'Value', type: 'textarea', required: true },
    ],
  },
];

export default function AdminDashboardPage() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      window.location.href = '/login?redirect=/admin';
      return;
    }
    apiFetch<AdminUser>('/auth/me', { headers: { Authorization: `Bearer ${token}` } })
      .then((data) => {
        if (data.role === 'mahasiswa') {
          window.location.href = '/portal';
          return;
        }
        setUser(data);
      })
      .catch((err) => {
        setError(err.message || 'Gagal memuat profil admin');
        localStorage.removeItem('accessToken');
        document.cookie = 'session_token=; path=/; max-age=0';
        setTimeout(() => (window.location.href = '/login?redirect=/admin'), 1500);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleLogout = async () => {
    try {
      await apiFetch('/auth/logout', { method: 'POST' });
    } catch {
      /* abaikan */
    }
    localStorage.removeItem('accessToken');
    document.cookie = 'session_token=; path=/; max-age=0';
    window.location.href = '/login';
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-3 pt-28">
        <Loader2 size={36} className="animate-spin text-rust" />
        <p className="text-sm font-bold text-forest-deep">Memuat Dashboard Admin...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-md px-4 pt-32 text-center">
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6">
          <AlertTriangle size={36} className="mx-auto mb-2 text-red-600" />
          <h2 className="text-lg font-bold text-red-900">Sesi Tidak Valid</h2>
          <p className="mt-1 text-sm text-red-700">{error}</p>
          <p className="mt-2 text-xs text-red-600">Mengalihkan kembali ke halaman login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 sm:pt-10">
      <AdminManager
        resources={RESOURCES}
        user={
          user
            ? {
                name: user.pendamping?.nama || user.email.split('@')[0],
                email: user.email,
                role: user.role,
              }
            : undefined
        }
        onLogout={handleLogout}
      />
    </div>
  );
}
