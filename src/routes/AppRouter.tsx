import { createBrowserRouter } from "react-router-dom";
import TerminDetaljiPage from "../pages/TerminDetaljiPage";
import ListaTermina from "../components/termini/ListaTermina";
import { GlavniLayout } from "../components/shared/GlavniLayout"
import MojeRezervacijePage from "../pages/MojeRezervacijePage";
import NoviTerminPage from "../pages/NoviTerminPage";

export const appRouter = createBrowserRouter([
  {
    path: "/", 
    element: <GlavniLayout />,
    children: [
      { path: "/", element: <ListaTermina /> },
      { path: "/termin/:id", element: <TerminDetaljiPage /> },
      { path: "/moje-rezervacije", element: <MojeRezervacijePage />},
      { path: "/termin/kreiraj", element: <NoviTerminPage />}
    ],
  },
  {
    path: "/login",
    element: <div>Login stranica</div>, // ovde nema navigacije
  },
]);