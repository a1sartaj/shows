import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import PageLoader from "./components/loaders/PageLoader";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import Login from "./pages/Login";

import AdminAddMovie from "./pages/Admin/AdminAddMovie";
import AdminDashboard from "./pages/Admin/AdminDashboard";

import AdminLayout from "./layout/AdminLayout";
import UserLayout from "./layout/UserLayout";
import PublicRoute from "./routes/PublicRoute";
import AdminRoute from "./routes/AdminRoute";
import AddShows from "./pages/Admin/AddShows";
import AddShowWithId from "./pages/Admin/AddShowWithId";
import SelectSeat from "./pages/SelectSeat";
import BookingDetails from "./pages/BookingDetails";
import MyBooking from "./pages/MyBooking";
import UserRoute from "./routes/UserRoute";
import SignUp from "./pages/SignUp";
import EditUser from "./pages/Admin/EditUser";

const App = () => {
  const { loading } = useContext(AuthContext);

  return (
    <>
      {/* 🔥 Toaster must always be mounted */}
      <Toaster />

      {loading ? (
        <PageLoader />
      ) : (
        <Routes>

          {/* USER ROUTES */}
          <Route element={<UserLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/select-seat/:movieId" element={<SelectSeat />} />
            <Route path="/confirmed/:bookingId" element={<UserRoute ><BookingDetails /></UserRoute>} />
            <Route path="/bookings" element={<UserRoute><MyBooking /></UserRoute>} />

            {/* PUBLIC ROUTES */}
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/sign-up" element={<PublicRoute><SignUp /></PublicRoute>} />

          </Route>

          {/* ADMIN ROUTES */}
          <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="add-movie" element={<AdminAddMovie />} />
            <Route path='add-show' element={<AddShows />} />
            <Route path="/admin/movies/:movieId/add-show" element={<AddShowWithId />} />
            <Route path="edit-user" element={<EditUser />} />
          </Route>

        </Routes>
      )}
    </>
  );
};

export default App;
