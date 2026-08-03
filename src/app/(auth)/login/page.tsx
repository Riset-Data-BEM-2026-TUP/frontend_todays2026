import type { Metadata } from 'next';
import { AnimatedSection, TextReveal, GlowCard } from '@/components/ui/animated-section';
import { UserCheck, ShieldAlert } from 'lucide-react';
import { LoginForm } from './login-form';

export const metadata: Metadata = { title: 'Login Mahasiswa' };

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md px-4 sm:px-6 pt-28 sm:pt-32 pb-24">
      <AnimatedSection>
        <div className="text-center">
          <div className="mx-auto size-12 rounded-2xl bg-rust/15 border border-rust/30 flex items-center justify-center mb-3">
            <UserCheck size={24} className="text-rust" />
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
