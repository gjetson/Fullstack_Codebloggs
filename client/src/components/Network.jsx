import React, { useState, useEffect } from 'react'
import { confirmAlert } from "react-confirm-alert"
import UserModal from './UserModal'
import axios from 'axios'

const user = {
    id: 1,
    name: '1',
    description: '',
}

export default function Network() {
    const [activeUserId, setActiveUserId] = useState(null)
    const [users, setUsers] = useState([])

    useEffect(() => {
        async function getUsers() {
            try {
                const res = await axios.get(`http://localhost:3004/users`)
                console.log(res)
                if (res && res.status === 200) {
                    const newUsers = res.data.map((user, index) => {
                        return {
                            id: index,
                            name: `${user.first_name} ${user.last_name}`,
                            user: user
                        }
                    })
                    setUsers(newUsers)
                }
            } catch (err) {
                console.error(err)
            }
        }
        getUsers()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [users.length])

    const handleCardClick = (userId) => {
        setActiveUserId(userId)
        console.log('user: ', users[userId])
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    // <Confirm msg={'update'} onClose={onClose} onConfirm={() => { editAgent(); onClose() }} />
                    <UserModal onClose={onClose} user={users[userId]} />
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
                    {users.map((user) => (
                        <div
                            key={user.id}
                            id={`user-${user.id}`}
                            style={{
                                flexBasis: '25%',
                                width: '300px',
                                height: '200px',
                                padding: '1%',
                                border: '1px solid black',
                                borderRadius: '10px',
                                margin: '1%',
                                cursor: 'pointer',
                                boxShadow: user.id === activeUserId ? '0 0 5px 2px blue' : 'none',
                                background: user.id === activeUserId ? '#f5f5f5' : 'white',
                            }}
                            onClick={() => { handleCardClick(user.id) }}
                            onMouseEnter={() => handleCardHover(user.id)}
                            onMouseLeave={() => handleCardHover(null)}
                        >
                            <h2>{user.name}</h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}