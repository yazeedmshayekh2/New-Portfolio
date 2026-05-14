import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
// Default base is "/" so Vercel/Netlify/root hosts load JS/CSS correctly.
// GitHub Project Pages: use `npm run build:gh-pages` (see package.json "homepage").
// Override: VITE_BASE=/custom/ npm run build
export default defineConfig(() => ({
  plugins: [react()],
  base: process.env.VITE_BASE ?? '/',
  build: {
    // Safely accommodate rich interactive libraries (Three.js, Framer Motion) without splitting React Three Fiber context
    chunkSizeWarningLimit: 2000,
  },
}));
