import React from 'react'
import styled from "styled-components"
import { useRecoilState } from 'recoil'
import { userAtom } from '../state/user'

const Wrap = styled.div`
margin-left: 250px
`

export default function Home() {
    const [user,] = useRecoilState(userAtom)

    let name = ''
    if (user) {
        name = ` ${user.first_name}`
    }
    return (
        <Wrap>
            <h1>|....Welcome{name}!</h1>
        </Wrap>
    )
}