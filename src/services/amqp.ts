import amqp, { Channel, Connection, ConsumeMessage } from 'amqplib'
import { doc, updateDoc } from 'firebase/firestore'

import Boom from '@hapi/boom'
import db from '../firebase'
import { queueType } from '../types'

export default class AmqpManager {
  private _conn: Connection
  private _channel: Channel
  private _url: string

  constructor(url: string) {
    this._url = url
  }

  /**
   * Create connection and channel
   * @returns {Promise<void>}
   */
  init = async (): Promise<void> => {
    this._conn = await amqp.connect(this._url)
    this._channel = await this._conn.createChannel()
  }

  /**
   * Assert to specific queue
   * @param {queueType} queue to assert to
   * @returns {Promise<number | undefined>}
   */
  assertQueue = async (queue: queueType): Promise<number | undefined> => {
    try {
      return await (
        await this._channel.assertQueue(queue, { durable: true })
      ).messageCount
    } catch (err) {
      if (err instanceof Error) {
        throw Boom.internal(err.message)
      }
    }
  }

  /**
   * Send a message to specific queue
   * @param {queueType} queue to send the message to
   * @param {string} message to send
   * @returns {void}
   */
  sendMessage = (queue: queueType, message: string): void => {
    try {
      this._channel.sendToQueue(queue, Buffer.from(message), { persistent: true })
    } catch (err) {
      if (err instanceof Error) {
        throw Boom.internal(err.message)
      }
    }
  }

  /**
   * Send a message to specific queue
   * @param {queueType} queue to send the message to
   * @param {string} message to send
   * @returns {Promise<void>}
   */
  getMessage = async (queue: queueType): Promise<void> => {
    try {
      await this._channel.consume(
        queue,
        async (message: ConsumeMessage | null) => {
          const msg = message as ConsumeMessage
          const msgText = msg.content.toString()
          const docRef = doc(db, 'orders', msgText.substring(0, msgText.indexOf(' ')))

          try {
            // Update the orders in the DB when orders got already pushed to bringg
            await updateDoc(docRef, { status: 'fulfilled' })

            console.log('[✔] %s', msgText)
          } catch (err) {
            if (err instanceof Error) {
              throw Boom.internal(err.message)
            }
          }
        },
        { noAck: true }
      )
    } catch (err) {
      if (err instanceof Error) {
        throw Boom.internal(err.message)
      }
    }
  }
}
