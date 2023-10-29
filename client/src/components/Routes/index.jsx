import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../../pages/home/Home";
import About from "../../pages/about/About";
import Register from "../../pages/auth/register/Register";
import Login from "../../pages/auth/login/Login";
import PrivateRoute from "../Private/PrivateRoute";
import Profile from "../../pages/profile/Profile";
import CreateListing from "../../pages/listing/CreateListing";
import { useSelector } from "react-redux";
import Listing from "../../pages/listing/Listing";
import UpdateListing from "../../pages/listing/UpdateListing";
import Search from "../../pages/search/Search";

const RoutesComponent = () => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={!user ? <Login /> : <Navigate to={"/"} />} />
        <Route path="/sign-up" element={!user ? <Register /> : <Navigate to={"/"} />} />
        <Route path="/search" element={<Search />} />
        <Route path="/listing/:listingId" element={<Listing />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/update-listing/:listingId" element={<UpdateListing />} />
        </Route>
      </Routes>
    </>
  );
};

export default RoutesComponent;
