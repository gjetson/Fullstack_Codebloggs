import React, { useEffect, useState } from "react"
import "react-confirm-alert/src/react-confirm-alert.css"
import { confirmAlert } from "react-confirm-alert"
import BloggModal from './BloggModal'
import axios from "axios"
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

export default function Bloggs() {
    const userActions = useUserActions()
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

    const updateLikes = (index, likes) => {
        const update = bloggs.map((blogg, ind) => {
            if (ind === index) {
                blogg.likes = likes
            }
            return blogg
        })
        setBloggs(update)
    }

    const handleCardClick = async (index) => {
        setActiveUserId(index)
        const blogg = bloggs[index]
        confirmAlert({
            customUI: ({ onClose }) => {
                console.log('post: ', blogg)
                console.log('user: ', blogg.user)
                return (
                    <BloggModal index={index} updateLikes={updateLikes} onClose={onClose} user={blogg.user} post={blogg} />
                )
            }
        })
    }

    return (
        <div style={{ marginLeft: '250px' }}>
            <h1 style={{textAlign: "center", marginTop: "15px"}}>Bloggs</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap'}}>
                {bloggs.map((blogg, index) => {

                // return (
                //     <div
                //         key={index}
                //         id={`user-${index}`}
                //         style={{
                //             flexBasis: '25%',
                //             width: '300px',
                //             height: '200px',
                //             padding: '1%',
                //             border: '1px solid black',
                //             borderRadius: '10px',
                //             margin: '1%',
                //             cursor: 'pointer',
                //             boxShadow: index === activeUserId ? '0 0 5px 2px blue' : 'none',
                //             background: index === activeUserId ? '#f5f5f5' : 'white',
                //         }}
                //         onClick={() => { handleCardClick(index) }}
                //         onMouseEnter={() => handleCardHover(index)}
                //         onMouseLeave={() => handleCardHover(null)}
                //     >
                //         <h2>{blogg.user.first_name} {blogg.user.last_name}</h2>
                //     </div>
                // )

                return (

                    <MDBRow key={index}>
                        <MDBCol sm='3'></MDBCol>
                        <MDBCol sm='6'>
                            <MDBCard>
                                <MDBCardBody>
                                    <MDBCardImage src={`https://picsum.photos/seed/${userActions.getRandomInt(100)}/300/100`} alt='...' position='top' />
                                    <MDBCardTitle>{blogg.user.first_name} {blogg.user.last_name}</MDBCardTitle>
                                    <MDBCardText>
                                        {blogg.user.status}
                                    </MDBCardText>
                                    <MDBCardText>
                                        {blogg.content}
                                    </MDBCardText>
                                    <MDBBtn onClick={() => { handleCardClick(index) }}>Go somewhere</MDBBtn>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol sm='3'></MDBCol>
                    </MDBRow>
                )

            })}
            </div>
        </div>
    )}