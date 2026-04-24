import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { message } from "antd";

type Params = {
  terminId: string;
  userId: string;
};

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useOtkaziRezervaciju = () => {
  const queryClient = useQueryClient();

  const otkazi = async ({ terminId, userId }: Params) => {
    const res = await axios.delete(`${baseUrl}/rezervacije`, {
      data: {
        terminId,
        userId,
      },
    });

    return res.data;
  };

  return useMutation({
    mutationFn: otkazi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["termini"] });
      message.success("Termin je uspješno otkazan");
    },
    onError: (error: AxiosError<Error>) => {
      const msg =
        error?.response?.data.message || "Otkazivanje termina nije uspjelo";
      message.error(msg);
    },
  });
};
