import handlers from './handlers'

const routes = [
  {
    method: 'GET',
    path: '/test',
    handler: handlers.test
  }
]

export default routes
