import React, { useEffect } from 'react'
import { useUserActions } from '../util/user_actions'

export default function Blogg() {
    const userActions = useUserActions()

    useEffect(() => {
        userActions.authSession()
        userActions.initUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <h1>........................................................................................blogg</h1>
    )
}