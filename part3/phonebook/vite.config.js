import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://part3b-phonebook-backend.fly.dev',
        changeOrigin: true,
      },
    },
  },
})
