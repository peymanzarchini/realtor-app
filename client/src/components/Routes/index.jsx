import { Routes, Route } from "react-router-dom";
import Home from "../../pages/home/Home";
import Offers from "../../pages/offers/Offers";
import Register from "../../pages/auth/register/Register";
import Login from "../../pages/auth/login/Login";

const RoutesComponent = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
      </Routes>
    </>
  );
};

export default RoutesComponent;
