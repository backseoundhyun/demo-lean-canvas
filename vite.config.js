import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // mode: 'production',
  server: {
    host: true, // 또는 '0.0.0.0'
    watch: {
      ignored: ['**/db.json'], // 👈 여기가 핵심
    },
  },
})
