import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { message } from "antd";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useIzbrisiTermin = () => {
  const queryClient = useQueryClient();

  const izbrisi = async (idTermina: string) => {
    const res = await axios.delete(`${baseUrl}/termini/${idTermina}`);
    return res.data;
  };

  return useMutation({
    mutationFn: izbrisi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["termini"] });
      queryClient.invalidateQueries({ queryKey: ["mojiTermini"]})
      message.success("Termin je uspješno obrisan");
    },
    onError: (error: AxiosError<Error>) => {
      const msg =
        error?.response?.data.message || "Brisanje termina nije uspjelo";
      message.error(msg);
    },
  });
};
