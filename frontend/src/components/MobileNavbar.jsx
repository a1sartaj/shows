import React, { useEffect, useRef, useState } from 'react'
import { FaBars } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { NavLink } from 'react-router-dom';

const MobileNavbar = ({ user }) => {
    const [open, setOpen] = useState(false)
    const menuRef = useRef(null)

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
            window.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open])

    return (
        <nav className='relative md:hidden' ref={menuRef} >
            {
                open ? <button onClick={() => setOpen(false)} className='text-2xl flex items-center justify-center' >
                    <MdClose />
                </button> : <button onClick={() => setOpen(true)} className='text-xl flex items-center justify-center' >
                    <FaBars />
                </button>
            }

            {/* ======Nav Link ======== */}
            {
                open && (
                    <ul className='absolute right-0 w-64 bg-glass-bg-mobile px-2 py-1 rounded-lg' >
                        <li className='hover:-translate-y-0.5 transition-all duration-200 ease-in px-2 py-1 rounded-lg  ' ><NavLink to='/' >HOME</NavLink></li>

                        <li className='hover:-translate-y-0.5 transition-all duration-200 ease-in px-2 py-1 rounded-lg  ' ><NavLink to='/movies' >MOVIES</NavLink></li>

                        <li className='hover:-translate-y-0.5 transition-all duration-200 ease-in px-2 py-1 rounded-lg  ' ><NavLink to='/movies'>THEATERS</NavLink></li>

                        <li className='hover:-translate-y-0.5 transition-all duration-200 ease-in px-2 py-1 rounded-lg  ' ><NavLink to='/bookings' >MY BOOKINGS</NavLink></li>

                        {user?.role === 'ADMIN' && (
                            <li className='hover:-translate-y-0.5 transition-all duration-200 ease-in px-2 py-1 rounded-lg  ' ><NavLink to='/admin' >ADMIN</NavLink></li>
                        )}
                    </ul>
                )
            }
        </nav>
    )
}

export default MobileNavbar
