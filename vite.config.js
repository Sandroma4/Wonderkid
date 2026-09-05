import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Vendor: React
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }
          // Vendor: Supabase
          if (id.includes('node_modules/@supabase')) {
            return 'vendor-supabase';
          }
          // Vendor: Recharts (heavy chart lib — only used in dashboard stats)
          if (id.includes('node_modules/recharts') || id.includes('node_modules/d3') || id.includes('node_modules/victory')) {
            return 'vendor-charts';
          }
          // Vendor: other node_modules
          if (id.includes('node_modules')) {
            return 'vendor-misc';
          }
          // Game data: extraEvents (very large, ~480 KB)
          if (id.includes('extraEvents')) {
            return 'game-events';
          }
          // Game data: main data file
          if (id.includes('gameData')) {
            return 'game-data';
          }
          // Game utils
          if (id.includes('src/utils/')) {
            return 'game-utils';
          }
        }
      }
    }
  }
})
