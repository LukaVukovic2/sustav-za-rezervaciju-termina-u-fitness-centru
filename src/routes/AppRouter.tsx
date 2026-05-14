import { createBrowserRouter } from "react-router-dom";

import ListaTermina from "../components/termini/ListaTermina";
import AuthForma from "../components/autetifikacija/AuthForma";

import { GlavniLayout } from "../components/shared/GlavniLayout";

import {
  MojeRezervacijePage,
  MojiTerminiPage,
  NoviTerminPage,
  TerminDetaljiPage,
  UrediTerminPage,
} from "../pages";

import { ZasticenaRuta } from "./ZasticenaRuta";
import { JavnaRuta } from "./JavnaRuta";

export const appRouter = createBrowserRouter([
  {
    element: <GlavniLayout />,
    children: [
      {
        element: <ZasticenaRuta />,
        children: [
          {
            path: "/",
            element: <ListaTermina />,
          },

          {
            path: "/termin/:id",
            element: <TerminDetaljiPage />,
          },

          {
            element: <ZasticenaRuta dopustenaUloga={["Korisnik"]} />,
            children: [
              {
                path: "/moje-rezervacije",
                element: <MojeRezervacijePage />,
              }
            ]
          },

          {
            element: <ZasticenaRuta dopustenaUloga={["Trener"]} />,
            children: [
              {
                path: "/termin/kreiraj",
                element: <NoviTerminPage />,
              },
              {
                path: "/moji-termini",
                element: <MojiTerminiPage />,
              },
              {
                path: "/termin/uredi/:id",
                element: <UrediTerminPage />,
              },
            ],
          },
        ],
      },
    ],
  },

  {
    element: <JavnaRuta />,
    children: [
      {
        path: "/autentifikacija/forma",
        element: <AuthForma />,
      },
    ],
  },
]);