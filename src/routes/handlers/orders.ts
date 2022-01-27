import { CustomRequest, HttpStatusCodes, Order } from '../../types'
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore'

import Boom from '@hapi/boom'
import { ResponseToolkit } from '@hapi/hapi'
import db from '../../firebase'
import strings from '../../constants'

export const createOrders = async (request: CustomRequest, h: ResponseToolkit) => {
  const { quantity, total } = request.payload as Order
  const colRef = collection(db, 'orders')

  try {
    await setDoc(doc(colRef), {
      quantity,
      status: 'created',
      total
    })

    return h
      .response({
        statusCode: HttpStatusCodes.CREATED,
        message: strings.orderCreated
      })
      .code(HttpStatusCodes.CREATED)
  } catch (err) {
    if (err instanceof Error) {
      throw Boom.internal(err.message)
    }
  }
}

export const getOrders = async (request: CustomRequest, h: ResponseToolkit) => {
  if (request.params.orderId) {
    const docRef = doc(db, 'orders', request.params.orderId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return h
        .response({
          statusCode: HttpStatusCodes.OK,
          body: { id: docSnap.id, ...docSnap.data() }
        })
        .code(HttpStatusCodes.OK)
    }

    return h
      .response({
        statusCode: HttpStatusCodes.NOT_FOUND,
        message: strings.notFound
      })
      .code(HttpStatusCodes.NOT_FOUND)
  }

  const querySnapshot = await getDocs(collection(db, 'orders'))
  const orders = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

  return h
    .response({
      statusCode: HttpStatusCodes.OK,
      body: orders
    })
    .code(HttpStatusCodes.OK)
}

export const updateOrders = async (request: CustomRequest, h: ResponseToolkit) => {
  const docRef = doc(db, 'orders', request.params.orderId)
  const updatePayload = request.payload as Partial<Order>

  try {
    await updateDoc(docRef, {
      ...updatePayload,
      status: 'updated'
    })

    return h.response({ statusCode: HttpStatusCodes.NO_CONTENT }).code(HttpStatusCodes.NO_CONTENT)
  } catch (err) {
    if (err instanceof Error) {
      throw Boom.internal(err.message)
    }
  }
}

export const deleteOrders = async (request: CustomRequest, h: ResponseToolkit) => {
  const docRef = doc(db, 'orders', request.params.orderId)
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists()) {
    return h
      .response({
        statusCode: HttpStatusCodes.NOT_FOUND,
        message: strings.notFound
      })
      .code(HttpStatusCodes.NOT_FOUND)
  }

  try {
    await deleteDoc(docRef)

    return h.response({ statusCode: HttpStatusCodes.NO_CONTENT }).code(HttpStatusCodes.NO_CONTENT)
  } catch (err) {
    if (err instanceof Error) {
      throw Boom.internal(err.message)
    }
  }
}
