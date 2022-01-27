import { afterEach, beforeEach, describe, it } from 'mocha'

import { Server } from '@hapi/hapi'
import { expect } from 'chai'
import { init } from '../../server'

describe('smoke test', async () => {
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

  it('public endpoint responds', async () => {
    const res = await server.inject({
      method: 'get',
      url: '/public'
    })
    expect(res.statusCode).to.equal(200)
    expect(res.result).to.equal('This endpoint is public (no credentials needed)')
  })
})
