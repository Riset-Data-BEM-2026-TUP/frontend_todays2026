import Image from 'next/image';
import { PageDecor } from '@/components/ui/jungle-decor';

export const metadata = { title: 'Roblox Campus Tour' };
export default function Page() {
  return (
    <div className="relative mx-auto max-w-3xl px-4 pt-28 pb-20">
      <PageDecor critter="badak" />
      <div className="mb-5 flex size-16 items-center justify-center rounded-2xl border border-sand/60 bg-cream shadow-sm">
        <Image src="/logo-pkkmb.png" alt="Logo BHUMARA" width={44} height={44} className="drop-shadow-sm" />
      </div>
      <h1 className="font-display text-4xl font-extrabold text-forest-deep">Roblox Campus Tour</h1>
      <p className="mt-3 text-forest/70">Jelajahi kampus secara virtual, dapatkan badge Campus Explorer.</p>
      <p className="mt-6 rounded-xl border border-sand/60 bg-sage/10 p-4 text-sm text-forest/70">
        Modul ini menyusul. Ikuti pola vertical slice Timeline/FAQ: buat modul NestJS
        (controller + service + Prisma) lalu konsumsi via <code>lib/api</code> + TanStack Query.
      </p>
    </div>
  );
}
