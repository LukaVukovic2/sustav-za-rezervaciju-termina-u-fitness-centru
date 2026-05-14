import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";

type Props = {
  dopustenaUloga?: string[];
};

export const ZasticenaRuta = ({
  dopustenaUloga,
}: Props) => {
  const { korisnik, jeliAutentificiran } = useAuth();

  if (!jeliAutentificiran) {
    return <Navigate to="/autentifikacija/forma" replace />;
  }

  if (
    dopustenaUloga &&
    korisnik &&
    !dopustenaUloga.includes(korisnik.uloga)
  ) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};