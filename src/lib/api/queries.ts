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
export const getFaq = (params?: { category?: string; search?: string }) => {
  const q = new URLSearchParams();
  if (params?.category) q.set('category', params.category);
  if (params?.search) q.set('search', params.search);
  const qs = q.toString();
  return apiFetch<Faq[]>(`/faq${qs ? `?${qs}` : ''}`);
};
export const getSettings = () => apiFetch<Settings>('/settings');
