import React, { useEffect, useState } from "react"
import "react-confirm-alert/src/react-confirm-alert.css"
import { confirmAlert } from "react-confirm-alert"
import UserModal from './UserModal'
import axios from "axios"
import { useRecoilState } from 'recoil'
import { userAtom } from '../state/user_atom'
import { userBloggsAtom } from "../state/user_bloggs_atom"
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
    const [userBloggs, setUserBloggs] = useRecoilState(userBloggsAtom)
    const [user,] = useRecoilState(userAtom)
    // const [bloggs, setBloggs] = useState([])


    useEffect(() => {
        async function getBloggs() {
            try {
                const res = await axios.get(`http://localhost:3004/posts/${user._id}`)
                console.log('bloggs: ', res)
                if (res && res.status === 200) {
                    setUserBloggs(res.data)
                }
            } catch (err) {
                console.error(err)
            }
        }
        getBloggs()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userBloggs.length])

    const handleCardClick = async (index) => {
        const post = userBloggs[index]
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
    if (userBloggs && userBloggs.length > 0) {
        return (
            <div style={{ marginLeft: '250px' }}>
                {userBloggs.map((blogg, index) => {
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
                                            <MDBBtn onClick={() => { handleCardClick(index) }}>Show Blogg</MDBBtn>
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
                                            <MDBBtn onClick={() => { handleCardClick(index) }}>Show Blogg</MDBBtn>
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
    } else {
        return (
            <div style={{ marginLeft: '250px' }}>
                <MDBRow key={0}>
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
                            {/* <MDBCardBody>
                            <MDBCardImage src={`https://picsum.photos/seed/${userActions.getRandomInt(100)}/300/100`} alt='...' position='top' />
                            <MDBCardTitle>{blogg.content}</MDBCardTitle>
                            <MDBCardText>
                            With supporting text below as a natural lead-in to additional content.
                        </MDBCardText>
                            <MDBBtn onClick={() => { handleCardClick(index) }}>Show Blogg</MDBBtn>
                        </MDBCardBody> */}
                        </MDBCard>
                    </MDBCol>
                    <MDBCol sm='1'></MDBCol>
                </MDBRow>
            </div>
        )
    }
}