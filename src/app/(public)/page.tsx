import Link from 'next/link';
import { GraduationCap, Users, Search } from 'lucide-react';
import { FullpageHeroExperience } from '@/components/landing/fullpage-hero-experience';
import { SuasanaKampusGallery } from '@/components/landing/suasana-kampus-gallery';
import { ExpandingTimelineGrid } from '@/components/timeline/expanding-timeline-grid';
import { FaqAccordion } from '@/components/ui/faq-accordion';
import { AnimatedSection } from '@/components/ui/animated-section';
import { FloatingLeaves, Decor, EdgeCritter, EdgeDecor } from '@/components/ui/jungle-decor';
import { getSettings, getGalleryCampus, getTimelineEvents } from '@/lib/api/queries';
import { MaskedText } from '@/components/ui/masked-reveal';
import { API_URL } from '@/lib/config';
import {
  DriftingClouds,
  FlyingRocket,
  FloatingObject,
  RippleRings,
} from '@/components/ui/sky-scape';

export const revalidate = 60;

type Preview = { id: string; nama: string; kategori?: string | null; logoUrl?: string | null; deskripsi?: string | null };

/** Ambil daftar ringkas untuk preview overview di landing (data dari DB, bukan hardcoded). */
async function getList(path: string): Promise<Preview[]> {
  try {
    const res = await fetch(`${API_URL}${path}`, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    const json = await res.json();
    return (json?.data as Preview[]) ?? [];
  } catch {
    return [];
  }
}

const ctaClass =
  'inline-flex items-center gap-1.5 text-base font-bold text-rust hover:underline shrink-0 bg-cream/70 px-4 py-2 rounded-full border border-sand/50 shadow-sm';

export default async function LandingPage() {
  let s: Record<string, string> = {};
  try {
    s = await getSettings();
  } catch {
    /* API down -> pakai default */
  }

  // Data dari DB (server-fetch → aman untuk akses publik/tunnel).
  const [ormawa, academic, galleryItems, timelineEvents] = await Promise.all([
    getList('/ormawa'),
    getList('/academic'),
    getGalleryCampus(),
    getTimelineEvents(),
  ]);

  return (
    <>
      {/* Single Fullpage Hero & About Experience */}
      <FullpageHeroExperience
        tagline={s['about.tema']}
        tema={s['about.tema']}
        temaJudul={s['about.tema_judul']}
      />

      {/* Ringkasan timeline */}
      <section id="after-hero" className="relative overflow-hidden mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
        {/* Dekor langit: roket melintas, awan hanyut, cincin radar */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
          <RippleRings className="-right-16 top-6 opacity-70" size={300} />
          <DriftingClouds />
          <FlyingRocket className="right-[24%] top-24 sm:top-28" size={56} rotate={40} />
        </div>
        <FloatingLeaves />
        <EdgeCritter name="rusa" side="right" />
        <AnimatedSection className="relative flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-forest-deep tracking-tight">
              <MaskedText text="Rangkaian Acara PKKMB" />
            </h2>
            <p className="mt-3 text-base sm:text-lg text-forest-deep/90 font-medium leading-relaxed">
              Jadwal & tahapan kegiatan mahasiswa baru Telkom University Purwokerto. Klik setiap hari untuk detail rincian.
            </p>
          </div>
          <Link href="/timeline" className={ctaClass}>
            Lihat semua agenda
          </Link>
        </AnimatedSection>

        <AnimatedSection delay={0.2} className="mt-6">
          <ExpandingTimelineGrid showHeader={false} events={timelineEvents} />
        </AnimatedSection>
      </section>

      {/* Overview: Ormawa & UKM */}
      <section className="relative overflow-hidden mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
          <DriftingClouds className="opacity-80" />
          <FloatingObject src="/images/sky/mascot-balloon.png" className="right-[4%] top-8" size={104} amplitude={16} duration={7} />
        </div>
        <FloatingLeaves />
        <AnimatedSection className="relative flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-forest-deep tracking-tight">
              <MaskedText text="Ormawa & UKM" />
            </h2>
            <p className="mt-3 text-base sm:text-lg text-forest-deep/90 font-medium leading-relaxed">
              Kenali organisasi kemahasiswaan & unit kegiatan mahasiswa untuk menyalurkan minat dan bakatmu selama kuliah.
            </p>
          </div>
          <Link href="/explore-ormawa" className={ctaClass}>
            Lihat semua Ormawa
          </Link>
        </AnimatedSection>

        {ormawa.length > 0 ? (
          <AnimatedSection delay={0.2} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ormawa.slice(0, 6).map((o) => (
              <Link
                key={o.id}
                href="/explore-ormawa"
                className="card-clouds group flex flex-col rounded-3xl border border-sand/60 bg-cream/90 p-6 shadow-md transition-all hover:border-rust/50 hover:shadow-xl"
              >

                <h3 className="font-display text-xl font-bold text-forest-deep transition-colors group-hover:text-rust">
                  {o.nama}
                </h3>
                {o.deskripsi && (
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-forest-deep/80">{o.deskripsi}</p>
                )}
                {o.kategori && (
                  <div className="mt-auto border-t border-sand/40 pt-4">
                    <span className="inline-flex items-center rounded-full bg-sage/30 px-3 py-1 text-xs font-black uppercase tracking-wider text-forest-deep">
                      {o.kategori}
                    </span>
                  </div>
                )}
              </Link>
            ))}
          </AnimatedSection>
        ) : (
          <AnimatedSection className="flex items-center gap-3 rounded-3xl border border-sand/60 bg-cream/70 p-6 text-forest-deep/80">
            <Users size={20} className="text-rust" /> Jelajahi seluruh organisasi & UKM di halaman Ormawa.
          </AnimatedSection>
        )}
      </section>

      {/* Overview: Platform Akademik */}
      <section className="relative overflow-hidden mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
          <div className="pattern-dots absolute inset-0 opacity-40" />
          <FloatingObject src="/images/sky/helikopter.png" className="left-[3%] top-10" size={110} amplitude={12} duration={6.5} />
        </div>
        <FloatingLeaves />
        <EdgeCritter name="rusa" side="left" />
        <AnimatedSection className="relative flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-forest-deep tracking-tight">
              <MaskedText text="Platform Akademik" />
            </h2>
            <p className="mt-3 text-base sm:text-lg text-forest-deep/90 font-medium leading-relaxed">
              Portal & aplikasi resmi Telkom University Purwokerto — iGracias, CeLOE LMS, TelU Open Library, dan lainnya.
            </p>
          </div>
          <Link href="/academic" className={ctaClass}>
            Lihat semua platform
          </Link>
        </AnimatedSection>

        {academic.length > 0 ? (
          <AnimatedSection delay={0.2} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {academic.slice(0, 6).map((a) => (
              <Link
                key={a.id}
                href="/academic"
                className="card-clouds group flex flex-col rounded-3xl border border-sand/60 bg-cream/90 p-6 shadow-md transition-all hover:border-rust/50 hover:shadow-xl"
              >
                <h3 className="font-display text-xl font-bold text-forest-deep transition-colors group-hover:text-rust">
                  {a.nama}
                </h3>
                {a.deskripsi && (
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-forest-deep/80">{a.deskripsi}</p>
                )}
                {a.kategori && (
                  <div className="mt-auto border-t border-sand/40 pt-4">
                    <span className="inline-flex items-center rounded-full bg-sage/30 px-3 py-1 text-xs font-black uppercase tracking-wider text-forest-deep">
                      {a.kategori}
                    </span>
                  </div>
                )}
              </Link>
            ))}
          </AnimatedSection>
        ) : (
          <AnimatedSection className="flex items-center gap-3 rounded-3xl border border-sand/60 bg-cream/70 p-6 text-forest-deep/80">
            <GraduationCap size={20} className="text-rust" /> Lihat seluruh platform akademik di halaman Akademik.
          </AnimatedSection>
        )}
      </section>

      {/* Potongan Suasana Kampus (Gallery) — metadata dari DB (Settings gallery.campus) */}
      {galleryItems.length > 0 && <SuasanaKampusGallery items={galleryItems} />}

      {/* Overview: Cari Kelompok */}
      <section className="relative overflow-hidden mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
        <FloatingLeaves />
        <AnimatedSection>
          <div className="relative overflow-hidden rounded-3xl border border-sand/60 bg-forest-deep px-6 py-12 text-cream shadow-md sm:px-12 sm:py-14">
            <div className="max-w-2xl">
              <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-cream/10 text-sand">
                <Search size={24} />
              </div>
              <h2 className="font-display text-3xl sm:text-5xl text-cream">Cari Kelompokmu</h2>
              <p className="mt-3 text-base sm:text-lg leading-relaxed text-cream/85">
                Masukkan NIM-mu untuk melihat identitas, kelompok PKKMB, Menfa pendamping, dan daftar lengkap anggota
                sekelompokmu.
              </p>
              <Link
                href="/cari-kelompok"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-rust px-6 py-3 text-sm font-bold text-cream shadow-md shadow-rust/25 transition-colors hover:bg-rust/90"
              >
                <Search size={16} /> Cari Kelompok
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* FAQ singkat */}
      <section className="relative overflow-hidden mx-auto max-w-4xl px-4 sm:px-6 pt-20 sm:pt-28 pb-20 sm:pb-28">
        <EdgeDecor className="inset-y-0">
          <Decor name="matahari" className="absolute -right-12 top-2 w-44 opacity-100 pointer-events-none" />
        </EdgeDecor>
        <FloatingLeaves />
        <AnimatedSection>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-forest-deep tracking-tight">
              <MaskedText text="Pertanyaan Umum" />
            </h2>
            <p className="mt-3 text-base sm:text-lg text-forest/90 font-medium leading-relaxed">
              Temukan jawaban atas pertanyaan seputar pelaksanaan PKKMB BHUMARA 2026.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2} className="mt-12 min-h-[920px] pb-12">
          <FaqAccordion />
        </AnimatedSection>
      </section>
    </>
  );
}
