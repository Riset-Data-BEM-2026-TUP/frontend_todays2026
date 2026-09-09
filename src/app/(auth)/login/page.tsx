import type { Metadata } from 'next';
import Image from 'next/image';
import { AnimatedSection, TextReveal, GlowCard } from '@/components/ui/animated-section';
import { PageDecor } from '@/components/ui/jungle-decor';
import { ShieldAlert } from 'lucide-react';
import { LoginForm } from './login-form';

export const metadata: Metadata = { title: 'Login Portal BHUMARA' };

export default function LoginPage() {
  return (
    <div className="relative mx-auto max-w-lg px-4 sm:px-6 pt-24 sm:pt-28 pb-20">
      <PageDecor />
      <AnimatedSection>
        <div className="text-center">
          <div className="mx-auto mb-3 flex size-16 items-center justify-center rounded-2xl border border-sand/60 bg-cream shadow-sm">
            <Image src="/logo-pkkmb.png" alt="Logo BHUMARA" width={44} height={44} className="drop-shadow-sm" />
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-forest-deep">
            <TextReveal text="Login Admin" />
          </h1>
          <p className="mt-2 text-sm text-forest/80 font-medium leading-relaxed max-w-md mx-auto">
            Halaman ini khusus untuk Admin. Masuk menggunakan email resmi dan password.
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.2} className="mt-7">
        <GlowCard className="p-6 sm:p-8">
          <LoginForm />

          <div className="mt-6 pt-4 border-t border-sand/40 flex items-center gap-2 text-xs font-medium text-forest/70">
            <ShieldAlert size={16} className="text-rust shrink-0" />
            <span>Kendala login? Hubungi panitia atau helpdesk PKKMB 2026.</span>
          </div>
        </GlowCard>
      </AnimatedSection>
    </div>
  );
}

export const dynamic = 'force-dynamic';
