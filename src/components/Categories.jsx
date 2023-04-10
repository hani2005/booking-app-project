import React from "react"
import {
  GiFamilyHouse,
  GiIsland,
  GiPalmTree,
  GiPisaTower,
  GiWindmill,
  GiWindow
} from "react-icons/gi"
import { TbBeachOff, TbUfo } from "react-icons/tb"
import { BiBed, BiHome } from "react-icons/bi"
import { IoIosColorPalette } from "react-icons/io"
import { AiOutlineFire } from "react-icons/ai"

function Categories() {
  return (
    <section>
      <div className="categories">
        <div className="category">
          <TbBeachOff className="cat-icon"/>
          <span>Beachfront</span>
        </div>
        <div className="category">
          <GiIsland className="cat-icon"/>
          <span>Islands</span>
        </div>
        <div className="category">
          <GiPalmTree className="cat-icon"/>
          <span>Tropical</span>
        </div>
        <div className="category">
          <GiWindmill className="cat-icon"/>
          <span>Windmills</span>
        </div>
        <div className="category">
          <BiHome className="cat-icon"/>
          <span>Tiny homes</span>
        </div>
        <div className="category">
          <BiBed className="cat-icon"/>
          <span>Private Rooms</span>
        </div>
        <div className="category">
          <GiPisaTower className="cat-icon"/>
          <span>Iconic Cities</span>
        </div>
        <div className="category">
          <GiWindow className="cat-icon"/>
          <span>Amazing View</span>
        </div>
        <div className="category">
          <TbUfo className="cat-icon"/>
          <span>OMG!</span>
        </div>
        <div className="category">
          <IoIosColorPalette className="cat-icon"/>
          <span>Creative spaces</span>
        </div>
        <div className="category">
          <AiOutlineFire className="cat-icon"/>
          <span>Trending</span>
        </div>
        <div className="category">
          <GiFamilyHouse className="cat-icon"/>
          <span>Manisons</span>
        </div>
      </div>
    </section>
  )
}

export default Categories
