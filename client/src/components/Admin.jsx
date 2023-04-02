import React, { useState } from 'react'
import { Link } from 'react-router-dom'
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

export default function Admin() {
    const userActions = useUserActions()

    return (
        <div style={{ marginLeft: '250px' }}>
            <MDBRow>
                <MDBCol sm='5'>
                    <MDBCard>
                        <MDBCardBody>
                            <MDBCardImage src={`https://picsum.photos/seed/${userActions.getRandomInt(100)}/300/100`} alt='...' position='top' />
                            <MDBCardTitle>User Manager</MDBCardTitle>
                            <MDBCardText></MDBCardText>
                            <Link to="/users">
                                <MDBBtn>Open Manager</MDBBtn>
                            </Link>

                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol sm='1'></MDBCol>
                <MDBCol sm='5'>
                    <MDBCard>
                        <MDBCardBody>
                            <MDBCardImage src={`https://picsum.photos/seed/${userActions.getRandomInt(100)}/300/100`} alt='...' position='top' />
                            <MDBCardTitle>Content Manager</MDBCardTitle>
                            <MDBCardText></MDBCardText>
                            <Link to="/content">
                                <MDBBtn>Open Manager</MDBBtn>
                            </Link>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol sm='1'></MDBCol>
            </MDBRow>
        </div>
    )
} 