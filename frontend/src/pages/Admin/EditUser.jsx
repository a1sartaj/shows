import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import axiosInstance from '../../lib/axiosInstance'
import PageLoader from '../../components/loaders/PageLoader'
import ConfirmDelete from '../../components/ConfirmDelete'

const EditUser = () => {

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState({})
  const [showConfirm, setShowConfirm] = useState(false)
  const [userId, setUserId] = useState('')

  const fetchUsers = async () => {
    try {
      setLoading(true)

      const response = await axiosInstance.get('/api/auth/get-all-users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      console.log(response.data.data)
      setUsers(response.data.data)

    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch all users")
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async (userId) => {
    try {

      const response = await axiosInstance.put(`/api/auth/update/${userId}`, { password: password[userId] }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      toast.success('Successfully update password')
      console.log(response.data)

    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update password')
    }
  }

  const handleDelete = async (userId) => {
    try {
      const response = await axiosInstance.delete(`/api/auth/delete/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      toast.success('Successfully delete user')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete user')
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    console.log(password)
  }, [password])

  return loading ? <PageLoader /> : (
    <div className='w-full max-w-7xl mx-auto'>
      <h1 className='text-2xl font-bold' >Manage Users</h1>

      <div className='p-4 bg-glass-bg rounded-lg my-4'>

        {/* Grid Heading */}
        <div className='grid grid-cols-12 gap-2 pb-4 border-b border-gray-100/10' >
          <p className='col-span-3' >User</p>
          <p className='col-span-3' >Email</p>
          <p className='col-span-2'  >Role</p>
          <p className='col-span-2' >Password</p>
          <p className='col-span-2' >Actions</p>
        </div>


        {/* Content */}
        {
          users?.map((user, index) => (

            <div key={index} className='grid grid-cols-12 gap-2 items-center py-4 border-b border-gray-100/10' >

              <div className='flex items-center gap-2 col-span-3'>
                <p className='flex items-center justify-center w-8 h-8 rounded-full bg-red-500 text-white font-semibold'>{user.name[0].toUpperCase()}</p>
                <h3>{user.name}</h3>
              </div>

              <p className='col-span-3' >{user.email}</p>

              <p className={`col-span-2 rounded-full py-0.5 px-2 ${user.role === 'ADMIN' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'} w-fit `} >{user.role}</p>

              <input onChange={(e) => setPassword(prev => ({ ...prev, [user._id]: e.target.value }))} value={password[user._id] || ''} placeholder='••••••••' className='col-span-2 outline outline-gray-400 border-none rounded-lg py-0.5 px-2' type="password" />

              <div className='flex gap-2 col-span-2' >
                <button onClick={() => handleUpdate(user._id)} className='bg-blue-600 py-0.5  px-2 rounded-lg' >Update</button>
                <button onClick={() => {
                  setShowConfirm(true)
                  setUserId(user._id)
                }} className='bg-red-600  py-0.5 px-2 rounded-lg '>Delete</button>
              </div>
            </div>
          ))
        }

      </div>


      {
        showConfirm && (
          <ConfirmDelete
            onCancel={() => setShowConfirm(false)}
            onConfirm={() => {
              handleDelete(userId)
              setShowConfirm(false)
            }}
          />
        )
      }
    </div >
  )
}

export default EditUser
