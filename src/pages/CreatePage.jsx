import React, { useEffect, useState } from "react"
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
  listAll,
  uploadBytesResumable
} from "firebase/storage"
import { storage } from "../firebase.js"
import { saveItem } from "../utils/firebaseFunctions"
import { useStateValue } from "../context/StateProvider"
import Loader from "../components/Loader.jsx"
import { categories } from "../utils/data"
import { v4 } from "uuid"
import { MdDelete } from "react-icons/md"

function CreatePage() {
  const [title, setTitle] = useState("")
  const [address, setAddress] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState(null)
  const [imageAsset, setImageAsset] = useState(null)
  const [imageList, setImageList] = useState([])
  const [fields, setFields] = useState(false)
  const [alertStatus, setAlertStatus] = useState("danger")
  const [msg, setMsg] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [{ places }, dispatch] = useStateValue()
  const [imageUrls, setImageUrls] = useState([])

  const uploadImage = () => {
    if (imageAsset == null) return
    const imageRef = ref(storage, `images/${imageAsset.name + v4()}`)
    uploadBytes(imageRef, imageAsset).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url])
      })
    })
  }

  const deleteImage = () => {
    const deleteRef = ref(storage, imageUrls)
    deleteObject(deleteRef).then(() => {
      setImageUrls([])
    })
  }

  const saveDetails = () => {
    setIsLoading(true)
    try {
      if (!title || !calories || !imageAsset || !category || !price) {
        setFields(true)
        setMsg("Required fields can't be empty")
        setAlertStatus("danger")
        setTimeout(() => {
          setFields(false)
          setIsLoading(false)
        }, 4000)
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageURL: imageAsset,
          category: category,
          calories: calories,
          qty: 1,
          price: price
        }
        saveItem(data)
        setIsLoading(false)
        setFields(true)
        setMsg("Item uploaded successfully")
        clearData()
        setAlertStatus("success")
        setTimeout(() => {
          setFields(false)
        }, 4000)
      }
    } catch (error) {
      console.log(error)
      setFields(true)
      setMsg("Error while uploading : Try Again")
      setAlertStatus("danger")
      setTimeout(() => {
        setFields(false)
        setIsLoading(false)
      }, 4000)
    }
    fetchData()
  }

  const clearData = () => {
    setTitle("")
    setImageAsset(null)
    setCalories("")
    setPrice("")
    setCategory("Select Category")
  }

  const fetchData = async () => {
    await getAllPlaces().then((data) => {
      dispatch({
        type: actionType.SET_PLACES,
        foodItems: data
      })
    })
  }

  return (
    <div className="create-container">
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
        <h2>Description</h2>
        <span>Tell us a brief description about your place</span>
        <input
          type="text"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="create-detail-photo">
        <h2>Photos</h2>
        <span>Upload photos of your place</span>
        <div className="upload-image-container">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setImageAsset(e.target.files[0])
            }}
            className="upload-image"
          />
          <button onClick={uploadImage} className="upload-image-btn">
            Upload
          </button>
        </div>
        <div className="image-url">
          {imageUrls.map((url) => {
            return (
              <div key={url}>
                <img src={url} alt="" />
                <button type="button" onClick={() => deleteImage(url)}>
                  <MdDelete />
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default CreatePage
