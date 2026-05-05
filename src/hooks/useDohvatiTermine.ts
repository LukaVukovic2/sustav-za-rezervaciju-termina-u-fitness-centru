import { useQuery } from "@tanstack/react-query";
import type { Filteri, Termin } from "../types";

const baseUrl = import.meta.env.VITE_BASE_URL;

const userId = "123";

export const useDohvatiTermine = (
  search: string,
  filteri: Filteri | undefined,
) => {
  return useQuery<Termin[], Error>({
    queryKey: ["termini", search, filteri],
    queryFn: async () => {
      const params = new URLSearchParams();

      params.append("userId", userId);

      if (search) {
        params.append("search", search);
      }

      if (filteri?.vrijeme) {
        params.append("vrijemeOd", filteri.vrijeme[0].toString());
        params.append("vrijemeDo", filteri.vrijeme[1].toString());
      }

      const res = await fetch(`${baseUrl}/termini?${params.toString()}`);

      if (!res.ok) {
        throw new Error("Greška pri dohvaćanju termina");
      }

      return res.json();
    },
  });
};
