import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const JavnaRuta = () => {
  const { jeliAutentificiran } = useAuth();

  if (jeliAutentificiran) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};