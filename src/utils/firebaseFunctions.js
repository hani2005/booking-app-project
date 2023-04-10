import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc
} from "firebase/firestore"
import { firestore } from "../firebase"

export const saveItem = async (data) => {
  await setDoc(doc(firestore, "accommodations", `${Date.now()}`), data, {
    merge: true
  })
}

export const getAllPlaces = async () => {
  const items = await getDocs(
    query(collection(firestore, "places"), orderBy("id", "desc"))
  )

  return items.docs.map((doc) => doc.data())
}
