import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/counton/',
  plugins: [react()],
  resolve: {
    alias: {
      '@/': `${path.resolve(process.cwd(), 'src')}/`,
    },
  },
});
