import type { Metadata } from 'next';
import { SimpleDirectory, type SimpleDirectoryItem } from '@/components/pionirpedia/simple-directory';
import { API_URL } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Platform Akademik - PKKMB 2026',
  description: 'Panduan portal akademik iGracias, CeLOE LMS, TelU Open Library, dan aplikasi mobile mahasiswa.',
};

export const dynamic = 'force-dynamic';

type AcademicApi = {
  id: string;
  nama: string;
  kategori: string;
  url?: string | null;
  deskripsi?: string | null;
  deskripsiLengkap?: string | null;
  fiturUtama?: string[] | null;
};

async function getAcademic(): Promise<AcademicApi[]> {
  try {
    const res = await fetch(`${API_URL}/academic`, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    const json = await res.json();
    return (json?.data as AcademicApi[]) ?? [];
  } catch {
    return [];
  }
}

export default async function AcademicPage() {
  const list = await getAcademic();
  const items: SimpleDirectoryItem[] = list.map((a) => ({
    id: a.id,
    title: a.nama,
    category: a.kategori,
    summary: a.deskripsi ?? '',
    description: a.deskripsiLengkap ?? a.deskripsi ?? '',
    facts: a.fiturUtama && a.fiturUtama.length > 0 ? a.fiturUtama : undefined,
    href: a.url ?? undefined,
    hrefLabel: a.url ? 'Buka platform' : undefined,
  }));

  return (
    <SimpleDirectory
      items={items}
      backLabel="Platform Akademik"
      overview="Kumpulan portal & aplikasi akademik resmi Telkom University Purwokerto — iGracias, CeLOE LMS, TelU Open Library, dan lainnya. Pilih kategori atau klik tiap kartu untuk melihat detail fitur dan tautan aksesnya."
    />
  );
}
