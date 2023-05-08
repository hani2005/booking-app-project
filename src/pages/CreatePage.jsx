import React, { useState } from "react"
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable
} from "firebase/storage"
import { app, storage } from "../firebase.js"
import { getAllPlaces, saveItem } from "../utils/firebaseFunctions"
import { useStateValue } from "../context/StateProvider"
import Loader from "../components/Loader.jsx"
import { categories } from "../utils/data"
import { MdDelete, MdCloudUpload } from "react-icons/md"
import { getAuth } from "firebase/auth"
import { actionType } from "../context/reducer.js"
import Navbar from "../components/Navbar.jsx"
import Footer from "../components/Footer.jsx"

function CreatePage() {
  const [title, setTitle] = useState("")
  const [address, setAddress] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [maxGuests, setMaxGuests] = useState("")
  const [category, setCategory] = useState("")
  const [imageAsset, setImageAsset] = useState(null)
  const [fields, setFields] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [{ places }, dispatch] = useStateValue()

  const uploadImage = (e) => {
    setIsLoading(true)
    const imageFile = e.target.files[0]
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`)
    const uploadTask = uploadBytesResumable(storageRef, imageFile)
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      },
      (error) => {
        console.log(error)
        setFields(true)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageAsset(downloadURL)
          setIsLoading(false)
          setFields(true)
        })
      }
    )
  }

  const deleteImage = () => {
    setIsLoading(true)
    const deleteRef = ref(storage, imageAsset)
    deleteObject(deleteRef).then(() => {
      setImageAsset(null)
      setIsLoading(false)
      setFields(true)
    })
  }

  const auth = getAuth(app)

  const saveDetails = () => {
    setIsLoading(true)
    try {
      if (
        !title ||
        !description ||
        !imageAsset ||
        !checkIn ||
        !price ||
        !checkOut ||
        !maxGuests ||
        !category ||
        !address
      ) {
        setFields(true)
        setIsLoading(false)
        alert("Required fields can't be empty")
      } else {
        auth.onAuthStateChanged((user) => {
          const data = {
            id: user.uid,
            title: title,
            imageURL: imageAsset,
            category: category,
            address: address,
            price: price,
            checkIn: checkIn,
            checkOut: checkOut,
            description: description,
            maxGuests: maxGuests
          }
          saveItem(data)
        })
        setIsLoading(false)
        setFields(true)
        alert("Item uploaded successfully")
        clearData()
      }
    } catch (error) {
      console.log(error)
      setFields(true)
      setIsLoading(false)
      alert("Error while uploading : Try Again")
    }
    fetchData()
  }

  const clearData = () => {
    setTitle("")
    setImageAsset(null)
    setAddress("")
    setPrice("")
    setCategory("")
    setCheckIn("")
    setCheckOut("")
    setDescription("")
    setMaxGuests("")
  }

  const fetchData = async () => {
    await getAllPlaces().then((data) => {
      dispatch({
        type: actionType.SET_PLACES,
        places: data
      })
    })
  }

  return (
    <>
      <Navbar />
      <div className="create-container">
        <div className="create-detail">
          <h2>Price</h2>
          <span>Price per night</span>
          <input
            type="text"
            placeholder="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="create-detail">
          <h2>Title</h2>
          <span>Tell us about your place</span>
          <input
            type="text"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="create-detail">
          <h2>Address</h2>
          <span>Tell us where your place will be</span>
          <input
            type="text"
            placeholder="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="create-detail">
          <h2>Category</h2>
          <span>Add a category for your place</span>
          <input
            type="text"
            placeholder="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="create-detail">
          <h2>Description</h2>
          <span>Tell us a brief description about your place</span>
          <textarea
            type="text"
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="create-detail-photo">
          <h2>Photos</h2>
          <span>Upload photos of your place</span>
          <div>
            {isLoading ? (
              <Loader />
            ) : (
              <>
                {!imageAsset ? (
                  <>
                    <label className="upload-image-container">
                      <div>
                        <MdCloudUpload className="upload-icon" />
                        <p>Click here to upload</p>
                      </div>
                      <input
                        type="file"
                        name="uploadimage"
                        accept="image/*"
                        onChange={uploadImage}
                      />
                    </label>
                  </>
                ) : (
                  <>
                    <div className="image-url">
                      <img src={imageAsset} alt="upload img" />
                      <button type="button" onClick={deleteImage}>
                        <MdDelete />
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
        <div className="create-detail">
          <h2>Check-in & Check-out</h2>
          <span>
            Add check-in and check-out times with max number of guests.
          </span>
          <div className="time-container">
            <span>Check In</span>
            <input
              type="text"
              placeholder="03:00"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
            <span>Check Out</span>
            <input
              type="text"
              placeholder="11:00"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
            <span>Max Guests</span>
            <input
              type="text"
              placeholder="1"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
            />
          </div>
        </div>
        <button className="save-details-btn" onClick={saveDetails}>
          Save
        </button>
      </div>
      <Footer />
    </>
  )
}

export default CreatePage
