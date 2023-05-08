import React from "react"
import Categories from "../components/Categories"
import Places from "../components/Places"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

function HomePage() {
  return (
    <div>
      <Navbar />
      <Places />
      <Footer />
    </div>
  )
}

export default HomePage
