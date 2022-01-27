import { FirebaseApp } from '@firebase/app'
import firebaseConfig from './firebaseConfig'
import { getFirestore } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'

// Get a Firestore instance
export const app: FirebaseApp = initializeApp(firebaseConfig)

// export the firestore db
export default getFirestore(app)
