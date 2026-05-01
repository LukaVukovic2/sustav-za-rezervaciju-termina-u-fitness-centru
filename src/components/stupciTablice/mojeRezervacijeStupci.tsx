import type { ColumnsType } from "antd/es/table";
import type { RezervacijaMapped } from "../../types";
import { formatirajVrijemeTreninga } from "../../helpers/formatirajVrijemeTreninga";

export function mojeRezervacijeStupci(): ColumnsType<RezervacijaMapped> {  
  return [
    {
      title: "Naziv termina",
      dataIndex: "naziv",
      key: "nazivTermina",
    },
    {
      title: "Vrijeme",
      dataIndex: "vrijeme",
      key: "vrijeme",
      render: value => formatirajVrijemeTreninga(value)
    },
    {
      title: "Trajanje",
      dataIndex: "trajanjeMin",
      key: "trajanjeMin",
      render: value => value + " min"
    },
  ];
}
