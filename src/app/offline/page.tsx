import Image from 'next/image';

export default function Offline() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <Image
        src="/logo-pkkmb.png"
        alt="Logo BHUMARA"
        width={80}
        height={80}
        className="mb-6 opacity-90 drop-shadow-md"
      />
      <h1 className="font-display text-3xl font-bold text-forest-deep">Kamu sedang offline</h1>
      <p className="mt-2 text-forest/70">Sambungkan kembali ke internet untuk memuat konten terbaru BHUMARA.</p>
    </div>
  );
}
