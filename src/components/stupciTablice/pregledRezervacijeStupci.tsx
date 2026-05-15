import type { ColumnsType } from "antd/es/table";
import type { RezervacijaKorisnik } from "../../types";
import { formatirajVrijemeTreninga } from "../../helpers/formatirajVrijemeTreninga";

export function pregledRezervacijaStupci(): ColumnsType<RezervacijaKorisnik> {
  return [
    {
      title: "Naziv termina",
      dataIndex: "naziv",
      key: "naziv",
    },
    {
      title: "Ime polaznika",
      dataIndex: "ime",
      key: "ime"
    },
    {
      title: "Vrijeme",
      dataIndex: "vrijemeRezervacije",
      key: "vrijemeRezervacije",
      render: (value) => formatirajVrijemeTreninga(value),
    }
  ];
}
