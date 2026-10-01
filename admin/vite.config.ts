import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// Port 3001 = Admin Portal  |  Port 3000 = Main Job Portal (see root vite.config.ts)
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    strictPort: true, // fail loudly if port is taken instead of silently picking a new one
  },
})
