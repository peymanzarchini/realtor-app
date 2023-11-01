import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const user = useSelector((state) => state.user.currentUser);
  return user ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
