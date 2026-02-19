import { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { FaBars } from "react-icons/fa";
import MobileNavbar from './MobileNavbar';


const Navbar = () => {

    const navigate = useNavigate()

    const { user, logout } = useContext(AuthContext)

    return (
        <nav className='flex justify-between items-center max-w-7xl mx-auto px-2 xl:px-0 text-lg'>

            {/* ============ Logo ============== */}
            <Link to={'/'} className="sansita text-2xl md:text-3xl font-bold">
                a1<span className='text-button-primary'>shows</span>.in
            </Link>

            {/* ============== Navlinks ================ */}
            <ul className='hidden md:flex gap-4 bg-glass-bg px-2 py-1 rounded-full  ' >
                <li className='hover:-translate-y-0.5 transition-all duration-200 ease-in px-2 py-1 rounded-lg  ' ><NavLink to='/' >HOME</NavLink></li>

                <li className='hover:-translate-y-0.5 transition-all duration-200 ease-in px-2 py-1 rounded-lg  ' ><NavLink to='/movies' >MOVIES</NavLink></li>

                <li className='hover:-translate-y-0.5 transition-all duration-200 ease-in px-2 py-1 rounded-lg  ' ><NavLink to='/movies'>THEATERS</NavLink></li>

                <li className='hover:-translate-y-0.5 transition-all duration-200 ease-in px-2 py-1 rounded-lg  ' ><NavLink to='/bookings' >MY BOOKINGS</NavLink></li>

                {user?.role === 'ADMIN' && (
                    <li className='hover:-translate-y-0.5 transition-all duration-200 ease-in px-2 py-1 rounded-lg  ' ><NavLink to='/admin' >ADMIN</NavLink></li>
                )}
            </ul>

            {/* ============ Mobile navbar ========== */}
            <MobileNavbar user={user} />

            {/* ============ Login button and hamburger ============== */}
            <div className='hidden md:flex gap-2 items-center justify-center' >
                {user ? (
                    <button onClick={logout} className='px-6 py-2 text-sm md:text-lg bg-button-primary hover:bg-button-primary-hover hover:scale-95 rounded-lg transition-all duration-300 ease-in cursor-pointer'>Logout</button>
                ) : (
                    <button onClick={() => navigate('/login')} className='px-6 py-2 text-sm md:text-lg bg-button-primary hover:bg-button-primary-hover hover:scale-95 rounded-lg transition-all duration-300 ease-in cursor-pointer'>Login</button>
                )}
            </div>


        </nav>
    )
}

export default Navbar
