import React from "react"
import { Link } from "react-router-dom"

function Value() {
  return (
    <div className="value-container">
      <img
        src="https://images.pexels.com/photos/8583869/pexels-photo-8583869.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
        alt=""
      />
      <div className="value-text">
        <h1>How we provide value to <b>our customers</b>?</h1>
        <h3>
          By making our customers partners, Book Me is a platform which creates
          value for everyone: hosts (that create value out of an unused asset),
          guests (that get a customized, affordable and authentic experience),
          and share that value by orchestrating the network and facilitating
          connections.
        </h3>
        <span>So what are you waiting for?</span>
        <a href="#">Join Now</a>
      </div>
    </div>
  )
}

export default Value
