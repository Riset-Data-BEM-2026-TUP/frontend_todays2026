import type { Metadata } from 'next';
import { AnimatedSection, TextReveal, GlowCard } from '@/components/ui/animated-section';
import { PageDecor } from '@/components/ui/jungle-decor';
import { Mail, MapPin, Instagram, MessageCircle, ExternalLink } from 'lucide-react';
import { getSettings } from '@/lib/api/queries';

export const metadata: Metadata = {
  title: 'Kontak — PKKMB BHUMARA 2026',
  description: 'Hubungi panitia PKKMB BHUMARA 2026 dan temukan lokasi kampus Telkom University Purwokerto.',
};

export const revalidate = 300;

const primaryBtn =
  'inline-flex items-center justify-center gap-2 rounded-full bg-rust px-5 py-2.5 text-sm font-bold text-cream shadow-md shadow-rust/25 transition-all hover:scale-[1.02] hover:bg-rust/90';

export default async function ContactPage() {
  let s: Record<string, string> = {};
  try {
    s = await getSettings();
  } catch {
    /* API down → pakai default */
  }

  const email = s['contact.email'] ?? 'pkkmb@telkomuniversity.ac.id';
  const instagram = s['contact.instagram'] ?? 'https://www.instagram.com/todays.telupurwokerto/';
  const igHandle = '@' + (instagram.replace(/\/+$/, '').split('/').pop() || 'todays.telupurwokerto');
  const whatsapp = s['contact.whatsapp'] ?? '';
  const namaKampus = s['contact.nama_kampus'] ?? 'Telkom University Purwokerto';
  const alamat =
    s['contact.alamat'] ??
    'Jl. DI Panjaitan No.128, Karangreja, Purwokerto Selatan, Kabupaten Banyumas, Jawa Tengah 53147';
  const mapsUrl = s['contact.maps'] ?? 'https://maps.app.goo.gl/8NskKq6Xjpg4Pf6s8';
  const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(namaKampus)}&output=embed`;

  return (
    <div className="relative mx-auto max-w-5xl px-4 sm:px-6 pt-28 sm:pt-32 pb-24">
      <PageDecor critter="gajah" />

      {/* Header */}
      <AnimatedSection>
        <h1 className="font-display text-4xl leading-tight text-forest-deep sm:text-5xl">
          <TextReveal text="Hubungi Panitia BHUMARA" />
        </h1>
        <p className="mt-4 max-w-2xl text-base sm:text-lg font-medium leading-relaxed text-forest-deep/80">
          Punya pertanyaan seputar pendaftaran, perlengkapan, atau jadwal PKKMB 2026? Tim panitia siap membantumu
          lewat kanal resmi berikut.
        </p>
      </AnimatedSection>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Kanal kontak */}
        <AnimatedSection delay={0.1} className="space-y-6">
          {whatsapp && (
            <GlowCard className="flex items-start gap-4 p-6">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-rust/30 bg-rust/15 text-rust">
                <MessageCircle size={24} />
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-xl font-bold text-forest-deep">WhatsApp Official</h3>
                <p className="mt-1 text-sm leading-relaxed text-forest/80">
                  Layanan tanya-jawab mahasiswa baru dengan respons cepat.
                </p>
                <a href={whatsapp} target="_blank" rel="noreferrer" className={`mt-4 ${primaryBtn}`}>
                  Chat WhatsApp <ExternalLink size={15} />
                </a>
              </div>
            </GlowCard>
          )}

          <GlowCard className="flex items-start gap-4 p-6">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-forest/25 bg-forest/10 text-forest-deep">
              <Instagram size={24} />
            </span>
            <div className="min-w-0">
              <h3 className="truncate font-display text-xl font-bold text-forest-deep">{igHandle}</h3>
              <p className="mt-1 text-sm leading-relaxed text-forest/80">
                Pengumuman resmi, panduan, & dokumentasi keseruan acara.
              </p>
              <a href={instagram} target="_blank" rel="noreferrer" className={`mt-4 ${primaryBtn}`}>
                Buka Instagram <ExternalLink size={15} />
              </a>
            </div>
          </GlowCard>

          <GlowCard className="flex items-start gap-4 p-6">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-sage/50 bg-sage/25 text-forest-deep">
              <Mail size={24} />
            </span>
            <div className="min-w-0">
              <h3 className="break-all font-display text-lg font-bold text-forest-deep">{email}</h3>
              <p className="mt-1 text-sm leading-relaxed text-forest/80">
                Surat-menyurat resmi, perizinan khusus, dan layanan akademik.
              </p>
              <a href={`mailto:${email}`} className={`mt-4 ${primaryBtn}`}>
                Kirim Email <ExternalLink size={15} />
              </a>
            </div>
          </GlowCard>
        </AnimatedSection>

        {/* Lokasi kampus + peta */}
        <AnimatedSection delay={0.2}>
          <div className="card-clouds overflow-hidden rounded-3xl border border-sand/60 bg-cream shadow-sm">
            <div className="border-b border-sand/40 bg-sage/15 px-6 py-5 sm:px-7">
              <span className="text-xs font-black uppercase tracking-widest text-rust">Lokasi Kampus</span>
              <h3 className="mt-1 font-display text-2xl text-forest-deep">{namaKampus}</h3>
            </div>

            {/* Google Maps embed */}
            <iframe
              src={mapEmbed}
              title={`Peta lokasi ${namaKampus}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-64 w-full border-0 sm:h-72"
              allowFullScreen
            />

            <div className="space-y-5 p-6 sm:p-7">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="mt-0.5 shrink-0 text-rust" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-rust">Alamat</span>
                  <p className="mt-1 text-sm font-medium leading-relaxed text-forest-deep/90">{alamat}</p>
                </div>
              </div>

              <a href={mapsUrl} target="_blank" rel="noreferrer" className={`w-full ${primaryBtn}`}>
                <MapPin size={16} /> Buka di Google Maps
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
