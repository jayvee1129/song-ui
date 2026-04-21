import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // This tells Vite: "If a request starts with /api, send it to the backend"
      '/api': {
        target: 'https://song-api-0su0.onrender.com',
        changeOrigin: true,
        // This removes the '/api' part before sending it to Render
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});