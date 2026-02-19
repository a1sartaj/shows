import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/admin/AdminNavbar";

const AdminLayout = () => {
  return (
    <div className="relative bg-background text-text-primary">

      <header className="fixed top-0 z-50 w-full py-2 bg-transparent">
        <AdminNavbar />
      </header>

      <main className="flex items-start justify-center w-full min-h-screen pt-24">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
