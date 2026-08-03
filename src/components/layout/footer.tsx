import { getSettings } from '@/lib/api/queries';

export async function Footer() {
  let s: Record<string, string> = {};
  try {
    s = await getSettings();
  } catch {
    /* fallback diam saat API down */
  }

  return (
    <footer className="mt-28 border-t border-sand/40 bg-forest-deep text-cream/90">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 py-16 sm:grid-cols-3">
        <div>
          <p className="font-display text-xl font-extrabold text-cream">BHUMARA</p>
          <p className="mt-2 text-base text-cream/80 font-medium">PKKMB Telkom University Purwokerto 2026</p>
          <p className="mt-1 text-sm text-cream/60">Growing Today, Thriving Tomorrow</p>
        </div>

        <div className="text-base">
          <p className="font-bold text-cream">Kontak Resmi</p>
          {s['contact.email'] && <p className="mt-2.5 text-cream/85">{s['contact.email']}</p>}
          {s['contact.alamat'] && <p className="mt-1 text-cream/85 leading-relaxed">{s['contact.alamat']}</p>}
        </div>

        <div className="text-base">
          <p className="font-bold text-cream">Media Sosial</p>
          {s['contact.instagram'] && (
            <a
              href={s['contact.instagram']}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2.5 inline-block text-cream/85 hover:text-rust font-medium transition-colors hover:underline"
            >
              Instagram @bhumara2026
            </a>
          )}
        </div>
      </div>

      <div className="border-t border-cream/10 px-4 py-6 text-center text-sm font-medium text-cream/70">
        {s['footer.copyright'] ?? '© 2026 BHUMARA — Telkom University Purwokerto'}
      </div>
    </footer>
  );
}
