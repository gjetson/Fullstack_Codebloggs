import React, { useEffect, useState } from "react"
import "react-confirm-alert/src/react-confirm-alert.css"
import { confirmAlert } from "react-confirm-alert"
import UserBloggModal from './UserBloggModal'
import axios from "axios"
import { useRecoilState } from 'recoil'
import { userAtom } from '../state/user'
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


export default function UserBloggs() {
    const userActions = useUserActions()
    const [user,] = useRecoilState(userAtom)
    const [bloggs, setBloggs] = useState([])


    useEffect(() => {
        async function getBloggs() {
            try {
                const res = await axios.get(`http://localhost:3004/posts/${user._id}`)
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
        const post = bloggs[index]
        confirmAlert({
            customUI: ({ onClose }) => {
                console.log('post: ', post)
                console.log('user: ', user)
                return (
                    // <Confirm msg={'update'} onClose={onClose} onConfirm={() => { editAgent(); onClose() }} />
                    <UserBloggModal onClose={onClose} user={user} post={post} />
                )
            }
        })
    }

    return (
        <div style={{ marginLeft: '250px' }}>
            {bloggs.map((blogg, index) => {
                if (index === 0) {
                    return (
                        <MDBRow key={index}>
                            <MDBCol sm='5'>
                                <MDBCard>
                                    <MDBCardBody>
                                        <MDBCardImage src={`https://picsum.photos/seed/${userActions.getRandomInt(100)}/300/100`} alt='...' position='top' />
                                        <MDBCardTitle>{user.first_name} {user.last_name}</MDBCardTitle>
                                        <MDBCardText>
                                            {user.status}
                                        </MDBCardText>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                            <MDBCol sm='1'></MDBCol>
                            <MDBCol sm='5'>
                                <MDBCard>
                                    <MDBCardBody>
                                        <MDBCardImage src={`https://picsum.photos/seed/${userActions.getRandomInt(100)}/300/100`} alt='...' position='top' />
                                        <MDBCardTitle>{blogg.content}</MDBCardTitle>
                                        {/* <MDBCardText>
                                            With supporting text below as a natural lead-in to additional content.
                                        </MDBCardText> */}
                                        <MDBBtn onClick={() => { handleCardClick(index) }}>Go somewhere</MDBBtn>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                            <MDBCol sm='1'></MDBCol>
                        </MDBRow>
                    )
                } else {
                    return (
                        <MDBRow key={index}>
                            <MDBCol sm='5'>
                                <MDBCard>
                                    {/* <MDBCardBody>
                                        <MDBCardImage src={`https://picsum.photos/seed/${getRandomInt(100)}/300/100`} alt='...' position='top' />
                                        <MDBCardTitle>Special title treatment</MDBCardTitle>
                                        <MDBCardText>
                                            With supporting text below as a natural lead-in to additional content.
                                        </MDBCardText>
                                        <MDBBtn href='#'>Go somewhere</MDBBtn>
                                    </MDBCardBody> */}
                                </MDBCard>
                            </MDBCol>
                            <MDBCol sm='1'></MDBCol>
                            <MDBCol sm='5'>
                                <MDBCard>
                                    <MDBCardBody>
                                        <MDBCardImage src={`https://picsum.photos/seed/${userActions.getRandomInt(100)}/300/100`} alt='...' position='top' />
                                        <MDBCardTitle>{blogg.content}</MDBCardTitle>
                                        {/* <MDBCardText>
                                            With supporting text below as a natural lead-in to additional content.
                                        </MDBCardText> */}
                                        <MDBBtn onClick={() => { handleCardClick(index) }}>Go somewhere</MDBBtn>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                            <MDBCol sm='1'></MDBCol>
                        </MDBRow>
                    )
                }
            })}
        </div>
    )
}