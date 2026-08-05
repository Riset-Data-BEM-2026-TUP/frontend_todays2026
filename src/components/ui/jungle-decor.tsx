'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const A = '/images/decorations';

/** Dimensi asli aset (agar next/image menjaga rasio → tanpa distorsi). */
const DIM: Record<string, [number, number]> = {
  Vector: [41, 37],
  'Vector-1': [45, 39],
  Rectangle: [492, 874],
  'Rectangle-2': [509, 508],
  'Rectangle-11': [683, 683],
  merambat: [1881, 621],
  matahari: [3028, 2285],
  rumput: [1502, 1352],
  rumput2: [1172, 1320],
  pohon: [770, 771],
  bukit: [778, 778],
  harimau: [707, 1201],
  gajah: [896, 1089],
  badak: [949, 1036],
  jerapah: [1121, 1260],
  beruang: [1084, 671],
  rusa: [813, 1223],
  oranghutan: [984, 689],
  monyet: [856, 1072],
  anakrusa: [844, 1275],
  gajah2: [1205, 906],
  harimau2: [1027, 933],
  kukang: [1257, 1478],
  macantutul: [1421, 792],
  tupas: [719, 935],
  ular: [651, 748],
  // Aset dedaunan untuk BINGKAI sudut
  'Rectangle-36': [770, 770],
  'Rectangle-38': [934, 909],
  'Rectangle-39': [1169, 866],
  'Rectangle-42': [1082, 1191],
  // Hiasan ujung pemisah
  'Rectangle-18': [1161, 388],
  // Bunga (aksen pojok kartu)
  bunga: [922, 1132],
  bunga3: [892, 1204],
  bunga4: [709, 1173],
  'Rectangle-1': [595, 595],
  'Rectangle-67': [1280, 1068],
  'Rectangle-72': [873, 1229],
  'Rectangle-25': [809, 554],
  'Rectangle-12': [675, 675],
};

/** Satu aset dekoratif. Rasio dijaga; skala diatur lewat className (mis. `h-40 w-auto`). */
export function Decor({
  name,
  className = '',
  priority = false,
}: {
  name: keyof typeof DIM | string;
  className?: string;
  priority?: boolean;
}) {
  const [w, h] = DIM[name] ?? [600, 600];
  return (
    <Image
      src={`${A}/${name}.png`}
      alt=""
      aria-hidden
      width={w}
      height={h}
      priority={priority}
      // Redam kejenuhan + sedikit sepia agar warna menyatu dgn palet earthy kita
      // (oranye→rust, hijau terang→olive/sage, kuning→gold/sand). Logo TIDAK lewat sini.
      className={`pointer-events-none select-none saturate-[.6] sepia-[.22] contrast-[.97] ${className}`}
    />
  );
}

/**
 * Lapisan dekor FULL-BLEED: menembus container ber-max-width sampai ke tepi LAYAR
 * (bukan tepi container yang di tengah), lalu meng-clip dirinya sendiri sehingga
 * bagian aset yang "keluar" terpotong DI LUAR layar (tak terlihat). Wajib dipakai
 * untuk semua elemen yang sengaja dibleed di pinggir.
 */
export function EdgeDecor({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute left-1/2 w-screen -translate-x-1/2 overflow-hidden ${className}`}
      aria-hidden
    >
      {children}
    </div>
  );
}

type LeafDef = { name: 'Vector' | 'Vector-1'; style: React.CSSProperties; size: string; dur: number; delay: number };

function Leaf({ name, style, size, dur, delay }: LeafDef) {
  return (
    <motion.div
      className="absolute"
      style={style}
      animate={{ y: [0, -14, 0], rotate: [0, 10, -6, 0] }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      <Decor name={name} className={size} />
    </motion.div>
  );
}

/** Daun melayang HANYA di tepi (tidak pernah di tengah). Full-bleed. */
export function FloatingLeaves() {
  const leaves: LeafDef[] = [
    { name: 'Vector', style: { top: '7%', left: '1.5%' }, size: 'w-9', dur: 7, delay: 0 },
    { name: 'Vector', style: { top: '13%', right: '2%' }, size: 'w-12', dur: 9, delay: 1 },
    { name: 'Vector', style: { bottom: '12%', left: '3%' }, size: 'w-7', dur: 8, delay: 0.6 },
    { name: 'Vector', style: { bottom: '9%', right: '3.5%' }, size: 'w-10', dur: 10, delay: 1.6 },
  ];
  return (
    <EdgeDecor className="inset-y-0">
      {leaves.map((l, i) => (
        <Leaf key={i} {...l} />
      ))}
    </EdgeDecor>
  );
}

/**
 * Pemisah SATU BARIS: sulur `Rectangle-17` di-repeat-x (pakai tile normal + salinan
 * flip-horizontal → menyambung kiri↔kanan), dengan hiasan `Rectangle-18` di ujung
 * kiri & kanan (yang kanan di-mirror).
 */
export function VineDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none relative w-full ${className}`} aria-hidden>
      {/* Sulur berulang (Rectangle-17) */}
      <div
        className="h-12 w-full saturate-[.6] sepia-[.22] sm:h-16"
        style={{
          backgroundImage: 'url(/images/decorations/rect17-htile.png)',
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'center',
          backgroundSize: 'auto 100%',
        }}
      />
      {/* Hiasan ujung kiri & kanan (Rectangle-18) */}
      <Decor name="Rectangle-18" className="absolute left-0 top-1/2 w-40 -translate-y-1/2 sm:w-56" />
      <Decor name="Rectangle-18" className="absolute right-0 top-1/2 w-40 -translate-y-1/2 -scale-x-100 sm:w-56" />
    </div>
  );
}

/** Satwa fokus berdiri di tepi LAYAR (utuh, tak terpotong) — hanya tampil di layar lebar. */
export function EdgeCritter({ name, side = 'right' }: { name: keyof typeof DIM; side?: 'left' | 'right' }) {
  return (
    <EdgeDecor className="inset-y-0">
      <Decor
        name={name}
        className={`absolute bottom-0 hidden h-56 w-auto opacity-100 drop-shadow-xl lg:block ${
          side === 'right' ? 'right-0 xl:right-6' : 'left-0 xl:left-6'
        }`}
      />
    </EdgeDecor>
  );
}

/**
 * Dekorasi header halaman: dedaunan latar samar + rumput + daun melayang, semuanya
 * dibleed ke tepi LAYAR. Satwa opsional berdiri utuh di tepi kanan (layar lebar saja).
 * Diletakkan sebagai anak pertama dari root halaman ber-`relative`.
 */
export function PageDecor({
  critter,
  critterClassName,
}: {
  critter?: keyof typeof DIM;
  /** Override posisi/kelas satwa (default: pojok kanan bawah). */
  critterClassName?: string;
}) {
  return (
    <EdgeDecor className="top-0 h-[560px]">
      {/* Bingkai dedaunan sudut ATAS halaman (kiri & kanan) */}
      <JungleCornersTop />
      {critter && (
        <Decor
          name={critter}
          className={
            critterClassName ??
            'absolute bottom-0 right-0 hidden h-52 w-auto opacity-100 drop-shadow-xl lg:block xl:right-4'
          }
        />
      )}
    </EdgeDecor>
  );
}

/** Satu potongan dedaunan sudut yang bergoyang lembut (dipakai JungleCorners*). */
function CornerPiece({
  name,
  pos,
  flip,
  origin,
  size,
  delay,
}: {
  name: string;
  pos: string;
  flip: string;
  origin: string;
  size: string;
  delay: number;
}) {
  return (
    <motion.div
      className={`pointer-events-none absolute hidden lg:block ${pos} ${origin}`}
      animate={{ rotate: [0, 1.6, -1, 0] }}
      transition={{ duration: 9, delay, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden
    >
      <Decor name={name} className={`${size} ${flip}`} />
    </motion.div>
  );
}

/**
 * Dua sudut ATAS (kiri & kanan). Taruh sebagai anak dari parent `relative`
 * (mis. <section id="features-section">) → menempel di pojok atas parent.
 */
export function JungleCornersTop() {
  return (
    <>
      <CornerPiece name="Rectangle-42" pos="left-0 top-0" flip="-scale-x-100 -scale-y-100" origin="origin-top-left" size="w-36 xl:w-48 2xl:w-56" delay={0} />
      <CornerPiece name="Rectangle-42" pos="right-0 top-0" flip="-scale-y-100" origin="origin-top-right" size="w-36 xl:w-48 2xl:w-56" delay={0.7} />
      <CornerPiece name="Rectangle-38" pos="left-0 top-0" flip="-scale-y-100" origin="origin-top-left" size="w-28 xl:w-36" delay={1.1} />
      <CornerPiece name="Rectangle-38" pos="right-0 top-0" flip="-scale-x-100 -scale-y-100" origin="origin-top-right" size="w-28 xl:w-36" delay={0.3} />
    </>
  );
}

/**
 * Dua sudut BAWAH (kiri & kanan). Taruh dalam marker `relative` tepat di ATAS footer
 * → dedaunan duduk di atas footer.
 */
export function JungleCornersBottom() {
  return (
    <>
      <CornerPiece name="Rectangle-42" pos="left-0 bottom-0" flip="-scale-x-100" origin="origin-bottom-left" size="w-36 xl:w-48 2xl:w-56" delay={1.3} />
      <CornerPiece name="Rectangle-42" pos="right-0 bottom-0" flip="" origin="origin-bottom-right" size="w-36 xl:w-48 2xl:w-56" delay={0.5} />
      <CornerPiece name="Rectangle-39" pos="left-0 bottom-0" flip="" origin="origin-bottom-left" size="w-36 xl:w-44" delay={0.9} />
      <CornerPiece name="Rectangle-39" pos="right-0 bottom-0" flip="-scale-x-100" origin="origin-bottom-right" size="w-36 xl:w-44" delay={1.6} />
    </>
  );
}

/** Parade satwa bergerak (marquee tak berujung) — bagian paling "meriah". */
export function FaunaBand() {
  // Semua satwa yang ada di folder public/images/decorations.
  const animals = [
    'harimau', 'gajah', 'badak', 'jerapah', 'beruang', 'rusa', 'oranghutan',
    'monyet', 'macantutul', 'kukang', 'anakrusa', 'tupas', 'ular', 'gajah2', 'harimau2',
  ];
  const row = [...animals, ...animals];
  return (
    // Background OPAQUE (bg-cream) supaya pola background base tidak tembus di section ini.
    <section className="relative overflow-hidden bg-cream bg-gradient-to-b from-cream to-sage/25 pt-16 pb-28">
      {/* Bingkai ATAS: deret coretan daun (Vector-1) di-repeat sepanjang tepi atas */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-9 saturate-[.6] sepia-[.22]"
        style={{
          backgroundImage: 'url(/images/decorations/Vector-1.png)',
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'center top',
          backgroundSize: 'auto 22px',
        }}
        aria-hidden
      />
      {/* Bingkai BAWAH: strip tanah (Rectangle-20) sepanjang tepi bawah */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 saturate-[.6] sepia-[.22]"
        style={{
          backgroundImage: 'url(/images/decorations/Rectangle-20.png)',
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'center bottom',
          backgroundSize: '480px auto',
        }}
        aria-hidden
      />

      {/* Judul — berjarak dari bingkai atas */}
      <div className="relative mx-auto mb-8 max-w-6xl px-4 text-center">
        <span className="font-display text-xs font-bold uppercase tracking-widest text-rust">
          EKOSISTEM BHUMARA
        </span>
        <h2 className="mt-1 font-display text-3xl text-forest-deep sm:text-4xl">Satwa Nusantara</h2>
        <p className="mx-auto mt-2 max-w-lg text-sm font-medium text-forest/70">
          Terinspirasi kekayaan hayati Indonesia — semangat tumbuh &amp; lestari BHUMARA.
        </p>
      </div>

      {/* Parade satwa — berjarak dari bingkai bawah */}
      <div className="relative overflow-hidden">
        <motion.div
          className="flex w-max items-end gap-10 px-6 sm:gap-16"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        >
          {row.map((n, i) => (
            <Decor key={i} name={n} className="h-24 w-auto drop-shadow-md sm:h-32" />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
