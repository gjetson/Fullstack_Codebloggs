import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { useUserActions } from '../util/user_actions'
import { userAtom } from '../state/user'

export default function Home() {
    const userActions = useUserActions()
    const [user,] = useRecoilState(userAtom)

    useEffect(() => {
        userActions.authSession()
        userActions.initUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    console.log('user: ', user)
    let name = ''
    if (user) {
        name = ` ${user.first_name}`
    }
    return (
        <h1>........................................................................................Welcome{name}!</h1>
    )
}