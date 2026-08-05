'use client';

import { AnimatedSection, TextReveal, GlowCard } from '@/components/ui/animated-section';
import { PageDecor } from '@/components/ui/jungle-decor';
import { Mail, MapPin, Instagram, MessageCircle, Clock, ExternalLink } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="relative mx-auto max-w-5xl px-4 sm:px-6 pt-28 sm:pt-32 pb-24">
      <PageDecor critter="gajah" />
      {/* Header */}
      <AnimatedSection>
        <span className="font-display text-xs font-bold uppercase tracking-widest text-rust">
          HELPDESK & INFORMASI RESMI
        </span>
        <h1 className="mt-1 font-display text-4xl text-forest-deep sm:text-5xl">
          <TextReveal text="Hubungi Panitia BHUMARA" />
        </h1>
        <p className="mt-4 text-lg text-forest/80 font-medium leading-relaxed max-w-2xl">
          Punya pertanyaan seputar pendaftaran, perlengkapan, atau jadwal PKKMB 2026? Tim panitia siap membantumu.
        </p>
      </AnimatedSection>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Channels Grid */}
        <AnimatedSection delay={0.1} className="space-y-6">
          <GlowCard className="flex items-start gap-4">
            <div className="size-12 rounded-2xl bg-rust/15 border border-rust/30 flex items-center justify-center shrink-0">
              <MessageCircle size={24} className="text-rust" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rust">Helpdesk WhatsApp</span>
              <h3 className="font-display text-xl font-bold text-forest-deep">WhatsApp Official PKKMB</h3>
              <p className="mt-1 text-sm text-forest/80 font-medium">Layanan chat tanya-jawab mahasiswa baru fast response.</p>
              <a
                href="https://wa.me/6280000000000"
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-rust px-4 py-2 text-xs font-bold text-cream hover:bg-rust/90 transition-colors shadow-sm"
              >
                Chat WhatsApp <ExternalLink size={12} />
              </a>
            </div>
          </GlowCard>

          <GlowCard className="flex items-start gap-4">
            <div className="size-12 rounded-2xl bg-forest/15 border border-forest/30 flex items-center justify-center shrink-0">
              <Instagram size={24} className="text-forest" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rust">Media Sosial</span>
              <h3 className="font-display text-xl font-bold text-forest-deep">@pkkmb.telkompwt</h3>
              <p className="mt-1 text-sm text-forest/80 font-medium">Pengumuman resmi, outfit guidelines, & dokumentasi keseruan acara.</p>
              <a
                href="https://instagram.com/pkkmb.telkompwt"
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-forest/40 px-4 py-2 text-xs font-bold text-forest hover:bg-forest/10 transition-colors"
              >
                Buka Instagram <ExternalLink size={12} />
              </a>
            </div>
          </GlowCard>

          <GlowCard className="flex items-start gap-4">
            <div className="size-12 rounded-2xl bg-sage/20 border border-sage/40 flex items-center justify-center shrink-0">
              <Mail size={24} className="text-forest-deep" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rust">Email Resmi</span>
              <h3 className="font-display text-xl font-bold text-forest-deep">pkkmb@telkomuniversity.ac.id</h3>
              <p className="mt-1 text-sm text-forest/80 font-medium">Surat-menyurat resmi, perizinan khusus, dan layanan akademik.</p>
              <a
                href="mailto:pkkmb@telkomuniversity.ac.id"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-extrabold text-rust hover:text-rust/80 transition-colors uppercase tracking-wider"
              >
                Kirim Email <ExternalLink size={12} />
              </a>
            </div>
          </GlowCard>
        </AnimatedSection>

        {/* Operational Hours & Location */}
        <AnimatedSection delay={0.2} className="space-y-6">
          <div className="rounded-3xl border border-sand/60 bg-cream p-8 shadow-sm space-y-6">
            <h3 className="font-display text-2xl font-bold text-forest-deep">Sekretariat Panitia</h3>
            
            <div className="flex items-start gap-3">
              <MapPin size={20} className="text-rust shrink-0 mt-1" />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rust">Alamat Kampus</span>
                <p className="mt-1 text-sm font-semibold text-forest-deep leading-relaxed">
                  Gedung Sekretariat BEM / PKKMB Telkom University Purwokerto<br />
                  Jl. DI Panjaitan No.128, Karangreja, Purwokerto Selatan, Kabupaten Banyumas, Jawa Tengah 53147
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-4 border-t border-sand/40">
              <Clock size={20} className="text-rust shrink-0 mt-1" />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rust">Jam Operasional Helpdesk</span>
                <p className="mt-1 text-sm font-semibold text-forest-deep">
                  Senin – Jumat: 08.00 – 16.00 WIB<br />
                  Sabtu – Minggu: Libur / Fast Response via IG Story
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-sand/40">
              <a
                href="https://maps.google.com/?q=Telkom+University+Purwokerto"
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-forest-deep py-3.5 text-sm font-bold text-cream hover:bg-forest-deep/90 transition-colors shadow-md"
              >
                <MapPin size={16} /> Buka Google Maps Kampus
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
