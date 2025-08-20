// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // ✅ latest v4.1.x plugin

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // include Tailwind's Vite plugin here
  ],
})