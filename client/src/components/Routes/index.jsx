import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../../pages/home/Home";
import About from "../../pages/about/About";
import Register from "../../pages/auth/register/Register";
import Login from "../../pages/auth/login/Login";
import PrivateRoute from "../Private/PrivateRoute";
import Profile from "../../pages/profile/Profile";
import { useSelector } from "react-redux";

const RoutesComponent = () => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={!user ? <Login /> : <Navigate to={"/"} />} />
        <Route path="/sign-up" element={!user ? <Register /> : <Navigate to={"/"} />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
};

export default RoutesComponent;
