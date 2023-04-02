import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { useRecoilState } from 'recoil'
import { userAtom } from '../state/user_atom'
import { getCookie } from 'react-use-cookie'


const PrivateOutlet = () => {
    const [user,] = useRecoilState(userAtom)
    const token = getCookie('token')
    let outlet = true
    // console.log('token: ', token)
    // console.log('session token: ', session.token)
    if (!token || token === '0' || !user) {
        outlet = false
    }
    console.log('private outlet: ', outlet)
    return (
        outlet ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateOutlet