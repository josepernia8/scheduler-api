export default {
  messageRetrieved: (n: number) => `${n} Message${n > 1 ? 's' : ''} retrieved`,
  messageSent: (n: number) => `${n} Message${n > 1 ? 's' : ''} sent to the queue succesfully`,
  missingParamenter: 'The request is missing a required parameter',
  notFound: 'Order not found',
  orderCreated: 'Order created succesfully',
  orderUpdated: 'Order updated succesfully',
  pushedOrder: (orderId: string) => `${orderId} order pushed to Bringg`
}
