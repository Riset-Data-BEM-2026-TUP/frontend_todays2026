import { API_URL } from '../config';

type ApiEnvelope<T> = {
  success: boolean;
  data: T;
  meta?: unknown;
  error?: { code: string; message: string; details?: string[] };
};

/** Fetch wrapper: unwrap { success, data }, lempar Error dengan pesan backend. */
export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const controller = new AbortController();
  // Timeout 10 detik agar mencukupi untuk hashing password Argon2 & latensi jaringan
  const timeoutId = setTimeout(() => controller.abort(), 10000);
  try {
    const res = await fetch(`${API_URL}${path}`, {
      ...init,
      signal: init?.signal ?? controller.signal,
      headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
      // sertakan cookie refresh_token untuk endpoint auth
      credentials: 'include',
    });
    clearTimeout(timeoutId);

    const json = (await res.json().catch(() => null)) as ApiEnvelope<T> | null;
    if (!res.ok || !json?.success) {
      const detailsMsg = Array.isArray(json?.error?.details) && json.error.details.length > 0
        ? json.error.details.join(', ')
        : null;
      throw new Error(detailsMsg ?? json?.error?.message ?? `Request gagal (${res.status})`);
    }
    return json.data;
  } catch (err: any) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      throw new Error('Koneksi timeout, server backend tidak merespons dalam 10 detik.');
    }
    throw err;
  }
}
