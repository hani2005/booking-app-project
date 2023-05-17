import React from "react"
import { useParams } from "react-router-dom"
import placesData from "../utils/data"
import { ImLocation } from "react-icons/im"
import { IoIosArrowDown } from "react-icons/io"
import { Toaster, toast } from "react-hot-toast"
import { AiFillStar, AiOutlineStar } from "react-icons/ai"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { bookItem } from "../utils/firebaseFunctions"

function PlacePage() {
  const { id } = useParams()
  const place = placesData.find((place) => place.id === id)
  const {
    mainImg,
    img1,
    img2,
    img3,
    img4,
    title,
    location,
    desc,
    price,
    offer1,
    offer2,
    offer3,
    offer4,
    checkIn,
    checkOut,
    maxGuests,
    review
  } = place

  const bookFunction = () => {
    const data = {
      mainImg: mainImg,
      img1: img1,
      img2: img2,
      img3: img3,
      img4: img4,
      title: title,
      location: location,
      desc: desc,
      price: price,
      offer1: offer1,
      offer2: offer2,
      offer3: offer3,
      offer4: offer4,
      checkIn: checkIn,
      checkOut: checkOut,
      maxGuests: maxGuests,
      review: review
    }
    bookItem(data)
    toast.success("Accommodation Booked")
  }

  return (
    <>
      <div>
        <Toaster />
      </div>
      <Navbar />
      <div className="place-container">
        <h2 className="place-title">{title}</h2>
        <div className="place-location">
          <ImLocation className="location-icon" />
          <p>{location}</p>
        </div>
        <div className="img-container">
          <div>
            <img src={mainImg} alt="" className="mainImg" />
          </div>
          <div className="small-img-container">
            <img src={img1} alt="" />
            <img src={img2} alt="" className="img2" />
            <img src={img3} alt="" />
            <img src={img4} alt="" className="img4" />
          </div>
        </div>
        <div className="booking-details">
          <div className="place-details">
            <div className="desc-container">
              <h2>Description</h2>
              <span className="desc">{desc}</span>
            </div>
            <div className="offers">
              <h2>What This Place Offers</h2>
              <div className="offer-detail">
                <AiFillStar className="offer-detail-icon" />
                <span>{offer1}</span>
              </div>
              <div className="offer-detail">
                <AiFillStar className="offer-detail-icon" />
                <span>{offer2}</span>
              </div>
              <div className="offer-detail">
                <AiFillStar className="offer-detail-icon" />
                <span>{offer3}</span>
              </div>
              <div className="offer-detail">
                <AiFillStar className="offer-detail-icon" />
                <span>{offer4}</span>
              </div>
            </div>
          </div>
          <div className="book">
            <div className="book-price-detail">
              <span className="book-price">
                <strong>${price}</strong> night
              </span>
              <div className="review">
                <AiFillStar className="review-icon" />
                <span>{review}</span>
              </div>
            </div>
            <div className="box">
              <div className="checks">
                <div className="check-in">
                  <span>CHECK-IN</span>
                  <time>10/16/2023</time>
                </div>
                <div className="check-out">
                  <span>CHECK-OUT</span>
                  <time>10/21/2023</time>
                </div>
              </div>
              <div className="box-guests">
                <div className="box-guests-title">
                  <h5>Guests</h5>
                  <span>1 guest</span>
                </div>
                <div>
                  <IoIosArrowDown className="box-guests-icon" />
                </div>
              </div>
            </div>
            <div className="reserve">
              <button onClick={bookFunction}>Reserve</button>
              <span>You won't be charged yet</span>
            </div>
            <div className="total">
              <span className="total-price">$271 x 5 nights</span>
              <span>$1,353</span>
            </div>
          </div>
        </div>
        <h2 className="extra-info-title">Things To Know</h2>
        <div className="extra-info">
          <div className="info-detail">
            <span>
              <strong>House rules</strong>
            </span>
            <span>{checkIn}</span>
            <span>{checkOut}</span>
            <span>{maxGuests}</span>
          </div>
          <div className="info-detail">
            <span>
              <strong>Safety & property</strong>
            </span>
            <span>Carbon monoxide alarm not reported</span>
            <span>Smoke alarm not reported</span>
            <span>Pool/hot tub without a gate or lock</span>
          </div>
          <div className="info-detail">
            <span>
              <strong>Cancellation policy</strong>
            </span>
            <span>Free cancellation for 48 hours.</span>
            <p>
              Review the Host's full cancellation policy which
              <br /> applies even if you cancel for illness or disruptions
              <br /> caused by COVID-19.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default PlacePage
