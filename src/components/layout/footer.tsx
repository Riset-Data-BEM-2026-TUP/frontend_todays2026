import Link from 'next/link';
import Image from 'next/image';
import { getSettings } from '@/lib/api/queries';
import { Globe, Instagram, Youtube, MapPin, Mail, Phone } from 'lucide-react';

export async function Footer() {
  let s: Record<string, string> = {};
  try {
    s = await getSettings();
  } catch {
    /* fallback diam saat API down */
  }

  const navLinks = [
    { href: '/', label: 'Hub' },
    { href: '/guidebook', label: 'Guidebook' },
    { href: '/academic', label: 'Platform Akademik' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/explore-ormawa', label: 'Galeri' },
    { href: '/timeline', label: 'Jadwal' },
    { href: '/faq', label: 'FAQ' },
    { href: '/cari-kelompok', label: 'Kelompok' },
  ];

  return (
    <footer className="relative overflow-visible border-t border-sand/40 bg-forest-deep text-cream/90 transform-gpu">
      {/* Watermark logo besar samar sebagai dekorasi brand */}
      <Image
        src="/logo-pkkmb.png"
        alt=""
        aria-hidden
        width={300}
        height={300}
        className="pointer-events-none absolute bottom-0 -right-10 select-none opacity-[0.06]"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-16 pb-12">
        <div className="grid gap-10 border-b border-cream/10 pb-12 md:grid-cols-12 md:gap-8">
          {/* Column 1: Brand & Bio */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <Image
                src="/logo-pkkmb.png"
                alt="Logo PKKMB 2026"
                width={40}
                height={40}
                className="drop-shadow-md transition-transform group-hover:scale-105"
              />
              <span className="font-display text-2xl font-extrabold text-cream tracking-wide">
                PKKMB 2026
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm sm:text-base leading-relaxed text-cream/80 font-medium">
              Panduan interaktif PKKMB Telkom University Purwokerto untuk memulai perjalanan kampusmu.
            </p>

            {/* Social & External Icon Buttons */}
            <div className="mt-6 flex items-center gap-2.5">
              <a
                href={s['contact.website'] ?? 'https://purwokerto.telkomuniversity.ac.id/'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Website Telkom University Purwokerto"
                className="flex size-11 items-center justify-center rounded-xl border border-cream/15 bg-cream/5 text-cream/70 transition-all duration-300 hover:border-rust hover:bg-rust hover:text-cream hover:scale-105"
              >
                <Globe size={18} />
              </a>
              <a
                href={s['contact.instagram'] ?? 'https://www.instagram.com/todays.telupurwokerto/'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram PKKMB"
                className="flex size-11 items-center justify-center rounded-xl border border-cream/15 bg-cream/5 text-cream/70 transition-all duration-300 hover:border-rust hover:bg-rust hover:text-cream hover:scale-105"
              >
                <Instagram size={18} />
              </a>
              <a
                href={s['contact.youtube'] ?? 'https://www.youtube.com/@TelkomUniversityPurwokerto'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube Telkom University Purwokerto"
                className="flex size-11 items-center justify-center rounded-xl border border-cream/15 bg-cream/5 text-cream/70 transition-all duration-300 hover:border-rust hover:bg-rust hover:text-cream hover:scale-105"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Sitemap Navigation (Jelajahi) */}
          <nav className="md:col-span-4" aria-label="Sitemap footer">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-sand">
              Jelajahi
            </h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="inline-flex min-h-[38px] items-center text-sm text-cream/75 transition-colors hover:text-cream hover:underline font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Column 3: Contact Panitia (No box, aligned with Jelajahi column) */}
          <div className="md:col-span-3">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-sand">
              Kontak panitia
            </h2>
            <div className="flex flex-col gap-y-1.5 text-sm text-cream/80 font-medium">
              <a
                href={s['contact.maps'] ?? 'https://maps.app.goo.gl/8NskKq6Xjpg4Pf6s8'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[38px] items-center gap-2.5 leading-normal transition-colors hover:text-cream group"
              >
                <MapPin size={16} className="shrink-0 text-sand group-hover:text-rust transition-colors" />
                <span>{s['contact.nama_kampus'] ?? 'Telkom University Purwokerto'}</span>
              </a>

              <a
                href={`mailto:${s['contact.email'] ?? 'pkkmb@telkomuniversity.ac.id'}`}
                className="inline-flex min-h-[38px] items-center gap-2.5 break-all leading-normal transition-colors hover:text-cream group"
              >
                <Mail size={16} className="shrink-0 text-sand group-hover:text-rust transition-colors" />
                <span>{s['contact.email'] ?? 'pkkmb@telkomuniversity.ac.id'}</span>
              </a>

              <a
                href={`tel:${s['contact.telepon'] ?? '(0281) 641 629'}`}
                className="inline-flex min-h-[38px] items-center gap-2.5 break-all leading-normal transition-colors hover:text-cream group"
              >
                <Phone size={16} className="shrink-0 text-sand group-hover:text-rust transition-colors" />
                <span>{s['contact.telepon'] ?? '(0281) 641 629'}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between text-xs text-cream/60 font-medium">
          <p>
            {s['footer.copyright'] ?? '© 2026 PKKMB Telkom University Purwokerto.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
