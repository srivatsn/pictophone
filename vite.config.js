import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // Automatically updates the service worker
      manifest: {
        name: 'Pictophone',
        short_name: 'Pictophone',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'Pictophone_192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'Pictophone_512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /.*\.js$/, // Cache all JS files
            handler: 'CacheFirst',
            options: {
              cacheName: 'js-cache',
              expiration: {
                maxEntries: 30, // Maximum number of entries
                maxAgeSeconds: 30 * 24 * 60 * 60 // Cache for 30 days
              }
            }
          },
          {
            urlPattern: /.*\.css$/, // Cache all CSS files
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'css-cache',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 30 * 24 * 60 * 60 // Cache for 30 days
              }
            }
          },
          {
            urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif)$/, // Cache all image files
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 24 * 60 * 60 // Cache for 60 days
              }
            }
          }
        ]
      }
    })
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
