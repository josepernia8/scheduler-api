'use strict'

import Hapi, { Server } from '@hapi/hapi'
import routes from '../routes'

export let server: Server

export const init = async function (): Promise<Server> {
  server = Hapi.server({
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 4004,
    routes: {
      cors: {
        origin: process.env.CORS_ORIGIN?.split(','),
        credentials: true,
        headers: ['Accept', 'Content-Type'],
        exposedHeaders: ['content-type', 'content-length']
      }
    }
  })

  // Add routes
  server.route(routes)

  // Set cookie for saving user token
  server.state('token', {
    clearInvalid: false,
    encoding: 'base64json',
    isSameSite: process.env.NODE_ENV !== 'dev' ? 'Strict' : 'None',
    strictHeader: true,
    ttl: 24 * 60 * 60 * 1000
  })

  return server
}

export const start = async function (): Promise<void> {
  console.log(`Listening on ${server.settings.host}:${server.settings.port}`)
  return server.start()
}

process.on('unhandledRejection', (err) => {
  console.error('unhandledRejection')
  console.error(err)
  process.exit(1)
})
