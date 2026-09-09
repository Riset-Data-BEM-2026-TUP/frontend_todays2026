// URL API backend.
// - Di BROWSER  : NEXT_PUBLIC_API_URL (di-inline saat build) → domain publik/HTTPS.
// - Di SERVER   : utamakan INTERNAL_API_URL (mis. http://backend:4000/api/v1 di jaringan
//   Docker) agar SSR/ISR cepat & tak bergantung TLS/DNS publik dari dalam container.
const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api/v1';
const INTERNAL_API_URL = process.env.INTERNAL_API_URL ?? PUBLIC_API_URL;

export const API_URL = typeof window === 'undefined' ? INTERNAL_API_URL : PUBLIC_API_URL;
