import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allow access from LAN or external URLs
    port: 5173,
    strictPort: true,
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      'c91b-2405-201-200a-900a-bc7b-9b7c-ec46-2c2e.ngrok-free.app', // Replace with your actual ngrok domain
    ]
  }
})
