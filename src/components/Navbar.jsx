import React, { useState } from "react"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { app } from "../firebase"
import { useStateValue } from "../context/StateProvider"
import { actionType } from "../context/reducer"
import { Link, Navigate } from "react-router-dom"
import { BsFillBookmarkFill } from "react-icons/bs"
import { FaHome } from "react-icons/fa"
import { MdLogout } from "react-icons/md"
import { AiFillBook } from "react-icons/ai"

function Navbar() {
  const firebaseAuth = getAuth(app)
  const provider = new GoogleAuthProvider()
  const [{ user }, dispatch] = useStateValue()

  const [isMenu, setIsMenu] = useState(false)

  const login = async () => {
    if (!user) {
      const {
        user: { providerData }
      } = await signInWithPopup(firebaseAuth, provider)
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0]
      })
      localStorage.setItem("user", JSON.stringify(providerData[0]))
    } else {
      setIsMenu(!isMenu)
    }
  }

  const logout = () => {
    setIsMenu(false)
    localStorage.clear()
    dispatch({
      type: actionType.SET_USER,
      user: null
    })
  }

  return (
    <nav>
      <Link to={"/"} className="logo">
        <h4>Book</h4>
        <h3>Me</h3>
        {/* <AiFillBook /> */}
      </Link>
      <div className="account">
        <Link to={"/create"} className="create-accommodation">
          Your Home
        </Link>
        <div className="profile">
          <i className="fa-solid fa-bars"></i>
          <img
            src={
              user
                ? user.photoURL
                : "https://cdn-icons-png.flaticon.com/128/1144/1144760.png"
            }
            alt=""
            referrerPolicy="no-referrer"
            onClick={login}
          />
          {isMenu && (
            <div className="menu">
              <Link to={"/bookings"}>
                <div className="my-bookings">
                  <p onClick={() => setIsMenu(false)}>My Bookings</p>
                  <BsFillBookmarkFill className="my-bookings-icon" />
                </div>
              </Link>
              <Link to={"/accommodations"}>
                <div className="my-accommodations">
                  <p onClick={() => setIsMenu(false)}>My Accommodations</p>
                  <FaHome className="my-accommodations-icon" />
                </div>
              </Link>
              <div className="logout">
                <p onClick={logout}>Logout</p>
                <MdLogout className="logout-btn" />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
