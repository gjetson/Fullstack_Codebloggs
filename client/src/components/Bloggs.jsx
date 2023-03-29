import React, { useEffect, useState } from "react"
import { confirmAlert } from "react-confirm-alert"
import "react-confirm-alert/src/react-confirm-alert.css"
import axios from "axios"
import "../css/bloggs.css"
import BloggModal from "./BloggsModal"
import Blogg from "./Blogg"




export default function Bloggs() {
  const [bloggs, setBloggs] = useState([])
  const [selectedBlogg, setSelectedBlogg] = useState(null)

  useEffect(() => {
    async function getBloggs() {
      try {
        const res = await axios.get(`http://localhost:3004/posts`)
        console.log('bloggs: ', res)
        if (res && res.status === 200) {
          setBloggs(res.data)
        }
      } catch (err) {
        console.error(err)
      }
    }
    getBloggs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleModalClose = () => {
    setSelectedBlogg(null)
  }

  const handleCardClick = (blogg) => {
    setSelectedBlogg(blogg)
  }

  function bloggList() {
    return bloggs.map((blogg) => {
      console.log('user: ', blogg.user)
      if (blogg.user) {
        return (
          <Blogg
            blogg={blogg}
            key={blogg._id}
          />
        )
      }
    })
  }

  return (
    <div style={{ marginLeft: '250px' }}>
      <div className="blog-container">
        <h1>Blogg</h1>
        <div className="card-container">{bloggList()}</div>
      </div>
    </div>
  )
}
