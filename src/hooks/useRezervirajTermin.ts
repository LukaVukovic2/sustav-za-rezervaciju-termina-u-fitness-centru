import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { message } from "antd";

type Params = {
  terminId: string;
  userId: string;
};

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useRezervirajTermin = () => {
  const queryClient = useQueryClient();

  const rezerviraj = async ({ terminId, userId }: Params) => {
    const res = await axios.post(`${baseUrl}/rezervacije`, {
      terminId,
      userId,
    });

    return res.data;
  };

  return useMutation({
    mutationFn: rezerviraj,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["termini"] });
      message.success("Uspješno ste rezervirali termin!");
    },
    onError: (error: AxiosError<Error>) => {
      const msg = error?.response?.data.message || "Rezervacija nije uspjela";
      message.error(msg);
    },
  });
};
