import { apiFetch } from './client';

// ---- Tipe ringkas (idealnya di-generate dari OpenAPI/shared-types) ----
export type TimelineEvent = {
  id: string;
  judul: string;
  deskripsi: string | null;
  lokasi: string | null;
  startAt: string;
  endAt: string | null;
  checklistItems: string[] | null;
  status: 'upcoming' | 'ongoing' | 'completed';
};

export type Faq = {
  id: string;
  pertanyaan: string;
  jawaban: string;
  isFeatured: boolean;
  kategori: { nama: string; slug: string };
};

export type Settings = Record<string, string>;

export const getTimeline = () => apiFetch<TimelineEvent[]>('/timeline');

/** Ambil SELURUH event timeline (bentuk lengkap) dari server — dipakai untuk SSR grid
 *  agar tampil di mana saja (bukan fetch di browser yang bisa gagal saat akses publik). */
export const getTimelineEvents = async (): Promise<import('@/components/timeline/expanding-timeline-grid').ApiEvent[]> => {
  try {
    const all = await apiFetch<import('@/components/timeline/expanding-timeline-grid').ApiEvent[]>('/timeline');
    return Array.isArray(all) ? all : [];
  } catch {
    return [];
  }
};
export const getFaq = (params?: { category?: string; search?: string }) => {
  const q = new URLSearchParams();
  if (params?.category) q.set('category', params.category);
  if (params?.search) q.set('search', params.search);
  const qs = q.toString();
  return apiFetch<Faq[]>(`/faq${qs ? `?${qs}` : ''}`);
};
export const getSettings = async () => {
  try {
    return await apiFetch<Settings>('/settings');
  } catch {
    return {};
  }
};

// ---- Galeri suasana kampus (metadata dari DB: Settings key `gallery.campus`) ----
export type GalleryItem = {
  id: string;
  title: string;
  categoryLabel: string;
  date: string;
  image: string;
  description: string;
};
type GalleryImage = { fileName?: string; file: string; title: string; desc: string };
type GalleryCampus = { gallery?: string; note?: string; images: GalleryImage[] };

/**
 * Ambil metadata galeri kampus dari DB (Settings `gallery.campus`) dan petakan ke
 * item galeri siap-render. TIDAK ada hardcoded; kembalikan [] bila kosong/gagal.
 */
export const getGalleryCampus = async (): Promise<GalleryItem[]> => {
  try {
    const all = await apiFetch<Record<string, unknown>>('/settings');
    const g = all?.['gallery.campus'] as GalleryCampus | undefined;
    const images = Array.isArray(g?.images) ? g!.images : [];
    return images.map((img, i) => ({
      id: String(i),
      title: img.title,
      categoryLabel: 'Suasana Kampus',
      date: 'Telkom University Purwokerto',
      image: encodeURI(img.file),
      description: img.desc,
    }));
  } catch {
    return [];
  }
};
