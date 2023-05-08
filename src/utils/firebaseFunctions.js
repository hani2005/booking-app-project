import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc
} from "firebase/firestore"
import { app, firestore } from "../firebase"
import { getAuth } from "firebase/auth"

const auth = getAuth(app)

export const saveItem = (data) => {
  auth.onAuthStateChanged((user) => {
    setDoc(doc(firestore, "accommodations", user.uid), data, {
      merge: true
    })
  })
}

export const bookItem = (data) => {
  auth.onAuthStateChanged((user) => {
    setDoc(doc(firestore, "bookings", user.uid), data, {
      merge: true
    })
  })
}

// auth.onAuthStateChanged(async (user) => {
//   const docRef = doc(firestore, "accommodations", user.uid)

//   try {
//     const docSnap = await getDoc(docRef)
//     console.log(docSnap.data().address)
//   } catch (error) {
//     console.log(error)
//   }
// })

export const getAllPlaces = async () => {
  const items = await getDocs(
    query(collection(firestore, "accommodations"), orderBy("id", "desc"))
  )

  return items.docs.map((doc) => doc.data())
}