import { useQuery } from "@tanstack/react-query";
import type { Termin } from "../types";

const baseUrl = import.meta.env.VITE_BASE_URL;

const userId = "123";

export const useDohvatiTermine = (search: string) => {
  return useQuery<Termin[], Error>({
    queryKey: ["termini", search],
    queryFn: async () => {
      const params = new URLSearchParams({ userId, ...(search && { search }), });

      const res = await fetch(`${baseUrl}/termini?${params.toString()}`);

      if (!res.ok) {
        throw new Error("Greška pri dohvaćanju termina");
      }

      const data = await res.json();
      return data;
    },
  });
};