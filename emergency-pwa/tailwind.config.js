/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#1D2B45', light: '#2A3F63', dark: '#141E30' },
        danger: { DEFAULT: '#C0392B', light: '#E74C3C', bg: '#FDEDEC' },
        warn: { DEFAULT: '#D68910', light: '#F39C12', bg: '#FEF9E7' },
        safe: { DEFAULT: '#1E8449', light: '#27AE60', bg: '#EAFAF1' },
        info: { DEFAULT: '#1A5276', light: '#2E86C1', bg: '#EBF5FB' },
      },
      fontFamily: { sans: ['"Noto Sans Thai"', 'system-ui', 'sans-serif'] }
    }
  },
  plugins: []
}
