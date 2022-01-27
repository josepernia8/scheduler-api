import handlers from './handlers'

const routes = [
  {
    method: 'GET',
    path: '/orders-pushed',
    handler: handlers.getPushedOrders
  },
  {
    method: 'GET',
    path: '/push-orders',
    handler: handlers.pushOrders
  },
  {
    method: 'GET',
    path: '/orders/{orderId?}',
    handler: handlers.getOrders
  },
  {
    method: 'POST',
    path: '/orders',
    handler: handlers.createOrders
  },
  {
    method: 'PATCH',
    path: '/orders/{orderId}',
    handler: handlers.updateOrders
  },
  {
    method: 'DELETE',
    path: '/orders/{orderId}',
    handler: handlers.deleteOrders
  }
]

export default routes
