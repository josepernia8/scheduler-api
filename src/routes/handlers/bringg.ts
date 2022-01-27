import { CustomRequest, HttpStatusCodes } from '../../types'
import { collection, getDocs, query, where } from 'firebase/firestore'

import { ResponseToolkit } from '@hapi/hapi'
import cron from 'node-cron'
import db from '../../firebase'
import strings from '../../constants'

export const pushOrders = async (request: CustomRequest, h: ResponseToolkit) => {
  // Check or Create queue
  const amqp = request.server.amqp
  await amqp.assertQueue('push_orders')

  // Get orders from DB
  const querySnapshot = await getDocs(query(collection(db, 'orders'), where('status', '!=', 'fulfilled')))
  const ordersQty: number = querySnapshot.size

  // Push orders to bring every day at 8am
  querySnapshot.forEach((doc) => {
    cron.schedule('0 8 * * */1', () => {
      console.log('running daily at 8am...') // testing purposes
      amqp.sendMessage('push_orders', strings.pushedOrder(doc.id))
    })
  })

  return h
    .response({
      statusCode: HttpStatusCodes.OK,
      message: strings.messageSent(ordersQty)
    })
    .code(HttpStatusCodes.OK)
}

export const getPushedOrders = async (request: CustomRequest, h: ResponseToolkit) => {
  const amqp = request.server.amqp
  const msgCount = (await amqp.assertQueue('push_orders')) as number

  await amqp.getMessage('push_orders')

  return h
    .response({
      statusCode: HttpStatusCodes.OK,
      message: strings.messageRetrieved(msgCount)
    })
    .code(HttpStatusCodes.OK)
}
