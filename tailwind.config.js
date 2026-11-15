/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#06131F',
        deep: '#0A1D2C',
        navy: '#0E2437',
        mist: '#93A9B7',
        fog: '#C3D3DB',
        paper: '#F0F5F6',
        aqua: '#7BF2E2',
        'aqua-deep': '#33C5BC',
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', '"Songti SC"', 'STSong', 'Georgia', 'serif'],
        sans: ['"Noto Sans SC"', 'Inter', '"PingFang SC"', '"Microsoft YaHei"', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.32em',
      },
      maxWidth: {
        content: '1180px',
        reading: '760px',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
