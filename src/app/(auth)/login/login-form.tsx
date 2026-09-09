'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { apiFetch } from '@/lib/api/client';

/** Ambil role dari payload JWT (base64) tanpa verifikasi tanda tangan — hanya untuk
 *  menentukan tujuan redirect di sisi klien. Otorisasi sebenarnya tetap di server. */
function roleFromJwt(token: string): string | null {
  try {
    return JSON.parse(atob(token.split('.')[1]))?.role ?? null;
  } catch {
    return null;
  }
}

/**
 * Form login KHUSUS ADMIN (email + password).
 * Login mahasiswa/panitia sudah ditiadakan — hanya akun admin yang bisa masuk.
 */
export function LoginForm() {
  const searchParams = useSearchParams();
  const redirectParam = searchParams.get('redirect');

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsLoading(true);

    try {
      const payload = { email: form.email.trim().toLowerCase(), password: form.password };
      const res = await apiFetch<{ accessToken: string }>('/auth/admin/login', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      // Access token untuk header Authorization; cookie presence untuk middleware.
      localStorage.setItem('accessToken', res.accessToken);
      document.cookie = `session_token=${res.accessToken}; path=/; max-age=86400; SameSite=Lax`;

      const role = roleFromJwt(res.accessToken);
      const safeRedirect =
        redirectParam && redirectParam.startsWith('/') && !redirectParam.startsWith('/login')
          ? redirectParam
          : '/admin';

      setSuccessMsg('Login berhasil! Mengalihkan ke Dashboard...');
      setTimeout(() => {
        window.location.href = role === 'admin' ? safeRedirect : '/admin';
      }, 700);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Terjadi kesalahan saat memproses login.');
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {errorMsg && (
        <div className="mb-5 p-3.5 rounded-2xl bg-red-50/90 border border-red-200/80 text-red-800 text-sm flex items-start gap-2.5">
          <AlertCircle size={18} className="text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1 leading-relaxed">{errorMsg}</div>
        </div>
      )}

      {successMsg && (
        <div className="mb-5 p-3.5 rounded-2xl bg-emerald-50/90 border border-emerald-200/80 text-emerald-800 text-sm flex items-start gap-2.5">
          <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
          <div className="flex-1 font-semibold leading-relaxed">{successMsg}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forest-deep">
            <Mail size={13} className="text-rust" />
            <span>Email Admin</span>
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="admin@bhumara.telkomuniversity.ac.id"
            className="w-full rounded-2xl border border-sand bg-cream/80 px-4 py-3 text-sm text-ink outline-none transition-all focus:border-rust focus:ring-2 focus:ring-rust/20 placeholder:text-forest/40"
          />
        </div>

        <div>
          <label className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forest-deep">
            <Lock size={13} className="text-rust" />
            <span>Password</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••••••"
              className="w-full rounded-2xl border border-sand bg-cream/80 pl-4 pr-11 py-3 text-sm text-ink outline-none transition-all focus:border-rust focus:ring-2 focus:ring-rust/20 placeholder:text-forest/40"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-forest/50 transition-colors hover:text-forest cursor-pointer"
              tabIndex={-1}
              aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-rust py-3.5 text-sm font-semibold text-cream shadow-lg shadow-rust/30 transition-all duration-300 hover:bg-rust/90 disabled:opacity-70 sm:text-base cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>Memverifikasi Akun...</span>
            </>
          ) : (
            <span>Masuk Sebagai Admin</span>
          )}
        </button>
      </form>
    </div>
  );
}
