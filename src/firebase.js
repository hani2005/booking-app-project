import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyD1_xZOfr9XCT2lRmQ92FrAdY1hffQG9oY",
  authDomain: "booking-app-98146.firebaseapp.com",
  projectId: "booking-app-98146",
  storageBucket: "booking-app-98146.appspot.com",
  messagingSenderId: "148349620000",
  appId: "1:148349620000:web:e81c03e1d2271cf7515145"
};


const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig)

const firestore = getFirestore(app)
const storage = getStorage(app)

export { app, firestore, storage }