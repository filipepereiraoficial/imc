/**
 * Design System da Ordem — tokens de marca.
 * As cores sao expostas como variaveis CSS (ver src/index.css) para permitir
 * tema claro/escuro sem duplicar utilitarios.
 */
const token = (name) => `rgb(var(${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: token('--c-surface'),
          card: token('--c-surface-card'),
          muted: token('--c-surface-muted'),
          strong: token('--c-surface-strong'),
        },
        line: {
          DEFAULT: token('--c-border'),
          strong: token('--c-border-strong'),
        },
        ink: {
          DEFAULT: token('--c-ink'),
          soft: token('--c-ink-soft'),
          faint: token('--c-ink-faint'),
          inverse: token('--c-ink-inverse'),
        },
        ouro: {
          DEFAULT: token('--c-gold'),
          soft: token('--c-gold-soft'),
          deep: token('--c-gold-deep'),
          wash: token('--c-gold-wash'),
        },
        positivo: token('--c-positive'),
        atencao: token('--c-warning'),
        critico: token('--c-danger'),
        info: token('--c-info'),
      },
      fontFamily: {
        sans: ['"Hanken Grotesk"', 'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        // Monoespacada do sistema — usada apenas em chaves tecnicas (permissoes,
        // enderecos IP, versoes), nunca em texto institucional.
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      fontSize: {
        display: ['2.5rem', { lineHeight: '3rem', letterSpacing: '-0.02em', fontWeight: '800' }],
        titulo: ['1.75rem', { lineHeight: '2.25rem', letterSpacing: '-0.015em', fontWeight: '700' }],
        secao: ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em', fontWeight: '700' }],
        rotulo: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.08em', fontWeight: '600' }],
      },
      borderRadius: {
        card: '1.25rem',
        painel: '1.75rem',
      },
      boxShadow: {
        suave: '0 1px 2px rgb(24 20 12 / 0.04), 0 6px 20px -12px rgb(24 20 12 / 0.18)',
        elevado: '0 2px 6px rgb(24 20 12 / 0.06), 0 18px 40px -24px rgb(24 20 12 / 0.35)',
        selo: 'inset 0 1px 0 rgb(255 255 255 / 0.35), 0 10px 30px -14px rgb(140 104 0 / 0.6)',
      },
      maxWidth: {
        app: '84rem',
        leitura: '46rem',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to: { opacity: '1', transform: 'none' },
        },
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'slide-in-right': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'none' },
        },
        'slide-up': { from: { transform: 'translateY(100%)' }, to: { transform: 'none' } },
        shimmer: { '100%': { transform: 'translateX(100%)' } },
      },
      animation: {
        'fade-up': 'fade-up 0.28s cubic-bezier(0.22, 1, 0.36, 1)',
        'fade-in': 'fade-in 0.2s ease-out',
        'slide-in-right': 'slide-in-right 0.26s cubic-bezier(0.22, 1, 0.36, 1)',
        'slide-up': 'slide-up 0.26s cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
