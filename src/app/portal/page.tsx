'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Calendar,
  Building2,
  BookOpen,
  MessageCircle,
  LogOut,
  Loader2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  MapPin,
  Gamepad2,
} from 'lucide-react';
import { apiFetch } from '@/lib/api/client';
import { PageDecor } from '@/components/ui/jungle-decor';

type MabaUser = {
  id: string;
  email: string;
  role: string;
  phone?: string;
  mahasiswa?: {
    nama: string;
    nomorPendaftaran: string;
    tanggalLahir: string;
    fakultas: { nama: string; kode?: string };
    prodi: { nama: string };
    kelompok?: { nama: string; whatsappChannelUrl?: string };
  };
};

export default function MabaPortalPage() {
  const [user, setUser] = useState<MabaUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      window.location.href = '/login?redirect=/portal';
      return;
    }

    apiFetch<MabaUser>('/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        setError(err.message || 'Gagal memuat profil mahasiswa');
        localStorage.removeItem('accessToken');
        document.cookie = 'session_token=; path=/; max-age=0';
        setTimeout(() => {
          window.location.href = '/login?redirect=/portal';
        }, 1500);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleLogout = async () => {
    try {
      await apiFetch('/auth/logout', { method: 'POST' });
    } catch {
      // Abaikan error saat logout
    }
    localStorage.removeItem('accessToken');
    document.cookie = 'session_token=; path=/; max-age=0';
    window.location.href = '/login';
  };

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3 pt-28">
        <Loader2 size={36} className="animate-spin text-rust" />
        <p className="text-sm font-bold text-forest-deep">Memuat Portal Mahasiswa...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto pt-32 px-4 text-center">
        <div className="p-6 rounded-3xl bg-red-50 border border-red-200">
          <AlertTriangle size={36} className="text-red-600 mx-auto mb-2" />
          <h2 className="text-lg font-bold text-red-900">Sesi Tidak Valid</h2>
          <p className="text-sm text-red-700 mt-1">{error}</p>
          <p className="text-xs text-red-600 mt-2">Mengalihkan kembali ke halaman login...</p>
        </div>
      </div>
    );
  }

  const mhs = user?.mahasiswa;

  return (
    <div className="relative mx-auto max-w-5xl px-4 sm:px-6 pt-24 sm:pt-28 pb-20">
      <PageDecor />

      {/* Header Profil Mahasiswa */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-cream/90 border border-sand shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-rust text-cream shadow-md shrink-0">
            <GraduationCap size={32} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-forest-deep">
              Halo, {mhs?.nama || user?.email.split('@')[0]}!
            </h1>
            <p className="text-xs text-forest/70 mt-0.5">
              No. Pendaftaran: <span className="font-bold text-forest-deep">{mhs?.nomorPendaftaran}</span> · {user?.email}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="self-start sm:self-auto flex items-center gap-2 px-4 py-2.5 rounded-full border border-sand/80 bg-sand/20 text-xs font-bold text-forest-deep hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-all cursor-pointer"
        >
          <LogOut size={15} />
          <span>Keluar</span>
        </button>
      </div>

      {/* Detail Data Akademik & Kelompok */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {/* Card Akademik */}
        <div className="p-5 rounded-2xl bg-cream/80 border border-sand">
          <h3 className="text-xs font-bold uppercase tracking-wider text-rust flex items-center gap-1.5 mb-3">
            <Building2 size={15} />
            <span>Data Program Studi</span>
          </h3>
          <div className="space-y-2">
            <div>
              <p className="text-[11px] text-forest/60">Fakultas</p>
              <p className="text-sm font-extrabold text-forest-deep">
                {mhs?.fakultas?.nama || '-'} {mhs?.fakultas?.kode ? `(${mhs.fakultas.kode})` : ''}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-forest/60">Program Studi</p>
              <p className="text-sm font-extrabold text-forest-deep">{mhs?.prodi?.nama || '-'}</p>
            </div>
          </div>
        </div>

        {/* Card Kelompok PKKMB */}
        <div className="p-5 rounded-2xl bg-cream/80 border border-sand">
          <h3 className="text-xs font-bold uppercase tracking-wider text-rust flex items-center gap-1.5 mb-3">
            <MessageCircle size={15} />
            <span>Gugus / Kelompok PKKMB</span>
          </h3>
          <div>
            <p className="text-[11px] text-forest/60">Nama Kelompok</p>
            <p className="text-sm font-extrabold text-forest-deep">{mhs?.kelompok?.nama || 'Belum Ditentukan'}</p>
            {mhs?.kelompok?.whatsappChannelUrl && (
              <a
                href={mhs.kelompok.whatsappChannelUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600 text-cream text-xs font-bold shadow-sm hover:bg-emerald-700 transition-all"
              >
                <MessageCircle size={13} />
                <span>Gabung Grup WhatsApp</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Navigasi Cepat Portal */}
      <h2 className="text-lg font-bold text-forest-deep mt-8 mb-4 flex items-center gap-2">
        <Sparkles size={18} className="text-rust" />
        <span>Menu & Aktivitas PKKMB</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/timeline"
          className="p-5 rounded-2xl bg-cream/80 border border-sand hover:border-rust/40 transition-all group"
        >
          <div className="flex size-11 items-center justify-center rounded-xl bg-sand/40 text-forest-deep mb-3">
            <Calendar size={22} className="text-rust" />
          </div>
          <h3 className="font-bold text-forest-deep">Timeline & Agenda</h3>
          <p className="text-xs text-forest/70 mt-1">Cek jadwal kegiatan harian PKKMB BHUMARA.</p>
          <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-rust group-hover:underline">
            Buka Timeline &rarr;
          </span>
        </Link>

        <Link
          href="/guidebook"
          className="p-5 rounded-2xl bg-cream/80 border border-sand hover:border-rust/40 transition-all group"
        >
          <div className="flex size-11 items-center justify-center rounded-xl bg-sand/40 text-forest-deep mb-3">
            <BookOpen size={22} className="text-rust" />
          </div>
          <h3 className="font-bold text-forest-deep">Buku Panduan</h3>
          <p className="text-xs text-forest/70 mt-1">Panduan atribut, tata tertib, dan teknis kegiatan.</p>
          <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-rust group-hover:underline">
            Unduh Panduan &rarr;
          </span>
        </Link>

        <Link
          href="/roblox"
          className="p-5 rounded-2xl bg-cream/80 border border-sand hover:border-rust/40 transition-all group"
        >
          <div className="flex size-11 items-center justify-center rounded-xl bg-sand/40 text-forest-deep mb-3">
            <Gamepad2 size={22} className="text-rust" />
          </div>
          <h3 className="font-bold text-forest-deep">Roblox Metaverse</h3>
          <p className="text-xs text-forest/70 mt-1">Jelajahi dunia virtual kampus Telkom University.</p>
          <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-rust group-hover:underline">
            Masuk Roblox &rarr;
          </span>
        </Link>
      </div>
    </div>
  );
}
