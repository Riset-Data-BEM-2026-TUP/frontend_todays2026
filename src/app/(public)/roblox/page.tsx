import Image from 'next/image';
import Link from 'next/link';
import { Gamepad2, Trophy, Compass, Sparkles, ShieldCheck, ArrowRight, Users } from 'lucide-react';
import { PageDecor } from '@/components/ui/jungle-decor';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/animated-section';
import { CardParallaxTilt } from '@/components/ui/card-parallax-tilt';
import { MaskedText } from '@/components/ui/masked-reveal';

export const metadata = {
  title: 'Roblox Campus Tour — BHUMARA 2026',
  description: 'Jelajahi kampus Telkom University Purwokerto secara virtual di dunia metaverse Roblox.',
};

const quests = [
  {
    title: 'Eksplorasi Gedung Rektorat',
    desc: 'Temukan ruang auditorium & abadikan foto selfie di depan monumen Telkom.',
    xp: '+250 XP',
    icon: Compass,
  },
  {
    title: 'Misi Rahasia Hutan Rimbawan',
    desc: 'Cari 5 kristal Bhumara tersembunyi di area laboratorium terpadu.',
    xp: '+500 XP',
    icon: Sparkles,
  },
  {
    title: 'Rally Ormawa & UKM',
    desc: 'Kunjungi 15 stan virtual organisasi mahasiswa dan dapatkan stempel resmi.',
    xp: '+350 XP',
    icon: Trophy,
  },
];

export default function RobloxPage() {
  return (
    <div className="relative mx-auto max-w-5xl px-4 sm:px-6 pt-28 sm:pt-36 pb-28 min-h-dvh">
      <PageDecor critter="badak" />

      {/* Header Section */}
      <AnimatedSection>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-sand/50">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-forest-deep tracking-tight">
              <MaskedText text="Roblox Campus Tour" as="span" />
            </h1>
            <p className="mt-3.5 text-base sm:text-lg text-forest-deep/90 font-medium leading-relaxed">
              Jelajahi replika 3D kampus Telkom University Purwokerto di platform Roblox, selesaikan quest seru, dan raih badge eksklusif <strong>Campus Explorer 2026</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="flex size-20 items-center justify-center rounded-3xl border border-sand/60 bg-cream shadow-xl">
              <Image src="/logo-pkkmb.png" alt="Logo BHUMARA" width={56} height={56} className="drop-shadow-md" />
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Hero Showcase 3D Banner */}
      <AnimatedSection delay={0.15} className="mt-10">
        <CardParallaxTilt maxTilt={6} scaleHover={1.01}>
          <div className="relative overflow-hidden rounded-3xl border border-forest-deep/20 bg-gradient-to-br from-forest-deep via-[#4d573c] to-forest text-cream p-8 sm:p-12 shadow-2xl">
            <div className="relative z-10 max-w-xl">
              <h2 className="font-display text-3xl sm:text-5xl font-black leading-tight">
                Dunia Virtual Bhumara Tel-U Purwokerto
              </h2>
              <p className="mt-4 text-cream/90 text-base sm:text-lg leading-relaxed">
                Bergabung bersama ribuan mahasiswa baru lainnya. Jelajahi sudut kampus dari ruang kelas, lab komputer, hingga lapangan olahraga secara real-time.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="https://www.roblox.com"
                  target="_blank"
                  rel="noreferrer"

                  className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-rust px-8 py-3.5 text-base font-bold text-cream shadow-xl shadow-rust/40 hover:bg-rust/90 hover:scale-105 transition-all duration-300"
                >
                  <Gamepad2 size={20} />
                  Mainkan di Roblox
                </a>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-cream/80 bg-cream/10 backdrop-blur-md px-4 py-3 rounded-full border border-cream/15">
                  <Users size={16} />
                  <span>Kapasitas Server: 50 Pemain / Lobi</span>
                </div>
              </div>
            </div>

            {/* Ambient Graphic Accent */}
            <div className="pointer-events-none absolute -right-12 -bottom-16 size-80 rounded-full bg-rust/30 blur-3xl" />

            {/* Maskot Tico (aset Figma) mengisi sisi kanan banner */}
            <Image
              src="/images/sky/tico-jempol.png"
              alt=""
              aria-hidden
              width={523}
              height={1000}
              className="pointer-events-none absolute bottom-0 right-3 sm:right-8 z-[5] hidden w-28 select-none drop-shadow-2xl sm:block lg:w-40"
            />
          </div>
        </CardParallaxTilt>
      </AnimatedSection>

      {/* Quests & Features Grid */}
      <div className="mt-14">
        <AnimatedSection>
          <div className="max-w-xl">
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-forest-deep">
              <MaskedText text="Misi Penjelajahan Virtual" />
            </h2>
          </div>
        </AnimatedSection>

        <StaggerContainer className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {quests.map((q, idx) => {
            const Icon = q.icon;
            return (
              <StaggerItem key={idx}>
                <CardParallaxTilt maxTilt={8}>
                  <div className="card-clouds h-full flex flex-col justify-between rounded-3xl border border-sand/60 bg-cream/80 p-7 backdrop-blur-md shadow-lg hover:shadow-xl transition-shadow">
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="p-3 rounded-2xl bg-rust/10 text-rust">
                          <Icon size={24} />
                        </div>
                        <span className="text-xs font-bold text-forest bg-sage/25 px-2.5 py-1 rounded-full">
                          {q.xp}
                        </span>
                      </div>
                      <h3 className="mt-5 font-display text-xl font-bold text-forest-deep">
                        {q.title}
                      </h3>
                      <p className="mt-2 text-sm sm:text-base text-forest/80 leading-relaxed">
                        {q.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-sand/40 flex items-center gap-1.5 text-xs font-bold text-rust">
                      <ShieldCheck size={16} />
                      <span>Verifikasi Otomatis Akun</span>
                    </div>
                  </div>
                </CardParallaxTilt>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </div>
  );
}
