import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import tailwindcss from '@tailwindcss/postcss'
import autoprefixer from 'autoprefixer'

// Base path: '/' for Vercel, '/tink-her-hack-temp/' for GitHub Pages
const base = process.env.GITHUB_PAGES === 'true' ? '/tink-her-hack-temp/' : '/'

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
})
