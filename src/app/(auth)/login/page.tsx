import type { Metadata } from 'next';
import Image from 'next/image';
import { AnimatedSection, TextReveal, GlowCard } from '@/components/ui/animated-section';
import { PageDecor } from '@/components/ui/jungle-decor';
import { ShieldAlert } from 'lucide-react';
import { LoginForm } from './login-form';

export const metadata: Metadata = { title: 'Login Mahasiswa' };

export default function LoginPage() {
  return (
    <div className="relative mx-auto max-w-md px-4 sm:px-6 pt-28 sm:pt-32 pb-24">
      <PageDecor />
      <AnimatedSection>
        <div className="text-center">
          <div className="mx-auto mb-3 flex size-16 items-center justify-center rounded-2xl border border-sand/60 bg-cream shadow-sm">
            <Image src="/logo-pkkmb.png" alt="Logo BHUMARA" width={44} height={44} className="drop-shadow-sm" />
          </div>
          <span className="font-display text-xs font-bold uppercase tracking-widest text-rust">
            PORTAL MAHASISWA BARU
          </span>
          <h1 className="mt-1 font-display text-3xl sm:text-4xl font-extrabold text-forest-deep">
            <TextReveal text="Login Mahasiswa" />
          </h1>
          <p className="mt-2 text-sm text-forest/80 font-medium leading-relaxed">
            Masuk menggunakan data yang telah terdaftar di sistem Penerimaan Mahasiswa Baru (PMB).
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.2} className="mt-8">
        <GlowCard className="p-6 sm:p-8">
          <LoginForm />

          <div className="mt-6 pt-4 border-t border-sand/40 flex items-center gap-2 text-xs font-medium text-forest/70">
            <ShieldAlert size={16} className="text-rust shrink-0" />
            <span>Belum memiliki akun? Hubungi panitia via helpdesk jika ada kendala data.</span>
          </div>
        </GlowCard>
      </AnimatedSection>
    </div>
  );
}
