import React from "react"

function Banner() {
  return (
    <div className="banner-container">
      <div className="banner-text">
        <h1>
          Find The Best Accommodations
          <br /> <b>In The World</b>
        </h1>
        <h3>
          Book Me offers people an easy, relatively stress-free way to book
          accommodations and it's trusted by millions of people and brands.
        </h3>
        <div className="brands">
          <img
            src="https://static.cdnlogo.com/logos/h/77/hotwire.svg"
            alt=""
          />
          <img
            src="https://static.cdnlogo.com/logos/b/89/booking.svg"
            alt=""
          />
          <img
            src="https://static.cdnlogo.com/logos/a/9/airbnb.svg"
            alt=""
          />
          <img
            src="https://static.cdnlogo.com/logos/k/50/kayak.svg"
            alt=""
          />
          <img
            src="https://static.cdnlogo.com/logos/t/6/travelocity.svg"
            alt=""
          />
        </div>
      </div>
      <img
        src="https://images.pexels.com/photos/8288954/pexels-photo-8288954.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
        alt=""
      />
    </div>
  )
}

export default Banner
