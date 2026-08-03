import type { Metadata } from 'next';
import { FaqAccordion } from '@/components/ui/faq-accordion';
import { AnimatedSection, TextReveal } from '@/components/ui/animated-section';

export const metadata: Metadata = { title: 'FAQ' };

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-28 sm:pt-32 pb-20">
      <AnimatedSection>
        <span className="font-display text-xs font-bold uppercase tracking-widest text-rust">
          INFORMASI & BANTUAN
        </span>
        <h1 className="mt-1 font-display text-4xl font-extrabold text-forest-deep sm:text-5xl">
          <TextReveal text="Pertanyaan Umum (FAQ)" />
        </h1>
        <p className="mt-3 text-lg text-forest/80 font-medium leading-relaxed max-w-2xl">
          Temukan jawaban & penjelasan lengkap seputar rangkaian pelaksanaan PKKMB BHUMARA 2026.
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.2} className="mt-12">
        <FaqAccordion />
      </AnimatedSection>
    </div>
  );
}
