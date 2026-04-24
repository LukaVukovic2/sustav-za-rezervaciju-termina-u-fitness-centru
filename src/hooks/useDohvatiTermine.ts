import { useQuery } from "@tanstack/react-query";
import type { Termin } from "../types";

const baseUrl = import.meta.env.VITE_BASE_URL;

const userId = "123";

export const useDohvatiTermine = () => {
  return useQuery<Termin[], Error>({
    queryKey: ["termini"],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/termini?userId=${userId}`);

      if (!res.ok) {
        throw new Error("Greška pri dohvaćanju termina");
      }

      const data = await res.json();
      return data;
    },
  });
};