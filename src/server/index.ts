'use strict'

import AmqpManager from '../services/amqp'
import { CustomServer } from '../types'
import routes from '../routes'

export let server: CustomServer

export const init = async function (): Promise<CustomServer> {
  server = new CustomServer(
    {
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
    },
    new AmqpManager(process.env.CLOUDAMQP_URL as string)
  )

  // Init configuration for amqp
  server.amqp.init()

  // Add routes
  server.route(routes)

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
