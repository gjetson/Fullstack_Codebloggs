import React from 'react'
import { useRecoilState } from 'recoil'
import { userAtom } from '../state/user'
import { authAtom } from '../state/auth'

export default function Home() {
    const [user,] = useRecoilState(userAtom)
    const [auth,] = useRecoilState(authAtom)

    console.log('user: ', user)
    console.log('auth: ', auth)
    let name = ''
    if (user) {
        name = ` ${user.first_name}`
    }
    return (
        <h1>........................................................................................Welcome{name}!</h1>
    )
}