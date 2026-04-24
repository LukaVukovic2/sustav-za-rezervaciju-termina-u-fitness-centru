import { createBrowserRouter } from "react-router-dom";
import TerminDetaljiPage from "../pages/TerminDetailsPage";
import ListaTermina from "../components/termini/ListaTermina";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <ListaTermina />
    ),
  },
  {
    path: "/termin/:id",
    element: (
      <TerminDetaljiPage />
    ),
  }
]);