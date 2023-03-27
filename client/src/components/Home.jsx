import React from 'react'
import styled from "styled-components"
import { useRecoilState } from 'recoil'
import { sessionAtom } from '../state/session'

const Wrap = styled.div`
margin-left: 250px
`

export default function Home() {
    const [session,] = useRecoilState(sessionAtom)

    let name = ''
    if (session) {
        name = ` ${session.first_name}`
    }
    return (
        <Wrap>
            <h1>|....Welcome{name}!</h1>
        </Wrap>
    )
}