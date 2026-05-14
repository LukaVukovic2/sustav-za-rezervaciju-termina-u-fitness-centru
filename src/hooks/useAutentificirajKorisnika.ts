import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { message } from "antd";
import type { AuthPolja } from "../types";
import { useNavigate } from "react-router";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useAutentificirajKorisnika = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const autentificiraj = async ({ korisnik, isLogin }: { korisnik: AuthPolja; isLogin: boolean; }) => {
    const res = await axios.post(
      `${baseUrl}/${isLogin ? "prijava" : "registracija"}`,
      { ...korisnik },
    );

    return res.data;
  };

  return useMutation({
    mutationFn: autentificiraj,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["korisnici"] });

      localStorage.setItem("token", JSON.stringify(data.token));
      localStorage.setItem("korisnik", JSON.stringify(data.korisnik));

      message.success(data.message || "Dobrodošli");
      navigate("/");
    },
    onError: (error: AxiosError<Error>) => {
      const msg =
        error?.response?.data.message || "Autentifikacija nije uspjela";
      message.error(msg);
    },
  });
};
