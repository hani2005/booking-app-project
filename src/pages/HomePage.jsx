import React from "react"
import Places from "../components/Places"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Banner from "../components/Banner"
import Value from "../components/Value"

function HomePage() {
  return (
    <div>
      <Navbar />
      <Banner />
      <Places />
      <Value />
      <Footer />
    </div>
  )
}

export default HomePage
