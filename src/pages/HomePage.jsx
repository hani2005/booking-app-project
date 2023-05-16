import React from "react"
import Places from "../components/Places"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Banner from "../components/Banner"

function HomePage() {
  return (
    <div>
      <Navbar />
      <Banner />
      <Places />
      <Footer />
    </div>
  )
}

export default HomePage
