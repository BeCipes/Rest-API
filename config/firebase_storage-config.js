import admin from 'firebase-admin'
import { initializeApp } from '@firebase/app'
import { getStorage } from '@firebase/storage'
import serviceAccount from "./serviceAccountKey.json" assert { type: "json" }

const firebaseConfig = {
    credential: serviceAccount,
    databaseURL: "https://becipes-14223-default-rtdb.asia-southeast1.firebasedatabase.app",
    storageBucket: process.env.BUCKET_URL
}

const app = initializeApp(firebaseConfig)
const bucket = getStorage(app)

export { bucket }