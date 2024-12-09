import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {
    const { isLoggedIn } = useSelector((result) => result.user)

    return (
        <>
            {
                isLoggedIn ? 
                <Outlet />
                :
                <Navigate to="/signup" />
            }
        </>
    )
}

export default ProtectedRoutes