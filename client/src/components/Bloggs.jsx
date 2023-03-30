import React, { useEffect, useState } from "react"
import "react-confirm-alert/src/react-confirm-alert.css"
import { confirmAlert } from "react-confirm-alert"
import BloggModal from './BloggModal'
import axios from "axios"

export default function Bloggs() {
    const [activeUserId, setActiveUserId] = useState(null)
    const [bloggs, setBloggs] = useState([])

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
    }, [bloggs.length])

    const handleCardClick = async (index) => {
        setActiveUserId(index)
        const blogg = bloggs[index]
        confirmAlert({
            customUI: ({ onClose }) => {
                console.log('post: ', blogg)
                console.log('user: ', blogg.user)
                return (
                    // <Confirm msg={'update'} onClose={onClose} onConfirm={() => { editAgent(); onClose() }} />
                    <BloggModal onClose={onClose} user={blogg.user} post={blogg} />
                )
            }
        })
    }

    const handleCardHover = (userId) => {
        const card = document.getElementById(`user-${userId}`)
        if (card) {
            card.style.boxShadow = '0 0 5px 2px gray'
            card.onmouseleave = () => {
                card.style.boxShadow = 'none'
            }
        }
    }

    return (
        <div style={{ marginLeft: '250px' }}>
            <h1>Oh, no, there goes Tokyo! Go, go, Bloggzilla</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {bloggs.map((blogg, index) => (
                    <div
                        key={index}
                        id={`user-${index}`}
                        style={{
                            flexBasis: '25%',
                            width: '300px',
                            height: '200px',
                            padding: '1%',
                            border: '1px solid black',
                            borderRadius: '10px',
                            margin: '1%',
                            cursor: 'pointer',
                            boxShadow: index === activeUserId ? '0 0 5px 2px blue' : 'none',
                            background: index === activeUserId ? '#f5f5f5' : 'white',
                        }}
                        onClick={() => { handleCardClick(index) }}
                        onMouseEnter={() => handleCardHover(index)}
                        onMouseLeave={() => handleCardHover(null)}
                    >
                        <h2>{blogg.user.first_name} {blogg.user.last_name}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}