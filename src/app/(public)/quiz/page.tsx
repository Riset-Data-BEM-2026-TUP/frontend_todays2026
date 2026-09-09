import Image from 'next/image';
import { PageDecor } from '@/components/ui/jungle-decor';

export const metadata = { title: 'Quiz PKKMB' };
export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <div className="relative mx-auto max-w-3xl px-4 pt-28 pb-20">
      <PageDecor critter="beruang" />
      <div className="mb-5 flex size-16 items-center justify-center rounded-2xl border border-sand/60 bg-cream shadow-sm">
        <Image src="/logo-pkkmb.png" alt="Logo BHUMARA" width={44} height={44} className="drop-shadow-sm" />
      </div>
      <h1 className="font-display text-4xl font-extrabold text-forest-deep">Quiz PKKMB</h1>
      <p className="mt-3 text-forest/70">Kuis edukatif seputar materi PKKMB.</p>
      <p className="mt-6 rounded-xl border border-sand/60 bg-sage/10 p-4 text-sm text-forest/70">
        Modul ini menyusul. Ikuti pola vertical slice Timeline/FAQ: buat modul NestJS
        (controller + service + Prisma) lalu konsumsi via <code>lib/api</code> + TanStack Query.
      </p>

      {/* Maskot BHUMARA (aset Figma) sebagai ilustrasi ramah — satu elemen, minimalis */}
      <div className="mt-10 flex justify-center">
        <Image
          src="/images/sky/mascot-car.png"
          alt="Maskot BHUMARA"
          width={1400}
          height={1304}
          className="h-auto w-56 sm:w-64 animate-float-y drop-shadow-[0_18px_28px_rgba(30,60,100,0.25)]"
        />
      </div>
    </div>
  );
}
