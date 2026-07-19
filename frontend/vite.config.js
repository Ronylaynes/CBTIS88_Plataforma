// frontend/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@':           path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages':      path.resolve(__dirname, './src/pages'),
      '@utils':      path.resolve(__dirname, './src/utils'),
      '@services':   path.resolve(__dirname, './src/services'),
      '@hooks':      path.resolve(__dirname, './src/hooks'),
      '@context':    path.resolve(__dirname, './src/context'),
      '@styles':     path.resolve(__dirname, './src/styles'),
    }
  },

  server: {
    port: 5173,   // frontend corre en 5173
    proxy: {
      // Todas las llamadas a /api se redirigen al backend Flask
      '/api': {
        target:       'http://localhost:5000',  // ← puerto de Flask
        changeOrigin: true,
        secure:       false,
      },
      // Las imágenes subidas también se sirven desde Flask
      '/uploads': {
        target:       'http://localhost:5000',
        changeOrigin: true,
        secure:       false,
      }
    }
  }
})