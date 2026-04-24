import { useQuery } from "@tanstack/react-query";
import type { Termin } from "../types";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useDohvatiDetaljeTermina = (id: string) => {
  const dohvatiDetalje = async (): Promise<Termin> => {
    const res = await fetch(`${baseUrl}/termini/${id}`);

    if (!res.ok) {
      throw new Error("Greška pri dohvaćanju termina");
    }

    const data: Termin = await res.json();
    return data;
  };

  return useQuery<Termin, Error>({
    queryKey: ["termini", id],
    queryFn: dohvatiDetalje,
    enabled: !!id,
  });
};
