import React from "react"
import { Link } from "react-router-dom"
import placesData from "../utils/data"
import { AiFillStar } from "react-icons/ai"

function Places() {
  return (
    <section className="content">
      {placesData.map((item) => (
        <Link to={`/place/${item.id}`} key={item.id} className="content-detail">
          <div className="content-detail-img">
            <img src={item.mainImg} alt="" />
          </div>
          <div className="places-title">
            <h5>{item.name}</h5>
            <div className="places-review">
              <AiFillStar className="places-review-icon" />
              <span>{item.review}</span>
            </div>
          </div>
          <span>{item.distance}</span>
          <span>{item.date}</span>
          <span className="price">
            <strong>${item.price}</strong> night
          </span>
        </Link>
      ))}
    </section>
  )
}

export default Places
