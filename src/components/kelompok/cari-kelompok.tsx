'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Search,
  Loader2,
  AlertCircle,
  UserCheck,
  GraduationCap,
  Hash,
  MessageCircle,
  BadgeCheck,
} from 'lucide-react';
import { apiFetch } from '@/lib/api/client';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/animated-section';

type Anggota = { id: string; nama: string; nim: string; prodi: string | null; isMe: boolean };
type KelompokResult = {
  pkkmbGroupUrl: string | null;
  pkkmbGroupQr: string | null;
  mahasiswa: { nama: string; nim: string; nomorPendaftaran: string; fakultas: string | null; prodi: string | null };
  kelompok: { nama: string | null; noKelompok: string | null; menfa: string | null; whatsappUrl: string | null; jumlahAnggota: number };
  anggota: Anggota[];
};

export function CariKelompok() {
  const [nim, setNim] = useState('');
  const [result, setResult] = useState<KelompokResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = nim.trim();
    if (!value) {
      setError('Masukkan NIM kamu terlebih dahulu.');
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await apiFetch<KelompokResult>(`/kelompok/search?nim=${encodeURIComponent(value)}`);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal mencari kelompok.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative mx-auto max-w-4xl px-4 pb-24 pt-24 sm:px-6 sm:pt-28">
      {/* Header */}
      <AnimatedSection>
        <h1 className="font-display text-4xl leading-tight text-forest-deep sm:text-5xl">
          Kelompok
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-forest-deep/80 sm:text-lg">
          Masukkan NIM-mu untuk melihat identitasmu, kelompok PKKMB, Menfa pendamping,
          serta daftar lengkap anggota sekelompokmu.
        </p>
      </AnimatedSection>

      {/* Search form */}
      <form onSubmit={submit} className="mt-8 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-forest/50" size={20} />
          <input
            value={nim}
            onChange={(e) => setNim(e.target.value)}
            inputMode="numeric"
            placeholder="Contoh: 1301260001"
            aria-label="NIM"
            className="w-full rounded-2xl border border-sand bg-cream/90 py-3.5 pl-12 pr-4 text-[15px] text-ink shadow-sm outline-none transition-colors focus:border-rust focus:ring-2 focus:ring-rust/20"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-rust px-7 py-3.5 text-sm font-bold text-cream shadow-md shadow-rust/25 transition-all hover:scale-[1.02] hover:bg-rust/90 disabled:opacity-70 cursor-pointer"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
          Cari Kelompok
        </button>
      </form>

      {error && (
        <div className="mt-5 flex items-center gap-2.5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
          <AlertCircle size={18} className="shrink-0" /> {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="mt-8 space-y-6">
          {/* CTA: Gabung Grup PKKMB Official (link + QR, dari DB) */}
          {result.pkkmbGroupUrl && (
            <AnimatedSection>
              <div className="card-clouds-dark overflow-hidden rounded-3xl border border-sand/60 bg-forest-deep text-cream shadow-md">
                <div className="flex flex-col items-center gap-6 p-6 sm:flex-row sm:p-7">
                  <QrImage src={result.pkkmbGroupQr} alt="QR Grup WhatsApp PKKMB Official" />
                  <div className="min-w-0 flex-1 text-center sm:text-left">
                    <h2 className="font-display text-2xl text-cream">Gabung Grup PKKMB Official</h2>
                    <p className="mt-2 text-sm leading-relaxed text-cream/85">
                      Masuk grup WhatsApp resmi PKKMB untuk info, pengumuman, dan koordinasi terpusat.
                      Scan QR di samping atau klik tombol di bawah.
                    </p>
                    <a
                      href={result.pkkmbGroupUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-rust px-6 py-3 text-sm font-bold text-cream shadow-md shadow-rust/25 transition-all hover:scale-[1.02] hover:bg-rust/90"
                    >
                      <MessageCircle size={16} /> Gabung Grup WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Identitas + Kelompok */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Kartu Identitas */}
            <AnimatedSection>
              <article className="card-clouds h-full rounded-3xl border border-sand/60 bg-cream shadow-md">
                <div className="space-y-3 p-6">
                  <p className="font-display text-2xl leading-tight text-forest-deep">{result.mahasiswa.nama}</p>
                  <InfoRow icon={<Hash size={16} />} label="NIM" value={result.mahasiswa.nim} />
                  <InfoRow icon={<GraduationCap size={16} />} label="Program Studi" value={result.mahasiswa.prodi} />
                  <InfoRow icon={<BadgeCheck size={16} />} label="Fakultas" value={result.mahasiswa.fakultas} />
                </div>
              </article>
            </AnimatedSection>

            {/* Kartu Kelompok */}
            <AnimatedSection>
              <article className="card-clouds-dark flex h-full flex-col rounded-3xl border border-sand/60 bg-forest-deep text-cream shadow-md">
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <p className="font-display text-2xl leading-tight text-cream">
                    {result.kelompok.nama ?? 'Belum ada kelompok'}
                  </p>
                  <div className="flex items-center gap-2.5 rounded-2xl bg-cream/10 px-4 py-3">
                    <UserCheck size={18} className="shrink-0 text-sand" />
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-sand/80">Menfa (Pendamping)</p>
                      <p className="truncate text-[15px] font-bold text-cream">{result.kelompok.menfa ?? '—'}</p>
                    </div>
                  </div>
                  <p className="text-sm text-cream/80">
                    Total <span className="font-bold text-cream">{result.kelompok.jumlahAnggota}</span> anggota dalam kelompok ini.
                  </p>
                  {result.kelompok.whatsappUrl && (
                    <a
                      href={result.kelompok.whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-rust px-5 py-2.5 text-sm font-bold text-cream shadow-md shadow-rust/25 transition-colors hover:bg-rust/90"
                    >
                      <MessageCircle size={16} /> Gabung Grup WhatsApp
                    </a>
                  )}
                </div>
              </article>
            </AnimatedSection>
          </div>

          {/* Daftar Anggota */}
          <AnimatedSection>
            <div className="card-clouds overflow-hidden rounded-3xl border border-sand/60 bg-cream shadow-md">
              <div className="border-b border-sand/40 bg-sage/15 px-6 py-4">
                <h2 className="text-sm font-black uppercase tracking-widest text-forest-deep">Anggota Kelompok</h2>
              </div>
              <StaggerContainer className="divide-y divide-sand/50">
                {result.anggota.map((m, i) => (
                  <StaggerItem key={m.id}>
                    <div
                      className={`flex items-center gap-4 px-6 py-4 transition-colors ${
                        m.isMe ? 'bg-rust/5' : 'hover:bg-sage/15'
                      }`}
                    >
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-forest-deep text-lg font-black uppercase text-cream">
                        {m.nama.charAt(0)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="flex items-center gap-2 truncate text-base font-bold text-forest-deep sm:text-lg">
                          {m.nama}
                          {m.isMe && (
                            <span className="rounded-full bg-rust px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-cream">
                              Kamu
                            </span>
                          )}
                        </p>
                        <p className="truncate text-sm text-forest/70">
                          <span className="font-semibold text-forest-deep/80">{m.nim}</span>
                          {m.prodi ? ` · ${m.prodi}` : ''}
                        </p>
                      </div>
                      <span className="hidden shrink-0 text-sm font-black text-forest-deep/40 sm:block">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </AnimatedSection>
        </div>
      )}
    </section>
  );
}

/** QR grup WA — otomatis disembunyikan bila gambar belum tersedia (onError). */
function QrImage({ src, alt }: { src: string | null; alt: string }) {
  const [ok, setOk] = useState(true);
  if (!src || !ok) return null;
  return (
    <div className="shrink-0 rounded-2xl bg-white p-2.5 shadow-sm">
      <Image
        src={src}
        alt={alt}
        width={160}
        height={160}
        onError={() => setOk(false)}
        className="size-32 rounded-lg object-contain sm:size-40"
      />
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | null }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-sage/25 text-rust">{icon}</span>
      <div className="min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-wider text-forest/60">{label}</p>
        <p className="truncate text-[15px] font-bold text-forest-deep">{value ?? '—'}</p>
      </div>
    </div>
  );
}
