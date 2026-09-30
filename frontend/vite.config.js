import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: ['reliway-deploy-production.up.railway.app']
  },
  server: {
    allowedHosts: ['reliway-deploy-production.up.railway.app']
  }
})