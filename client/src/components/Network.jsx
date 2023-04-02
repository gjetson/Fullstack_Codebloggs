import React, { useState, useEffect } from 'react'
import "react-confirm-alert/src/react-confirm-alert.css"
import { confirmAlert } from "react-confirm-alert"
import UserModal from './UserModal'
import axios from 'axios'
import { useUserActions } from '../util/user_actions'
import {
    MDBCardImage,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBRow,
    MDBCol,
    MDBBtn
} from 'mdb-react-ui-kit'

export default function Network() {
    const userActions = useUserActions()
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
        const user = users[index]
        const post = await getLatestPost(user._id)
        confirmAlert({
            customUI: ({ onClose }) => {
                console.log('post: ', post)
                console.log('user: ', user)
                return (
                    // <Confirm msg={'update'} onClose={onClose} onConfirm={() => { editAgent(); onClose() }} />
                    <UserModal onClose={onClose} user={user} post={post[0]} />
                )
            }
        })
    }

    // const handleCardHover = (userId) => {
    //     const card = document.getElementById(`user-${userId}`)
    //     if (card) {
    //         card.style.boxShadow = '0 0 5px 2px gray'
    //         card.onmouseleave = () => {
    //             card.style.boxShadow = 'none'
    //         }
    //     }
    // }

    return (
        <div style={{ marginLeft: '250px' }}>
            {users.map((user, index) => (

                <MDBRow key={index}>
                    <MDBCol sm='3'></MDBCol>
                    <MDBCol sm='6'>
                        <MDBCard>
                            <MDBCardBody>
                                <MDBCardImage src={`https://picsum.photos/seed/${userActions.getRandomInt(100)}/300/100`} alt='...' position='top' />
                                <MDBCardTitle>{user.first_name} {user.last_name}</MDBCardTitle>
                                <MDBCardText>
                                    {user.status}
                                </MDBCardText>
                                <MDBBtn onClick={() => { handleCardClick(index) }}>Show</MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol sm='3'></MDBCol>
                </MDBRow>
            ))}
        </div>
    )
}