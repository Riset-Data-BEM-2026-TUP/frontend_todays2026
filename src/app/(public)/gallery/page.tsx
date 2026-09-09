import type { Metadata } from 'next';
import { SuasanaKampusGallery } from '@/components/landing/suasana-kampus-gallery';
import { getGalleryCampus } from '@/lib/api/queries';

export const metadata: Metadata = {
  title: 'Gallery — PKKMB BHUMARA 2026',
  description: 'Galeri suasana, fasilitas, dan lingkungan kampus Telkom University Purwokerto.',
};

export const revalidate = 300;

export default async function GalleryPage() {
  const items = await getGalleryCampus();

  return (
    <SuasanaKampusGallery
      items={items}
      preview={false}
      title="Gallery"
      subtitle="Jelajahi suasana, fasilitas, dan lingkungan kampus Telkom University Purwokerto — tempat perjalanan BHUMARA dimulai."
    />
  );
}
