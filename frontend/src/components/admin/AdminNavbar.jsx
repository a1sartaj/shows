import { Link, NavLink } from "react-router-dom";

const AdminNavbar = () => {

  return (
    <nav className="flex justify-between items-center max-w-7xl mx-auto px-2 xl:px-0 text-lg">

      {/* ============ Logo ============== */}
      <Link to={'/'} className="sansita text-xl font-bold">
        Admin Panel
      </Link>

      <ul className='flex gap-4 bg-glass-bg px-2 py-1 rounded-full  '>
        <li className='hover:-translate-y-0.5 transition-all duration-200 ease-in px-2 py-1 rounded-lg  '><NavLink to="/admin">Dashboard</NavLink></li>
        <li className='hover:-translate-y-0.5 transition-all duration-200 ease-in px-2 py-1 rounded-lg  '> <NavLink to="/admin/add-show">Add Show</NavLink></li>
        <li className='hover:-translate-y-0.5 transition-all duration-200 ease-in px-2 py-1 rounded-lg  '><NavLink to="/admin/add-movie">Add Movie</NavLink></li>
        <li className='hover:-translate-y-0.5 transition-all duration-200 ease-in px-2 py-1 rounded-lg  '><NavLink to="/admin/edit-user">Edit User </NavLink></li>
        <li className='hover:-translate-y-0.5 transition-all duration-200 ease-in px-2 py-1 rounded-lg  '> <NavLink to="/">Home</NavLink></li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
