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
          // Event data: split en 4 chunks pour un meilleur cache navigateur
          // Chunk A: événements 1-3
          if (id.includes('extraEvents.') || id.includes('extraEvents2') || id.includes('extraEvents3')) {
            return 'events-a';
          }
          // Chunk B: événements 4-6
          if (id.includes('extraEvents4') || id.includes('extraEvents5') || id.includes('extraEvents6')) {
            return 'events-b';
          }
          // Chunk C: événements 7-9
          if (id.includes('extraEvents7') || id.includes('extraEvents8') || id.includes('extraEvents9')) {
            return 'events-c';
          }
          // Chunk D: événements 10-12 + coop
          if (id.includes('extraEvents10') || id.includes('extraEvents11') || id.includes('extraEvents12') || id.includes('coopEvents')) {
            return 'events-d';
          }
          // Game data: main data file (sans les extraEvents maintenant)
          if (id.includes('gameData') || id.includes('eventsLoader')) {
            return 'game-data';
          }
          // Womens Clubs Data
          if (id.includes('womensClubsData')) {
            return 'womens-data';
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
