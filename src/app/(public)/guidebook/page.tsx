import { Metadata } from 'next';
import { GuidebookReader } from '@/components/guidebook/guidebook-reader';

export const metadata: Metadata = {
  title: 'Guidebook PKKMB 2026 — BHUMARA Telkom University Purwokerto',
  description:
    'Buku panduan digital resmi peserta PKKMB BHUMARA Telkom University Purwokerto 2026. Berisi jadwal, atribut, tata tertib, denah kampus, dan kontak penting.',
};

export const dynamic = 'force-dynamic';

export default function GuidebookPage() {
  return (
    <main className="min-h-screen bg-sage/10 relative overflow-hidden py-6 sm:py-10">
      <GuidebookReader />
    </main>
  );
}
