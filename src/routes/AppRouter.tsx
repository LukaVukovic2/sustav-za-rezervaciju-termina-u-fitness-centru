import { createBrowserRouter } from "react-router-dom";
import ListaTermina from "../components/termini/ListaTermina";
import { GlavniLayout } from "../components/shared/GlavniLayout"
import { MojeRezervacijePage, MojiTerminiPage, NoviTerminPage, TerminDetaljiPage, UrediTerminPage } from "../pages";


export const appRouter = createBrowserRouter([
  {
    path: "/", 
    element: <GlavniLayout />,
    children: [
      { path: "/", element: <ListaTermina /> },
      { path: "/termin/:id", element: <TerminDetaljiPage /> },
      { path: "/moje-rezervacije", element: <MojeRezervacijePage />},
      { path: "/termin/kreiraj", element: <NoviTerminPage />},
      { path: "/moji-termini", element: <MojiTerminiPage />},
      { path: "/termin/uredi/:id", element: <UrediTerminPage />}
    ],
  },
  {
    path: "/login",
    element: <div>Login stranica</div>
  },
]);