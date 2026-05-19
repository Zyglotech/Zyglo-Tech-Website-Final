import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        zyglo: {
          bg: '#060B17',
          surface: '#0B1424',
          panel: '#0F1C32',
          cyan: '#06CCE8',
          blue: '#2563EB',
          text: '#F0F6FF',
          muted: '#8BA3C4',
          border: 'rgba(255,255,255,0.07)',
        },
      },
      borderColor: {
        DEFAULT: 'rgba(255,255,255,0.07)',
      },
      boxShadow: {
        glow: '0 0 60px rgba(6, 204, 232, 0.18)',
        'glow-sm': '0 0 30px rgba(6, 204, 232, 0.12)',
        panel: '0 24px 80px rgba(0, 0, 0, 0.45)',
        card: '0 4px 24px rgba(0, 0, 0, 0.30)',
      },
      backgroundImage: {
        'navy-gradient': 'linear-gradient(180deg, #060B17 0%, #070D1E 100%)',
        'cyan-glow': 'radial-gradient(circle at center, rgba(6,204,232,0.15) 0%, transparent 70%)',
        'hero-glow': 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(6,204,232,0.08) 0%, transparent 100%)',
        'surface-gradient': 'linear-gradient(135deg, rgba(15,28,50,0.9) 0%, rgba(11,20,36,0.9) 100%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
        'slide-up': 'slide-up 0.5s ease-out forwards',
        shimmer: 'shimmer 2.5s linear infinite',
        ticker: 'ticker 30s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
