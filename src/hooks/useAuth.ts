import { useMemo } from "react";
import type { Korisnik } from "../types";

export const useAuth = () => {
  const korisnik = useMemo(() => {
    const data = localStorage.getItem("korisnik");

    if (!data) return null;

    try {
      return JSON.parse(data) as Korisnik;
    } catch {
      return null;
    }
  }, []);

  const token = localStorage.getItem("token");

  const jeliAutentificiran = !!token;

  const odjaviKorisnika = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("korisnik");
  };

  return {
    korisnik,
    token,
    jeliAutentificiran,
    odjaviKorisnika
  };
};