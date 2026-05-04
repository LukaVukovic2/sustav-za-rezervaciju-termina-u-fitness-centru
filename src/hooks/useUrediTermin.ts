import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { message } from "antd";
import type { TerminForm } from "../types";
import { useNavigate } from "react-router";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useUrediTermin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const uredi = async (termin: TerminForm) => {
    const res = await axios.patch(`${baseUrl}/termini/${termin._id}`, termin);

    return res.data;
  };

  return useMutation({
    mutationFn: uredi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["termini"] });
      queryClient.invalidateQueries({ queryKey: ["mojiTermini"]})
      message.success("Uspješno ste uredili termin!");
      navigate("/moji-termini");
    },
    onError: (error: AxiosError<Error>) => {
      const msg = error?.response?.data.message || "Uređivanje termina nije uspjelo";
      message.error(msg);
    },
  });
};
