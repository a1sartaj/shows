import React, { useEffect, useRef, useState } from 'react'
import { MdDriveFileRenameOutline } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

const UserDropdown = ({ user, onLogout }) => {

    const [open, setOpen] = useState(false)
    const menuRef = useRef()

    useEffect(() => {

        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false)
            }
        }

        if (open) {
            window.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            window.removeEventListener('mousedown', handleClickOutside)
        }
    }, [open])

    return (
        <div ref={menuRef} className='relative' >

            <button onClick={() => setOpen(!open)} className='w-8 h-8 md:w-10 md:h-10 text-lg md:text-xl font-bold bg-button-primary hover:bg-button-primary-hover hover:scale-95 rounded-full transition-all duration-300 ease-in cursor-pointer'>{user?.name[0]}</button>

            {
                open && (<div className='absolute top-12 right-0 bg-white text-black rounded-lg p-4'>

                    <div className=' flex gap-2 items-center w-full' >
                        <p className='flex items-center justify-center text-white w-12 h-12  text-lg md:text-xl font-bold bg-button-primary  rounded-full' >{user?.name[0]}</p>
                        
                        <ul>
                            <li className='text-2xl font-medium'>{user?.name}</li>
                            <li className='text-base text-gray-700' >{user?.email}</li>
                        </ul>
                    </div>

                    <ul className='my-4' >
                        <li className='flex gap-2 items-center justify-start text-text-muted hover:text-black cursor-pointer text-sm md:text-base transition-all duration-300 ease-in'> <MdDriveFileRenameOutline /> Change Name</li>
                        <li className='flex gap-2 items-center justify-start text-text-muted hover:text-black cursor-pointer text-sm md:text-base transition-all duration-300 ease-in'> <MdEmail /> Change Email</li>
                        <li className='flex gap-2 items-center justify-start text-text-muted hover:text-black cursor-pointer text-sm md:text-base transition-all duration-300 ease-in'> <RiLockPasswordFill /> Change Password</li>
                    </ul>

                    <button onClick={onLogout} className='py-2 w-full  text-sm md:text-lg text-white bg-button-primary hover:bg-button-primary-hover hover:scale-95 rounded-lg transition-all duration-300 ease-in cursor-pointer'>Logout</button>
                </div>
                )
            }

        </div>
    )
}

export default UserDropdown
