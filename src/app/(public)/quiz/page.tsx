export const metadata = { title: 'Quiz PKKMB' };
export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20">
      <h1 className="font-display text-4xl font-extrabold text-forest-deep">Quiz PKKMB</h1>
      <p className="mt-3 text-forest/70">Kuis edukatif seputar materi TODAYS.</p>
      <p className="mt-6 rounded-xl border border-sand/60 bg-sage/10 p-4 text-sm text-forest/70">
        Modul ini menyusul. Ikuti pola vertical slice Timeline/FAQ: buat modul NestJS
        (controller + service + Prisma) lalu konsumsi via <code>lib/api</code> + TanStack Query.
      </p>
    </div>
  );
}
