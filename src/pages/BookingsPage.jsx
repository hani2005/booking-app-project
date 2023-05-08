import React, { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { getAuth } from "firebase/auth"
import { app, firestore } from "../firebase"
import { doc, getDoc } from "firebase/firestore"

function BookingsPage() {
  const [bookingData, setBookingData] = useState([])

  const auth = getAuth(app)

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      const docRef = doc(firestore, "bookings", user.uid)
      try {
        const docSnap = await getDoc(docRef)
        setBookingData([docSnap.data()])
      } catch (error) {
        console.log(error)
      }
    })
  }, [])

  return (
    <div>
      <Navbar />
      <div>
        {bookingData == 0 ? (
          <h2 className="add-booking">You Dont Have Any Booking</h2>
        ) : (
          bookingData.map((data) => (
            <div key={data.title} className="booking-page">
              <h2>Your Bookings</h2>
              <div className="booking-content">
                <div className="booking-main-img">
                  <img src={data.mainImg} alt="" />
                </div>
                <div className="booking-thumb">
                  <img src={data.img1} alt="" />
                  <img src={data.img2} alt="" />
                  <img src={data.img3} alt="" />
                  <img src={data.img4} alt="" />
                </div>
                <div className="booking-texts">
                  <div className="booking-title">
                    <h3>{data.title}</h3>
                    <span>
                      <strong>${data.price}</strong> night
                    </span>
                  </div>
                  <h4>{data.location}</h4>
                  <p>
                    <strong>Description:</strong> {data.desc}
                  </p>
                  <div className="booking-offers">
                  <h3>Offers</h3>
                    <span>{data.offer1}</span>
                    <span>{data.offer2}</span>
                    <span>{data.offer3}</span>
                    <span>{data.offer4}</span>
                  </div>
                  <div className="booking-house-rules">
                    <span>{data.checkIn}</span>
                    <span>{data.checkOut}</span>
                    <span>{data.maxGuests}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <Footer />
    </div>
  )
}

export default BookingsPage
