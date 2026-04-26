import { useQuery } from "@tanstack/react-query";
import type { RezervacijaMapped } from "../types";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useDohvatiRezervacijePoID = (userId: string) => {
  const dohvatiMojeRezervacije = async () => {
    const res = await fetch(`${baseUrl}/rezervacije?userId=${userId}`);

    if (!res.ok) {
      throw new Error("Greška pri dohvaćanju rezervacija");
    }
    const data = await res.json();
    return data;
  };

  return useQuery<RezervacijaMapped[], Error>({
    queryKey: ["mojeRezervacije", userId],
    queryFn: dohvatiMojeRezervacije
  });
};
