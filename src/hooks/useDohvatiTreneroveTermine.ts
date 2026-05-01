import { useQuery } from "@tanstack/react-query";
import type { Termin } from "../types";

const baseUrl = import.meta.env.VITE_BASE_URL;

const idTrenera = "Mate Vilac";

export const useDohvatiTreneroveTermine = () => {
  return useQuery<Termin[], Error>({
    queryKey: ["mojiTermini", idTrenera],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/termini/moji-termini/${idTrenera}`);

      if (!res.ok) {
        throw new Error("Greška pri dohvaćanju termina");
      }

      const data = await res.json();
      return data;
    },
  });
};