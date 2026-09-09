import type { Metadata } from 'next';
import { FaqAccordion } from '@/components/ui/faq-accordion';
import { AnimatedSection, TextReveal } from '@/components/ui/animated-section';
import { PageDecor } from '@/components/ui/jungle-decor';

export const metadata: Metadata = { title: 'FAQ' };

export default function FaqPage() {
  return (
    <div className="relative mx-auto max-w-4xl px-4 sm:px-6 pt-28 sm:pt-32 pb-32 sm:pb-40 min-h-dvh">
      <PageDecor
        critter="monyet"
        critterClassName="absolute bottom-48 left-0 hidden h-52 w-auto opacity-100 drop-shadow-xl lg:block"
      />
      <AnimatedSection>
        <h1 className="font-display text-4xl font-extrabold text-forest-deep sm:text-5xl">
          <TextReveal text="Pertanyaan Umum (FAQ)" />
        </h1>
        <p className="mt-3 text-lg text-forest/80 font-medium leading-relaxed max-w-2xl">
          Temukan jawaban & penjelasan lengkap seputar rangkaian pelaksanaan PKKMB BHUMARA 2026.
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.2} className="mt-12 min-h-[920px] pb-12">
        <FaqAccordion />
      </AnimatedSection>
    </div>
  );
}
