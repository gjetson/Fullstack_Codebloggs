import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { useRecoilState } from 'recoil'
import { sessionAtom } from '../state/session'
import { getCookie } from 'react-use-cookie'


const PrivateOutlet = () => {
    const [session,] = useRecoilState(sessionAtom)
    const token = getCookie('token')
    let outlet = true
    // console.log('token: ', token)
    // console.log('session token: ', session.token)
    if (!token || token === '0' || !session || session.token !== token) {
        outlet = false
    }
    console.log('private outlet: ', outlet)
    return (
        outlet ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateOutlet