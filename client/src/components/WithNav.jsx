// WithNav.js (Stand-alone Functional Component)
import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router'


const WithNav = () => {
    return (
        <>
            <Sidebar />
            <Outlet />
        </>
    )
}

export default WithNav