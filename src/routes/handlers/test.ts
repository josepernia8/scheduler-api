import { Request, ResponseToolkit } from '@hapi/hapi'
import { HttpStatusCodes } from '../../types'
import db from '../../firebase'
import { collection, getDocs } from 'firebase/firestore'

export const test = async (_request: Request, h: ResponseToolkit) => {
  const querySnapshot = await getDocs(collection(db, 'foo'))
  querySnapshot.forEach((doc) => {
    const data = doc.data()

    console.log(`${doc.id} => ${data.bar}`)
  })

  return h
    .response({
      statusCode: HttpStatusCodes.OK,
      message: 'User identity retrieved',
      body: {}
    })
    .code(HttpStatusCodes.OK)
}
