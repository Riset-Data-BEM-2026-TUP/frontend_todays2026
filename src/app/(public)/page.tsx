import Link from 'next/link';
import { Compass, Clapperboard, BookOpen, Gamepad2, HelpCircle } from 'lucide-react';
import { FullpageHeroExperience } from '@/components/landing/fullpage-hero-experience';
import { TimelineList } from '@/components/timeline/timeline-list';
import { FaqAccordion } from '@/components/ui/faq-accordion';
import { AnimatedSection, StaggerContainer, StaggerItem, GlowCard, TextReveal } from '@/components/ui/animated-section';
import { getSettings } from '@/lib/api/queries';

// Revalidate berkala: cepat (ISR) tapi tetap dinamis dari CMS.
export const revalidate = 60;

const features = [
  { href: '/campus-tour', label: 'Campus Tour', desc: 'Jelajahi denah & fasilitas kampus secara interaktif', icon: Compass },
  { href: '/explore-ormawa', label: 'Explore Ormawa', desc: 'Mengenal organisasi & UKM di Telkom University Purwokerto', icon: Clapperboard },
  { href: '/guidebook', label: 'Guidebook', desc: 'Panduan lengkap & tata tertib pelaksanaan PKKMB', icon: BookOpen },
  { href: '/roblox', label: 'Roblox Experience', desc: 'Pengalaman metaverse peta virtual kampus Telkom', icon: Gamepad2 },
  { href: '/quiz', label: 'Quiz PKKMB', desc: 'Uji pengetahuan seputar Wawasan Kebangsaan & Kampus', icon: Gamepad2 },
  { href: '/faq', label: 'FAQ', desc: 'Pertanyaan yang sering diajukan seputar kegiatan', icon: HelpCircle },
];

export default async function LandingPage() {
  let s: Record<string, string> = {};
  try {
    s = await getSettings();
  } catch {
    /* API down -> pakai default */
  }

  return (
    <>
      {/* Fullpage Wheel-Snap Deck Presentation starting directly from Hero Banner */}
      <FullpageHeroExperience
        tagline={s['about.tema']}
        filosofi={s['about.filosofi']}
        tema={s['about.tema']}
        maknaLogo={s['about.makna_logo']}
        maknaMaskot={s['about.makna_maskot']}
      />

      {/* Highlight feature (Full-Screen Coverage Section) */}
      <section id="features-section" className="bg-sage/15 min-h-screen flex flex-col justify-center py-20 sm:py-28 border-y border-sand/40 relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 w-full">
          <AnimatedSection>
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl text-forest-deep sm:text-4xl">
                <TextReveal text="Jelajahi Fitur PKKMB" />
              </h2>
              <p className="mt-3 text-base sm:text-lg text-forest/90 font-medium leading-relaxed">
                Pusat informasi interaktif, modul kegiatan, dan panduan mahasiswa baru.
              </p>
            </div>
          </AnimatedSection>

          <StaggerContainer className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ href, label, desc, icon: Icon }) => (
              <StaggerItem key={href}>
                <GlowCard className="h-full p-0">
                  <Link
                    href={href}
                    className="group flex flex-col justify-between h-full p-6 sm:p-7"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="p-3.5 rounded-2xl bg-forest/8 text-forest group-hover:bg-rust group-hover:text-cream transition-colors duration-300">
                          <Icon className="size-7 transition-transform duration-300 group-hover:scale-110" />
                        </div>
                        <span className="text-sm font-bold text-rust opacity-0 group-hover:opacity-100 transition-opacity">
                          Buka &rarr;
                        </span>
                      </div>
                      <h3 className="mt-6 font-display font-bold text-xl text-ink group-hover:text-rust transition-colors">
                        {label}
                      </h3>
                      <p className="mt-2 text-sm sm:text-base text-forest/80 leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  </Link>
                </GlowCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Ringkasan timeline */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
        <AnimatedSection className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-extrabold text-forest-deep sm:text-4xl tracking-tight">
              <TextReveal text="Rangkaian Acara TODAYS" />
            </h2>
            <p className="mt-3 text-base sm:text-lg text-forest/90 font-medium leading-relaxed">
              Jadwal & tahapan kegiatan mahasiswa baru Telkom University Purwokerto.
            </p>
          </div>
          <Link
            href="/timeline"
            className="inline-flex items-center gap-1.5 text-base font-bold text-rust hover:underline shrink-0 group"
          >
            Lihat semua agenda <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
          </Link>
        </AnimatedSection>

        <AnimatedSection delay={0.2} className="mt-12">
          <TimelineList />
        </AnimatedSection>
      </section>

      {/* FAQ singkat */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 pb-20 sm:pb-28">
        <AnimatedSection>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl font-extrabold text-forest-deep sm:text-4xl tracking-tight">
              <TextReveal text="Pertanyaan Umum" />
            </h2>
            <p className="mt-3 text-base sm:text-lg text-forest/90 font-medium leading-relaxed">
              Temukan jawaban atas pertanyaan seputar pelaksanaan PKKMB BHUMARA 2026.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2} className="mt-12">
          <FaqAccordion />
        </AnimatedSection>
      </section>
    </>
  );
}
