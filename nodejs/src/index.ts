import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'

const app = new Hono()
app.get('/', (c) => c.text('Hello Node.js!'))

// Serve static files
app.use('/static/*', serveStatic({ root: './' }))

serve(app)

const server = serve({
  fetch: app.fetch,
  port: 8787,
})

// graceful shutdown
process.on('SIGINT', () => {
  server.close()
  process.exit(0)
})
process.on('SIGTERM', () => {
  server.close((err) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    process.exit(0)
  })
})
