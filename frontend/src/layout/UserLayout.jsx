import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const UserLayout = () => {
    return (
        <div className="relative  bg-background text-text-primary">
            <header className="fixed top-0 z-50 w-full py-2 bg-transparent ">
                <Navbar />
            </header>

            <main className="relative flex w-full min-h-screen pt-14 md:pt-24 ">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default UserLayout;
