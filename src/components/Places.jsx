import React, { useState } from "react"
import { Link } from "react-router-dom"
import placesData from "../utils/data"
import { AiFillStar } from "react-icons/ai"

function Places() {
  const [visible, setVisible] = useState(8)

  const showMorePosts = () => {
    setVisible((prev) => prev + 4)
  }

  return (
    <>
      <section className="content">
        {placesData.slice(0, visible).map((item) => (
          <Link
            to={`/place/${item.id}`}
            key={item.id}
            className="content-detail"
          >
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
      <button className="content-btn" onClick={showMorePosts}>Show More</button>
    </>
  )
}

export default Places
