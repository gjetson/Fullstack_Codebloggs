import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { useRecoilState } from 'recoil'
import { userAtom } from '../state/user_atom'
import { getCookie } from 'react-use-cookie'


const PrivateAdminOutlet = () => {
    const [user,] = useRecoilState(userAtom)
    const token = getCookie('token')
    let outlet = true
    // console.log('token: ', token)
    // console.log('session token: ', session.token)
    if (!token || token === '0' || !user || user.auth_level !== 'ADMIN') {
        outlet = false
    }
    console.log('private admin outlet: ', outlet)
    return (
        outlet ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateAdminOutlet