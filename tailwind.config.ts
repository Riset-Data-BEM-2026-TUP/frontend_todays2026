import type { Config } from 'tailwindcss';

// Warna dirujuk via CSS variables (lihat globals.css). JANGAN hardcode hex di komponen.
const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        sage: 'rgb(var(--sage) / <alpha-value>)',
        forest: 'rgb(var(--forest) / <alpha-value>)',
        'forest-deep': 'rgb(var(--forest-deep) / <alpha-value>)',
        cream: 'rgb(var(--cream) / <alpha-value>)',
        sand: 'rgb(var(--sand) / <alpha-value>)',
        rust: 'rgb(var(--rust) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
