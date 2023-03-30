import React, { useState, useEffect } from 'react'
import "react-confirm-alert/src/react-confirm-alert.css"
import { confirmAlert } from "react-confirm-alert"
import UserModal from './UserModal'
import axios from 'axios'

export default function Network() {
    const [activeUserId, setActiveUserId] = useState(null)
    const [users, setUsers] = useState([])

    useEffect(() => {
        async function getUsers() {
            try {
                const res = await axios.get(`http://localhost:3004/users`)
                console.log(res)
                if (res && res.status === 200) {
                    setUsers(res.data)
                }
            } catch (err) {
                console.error(err)
            }
        }
        getUsers()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [users.length])

    const getLatestPost = async (userId) => {
        try {
            const res = await axios.get(`http://localhost:3004/post/latest/${userId}`)
            console.log(res)
            if (res && res.status === 200) {
                return res.data
            }
        } catch (err) {
            console.error(err)
        }
    }

    const handleCardClick = async (index) => {
        setActiveUserId(index)
        const user = users[index]
        const post = await getLatestPost(user._id)
        confirmAlert({
            customUI: ({ onClose }) => {
                console.log('post: ', post)
                console.log('user: ', user)
                return (
                    // <Confirm msg={'update'} onClose={onClose} onConfirm={() => { editAgent(); onClose() }} />
                    <UserModal onClose={onClose} user={user} post={post} />
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
        <div style={{ display: 'flex' }}>
            <div style={{ width: '250px', background: '#ccc' }}>Sidebar</div>
            <div style={{ marginLeft: '250px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {users.map((user, index) => (
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
                            <h2>{user.first_name} {user.last_name}</h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}