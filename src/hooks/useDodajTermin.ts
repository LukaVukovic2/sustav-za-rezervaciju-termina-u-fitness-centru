import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { message } from "antd";
import type { TerminForm } from "../types";
import { useNavigate } from "react-router";

const baseUrl = import.meta.env.VITE_BASE_URL;
const idTrenera = "Mate Vilac";

export const useDodajTermin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const dodaj = async (termin: TerminForm) => {
    const res = await axios.post(`${baseUrl}/termini`, {...termin, idTrenera});

    return res.data;
  };

  return useMutation({
    mutationFn: dodaj,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["termini"] });
      message.success("Uspješno ste dodali termin!");
      navigate("/");
    },
    onError: (error: AxiosError<Error>) => {
      const msg = error?.response?.data.message || "Dodavanje termina nije uspjelo";
      message.error(msg);
    },
  });
};
