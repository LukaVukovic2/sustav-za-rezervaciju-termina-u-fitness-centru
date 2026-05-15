import { useQuery } from "@tanstack/react-query";
import type { RezervacijaKorisnik } from "../types";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useDohvatiRezervacijePoTreneru = (idTrenera: string | undefined) => {
  const dohvatiMojeRezervacije = async () => {
    const res = await fetch(`${baseUrl}/pregled-rezervacija?idTrenera=${idTrenera}`);

    if (!res.ok) {
      throw new Error("Greška pri dohvaćanju rezervacija");
    }
    const data = await res.json();
    return data;
  };

  return useQuery<RezervacijaKorisnik[], Error>({
    queryKey: ["pregledRezervacija", idTrenera],
    queryFn: dohvatiMojeRezervacije,
    enabled: !!idTrenera
  });
};
