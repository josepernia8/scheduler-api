import Hapi, { Request, ServerOptions } from '@hapi/hapi'
import AmqpManager from '../services/amqp'

// Extends Hapi.Server to add AmqpManager
export class CustomServer extends Hapi.Server {
  amqp: AmqpManager

  constructor(options: ServerOptions, amqp: AmqpManager) {
    super(options)
    this.amqp = amqp
  }
}

export interface CustomRequest extends Request {
  server: CustomServer
}

export enum HttpStatusCodes {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500
}

export type queueType = 'fulfill_orders' | 'push_orders'

export interface Order {
  quantity: number
  status: 'created' | 'updated' | 'fulfilled'
  total: number
}
