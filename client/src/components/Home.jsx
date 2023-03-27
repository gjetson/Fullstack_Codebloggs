import React from 'react'
import { useRecoilState } from 'recoil'
import { sessionAtom } from '../state/session'

export default function Home() {
    const [session,] = useRecoilState(sessionAtom)

    let name = ''
    if (session) {
        name = ` ${session.first_name}`
    }
    return (
        <h1>........................................................................................Welcome{name}!</h1>
    )
}