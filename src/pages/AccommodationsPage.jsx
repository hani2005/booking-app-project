import React, { useEffect, useState } from "react"
import { app, firestore } from "../firebase"
import { getAuth } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useStateValue } from "../context/StateProvider"

function AccommodationsPage() {
  const [userData, setUserData] = useState([])
  const [{ user }] = useStateValue()

  const auth = getAuth(app)

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      const docRef = doc(firestore, "accommodations", user.uid)
      try {
        const docSnap = await getDoc(docRef)
        setUserData([docSnap.data()])
      } catch (error) {
        console.log(error)
      }
    })
  }, [])

  if (!user) {
    return (
      <div className="login-to-view">
        <Navbar />
        <h2>Please login to view your accommodations</h2>
        <Footer />
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      {userData == 0 ? (
        <h2 className="add-accommodation">You Dont Have Any Accommodations</h2>
      ) : (
        userData.map((item) => (
          <div key={item.id} className="accommodation-page">
            <h2>Your Accommodations</h2>
            <div className="accommodation-content">
              <div className="accommodation-content-img">
                <img src={item.imageURL} alt="" />
              </div>
              <div className="user-data-texts">
                <div className="user-data-title">
                  <h3>{item.title}</h3>
                  <span>
                    <strong>${item.price}</strong> night
                  </span>
                </div>
                <span className="user-data-address">
                  <strong>Address:</strong> {item.address}
                </span>
                <p>
                  <strong>Description:</strong> {item.description}
                </p>
                <div className="house-rules">
                  <span>
                    <strong>Check-In:</strong> {item.checkIn}
                  </span>
                  <span>
                    <strong>Check-Out:</strong> {item.checkOut}
                  </span>
                  <span>
                    <strong>Max Guests:</strong> {item.maxGuests}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      <Footer />
    </div>
  )
}

export default AccommodationsPage
