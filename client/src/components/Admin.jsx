import React, { useState } from 'react'
import { useUserActions } from '../util/user_actions'

import {
    MDBCardImage,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBRow,
    MDBCol
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
                            <MDBCardTitle>Department of UFO Investigations</MDBCardTitle>
                            <MDBCardText>
                                ...or how do I get off this rock???
                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol sm='1'></MDBCol>
                <MDBCol sm='5'>
                    <MDBCard>
                        <MDBCardBody>
                            <MDBCardImage src={`https://picsum.photos/seed/${userActions.getRandomInt(100)}/300/100`} alt='...' position='top' />
                            <MDBCardTitle>Department of Future Projects</MDBCardTitle>
                            <MDBCardText>
                                Where is my effing flying car???
                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol sm='1'></MDBCol>
            </MDBRow>
        </div>
    )
} 