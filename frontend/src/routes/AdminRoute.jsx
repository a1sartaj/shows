import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const AdminRoute = ({ children }) => {

    const { user } = useContext(AuthContext)

    if (!user) {
        return <Navigate to='/login' replace />
    }

    if (user.role !== 'ADMIN') {
        return <Navigate to='/' replace />
    }

    return children;

}

export default AdminRoute
