import { useQuery } from "@tanstack/react-query";
import type { Termin } from "../types";

export const useDohvatiTermine = () => {
  return useQuery<Termin[], Error>({
    queryKey: ["termini"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/termini");

      if (!res.ok) {
        throw new Error("Greška pri dohvaćanju termina");
      }

      const data = await res.json();
      return data;
    },
  });
};