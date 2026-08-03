import { API_URL } from '../config';

type ApiEnvelope<T> = { success: boolean; data: T; meta?: unknown; error?: { code: string; message: string } };

/** Fetch wrapper: unwrap { success, data }, lempar Error dengan pesan backend. */
export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
    // sertakan cookie refresh_token untuk endpoint auth
    credentials: 'include',
  });
  const json = (await res.json().catch(() => null)) as ApiEnvelope<T> | null;
  if (!res.ok || !json?.success) {
    throw new Error(json?.error?.message ?? `Request gagal (${res.status})`);
  }
  return json.data;
}
