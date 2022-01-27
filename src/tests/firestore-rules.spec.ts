import { assertFails, assertSucceeds, initializeTestEnvironment } from '@firebase/rules-unit-testing'
import { before, describe, it } from 'mocha'
import { collection, doc, setDoc, setLogLevel } from 'firebase/firestore'
import { readFileSync } from 'fs'

let testEnv

before(async (done) => {
  setLogLevel('error')

  testEnv = await initializeTestEnvironment({
    projectId: 'demo-project-1234',
    firestore: {
      rules: readFileSync('firestore.rules', 'utf8'),
      host: '127.0.0.1',
      port: 8080
    }
  })

  done()
})

beforeEach(async (done) => {
  await testEnv.clearFirestore()

  done()
})

after(async (done) => {
  await testEnv.cleanup()

  done()
})

describe('Firestore security rules', () => {
  it('Can create an order with allowed fields', async () => {
    const db = testEnv.unauthenticatedContext().firestore()

    const colRef = collection(db, 'orders')
    const createDoc = await setDoc(doc(colRef), {
      quantity: 2,
      status: 'created',
      total: 20
    })

    await assertSucceeds(createDoc)
    testEnv.cleanup()
  })

  it('Cannnot create an order with now allowed fields', async () => {
    const db = testEnv.unauthenticatedContext().firestore()

    const colRef = collection(db, 'orders')
    const createDoc = setDoc(doc(colRef), {
      quantity: 2,
      status: 'created',
      total: 20,
      notAllowed: true
    })

    await assertFails(createDoc)
  })
})
