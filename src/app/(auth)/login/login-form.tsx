'use client';

export function LoginForm() {
  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <div>
        <label className="block text-xs font-extrabold uppercase tracking-wider text-forest-deep mb-1.5">
          Nomor Pendaftaran / NIM
        </label>
        <input
          type="text"
          placeholder="Contoh: 2026100123"
          className="w-full rounded-2xl border border-sand bg-cream/80 px-4 py-3 text-base text-ink outline-none focus:border-rust focus:ring-2 focus:ring-rust/20 transition-all"
        />
      </div>

      <div>
        <label className="block text-xs font-extrabold uppercase tracking-wider text-forest-deep mb-1.5">
          Tanggal Lahir / Password
        </label>
        <input
          type="password"
          placeholder="••••••••"
          className="w-full rounded-2xl border border-sand bg-cream/80 px-4 py-3 text-base text-ink outline-none focus:border-rust focus:ring-2 focus:ring-rust/20 transition-all"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-rust py-3.5 text-base font-semibold text-cream shadow-lg shadow-rust/30 hover:bg-rust/90 transition-all duration-300 mt-2"
      >
        Masuk Ke Portal &rarr;
      </button>
    </form>
  );
}
