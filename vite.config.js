
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true   // 👈 VERY IMPORTANT (for local testing)
      },
      workbox: {
  runtimeCaching: [
    {
      urlPattern: ({ request }) => request.destination === 'document',
      handler: 'NetworkFirst',
      options: {
        cacheName: 'pages-cache'
      }
    },
    {
      urlPattern: ({ request }) => request.destination === 'image',
      handler: 'CacheFirst',
      options: {
        cacheName: 'images-cache'
      }
    }
  ]
},
      manifest: {
  name: 'DecentralID',
  short_name: 'DecentralID',
  start_url: '/',
  display: 'standalone',
  background_color: '#0f172a',
  theme_color: '#0f172a',

  icons: [
    {
      src: '/pwa-192.png',
      sizes: '1280x720',
      type: 'image/png'
    },
    {
      src: '/pwa-512.png',
      sizes: '512x512',
      type: 'image/png'
    }
  ],

  screenshots: [
    {
      src: '/pwa-192.png',
      sizes: '1280x720',
      type: 'image/png',
      form_factor: 'wide'
    },
    {
      src: '/pwa-512.png',
      sizes: '512x512',
      type: 'image/png'
    }
  ]
}
    })
  ]
})
