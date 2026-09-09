import type { Metadata } from 'next';
import { SimpleDirectory, type SimpleDirectoryItem } from '@/components/pionirpedia/simple-directory';
import { API_URL } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Explore Ormawa & UKM — PKKMB BHUMARA 2026',
  description:
    'Direktori Organisasi Kemahasiswaan & Unit Kegiatan Mahasiswa Telkom University Purwokerto.',
};

// Render dinamis agar data Ormawa selalu diambil dari backend/database saat request.
export const dynamic = 'force-dynamic';

type OrmawaApi = {
  id: string;
  nama: string;
  kategori: string;
  logoUrl?: string | null;
  deskripsi?: string | null;
  visiMisi?: string | null;
  programKerja?: string | null;
  instagramUrl?: string | null;
};

async function getOrmawa(): Promise<OrmawaApi[]> {
  try {
    const res = await fetch(`${API_URL}/ormawa`, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    const json = await res.json();
    return (json?.data as OrmawaApi[]) ?? [];
  } catch {
    return [];
  }
}

export default async function ExploreOrmawaPage() {
  const list = await getOrmawa();
  const items: SimpleDirectoryItem[] = list.map((o) => ({
    id: o.id,
    title: o.nama,
    category: o.kategori,
    logoUrl: o.logoUrl ?? undefined,
    summary: o.deskripsi ?? '',
    description: o.visiMisi ?? o.deskripsi ?? '',
    facts: o.programKerja
      ? o.programKerja.split(/\n+/).map((s) => s.trim()).filter(Boolean)
      : undefined,
    href: o.instagramUrl ?? undefined,
    hrefLabel: o.instagramUrl ? 'Lihat Instagram' : undefined,
  }));

  return (
    <SimpleDirectory
      items={items}
      backLabel="Ormawa & UKM"
      overview="Direktori Organisasi Kemahasiswaan & Unit Kegiatan Mahasiswa (Ormawa/UKM) Telkom University Purwokerto. Telusuri profil, visi-misi, dan program kerja tiap organisasi untuk menemukan wadah pengembangan dirimu."
    />
  );
}
