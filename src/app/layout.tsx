import type { Metadata, Viewport } from 'next';
import { Spicy_Rice, Noto_Serif } from 'next/font/google';
import './globals.css';
import { Providers } from '@/providers';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { SplashScreen } from '@/components/ui/splash-screen';
import { DevServiceWorkerCleaner } from '@/components/ui/dev-sw-cleaner';
import { ScrollProgressBar } from '@/components/ui/scroll-progress';
import { PageTransition } from '@/components/ui/page-transition';
import { SmoothScrollProvider } from '@/components/ui/smooth-scroll-provider';
import { JungleCornersBottom } from '@/components/ui/jungle-decor';

// Spicy Rice hanya punya satu weight (400) — font dekoratif untuk headline.
const display = Spicy_Rice({ subsets: ['latin'], variable: '--font-display', weight: ['400'] });
// Noto Serif untuk body text (mendukung banyak weight).
const body = Noto_Serif({ subsets: ['latin'], variable: '--font-body', weight: ['400', '500', '600', '700'] });

export const metadata: Metadata = {
  title: { default: 'BHUMARA — PKKMB Telkom University Purwokerto 2026', template: '%s — BHUMARA' },
  description: 'Growing Today, Thriving Tomorrow. Pusat informasi & media interaktif PKKMB Telkom University Purwokerto 2026.',
  manifest: '/manifest.webmanifest',
  // Logo PKKMB sebagai favicon tab browser + apple-touch icon
  icons: {
    icon: [
      { url: '/logo-pkkmb.png', type: 'image/png' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/icons/icon-192.png',
  },
  // Logo sebagai preview saat link dibagikan (WA/IG/Twitter/dsb)
  openGraph: {
    title: 'BHUMARA',
    description: 'Growing Today, Thriving Tomorrow',
    type: 'website',
    images: [{ url: '/logo-pkkmb.png', width: 512, height: 512, alt: 'Logo BHUMARA PKKMB' }],
  },
  twitter: {
    card: 'summary',
    title: 'BHUMARA',
    description: 'Growing Today, Thriving Tomorrow',
    images: ['/logo-pkkmb.png'],
  },
};

export const viewport: Viewport = { themeColor: '#65704A' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${display.variable} ${body.variable}`}>
      <body>
        <Providers>
          <SmoothScrollProvider>
            <ScrollProgressBar />
            <DevServiceWorkerCleaner />
            <SplashScreen />
            <Navbar />
            <main>
              <PageTransition>{children}</PageTransition>
            </main>
            {/* Dedaunan sudut duduk tepat di ATAS footer */}
            <div className="relative h-0">
              <JungleCornersBottom />
            </div>
            <Footer />
          </SmoothScrollProvider>
        </Providers>
      </body>
    </html>
  );
}
