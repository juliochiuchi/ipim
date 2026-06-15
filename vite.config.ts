import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import path from "path"

import { createOfferCheckoutSessionUrl } from './api/stripe/create-offer-checkout-session'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  Object.assign(process.env, env)

  return {
    plugins: [
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true,
        generatedRouteTree: './src/route-tree.gen.ts',
        routesDirectory: './src/pages',
        routeToken: 'layout',
      }),
      react(),
      {
        name: 'stripe-checkout-dev-route',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url !== '/api/stripe/create-checkout-session') {
              return next()
            }

            res.setHeader('Content-Type', 'application/json')

            if (req.method !== 'POST') {
              res.statusCode = 405
              res.setHeader('Allow', 'POST')
              res.end(JSON.stringify({ error: 'Method not allowed' }))
              return
            }

            try {
              const origin = req.headers.origin ?? `http://${req.headers.host ?? 'localhost:5173'}`
              const url = await createOfferCheckoutSessionUrl(origin)

              res.statusCode = 200
              res.end(JSON.stringify({ url }))
            } catch (error) {
              const message =
                error instanceof Error ? error.message : 'Failed to create checkout session'

              res.statusCode = 500
              res.end(JSON.stringify({ error: message }))
            }
          })
        },
      },
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
    preview: {
      port: 4173,
      strictPort: true,
    },
  }
})
