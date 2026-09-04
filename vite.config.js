import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Trash2Crash/',
  plugins: [react()],
  server: {
    port: 5173,
    open: false
  }
})
