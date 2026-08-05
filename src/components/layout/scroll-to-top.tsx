'use client';

import { ChevronUp } from 'lucide-react';

export function ScrollToTopButton() {
  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="inline-flex items-center gap-2 rounded-xl border border-sand/30 bg-sand/10 px-3.5 py-2 text-xs font-semibold text-cream/80 hover:bg-sand/20 hover:text-cream transition-all duration-300 backdrop-blur-sm cursor-pointer shrink-0"
    >
      <ChevronUp size={15} className="text-rust" />
      <span>Kembali ke atas</span>
    </button>
  );
}
