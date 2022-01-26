import { FirebaseApp } from '@firebase/app'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import firebaseConfig from './firebaseConfig'

// Get a Firestore instance
export const app: FirebaseApp = initializeApp(firebaseConfig)

// export the firestore db
export default getFirestore(app)
