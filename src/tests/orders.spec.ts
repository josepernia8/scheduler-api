// import {
//   RulesTestEnvironment,
//   assertFails,
//   assertSucceeds,
//   initializeTestEnvironment
// } from '@firebase/rules-unit-testing'
import { afterEach, beforeEach, describe, it } from 'mocha'

import { Server } from '@hapi/hapi'
import { expect } from 'chai'
import { init } from '../server'

describe('Order CRUD', async () => {
  let server: Server

  beforeEach((done) => {
    init().then((s) => {
      server = s
      done()
    })
  })

  afterEach((done) => {
    server.stop().then(() => done())
  })

  it('Get Orders', async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/orders'
    })

    const payload = JSON.parse(res.payload).body

    // Assert success response
    expect(res.statusCode).to.equal(200)

    // Check that there is orders in the payload
    expect(payload.length).to.greaterThan(0)
  })

  it('Get Single Order', async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/orders/5VdoQkWlaKKIKvaOkzP5'
    })

    const payload = JSON.parse(res.payload).body

    // Assert success response
    expect(res.statusCode).to.equal(200)

    // Check that there is a payload (an order is returned)
    expect(payload).to.exist

    // Check with the first order that they have the correct properties
    expect(payload).to.have.property('quantity')
    expect(payload).to.have.property('status')
    expect(payload).to.have.property('total')
  })

  it('Update an Order', async () => {
    const res = await server.inject({
      method: 'PATCH',
      url: '/orders/5VdoQkWlaKKIKvaOkzP5',
      payload: { total: 335 }
    })

    // Assert success response
    expect(res.statusCode).to.equal(204)

    // Lets get the order and test that fields were updated
    const res2 = await server.inject({
      method: 'GET',
      url: '/orders/5VdoQkWlaKKIKvaOkzP5'
    })

    const payload = JSON.parse(res2.payload).body

    // Check that the orders status changed
    expect(payload.status).to.be.equal('updated')

    // Check the field we just changed with the patch request
    expect(payload.total).to.be.equal(335)
  })

  /**
   * Skipping this test because it would delete the other we are using for other test cases
   * since there was an error setting up firestore emulator
   */
  it.skip('Delete an Order', async () => {
    const res = await server.inject({
      method: 'DELETE',
      url: '/orders/5VdoQkWlaKKIKvaOkzP5',
      payload: { total: 335 }
    })

    // Assert success response
    expect(res.statusCode).to.equal(204)

    // Lets get the order and test that is no longer present
    const res2 = await server.inject({
      method: 'GET',
      url: '/orders/5VdoQkWlaKKIKvaOkzP5'
    })

    // The order cant be found becaus we deleted it
    expect(res2.statusCode).to.equal(404)
  })
})
