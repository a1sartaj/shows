import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../lib/axiosInstance";



const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const token = localStorage.getItem('token')
    const navigate = useNavigate()


    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
        navigate('/login', { replace: true })
    }

    const handleGetMe = async () => {
        if (!token) {
            setLoading(false)
            return;
        }

        try {

            const response = await axiosInstance.get('/api/auth/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setUser(response.data.user)

        } catch (error) {
            if (error.response?.status === 401) {
                // toast.error(error?.response?.data?.message || 'Session expired. Please login again.')
                logout()
            } else {
                toast.error(error?.response?.data?.message || 'Failed to fetch user data.')
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        handleGetMe();
    }, [token])

    const value = {
        user,
        loading,
        logout,
    }

    return (
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext