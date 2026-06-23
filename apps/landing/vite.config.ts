import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three')) {
            return 'three-core'
          }

          if (id.includes('node_modules/@react-three/drei')) {
            return 'three-drei'
          }

          if (id.includes('node_modules/@react-three') || id.includes('node_modules/@react-spring') || id.includes('node_modules/@use-gesture')) {
            return 'three-react'
          }

          if (id.includes('node_modules/gsap') || id.includes('node_modules/framer-motion')) {
            return 'motion'
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
